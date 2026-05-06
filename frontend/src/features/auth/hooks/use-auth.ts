import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { authService } from "../services/auth.service";
import { AuthFormValues } from "../validators/auth.schema";
import { useAuthContext } from "@/providers/auth-provider";

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setIsAuthenticated } = useAuthContext();

  const login = async (data: AuthFormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await authService.login(data);
      Cookies.set("access_token", res.access_token, { expires: 7 }); // token wygasa po 7 dniach w cookie
      setIsAuthenticated(true);
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
      Cookies.set("access_token", res.access_token, { expires: 7 });
      setIsAuthenticated(true);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Błąd rejestracji");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("access_token");
    setIsAuthenticated(false);
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