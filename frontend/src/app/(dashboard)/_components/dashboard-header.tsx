"use client";

import Link from "next/link";
import { Package2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";

export function DashboardHeader() {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white/70 backdrop-blur-md px-6 shadow-sm">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 font-bold text-lg tracking-tight text-primary"
      >
        <Package2 className="h-6 w-6" />
        <span>
          Windy
          <span className="text-zinc-900">WMS</span>
          <span className="text-[.6rem] font-thin">&nbsp;DEMO</span>
        </span>
      </Link>

      <div className="ml-auto flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground mr-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          System Online
        </div>

        <Button variant="outline" size="sm" onClick={logout} className="gap-2">
          <LogOut className="h-4 w-4" />
          Wyloguj
        </Button>
      </div>
    </header>
  );
}