"use client";

// Middleware w Next.js zajmuje się główną blokadą dostępu do chronionych ścieżek
// Ten komponent na razie pozostawiamy jako "pass-through", w następnym kroku zintegrujemy w nim globalny AuthProvider

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}