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

  if (shipments.length === 0) {
    return (
      <div className="flex flex-col h-48 items-center justify-center text-muted-foreground">
        <Package className="h-10 w-10 mb-4 opacity-20" />
        <p>Brak przesyłek w systemie.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      {/* Nagłówek — ten sam grid co wiersze */}
      <div className={`grid ${GRID_COLS} gap-4 px-4 py-3 bg-slate-50 border-b`}>
        <div className="text-sm font-semibold">Numer Trackingowy</div>
        <div className="text-sm font-semibold">Odbiorca</div>
        <div className="text-sm font-semibold text-right">Waga (kg)</div>
        <div className="text-sm font-semibold text-right">Status</div>
        <div className="flex justify-center">
          <ChevronDown className="h-4 w-4 text-slate-950" />
        </div>
      </div>

      {/* Ciało — lista wierszy */}
      <div>
        {shipments.map((shipment) => (
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