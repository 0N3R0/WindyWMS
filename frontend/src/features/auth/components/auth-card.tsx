"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AuthForm } from "./auth-form";
import { useState } from "react";

export function AuthCard() {
  const pathname = usePathname();
  const [isLoginView, setIsLoginView] = useState(pathname === "/login");

  const handleSwitch = (view: "login" | "register") => {
    setIsLoginView(view === "login");
    window.history.pushState(null, "", `/${view}`);
  };

  const TABS = [
    { id: "login", label: "Zaloguj się", isMatch: isLoginView },
    { id: "register", label: "Zarejestruj się", isMatch: !isLoginView },
  ] as const;

  return (
    <div className="w-full max-w-sm space-y-6">

      {/* ─── Taby z płynnym sliding indicator ─── */}
      <div className="relative flex p-1 rounded-xl bg-white/3 border border-white/6">
        {/* Sliding background */}
        <div
          className="absolute inset-y-1 rounded-lg bg-violet-500/10 border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.08)] transition-all duration-500 ease-in-out"
          style={{
            width: 'calc(50% - 4px)',
            left: isLoginView ? '4px' : 'calc(50%)',
          }}
        />
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleSwitch(tab.id)}
            className={cn(
              "relative z-10 flex-1 py-2.5 text-center text-sm font-medium rounded-lg transition-colors duration-300",
              tab.isMatch ? "text-violet-400" : "text-violet-400/60 hover:text-violet-400 cursor-pointer"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── Karta z efektem "okienka" ─── */}
      <div className="rounded-xl border border-white/8 bg-white/2 backdrop-blur-sm shadow-2xl shadow-violet-500/5 relative overflow-hidden">
        {/* Gradient line na górze */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet-500/40 to-transparent" />

        {/* Sliding container — 200% szerokości karty */}
        <div
          className="flex w-[200%] transition-transform duration-500 ease-in-out"
          style={{ transform: isLoginView ? "translateX(0)" : "translateX(-50%)" }}
        >

          {/* Login — 50% kontenera = 100% karty */}
          <div className="w-1/2 p-8">
            <AuthForm mode="login" />
          </div>
          {/* Register — 50% kontenera = 100% karty */}
          <div className="w-1/2 p-8">
            <AuthForm mode="register" />
          </div>
        </div>
      </div>
    </div>
  );
}