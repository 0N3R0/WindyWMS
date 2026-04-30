export const APP_CONSTANTS = {
  auth: {
    jwtExpirationSeconds: 12 * 60 * 60,
  },
  shipments: {
    cronSimulationIntervalSeconds: 60,
    minWeight: 0.1,
    maxWeight: 1000,
    availableStatuses: ['PENDING', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED']
  }
};

export const CRON_EXPRESSIONS = {
  COURIER_MOVEMENT: '0 * * * * *',
};
