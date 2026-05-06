import useSWR from 'swr';
import { Shipment } from '../types/shipments.types';
import { shipmentsService } from '../services/shipments.service';

const REFRESH_INTERVAL_MS = 15_000;

export function useShipments() {
  const { data, error, isLoading, mutate } = useSWR<Shipment[]>(
    '/shipments',
    () => shipmentsService.getAll(),
    {
      refreshInterval: REFRESH_INTERVAL_MS,
      dedupingInterval: REFRESH_INTERVAL_MS,
      revalidateOnFocus: true,
      focusThrottleInterval: REFRESH_INTERVAL_MS,
    }
  );

  return {
    shipments: data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
}