export interface AppConstants {
  auth: {
    jwtExpirationSeconds: number;
    passwordMinLength: number;
    messages: {
      errors: {
        EMAIL_TAKEN: string;
        INVALID_CREDENTIALS: string;
        USER_NOT_FOUND: string;
        MISSING_TOKEN: string;
        INVALID_TOKEN: string;
      };
    };
  };
  shipments: {
    minWeight: number;
    maxWeight: number;
    availableStatuses: string[];
    sorting: {
      allowedFields: string[];
      defaultField: string;
      availableOrders: string[];
      defaultOrder: string;
    };
    config: {
      trackingNumberPrefix: string;
      cronSimulationIntervalSeconds: number;
    };
    messages: {
      events: {
        PENDING: string;
        CANCELLED: string;
        IN_TRANSIT: string;
        DELIVERED: string;
      };
      errors: {
        NOT_FOUND: string;
        CANNOT_CANCEL: string;
      };
    };
  };
  pagination: {
    defaultPage: number;
    defaultLimit: number;
    maxLimit: number;
  };
}
