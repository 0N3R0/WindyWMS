import { ProtectedRoute } from "@/providers/protected-route";
import { DashboardHeader } from "./_components/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-6xl w-full">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}