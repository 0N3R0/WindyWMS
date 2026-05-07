import { ProtectedRoute } from "@/providers/protected-route";
import { DashboardHeader } from "./_components/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      {/* Dodana klasa dark, mroczne tło oraz relative dla absolutnej siatki */}
      <div className="dark min-h-screen flex flex-col bg-[#0a0a12] relative overflow-hidden">

        {/* Współdzielona animowana siatka logistyczna tła */}
        <div
          className="absolute inset-0 opacity-[0.03] animate-grid-drift pointer-events-none"
          style={{
            backgroundImage: `
            linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)
          `,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Dodatkowy glow dla głębi */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

        <DashboardHeader />
        <main className="flex-1 p-6 md:p-8 relative z-10">
          <div className="mx-auto max-w-6xl w-full">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}