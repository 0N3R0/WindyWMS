import axios from "axios";

const DEFAULT_ERROR_MESSAGE = "An unexpected error occurred.";

/**
 * Extracts a human-readable error message from an Axios error response.
 * Falls back to a provided message or a generic default.
 */
export function getApiErrorMessage(error: unknown, fallback?: string): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || fallback || DEFAULT_ERROR_MESSAGE;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback || DEFAULT_ERROR_MESSAGE;
}