import { Body, Query, Controller, Get, Post, Patch, Delete, Param, UseGuards } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { GetAllShipmentsDto, CreateShipmentDto, PaginatedShipmentResponseDto } from './dto/shipment.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { GetUser } from '../auth/get-user.decorator'; // <-- Import naszego dekoratora!
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Shipments')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('shipments')
export class ShipmentsController {
  constructor(private shipmentsService: ShipmentsService) { }

  @Get()
  @ApiOkResponse({ type: PaginatedShipmentResponseDto, description: 'Zwraca listę przesyłek z metadanymi' })
  getAllShipments(
    @Query() dto: GetAllShipmentsDto,
    @GetUser('sub') userId: string // Wyciągamy userId z tokenu jwt
  ) {
    return this.shipmentsService.getAll(userId, dto);
  }

  @Get(':trackingNumber')
  getShipmentDetails(
    @Param('trackingNumber') trackingNumber: string,
    @GetUser('sub') userId: string
  ) {
    return this.shipmentsService.getOne(trackingNumber, userId);
  }

  @Post('random')
  createRandomShipments(
    @GetUser('sub') userId: string,
  ) {
    return this.shipmentsService.createRandomShipments(userId);
  }

  @Post()
  createShipment(
    @Body() dto: CreateShipmentDto,
    @GetUser('sub') userId: string,
  ) {
    return this.shipmentsService.create(dto, userId);
  }

  @Delete(':trackingNumber')
  deleteShipment(
    @Param('trackingNumber') trackingNumber: string,
    @GetUser('sub') userId: string
  ) {
    return this.shipmentsService.delete(trackingNumber, userId);
  }

  @Patch(':trackingNumber/cancel')
  cancelShipment(
    @Param('trackingNumber') trackingNumber: string,
    @GetUser('sub') userId: string
  ) {
    return this.shipmentsService.cancelShipment(trackingNumber, userId);
  }
}
