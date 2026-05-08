import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShipmentDto, GetAllShipmentsDto } from './dto/shipment.dto';
import { randomBytes } from 'crypto';
import { Cron } from '@nestjs/schedule';
import { APP_CONSTANTS, CRON_EXPRESSIONS } from 'src/app.constants';
import { ShipmentStatus } from './enums/shipments.enums';


@Injectable()
export class ShipmentsService {
  // Wstrzykujemy globalny serwis bazy danych
  constructor(private prisma: PrismaService) { }

  async getAll(userId: string, dto: GetAllShipmentsDto) {
    const { status, search, sortBy, order, page, limit, minWeight, maxWeight } = dto;

    // Obliczamy ile rekordów pominąć dla danej strony
    const skip = (page - 1) * limit;
    const take = limit;

    // Budujemy obiekt filtrów
    const where: any = {
      userId,
      status: status,
      weight: {
        gte: minWeight,
        lte: maxWeight,
      },
      ...(search ? {
        OR: [
          { recipient: { contains: search, mode: 'insensitive' } },
          { trackingNumber: { contains: search, mode: 'insensitive' } },
        ]
      } : {})
    };
    // Pobieramy dane oraz łączną liczbę rekordów (do paginacji na froncie)
    const [data, total] = await Promise.all([
      this.prisma.shipment.findMany({
        where,
        orderBy: { [sortBy]: order },
        skip,
        take,
        select: {
          trackingNumber: true,
          recipient: true,
          weight: true,
          status: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      this.prisma.shipment.count({ where })
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
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
            id: true,
            status: true,
            description: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!shipment) {
      throw new NotFoundException(APP_CONSTANTS.shipments.messages.errors.NOT_FOUND);
    }

    return shipment;
  }

  async create(dto: CreateShipmentDto, userId: string) {
    const generatedTrackingNumber = `${APP_CONSTANTS.shipments.config.trackingNumberPrefix}${randomBytes(6).toString('hex').toUpperCase()}`;

    return this.prisma.shipment.create({
      data: {
        trackingNumber: generatedTrackingNumber,
        recipient: dto.recipient,
        weight: dto.weight,
        userId: userId,
        // Prisma wie, że shipment ma relację "events" więc wywołujemy w niej create
        events: {
          create: {
            status: ShipmentStatus.PENDING,
            description: APP_CONSTANTS.shipments.messages.events.PENDING
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
      throw new NotFoundException(APP_CONSTANTS.shipments.messages.errors.NOT_FOUND);
    }
    // 2. SPRAWDZENIE REGUŁY BIZNESOWEJ: Czy paczkę można anulować?
    if (shipment.status !== ShipmentStatus.PENDING) {
      throw new BadRequestException(APP_CONSTANTS.shipments.messages.errors.CANNOT_CANCEL);
    }
    // 3. Atomowa aktualizacja (Nested Writes)
    return this.prisma.shipment.update({
      where: { id: shipment.id },
      data: {
        status: ShipmentStatus.CANCELLED,
        events: {
          create: {
            status: ShipmentStatus.CANCELLED,
            description: APP_CONSTANTS.shipments.messages.events.CANCELLED
          }
        }
      },
      select: {
        trackingNumber: true,
        status: true
      }
    });
  }

  async createRandomShipments(userId: string) {
    const recipients = [
      'Jan Kowalski', 'Anna Nowak', 'Piotr Wiśniewski', 'Maria Wójcik',
      'Tomasz Kamiński', 'Katarzyna Lewandowska', 'Michał Zieliński',
      'Agnieszka Szymańska', 'Krzysztof Woźniak', 'Magdalena Dąbrowska',
      'Paweł Kozłowski', 'Aleksandra Jankowska', 'Robert Mazur',
      'Natalia Kwiatkowska', 'Marcin Krawczyk', 'Joanna Piotrowska',
      'Grzegorz Grabowski', 'Monika Pawlak', 'Adam Michalski', 'Ewa Zając',
    ];

    const randomRecipient = () => recipients[Math.floor(Math.random() * recipients.length)];
    const randomWeight = () => +(Math.random() * (APP_CONSTANTS.shipments.maxWeight - APP_CONSTANTS.shipments.minWeight) + APP_CONSTANTS.shipments.minWeight).toFixed(2);
    const generateTrackingNumber = () => `${APP_CONSTANTS.shipments.config.trackingNumberPrefix}${randomBytes(6).toString('hex').toUpperCase()}`;

    const { messages } = APP_CONSTANTS.shipments;
    const SHIPMENTS_PER_STATUS = 5;

    // Definition of event chains for each final status
    const statusConfigs: { finalStatus: ShipmentStatus; events: { status: ShipmentStatus; description: string }[] }[] = [
      {
        finalStatus: ShipmentStatus.PENDING,
        events: [
          { status: ShipmentStatus.PENDING, description: messages.events.PENDING },
        ],
      },
      {
        finalStatus: ShipmentStatus.IN_TRANSIT,
        events: [
          { status: ShipmentStatus.PENDING, description: messages.events.PENDING },
          { status: ShipmentStatus.IN_TRANSIT, description: messages.events.IN_TRANSIT },
        ],
      },
      {
        finalStatus: ShipmentStatus.CANCELLED,
        events: [
          { status: ShipmentStatus.PENDING, description: messages.events.PENDING },
          { status: ShipmentStatus.CANCELLED, description: messages.events.CANCELLED },
        ],
      },
      {
        finalStatus: ShipmentStatus.DELIVERED,
        events: [
          { status: ShipmentStatus.PENDING, description: messages.events.PENDING },
          { status: ShipmentStatus.IN_TRANSIT, description: messages.events.IN_TRANSIT },
          { status: ShipmentStatus.DELIVERED, description: messages.events.DELIVERED },
        ],
      },
    ];

    // Build all Prisma create operations
    const createOperations = statusConfigs.flatMap(({ finalStatus, events }) =>
      Array.from({ length: SHIPMENTS_PER_STATUS }, () =>
        this.prisma.shipment.create({
          data: {
            trackingNumber: generateTrackingNumber(),
            recipient: randomRecipient(),
            weight: randomWeight(),
            status: finalStatus,
            userId,
            events: {
              create: events.map((event) => ({
                status: event.status,
                description: event.description,
              })),
            },
          },
        }),
      ),
    );

    // Execute all creates in a single transaction
    await this.prisma.$transaction(createOperations);

    return {
      message: `Successfully created ${statusConfigs.length * SHIPMENTS_PER_STATUS} random shipments`,
      breakdown: statusConfigs.map(({ finalStatus }) => ({
        status: finalStatus,
        count: SHIPMENTS_PER_STATUS,
      })),
    };
  }

  // @Cron(CRON_EXPRESSIONS.COURIER_MOVEMENT)
  // async simulateCourierMovement() {
  //   // 1. Znajdujemy wszystkie paczki, które nie zostały jeszcze dostarczone (ani anulowane)
  //   const activeShipments = await this.prisma.shipment.findMany({
  //     where: {
  //       status: { in: [ShipmentStatus.PENDING, ShipmentStatus.IN_TRANSIT] }
  //     }
  //   });

  //   if (activeShipments.length === 0) return; // Brak paczek do obsługi

  //   // 2. Losujemy JEDNĄ paczkę, którą "kurier" w tej chwili weźmie na tapet
  //   const randomIndex = Math.floor(Math.random() * activeShipments.length);
  //   const shipmentToUpdate = activeShipments[randomIndex];

  //   // 3. Określamy jaki będzie jej kolejny status
  //   const nextStatus = shipmentToUpdate.status === ShipmentStatus.PENDING ? ShipmentStatus.IN_TRANSIT : ShipmentStatus.DELIVERED;
  //   const message = nextStatus === ShipmentStatus.IN_TRANSIT ? APP_CONSTANTS.shipments.messages.events.IN_TRANSIT : APP_CONSTANTS.shipments.messages.events.DELIVERED;

  //   // 4. Robimy TRANSAKCJĘ w bazie (Aktualizujemy status paczki ORAZ zapisujemy do historii wydarzeń)
  //   await this.prisma.$transaction([
  //     this.prisma.shipment.update({
  //       where: { id: shipmentToUpdate.id },
  //       data: { status: nextStatus }
  //     }),
  //     this.prisma.shipmentEvent.create({
  //       data: {
  //         shipmentId: shipmentToUpdate.id,
  //         status: nextStatus,
  //         description: message
  //       }
  //     })
  //   ]);

  //   console.log(`Paczka ${shipmentToUpdate.trackingNumber} zmieniła status na ${nextStatus}!`);
  // }
}
