import { Loader2, Package } from "lucide-react";
import { ShipmentRow } from "./shipment-row";
import { AllShipments } from "../types/shipments.types";

// Shared grid definition - aligns header with rows
export const GRID_COLS = "grid-cols-[1fr_1fr_100px_120px_140px_40px]";

// Table column definitions - single source of truth for headers
const TABLE_COLUMNS = [
  { label: "Numer Trackingowy", align: "text-left" },
  { label: "Odbiorca", align: "text-left" },
  { label: "Waga (kg)", align: "text-right" },
  { label: "Status", align: "text-right" },
  { label: "Zaktualizowano", align: "text-right" },
] as const;

interface ShipmentsTableProps {
  shipments: AllShipments | undefined;
  isLoading: boolean;
  isPageTransitioning: boolean;
  isError: boolean;
  onMutate: () => void;
}

export function ShipmentsTable({
  shipments,
  isLoading,
  isPageTransitioning,
  isError,
  onMutate,
}: ShipmentsTableProps) {
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
    <div className="border border-white/8 overflow-hidden bg-white/2">
      {/* Column headers */}
      <div className={`grid ${GRID_COLS} gap-4 px-4 py-3 bg-white/3 border-b border-white/8`}>
        {TABLE_COLUMNS.map((col) => (
          <div key={col.label} className={`text-sm font-semibold text-white/70 ${col.align}`}>
            {col.label}
          </div>
        ))}
      </div>

      {/* Data rows - subtle opacity during page transition */}
      <div className={`transition-opacity duration-200 ${isPageTransitioning ? "opacity-60" : ""}`}>
        {shipments?.data.map((shipment) => (
          <ShipmentRow
            key={shipment.trackingNumber}
            shipment={shipment}
            onMutate={onMutate}
          />
        ))}
      </div>
    </div>
  );
}