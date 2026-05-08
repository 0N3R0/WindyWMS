import { AUTH_CONSTANTS } from './auth/constants/auth.constants';
import { SHIPMENT_CONSTANTS, SHIPMENT_CRON_EXPRESSIONS } from './shipments/constants/shipments.constants';
import { PAGINATION_CONSTANTS } from './common/constants/pagination.constants';

export const APP_CONSTANTS = {
  auth: AUTH_CONSTANTS,
  shipments: SHIPMENT_CONSTANTS,
  pagination: PAGINATION_CONSTANTS,
} as const;

export const CRON_EXPRESSIONS = {
  ...SHIPMENT_CRON_EXPRESSIONS,
} as const;