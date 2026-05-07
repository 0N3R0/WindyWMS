import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a12] px-6">
      <div className="text-center space-y-4 max-w-md">
        <p className="text-7xl font-bold font-heading text-violet-500">404</p>
        <h1 className="text-2xl font-bold tracking-tight text-violet-200">
          Nie znaleziono strony
        </h1>
        <p className="text-sm text-violet-200">
          Strona, której szukasz, nie istnieje lub została przeniesiona.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          Wróć do panelu
        </Link>
      </div>
    </div>
  );
}