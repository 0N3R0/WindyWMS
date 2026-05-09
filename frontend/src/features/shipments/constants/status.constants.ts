import { Truck, CheckCircle2, XCircle, Clock } from "lucide-react";
import type { ShipmentStatus } from "../types/shipments.types";

interface StatusVisualConfig {
  icon: React.ElementType;
  color: string;
  bgColor: string;
  lineColor: string;
  ringColor: string;
  label: string;
}

export const STATUS_VISUALS: Record<ShipmentStatus, StatusVisualConfig> = {
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
  },
};