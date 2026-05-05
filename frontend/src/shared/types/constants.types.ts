export interface AppConstants {
  auth: {
    jwtExpirationSeconds: number;
  };
  shipments: {
    cronSimulationIntervalSeconds: number;
    minWeight: number;
    maxWeight: number;
    availableStatuses: string[];
  };
}