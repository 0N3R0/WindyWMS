import { IsEnum, IsOptional, IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';

import { APP_CONSTANTS } from '../../app.constants';

export enum ShipmentStatus {
  PENDING = 'PENDING',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export class GetAllShipmentsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(ShipmentStatus, { message: 'Status musi być jedną z wartości: ' + Object.values(ShipmentStatus).join(', ') })
  status?: ShipmentStatus;
}

export class CreateShipmentDto {
  @IsString()
  @IsNotEmpty({ message: 'Odbiorca jest wymagany' })
  recipient: string;

  @IsNumber()
  @Min(APP_CONSTANTS.shipments.minWeight, { message: `Waga paczki musi być większa bądź równa ${APP_CONSTANTS.shipments.minWeight}` })
  @Max(APP_CONSTANTS.shipments.maxWeight, { message: `Waga paczki musi być mniejsza bądź równa ${APP_CONSTANTS.shipments.maxWeight}` })
  weight: number;
}
