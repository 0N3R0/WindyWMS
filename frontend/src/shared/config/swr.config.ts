import type { SWRConfiguration } from "swr";

/** Default polling interval for data that auto-refreshes (ms) */
export const SWR_REFRESH_INTERVAL_MS = 15_000;

/** Default page size for paginated queries */
export const DEFAULT_PAGE_SIZE = 10;

/**
 * Shared SWR configuration for polling-based hooks.
 * Keeps all timing-related options in a single source of truth.
 */
export const SWR_POLLING_CONFIG: SWRConfiguration = {
  refreshInterval: SWR_REFRESH_INTERVAL_MS,
  dedupingInterval: SWR_REFRESH_INTERVAL_MS,
  revalidateOnFocus: true,
  focusThrottleInterval: SWR_REFRESH_INTERVAL_MS,
  keepPreviousData: true,
};

/**
 * Shared SWR configuration for on-demand fetches (expanded panels, modals).
 * No automatic polling — data is fetched once and deduped.
 */
export const SWR_ON_DEMAND_CONFIG: SWRConfiguration = {
  dedupingInterval: SWR_REFRESH_INTERVAL_MS,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  keepPreviousData: true,
};