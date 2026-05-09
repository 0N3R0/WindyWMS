import { AuthBackground } from "@/features/auth/components/auth-background";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark min-h-screen flex bg-[#0a0a12] overflow-hidden">
      <div className="flex-1 flex items-center justify-center p-8">
        {children}
      </div>

      <AuthBackground />
    </div>
  );
}