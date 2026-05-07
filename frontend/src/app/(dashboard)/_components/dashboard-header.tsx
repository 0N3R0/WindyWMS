"use client";

import Link from "next/link";
import { Package2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";

export function DashboardHeader() {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/8 bg-white/2 backdrop-blur-md px-6 shadow-sm">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 font-bold text-lg tracking-tight text-white group"
      >
        <Package2 className="h-6 w-6 text-violet-400 group-hover:text-violet-300 transition-colors" />
        <span>
          Windy
          <span className="text-violet-300">WMS</span>
          <span className="text-[.6rem] font-extrabold text-violet-300/60">&nbsp;DEMO</span>
        </span>
      </Link>

      <div className="ml-auto flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-sm text-white/40 mr-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
          </span>
          System Online
        </div>

        <Button variant="outline" size="sm" onClick={logout} className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white transition-all">
          <LogOut className="h-4 w-4" />
          Wyloguj
        </Button>
      </div>
    </header>
  );
}