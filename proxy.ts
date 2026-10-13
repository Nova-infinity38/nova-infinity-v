import { type NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protection des routes réservées au Dashboard
  if (pathname.startsWith('/dashboard')) {
    const authCookie = 
      request.cookies.get('sb-access-token') || 
      request.cookies.get('supabase-auth-token') ||
      request.cookies.get('next-auth.session-token');

    if (!authCookie) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};