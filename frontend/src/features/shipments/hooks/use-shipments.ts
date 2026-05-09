import { useState, useCallback, useMemo } from 'react';
import useSWR from 'swr';
import { AllShipments, ShipmentQueryParams } from '../types/shipments.types';
import { shipmentsService } from '../services/shipments.service';

const REFRESH_INTERVAL_MS = 15_000;
const DEFAULT_PAGE_SIZE = 10;

export function useShipments() {
  const [page, setPage] = useState(1);

  // SWR key contains query params — page change = new cache entry
  const queryParams: ShipmentQueryParams = useMemo(
    () => ({ page, limit: DEFAULT_PAGE_SIZE }),
    [page]
  );

  // Serialize params into a stable SWR key
  const swrKey = useMemo(
    () => `/shipments?${new URLSearchParams(
      Object.entries(queryParams)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    ).toString()}`,
    [queryParams]
  );

  const { data, error, isLoading, isValidating, mutate } = useSWR<AllShipments>(
    swrKey,
    () => shipmentsService.getAll(queryParams),
    {
      refreshInterval: REFRESH_INTERVAL_MS,
      dedupingInterval: REFRESH_INTERVAL_MS,
      revalidateOnFocus: true,
      focusThrottleInterval: REFRESH_INTERVAL_MS,
      keepPreviousData: true, // Smooth transitions — old data shown while loading new page
    }
  );

  const goToPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const nextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(1, prev - 1));
  }, []);

  return {
    shipments: data,
    isLoading: isLoading && !data, // true ONLY on initial load (no data at all)
    isPageTransitioning: isValidating && !!data, // true when fetching new page with old data visible
    isError: error,
    refresh: mutate,
    pagination: {
      page,
      totalPages: data?.meta.totalPages ?? 1,
      total: data?.meta.total ?? 0,
      limit: data?.meta.limit ?? DEFAULT_PAGE_SIZE,
      goToPage,
      nextPage,
      prevPage,
      hasNextPage: page < (data?.meta.totalPages ?? 1),
      hasPrevPage: page > 1,
    },
  };
}