"use client";

import { ProtectedRoute } from "@/providers/protected-route";
import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/use-auth"; // <--- Import hooka
import { Button } from "@/components/ui/button";
import { Package2, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white/70 backdrop-blur-md px-6 shadow-sm">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-bold text-lg tracking-tight text-primary"
          >
            <Package2 className="h-6 w-6" />
            <span>
              Windy
              <span className="text-zinc-900">WMS</span>
              <span className="text-[.5rem] font-thin">&nbsp;DEMO</span>
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

            {/* Przycisk wylogowania używa metody z naszego hooka */}
            <Button variant="outline" size="sm" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Wyloguj
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-6xl w-full">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}