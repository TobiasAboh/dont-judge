import { NextResponse } from 'next/server';

export function middleware(request) {
  const username = request.cookies.get('username');

  // Redirect to homepage if trying to access dashboard without cookie
  if (!username && request.nextUrl.pathname.startsWith('/user')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Apply middleware to only these paths
export const config = {
  matcher: ['/user/:path*'],
};
