export type ShipmentStatus = 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';

export interface Shipment {
  trackingNumber: string;
  recipient: string;
  weight: number;
  status: ShipmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ShipmentMetadata {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AllShipments {
  data: Shipment[];
  meta: ShipmentMetadata;
}

export interface ShipmentEvent {
  id: string;
  status: ShipmentStatus;
  description: string | null;
  createdAt: string;
}

export interface ShipmentDetails extends Shipment {
  events: ShipmentEvent[];
  updatedAt: string;
}