import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Definiujemy ścieżki chronione oraz ścieżki tylko dla gości
const protectedRoutes = ['/dashboard'];
const guestRoutes = ['/login', '/register', '/'];

export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  // Sprawdzamy czy obecna ścieżka to ścieżka dla gości (strona logowania/rejestracji itp.)
  const isGuestRoute = guestRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`) && route !== '/');

  // Sprawdzamy czy obecna ścieżka to ścieżka chroniona
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // 1. Użytkownik ma token i próbuje wejść na login/rejestrację -> Przekieruj na dashboard
  if (isGuestRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. Użytkownik nie ma tokenu i próbuje wejść na dashboard -> Przekieruj na login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. W każdym innym przypadku pozwól wejść
  return NextResponse.next();
}

export const config = {
  // Określamy dla jakich ścieżek uruchamia się proxy (ignorujemy static files, api, images itp.)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};