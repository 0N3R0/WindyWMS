"use client";

import { ShipmentEvent, ShipmentStatus } from "../types/shipments.types";
import { Truck, CheckCircle2, XCircle, Clock } from "lucide-react";
import { formatDate } from '../../../lib/utils';

interface ShipmentTimelineProps {
  events: ShipmentEvent[];
  currentStatus: ShipmentStatus;
}

// Konfiguracja wizualna dla każdego statusu
const statusVisuals: Record<ShipmentStatus, {
  icon: React.ElementType;
  color: string;
  bgColor: string;
  lineColor: string;
  ringColor: string;
  label: string;
}> = {
  PENDING: {
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    lineColor: "bg-amber-300",
    ringColor: "ring-amber-300",
    label: "Zarejestrowana",
  },
  IN_TRANSIT: {
    icon: Truck,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    lineColor: "bg-blue-300",
    ringColor: "ring-blue-300",
    label: "W drodze",
  },
  DELIVERED: {
    icon: CheckCircle2,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    lineColor: "bg-emerald-300",
    ringColor: "ring-emerald-300",
    label: "Dostarczona",
  },
  CANCELLED: {
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-100",
    lineColor: "bg-red-300",
    ringColor: "ring-red-300",
    label: "Anulowana",
  }
};

export function ShipmentTimeline({ events, currentStatus }: ShipmentTimelineProps) {
  // Sortujemy chronologicznie (najstarsze na górze, najnowsze na dole)
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="relative pl-2">
      {sortedEvents.map((event, index) => {
        const visual = statusVisuals[event.status];
        const Icon = visual.icon;
        const isLast = index === sortedEvents.length - 1;

        return (
          <div key={event.id} className="relative flex gap-4 pb-8 last:pb-0">
            {/* Linia łącząca węzły */}
            {!isLast && (
              <div
                className={`absolute left-[15px] top-[32px] w-0.5 h-[calc(100%-16px)] ${visual.lineColor}`}
              />
            )}

            {/* Węzeł (ikona statusu) */}
            <div
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${visual.bgColor} ${isLast ? `ring-2 ring-offset-2 ring-offset-white ${visual.ringColor}` : ""}`}
            >
              <Icon className={`h-4 w-4 ${visual.color}`} />
            </div>

            {/* Treść wydarzenia */}
            <div className="flex flex-col gap-0.5 pt-0.5">
              <span className={`text-sm font-semibold ${visual.color}`}>
                {visual.label}
              </span>
              {event.description && (
                <span className="text-sm text-muted-foreground">
                  {event.description}
                </span>
              )}
              <span className="text-xs text-muted-foreground/60">
                {formatDate(event.createdAt, { month: 'long' })}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}