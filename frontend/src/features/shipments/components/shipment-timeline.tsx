"use client";

import { useMemo } from "react";
import { ShipmentEvent, ShipmentStatus } from "../types/shipments.types";
import { STATUS_VISUALS } from "../constants/status.constants";
import { formatDate } from "@/lib/utils";

interface ShipmentTimelineProps {
  events: ShipmentEvent[];
  currentStatus: ShipmentStatus;
}

export function ShipmentTimeline({ events, currentStatus }: ShipmentTimelineProps) {
  // Memoized chronological sort - recalculates only when events change
  const sortedEvents = useMemo(
    () => [...events].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    ),
    [events]
  );

  return (
    <div className="relative pl-2">
      {sortedEvents.map((event, index) => {
        const visual = STATUS_VISUALS[event.status];
        const Icon = visual.icon;
        const isLast = index === sortedEvents.length - 1;

        return (
          <div key={event.id} className="relative flex gap-4 pb-8 last:pb-0">
            {/* Connecting line between nodes */}
            {!isLast && (
              <div
                className={`absolute left-[15px] top-[32px] w-0.5 h-[calc(100%-16px)] ${visual.lineColor}`}
              />
            )}

            {/* Status icon node */}
            <div
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${visual.bgColor} ${isLast ? `ring-2 ring-offset-2 ring-offset-white ${visual.ringColor}` : ""}`}
            >
              <Icon className={`h-4 w-4 ${visual.color}`} />
            </div>

            {/* Event content */}
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