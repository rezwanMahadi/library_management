import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const authRole = request.cookies.get('role');
  const protectedPaths = ['/dashboard', '/admin', '/librarian']; // Define paths that require authentication

  // Check if the current path is a protected path
  if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    // If no auth token is found, redirect to the login page
    if (!authRole) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    if (authRole?.value === 'admin' && request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    else if (authRole?.value === 'librarian' && request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/librarian', request.url));
    }
    else if (authRole?.value === 'student' && request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/student', request.url));
    }
  }

  // Allow the request to proceed if authenticated or if the path is not protected
  return NextResponse.next();
}

// Optionally, configure which paths the middleware should apply to
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/librarian/:path*', '/student/:path*'], // Apply middleware to all sub-paths of /dashboard and /profile
};