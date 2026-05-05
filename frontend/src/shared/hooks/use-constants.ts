import useSWRImmutable from 'swr/immutable';
import { apiClient } from '@/shared/api/api-client';
import { AppConstants } from '@/shared/types/constants.types';

const fetcher = (url: string) => apiClient.get(url).then(res => res.data);

export function useConstants() {
  const { data, error, isLoading } = useSWRImmutable<AppConstants>('/constants', fetcher);

  return {
    constants: data,
    isLoading,
    isError: error,
  };
}