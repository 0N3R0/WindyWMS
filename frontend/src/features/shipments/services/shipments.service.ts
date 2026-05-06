import { apiClient } from "@/shared/api/api-client";
import { Shipment, ShipmentDetails } from "../types/shipments.types";

export const shipmentsService = {
  async getAll(): Promise<Shipment[]> {
    const response = await apiClient.get<Shipment[]>('/shipments');
    return response.data;
  },

  async getDetails(trackingNumber: string): Promise<ShipmentDetails> {
    const response = await apiClient.get<ShipmentDetails>(`/shipments/${trackingNumber}`);
    return response.data;
  },

  async cancel(trackingNumber: string): Promise<void> {
    await apiClient.patch(`/shipments/${trackingNumber}/cancel`);
  },

  async remove(trackingNumber: string): Promise<void> {
    await apiClient.delete(`/shipments/${trackingNumber}`);
  },

  async create(data: { recipient: string; weight: number }): Promise<void> {
    await apiClient.post('/shipments', data);
  },
};