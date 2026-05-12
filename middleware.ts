// Users/jaydenosafo/Phone_Screening_Platform/middleware.ts

import { RECRUITER_SESSION_COOKIE } from '@/lib/recruiterSession';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get(RECRUITER_SESSION_COOKIE)?.value;

  if (session !== '1') {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/';
    const destination = `${request.nextUrl.pathname}${request.nextUrl.search}`;
    loginUrl.searchParams.set('next', destination);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/jobs', '/jobs/:path*'],
};
