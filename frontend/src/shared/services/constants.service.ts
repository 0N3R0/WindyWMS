import { apiClient } from "@/shared/api/api-client";
import { AppConstants } from "@/shared/types/constants.types";

export const constantsService = {
  async getAll(): Promise<AppConstants> {
    const response = await apiClient.get<AppConstants>('/constants');
    return response.data;
  },
};