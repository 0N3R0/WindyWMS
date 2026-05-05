"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/features/auth/services/auth.service";
import { Loader2 } from "lucide-react";

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    async function checkGuest() {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setIsChecking(false);
        return;
      }

      // Jeśli mamy token, upewnijmy się że jest ważny, zanim wyrzucimy gościa na dashboard
      const isValid = await authService.checkToken();
      if (isValid) {
        router.replace("/dashboard");
      } else {
        localStorage.removeItem("access_token");
        setIsChecking(false);
      }
    }

    checkGuest();
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}