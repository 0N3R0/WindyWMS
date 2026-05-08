import { ShipmentStatus } from '../enums/shipments.enums';

export const SHIPMENT_CONSTANTS = {
  minWeight: 0.1,
  maxWeight: 1000,
  availableStatuses: Object.values(ShipmentStatus),

  sorting: {
    allowedFields: ['createdAt', 'updatedAt', 'weight', 'recipient', 'status', 'trackingNumber'],
    defaultField: 'createdAt',
    availableOrders: ['asc', 'desc'],
    defaultOrder: 'desc'
  },

  config: {
    trackingNumberPrefix: 'WMS-',
    cronSimulationIntervalSeconds: 3600,
  },

  messages: {
    events: {
      PENDING: 'Paczka została utworzona i zarejestrowana w systemie WMS',
      CANCELLED: 'Przesyłka została anulowana przez klienta',
      IN_TRANSIT: 'Paczka opuściła magazyn główny',
      DELIVERED: 'Paczka została doręczona do odbiorcy',
    },
    errors: {
      NOT_FOUND: 'Nie znaleziono przesyłki lub nie masz do niej dostępu',
      CANNOT_CANCEL: 'Nie można anulować paczki, która jest już w drodze lub została dostarczona',
    },
  },
} as const;

export const SHIPMENT_CRON_EXPRESSIONS = {
  COURIER_MOVEMENT: '0 0 * * * *',
} as const;