"use client";

import { useShipments } from "../hooks/use-shipments";
import { Loader2, Package, ChevronDown } from "lucide-react";
import { ShipmentRow } from "./shipment-row";

// Współdzielona definicja kolumn — gwarantuje wyrównanie nagłówka z wierszami.
// Nagłówek i ShipmentRow importują tę samą stałą — zmiana w jednym miejscu
// automatycznie aktualizuje oba.
export const GRID_COLS = "grid-cols-[1fr_1fr_100px_120px_40px]";

export function ShipmentsTable() {
  const { shipments, isLoading, isError, refresh } = useShipments();

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return <div className="p-4 text-red-500 bg-red-50 rounded-md">Wystąpił błąd pobierania danych.</div>;
  }

  if (shipments?.data.length === 0) {
    return (
      <div className="flex flex-col h-48 items-center justify-center text-muted-foreground">
        <Package className="h-10 w-10 mb-4 opacity-20" />
        <p>Brak przesyłek w systemie.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-white/8 overflow-hidden bg-white/2">
      {/* Nagłówek — ten sam grid co wiersze */}
      <div className={`grid ${GRID_COLS} gap-4 px-4 py-3 bg-white/3 border-b border-white/8`}>
        <div className="text-sm font-semibold text-white/70">Numer Trackingowy</div>
        <div className="text-sm font-semibold text-white/70">Odbiorca</div>
        <div className="text-sm font-semibold text-right text-white/70">Waga (kg)</div>
        <div className="text-sm font-semibold text-right text-white/70">Status</div>
      </div>

      {/* Ciało — lista wierszy */}
      <div>
        {shipments?.data.map((shipment) => (
          <ShipmentRow
            key={shipment.trackingNumber}
            shipment={shipment}
            onMutate={refresh}
          />
        ))}
      </div>
    </div>
  );
}