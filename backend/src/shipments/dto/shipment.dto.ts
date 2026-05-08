import { IsEnum, IsOptional, IsNotEmpty, IsNumber, IsString, Min, Max, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { APP_CONSTANTS } from '../../app.constants';
import { ShipmentStatus } from '../enums/shipments.enums';

export class ShipmentResponseDto {
  @ApiProperty({ example: 'WMS-ABCD-1234' })
  trackingNumber: string;

  @ApiProperty({ example: 'Jan Kowalski' })
  recipient: string;

  @ApiProperty({ example: 5.5 })
  weight: number;

  @ApiProperty({ enum: ShipmentStatus })
  status: ShipmentStatus;

  @ApiProperty()
  createdAt: Date;
}

export class PaginationMetaDto {
  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 10 })
  totalPages: number;
}

export class PaginatedShipmentResponseDto {
  @ApiProperty({ type: [ShipmentResponseDto] })
  data: ShipmentResponseDto[];

  @ApiProperty()
  meta: PaginationMetaDto;
}


export class GetAllShipmentsDto {
  @ApiPropertyOptional({ description: 'Wyszukiwanie po odbiorcy lub numerze śledzenia' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: ShipmentStatus, description: 'Filtrowanie po statusie' })
  @IsOptional()
  @IsEnum(ShipmentStatus, { message: 'Status musi być jedną z wartości: ' + Object.values(ShipmentStatus).join(', ') })
  status?: ShipmentStatus;

  @ApiPropertyOptional({ default: APP_CONSTANTS.shipments.sorting.defaultField, description: 'Pole, po którym sortujemy' })
  @IsOptional()
  @IsString()
  @IsIn([...APP_CONSTANTS.shipments.sorting.allowedFields])
  sortBy: string = APP_CONSTANTS.shipments.sorting.defaultField;

  @ApiPropertyOptional({ default: APP_CONSTANTS.shipments.sorting.defaultOrder, enum: [...APP_CONSTANTS.shipments.sorting.availableOrders], description: 'Kierunek sortowania' })
  @IsOptional()
  @IsIn([...APP_CONSTANTS.shipments.sorting.availableOrders])
  order: 'asc' | 'desc' = APP_CONSTANTS.shipments.sorting.defaultOrder;

  @ApiPropertyOptional({ default: APP_CONSTANTS.pagination.defaultPage, description: 'Numer strony' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number = APP_CONSTANTS.pagination.defaultPage;

  @ApiPropertyOptional({ default: APP_CONSTANTS.pagination.defaultLimit, description: 'Limit rekordów na stronę' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(APP_CONSTANTS.pagination.maxLimit)
  limit: number = APP_CONSTANTS.pagination.defaultLimit;

  @ApiPropertyOptional({ description: 'Minimalna waga przesyłki' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(APP_CONSTANTS.shipments.minWeight)
  minWeight?: number;

  @ApiPropertyOptional({ description: 'Maksymalna waga przesyłki' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Max(APP_CONSTANTS.shipments.maxWeight)
  maxWeight?: number;
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
