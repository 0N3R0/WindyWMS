"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authService } from "@/features/auth/services/auth.service";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function verifyAuth() {
      const token = localStorage.getItem("access_token");

      // Brak tokenu -> natychmiast wyrzucamy na logowanie
      if (!token) {
        router.replace("/login");
        return;
      }

      // Weryfikacja tokenu na backendzie (czy nie wygasł lub czy nie został odwołany)
      const isValid = await authService.checkToken();

      if (!isValid) {
        localStorage.removeItem("access_token");
        router.replace("/login");
      } else {
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    }

    verifyAuth();
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground font-medium">Autoryzacja dostępu...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Zabezpieczenie przed błyśnięciem ekranu przed redirectem
  }

  return <>{children}</>;
}