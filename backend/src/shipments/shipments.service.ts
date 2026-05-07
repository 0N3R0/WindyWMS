import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShipmentDto, GetAllShipmentsDto } from './dto/shipment.dto';
import { randomBytes } from 'crypto';
import { Cron } from '@nestjs/schedule';
import { CRON_EXPRESSIONS } from 'src/app.constants';


@Injectable()
export class ShipmentsService {
  // Wstrzykujemy globalny serwis bazy danych
  constructor(private prisma: PrismaService) { }

  async getAll(userId: string, dto: GetAllShipmentsDto) { // <-- Przyjmujemy userId
    const { status, search } = dto;

    return this.prisma.shipment.findMany({
      where: {
        userId,
        status: status,
        ...(search ? { // Jeżeli użytkownik wypełnił pole search, przeszukujemy po recipient lub tracking number
          OR: [
            { recipient: { contains: search, mode: 'insensitive' } },
            { trackingNumber: { contains: search, mode: 'insensitive' } },
          ]
        } : {})
      },
      orderBy: { createdAt: 'desc' },
      select: {
        trackingNumber: true,
        recipient: true,
        weight: true,
        status: true,
      }
    });
  }

  async getOne(trackingNumber: string, userId: string) {
    const shipment = await this.prisma.shipment.findFirst({
      where: {
        trackingNumber: trackingNumber,
        userId: userId // Sprawdzamy czy paczka należy do użytkownika
      },
      select: {
        trackingNumber: true,
        recipient: true,
        weight: true,
        status: true,
        updatedAt: true,
        events: {
          select: {
            status: true,
            description: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!shipment) {
      throw new NotFoundException('Nie znaleziono przesyłki lub nie masz do niej dostępu');
    }

    return shipment;
  }

  async create(dto: CreateShipmentDto, userId: string) {
    const generatedTrackingNumber = `WMS-${randomBytes(6).toString('hex').toUpperCase()}`;

    return this.prisma.shipment.create({
      data: {
        trackingNumber: generatedTrackingNumber,
        recipient: dto.recipient,
        weight: dto.weight,
        userId: userId,
        // Prisma wie, że shipment ma relację "events" więc wywołujemy w niej create
        events: {
          create: {
            status: 'PENDING',
            description: 'Paczka została utworzona i zarejestrowana w systemie WMS'
          }
        }
      },
      select: {
        trackingNumber: true,
        recipient: true,
        weight: true,
        status: true
      }
    });
  }

  async delete(trackingNumber: string, userId: string) {
    const result = await this.prisma.shipment.deleteMany({
      where: {
        trackingNumber: trackingNumber,
        userId: userId
      }
    });

    return {
      success: result.count > 0
    };
  }

  async cancelShipment(trackingNumber: string, userId: string) {
    // 1. Szukamy paczki klienta
    const shipment = await this.prisma.shipment.findFirst({
      where: { userId, trackingNumber }
    });
    if (!shipment) {
      throw new NotFoundException('Nie znaleziono przesyłki');
    }
    // 2. SPRAWDZENIE REGUŁY BIZNESOWEJ: Czy paczkę można anulować?
    if (shipment.status !== 'PENDING') {
      throw new BadRequestException('Nie można anulować paczki, która jest już w drodze lub została dostarczona.');
    }
    // 3. Atomowa aktualizacja (Nested Writes)
    return this.prisma.shipment.update({
      where: { id: shipment.id },
      data: {
        status: 'CANCELLED',
        events: {
          create: {
            status: 'CANCELLED',
            description: 'Przesyłka została anulowana przez klienta.'
          }
        }
      },
      select: {
        trackingNumber: true,
        status: true
      }
    });
  }

  @Cron(CRON_EXPRESSIONS.COURIER_MOVEMENT)
  async simulateCourierMovement() {
    // 1. Znajdujemy wszystkie paczki, które nie zostały jeszcze dostarczone (ani anulowane)
    const activeShipments = await this.prisma.shipment.findMany({
      where: {
        status: { in: ['PENDING', 'IN_TRANSIT'] }
      }
    });

    if (activeShipments.length === 0) return; // Brak paczek do obsługi

    // 2. Losujemy JEDNĄ paczkę, którą "kurier" w tej chwili weźmie na tapet
    const randomIndex = Math.floor(Math.random() * activeShipments.length);
    const shipmentToUpdate = activeShipments[randomIndex];

    // 3. Określamy jaki będzie jej kolejny status
    const nextStatus = shipmentToUpdate.status === 'PENDING' ? 'IN_TRANSIT' : 'DELIVERED';
    const message = nextStatus === 'IN_TRANSIT' ? 'Paczka opuściła magazyn główny' : 'Paczka została doręczona do odbiorcy!';

    // 4. Robimy TRANSAKCJĘ w bazie (Aktualizujemy status paczki ORAZ zapisujemy do historii wydarzeń)
    await this.prisma.$transaction([
      this.prisma.shipment.update({
        where: { id: shipmentToUpdate.id },
        data: { status: nextStatus }
      }),
      this.prisma.shipmentEvent.create({
        data: {
          shipmentId: shipmentToUpdate.id,
          status: nextStatus,
          description: message
        }
      })
    ]);

    console.log(`Paczka ${shipmentToUpdate.trackingNumber} zmieniła status na ${nextStatus}!`);
  }
}
