import Image from "next/image";
import Link from "next/link";
import { AuthBackground } from "@/features/auth/components/auth-background";

export default function Home() {
  return (
    <div className="dark min-h-screen flex bg-[#0a0a12] overflow-hidden relative">
      {/* ─── Tło tematyczne ─── */}
      <AuthBackground />

      {/* ─── Główna zawartość ─── */}
      <main className="flex-1 flex items-center justify-center p-6 z-10 animate-auth-fade-in">
        <div className="w-full max-w-2xl">
          <div className="rounded-2xl border border-white/8 bg-white/2 backdrop-blur-md shadow-2xl shadow-violet-500/5 relative overflow-hidden p-8 md:p-12">
            {/* Neon Line na górze */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet-500/40 to-transparent" />

            <div className="flex flex-col items-center gap-10 text-center sm:items-start sm:text-left">
              <div className="relative group">
                <Image
                  className="dark:invert opacity-90 transition-transform duration-500 group-hover:scale-105"
                  src="/next.svg"
                  alt="Next.js logo"
                  width={140}
                  height={28}
                  priority
                />
                <div className="absolute -inset-4 bg-violet-500/10 blur-xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl font-heading font-bold tracking-tight text-white sm:text-6xl">
                  Witaj w <span className="text-violet-400 drop-shadow-[0_0_15px_rgba(167,139,250,0.3)]">WindyWMS</span>
                </h1>
                <p className="max-w-md text-lg leading-relaxed text-white/50 font-medium">
                  Inteligentny system zarządzania magazynem.
                  Zautomatyzuj logistykę i przejmij pełną kontrolę nad łańcuchem dostaw.
                </p>
              </div>

              <div className="flex flex-col gap-4 w-full sm:flex-row mt-4">
                <Link
                  href="/login"
                  className="flex h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-8 text-base font-bold text-white transition-all duration-300 hover:bg-violet-500 hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] active:scale-[0.98]"
                >
                  Zaloguj się
                </Link>
                <Link
                  href="/register"
                  className="flex h-14 flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 text-base font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20 active:scale-[0.98]"
                >
                  Rejestracja
                </Link>
              </div>

              <div className="pt-8 border-t border-white/5 w-full flex items-center justify-between text-white/30 text-xs font-medium uppercase tracking-widest">
                <span>Wersja 2.0.0-beta</span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  System Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
