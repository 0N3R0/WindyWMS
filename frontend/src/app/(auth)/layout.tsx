import { GuestRoute } from "@/providers/guest-route";
import { AuthCard } from "@/features/auth/components/auth-card";
import { AuthBackground } from "@/features/auth/components/auth-background";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestRoute>
      <div className="dark min-h-screen flex bg-[#0a0a12] overflow-hidden">
        {/* ─── LEWA STRONA: Formularz ─── */}
        <div className="flex-1 flex items-center justify-center p-8">
          <AuthCard />
          <div className="hidden">{children}</div>
        </div>

        {/* ─── PRAWA STRONA: Branding + Pattern ─── */}
        <AuthBackground />
      </div>
    </GuestRoute>
  );
}