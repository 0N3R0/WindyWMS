export type ShipmentStatus = 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';

export interface Shipment {
  trackingNumber: string;
  recipient: string;
  weight: number;
  status: ShipmentStatus;
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