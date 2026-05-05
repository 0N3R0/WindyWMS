import { apiClient } from "@/shared/api/api-client";
import { AuthFormValues } from "../validators/auth.schema";
import { AuthResponse, IsValidResponse } from "../types/auth.types";

export const authService = {
  async login(data: AuthFormValues): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: AuthFormValues): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async checkToken(): Promise<boolean> {
    try {
      const response = await apiClient.get<IsValidResponse>('/auth/isValid');
      return response.data.valid;
    } catch {
      return false;
    }
  }
};