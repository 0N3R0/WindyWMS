"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShipmentsTable } from "@/features/shipments/components/shipments-table";
import { CreateShipmentForm } from "@/features/shipments/components/create-shipment-form";
import { ShipmentsPagination } from "@/features/shipments/components/shipments-pagination";
import { useShipments } from "@/features/shipments/hooks/use-shipments";

export default function DashboardPage() {
  const { shipments, isLoading, isPageTransitioning, isError, refresh, pagination } = useShipments();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Panel Dyspozytora</h1>
        <p className="text-white/40 mt-2">
          Zarządzaj statusem paczek i śledź ich drogę na żywo.
        </p>
      </div>

      <CreateShipmentForm />

      <Card className="py-0 gap-0">
        <CardHeader className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tabela Przesyłek</CardTitle>
              <CardDescription>Pełne zestawienie paczek aktualnie procesowanych w Twoim oddziale.</CardDescription>
            </div>
            <ShipmentsPagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              limit={pagination.limit}
              hasNextPage={pagination.hasNextPage}
              hasPrevPage={pagination.hasPrevPage}
              onPageChange={pagination.goToPage}
              onNextPage={pagination.nextPage}
              onPrevPage={pagination.prevPage}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ShipmentsTable
            shipments={shipments}
            isLoading={isLoading}
            isPageTransitioning={isPageTransitioning}
            isError={isError}
            onMutate={refresh}
          />
        </CardContent>
      </Card>
    </div>
  );
}