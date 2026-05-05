import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import { AuthFormValues } from "../validators/auth.schema";

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: AuthFormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await authService.login(data);
      localStorage.setItem("access_token", res.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Błąd logowania");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: AuthFormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await authService.register(data);
      localStorage.setItem("access_token", res.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Błąd rejestracji");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    router.push("/login");
  };

  return {
    login,
    register,
    logout,
    isLoading,
    error
  };
}