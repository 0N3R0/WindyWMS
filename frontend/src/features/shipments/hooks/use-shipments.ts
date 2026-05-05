import useSWR from 'swr';
import { Shipment } from '../types/shipments.types';
import { MOCK_SHIPMENTS } from '../__mocks__/shipments.mock';
import { apiClient } from '@/shared/api/api-client';

const REFRESH_INTERVAL_MS = 15_000;

const fetcher = (url: string) => apiClient.get(url).then(res => res.data);

// Mock fetcher — zwraca lokalne dane z symulowanym opóźnieniem
const mockFetcher = (): Promise<Shipment[]> =>
  new Promise((resolve) => setTimeout(() => resolve(MOCK_SHIPMENTS), 300));

export function useShipments() {
  const { data, error, isLoading, mutate } = useSWR<Shipment[]>('/shipments', fetcher, {
    refreshInterval: REFRESH_INTERVAL_MS,
    dedupingInterval: REFRESH_INTERVAL_MS,
    revalidateOnFocus: true,
    focusThrottleInterval: REFRESH_INTERVAL_MS,
  });

  return {
    shipments: data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
}