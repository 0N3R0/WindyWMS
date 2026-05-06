"use client";

// Middleware w Next.js nie pozwala zalogowanym na wejście tutaj
// Pass-through

export function GuestRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}