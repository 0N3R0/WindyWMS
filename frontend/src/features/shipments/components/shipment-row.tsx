"use client";

import { useState, useEffect, useRef } from "react";
import useSWR from "swr";

import { Shipment, ShipmentDetails, ShipmentStatus } from "../types/shipments.types";
import { shipmentsService } from "../services/shipments.service";
import { ShipmentTimeline } from "./shipment-timeline";
import { ConfirmDialog } from "./confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Ban, Trash2, Loader2 } from "lucide-react";
import { GRID_COLS } from "./shipments-table";
import { formatDate } from "../../../lib/utils";

interface ShipmentRowProps {
  shipment: Shipment;
  onMutate: () => void;  // Callback do odświeżenia listy po akcji
}

const statusConfig: Record<ShipmentStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  PENDING: { label: "Oczekuje", variant: "secondary" },
  IN_TRANSIT: { label: "W drodze", variant: "default" },
  DELIVERED: { label: "Dostarczona", variant: "outline" },
  CANCELLED: { label: "Anulowana", variant: "destructive" },
};

export function ShipmentRow({ shipment, onMutate }: ShipmentRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isActioning, setIsActioning] = useState(false);
  const prevStatusRef = useRef(shipment.status);

  // Fetch details only when the panel is expanded (conditional fetching)
  const { data: details, mutate: refreshDetails } = useSWR<ShipmentDetails>(
    isOpen ? `/shipments/${shipment.trackingNumber}` : null,
    () => shipmentsService.getDetails(shipment.trackingNumber),
    {
      dedupingInterval: 15_000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      keepPreviousData: true
    }
  );

  // Gdy lista nadrzędna (polling 15s) wykryje zmianę statusu, odświeżamy timeline
  useEffect(() => {
    if (prevStatusRef.current !== shipment.status && isOpen) {
      refreshDetails();
    }
    prevStatusRef.current = shipment.status;
  }, [shipment.status, isOpen, refreshDetails]);

  const canCancel = shipment.status === "PENDING";
  const canDelete = shipment.status === "CANCELLED" || shipment.status === "DELIVERED";

  const handleCancel = async () => {
    setIsActioning(true);
    try {
      await shipmentsService.cancel(shipment.trackingNumber);
      await refreshDetails();  // Odśwież szczegóły (timeline)
      onMutate();              // Odśwież listę (status w tabeli)
    } catch (err) {
      console.error("Błąd anulowania:", err);
    } finally {
      setIsActioning(false);
    }
  };

  const handleDelete = async () => {
    setIsActioning(true);
    try {
      await shipmentsService.remove(shipment.trackingNumber);
      onMutate(); // Odśwież listę (wiersz zniknie)
    } catch (err) {
      console.error("Błąd usuwania:", err);
    } finally {
      setIsActioning(false);
    }
  };

  return (
    <div className="border-b last:border-b-0">
      {/* Wiersz danych — ten sam grid co nagłówek */}
      <div
        className={`grid ${GRID_COLS} gap-4 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors items-center text-white/90`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium font-mono text-sm truncate">
          {shipment.trackingNumber}
        </div>
        <div className="text-sm truncate">
          {shipment.recipient}
        </div>
        <div className="text-sm text-right">
          {shipment.weight.toFixed(2)}
        </div>
        <div className="text-right">
          <Badge variant={statusConfig[shipment.status].variant}>
            {statusConfig[shipment.status].label}
          </Badge>
        </div>
        <div className="text-sm text-right text-white/60">
          {formatDate(shipment.updatedAt)}
        </div>
        <div className="flex justify-center">
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Rozwijany panel — animacja grid-template-rows na ZWYKŁYM DIVIE */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-6 py-5 space-y-4 bg-black/20 border-t border-white/8">
            {/* Sekcja: Oś czasu */}
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                Droga przesyłki
              </h4>
              {details ? (
                <ShipmentTimeline
                  events={details.events}
                  currentStatus={details.status}
                />
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[200px] text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="mt-3 text-sm font-medium">Ładowanie historii...</p>
                </div>
              )}
            </div>

            <Separator />

            {/* Sekcja: Akcje */}
            <div className="flex items-center gap-3">
              {/* Przycisk Anuluj */}
              {canCancel ? (
                <ConfirmDialog
                  trigger={
                    <Button variant="outline" size="sm" className="gap-2" disabled={isActioning}>
                      <Ban className="h-4 w-4" />
                      Anuluj przesyłkę
                    </Button>
                  }
                  title="Anulować przesyłkę?"
                  description={`Czy na pewno chcesz anulować przesyłkę ${shipment.trackingNumber}? Tej operacji nie można cofnąć.`}
                  confirmLabel="Tak, anuluj"
                  variant="destructive"
                  onConfirm={handleCancel}
                />
              ) : (
                <Button variant="outline" size="sm" className="gap-2" disabled>
                  <Ban className="h-4 w-4" />
                  {shipment.status === "CANCELLED"
                    ? "Już anulowana"
                    : shipment.status === "DELIVERED"
                      ? "Już dostarczona"
                      : "Nie można anulować (w drodze)"
                  }
                </Button>
              )}

              {/* Przycisk Usuń */}
              {canDelete ? (
                <ConfirmDialog
                  trigger={
                    <Button variant="destructive" size="sm" className="gap-2" disabled={isActioning}>
                      <Trash2 className="h-4 w-4" />
                      Usuń przesyłkę
                    </Button>
                  }
                  title="Usunąć przesyłkę na zawsze?"
                  description={`Przesyłka ${shipment.trackingNumber} zostanie trwale usunięta z systemu wraz z całą historią zdarzeń. Tej operacji nie można cofnąć.`}
                  confirmLabel="Tak, usuń"
                  variant="destructive"
                  onConfirm={handleDelete}
                />
              ) : (
                <Button variant="destructive" size="sm" className="gap-2" disabled>
                  <Trash2 className="h-4 w-4" />
                  Usuń (niedostępne)
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}