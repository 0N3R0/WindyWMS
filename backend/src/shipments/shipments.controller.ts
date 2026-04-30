import { Body, Query, Controller, Get, Post, Patch, Delete, Param, UseGuards } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { GetAllShipmentsDto, CreateShipmentDto } from './dto/shipment.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { GetUser } from '../auth/get-user.decorator'; // <-- Import naszego dekoratora!

@UseGuards(JwtGuard)
@Controller('shipments')
export class ShipmentsController {
  constructor(private shipmentsService: ShipmentsService) { }

  @Get()
  getAllShipments(
    @GetUser('sub') userId: string, // Wyciągamy userId z tokenu jwt
    @Query() dto: GetAllShipmentsDto
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
