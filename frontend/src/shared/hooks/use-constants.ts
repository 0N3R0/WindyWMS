import useSWRImmutable from 'swr/immutable';
import { AppConstants } from '@/shared/types/constants.types';
import { constantsService } from '@/shared/services/constants.service';

export function useConstants() {
  const { data, error, isLoading } = useSWRImmutable<AppConstants>(
    '/constants',
    () => constantsService.getAll()
  );

  return {
    constants: data,
    isLoading,
    isError: error,
  };
}