import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShipmentsTable } from "@/features/shipments/components/shipments-table";
import { CreateShipmentForm } from "@/features/shipments/components/create-shipment-form";

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Panel Dyspozytora</h1>
        <p className="text-muted-foreground mt-2">
          Zarządzaj statusem paczek i śledź ich drogę na żywo.
        </p>
      </div>

      <CreateShipmentForm />

      <Card className="shadow-sm border-slate-200 py-0 gap-0">
        <CardHeader className="bg-slate-50/50 border-b px-4 py-4">
          <CardTitle>Tabela Przesyłek</CardTitle>
          <CardDescription>Pełne zestawienie paczek aktualnie procesowanych w Twoim oddziale.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ShipmentsTable />
        </CardContent>
      </Card>
    </div>
  );
}