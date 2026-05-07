"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6">
      <div className="text-center space-y-4 max-w-md">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-7 w-7 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          Coś poszło nie tak
        </h1>
        <p className="text-muted-foreground text-sm">
          Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę lub wróć do
          panelu głównego.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <Button onClick={reset} variant="outline">
            Spróbuj ponownie
          </Button>
          <Button onClick={() => (window.location.href = "/dashboard")}>
            Wróć do panelu
          </Button>
        </div>
      </div>
    </div>
  );
}