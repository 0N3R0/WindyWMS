"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export function AuthCard() {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <div className="w-full max-w-sm space-y-6">

      {/* ─── Taby z płynnym sliding indicator ─── */}
      <div className="relative flex p-1 rounded-xl bg-white/3 border border-white/6">
        {/* Sliding background */}
        <div
          className="absolute inset-y-1 rounded-lg bg-violet-500/10 border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.08)] transition-all duration-500 ease-in-out"
          style={{
            width: 'calc(50% - 4px)',
            left: isLogin ? '4px' : 'calc(50%)',
          }}
        />

        <Link
          href="/login"
          className={cn(
            "relative z-10 flex-1 py-2.5 text-center text-sm font-medium rounded-lg transition-colors duration-300",
            isLogin ? "text-violet-300" : "text-white/40 hover:text-white/60"
          )}
        >
          Zaloguj się
        </Link>
        <Link
          href="/register"
          className={cn(
            "relative z-10 flex-1 py-2.5 text-center text-sm font-medium rounded-lg transition-colors duration-300",
            !isLogin ? "text-violet-300" : "text-white/40 hover:text-white/60"
          )}
        >
          Zarejestruj się
        </Link>
      </div>

      {/* ─── Karta z efektem "okienka" ─── */}
      <div className="rounded-xl border border-white/8 bg-white/2 backdrop-blur-sm shadow-2xl shadow-violet-500/5 relative overflow-hidden">
        {/* Gradient line na górze */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet-500/40 to-transparent" />

        {/* Sliding container — 200% szerokości karty */}
        <div
          className="flex w-[200%] transition-transform duration-500 ease-in-out"
          style={{ transform: isLogin ? "translateX(0)" : "translateX(-50%)" }}
        >
          {/* Login — 50% kontenera = 100% karty */}
          <div className="w-1/2 p-8">
            <LoginForm />
          </div>
          {/* Register — 50% kontenera = 100% karty */}
          <div className="w-1/2 p-8">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}