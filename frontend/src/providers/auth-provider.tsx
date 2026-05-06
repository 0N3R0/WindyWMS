"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { authService } from "@/features/auth/services/auth.service";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  setIsAuthenticated: (val: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoadingAuth: true,
  setIsAuthenticated: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoadingAuth(true);
      const token = Cookies.get("access_token");

      if (!token) {
        setIsAuthenticated(false);
        setIsLoadingAuth(false);
        return;
      }

      // Sprawdzamy na backendzie czy token jest ważny
      const isValid = await authService.checkToken();
      if (!isValid) {
        Cookies.remove("access_token");
        setIsAuthenticated(false);

        // Unikamy zbędnego przekierowania jeśli jesteśmy na stronie logowania
        if (!pathname.includes("/login")) {
          router.push("/login");
        }
      } else {
        setIsAuthenticated(true);
      }
      setIsLoadingAuth(false);
    };

    checkAuth();
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoadingAuth, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook do odczytywania globalnego stanu auth (używany tylko tam, gdzie potrzebujemy samego stanu)
export const useAuthContext = () => useContext(AuthContext);