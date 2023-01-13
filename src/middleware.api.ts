import { NextRequest, NextResponse } from 'next/server';
import { includes } from "lodash";

const isAdminRoute = (pathname: string) => {
    return pathname.startsWith('/api/users');
}

const isUserRoute = (pathname: string) => {
    return pathname.startsWith('/api/products');
}

export async function middleware(req: NextRequest) {
  const token = req.headers.get("authorization");
  const { pathname } = req.nextUrl;

  // if (!token) {
  //   return NextResponse.redirect(new URL('/api/unauthorized', req.url));
  // }

  return NextResponse.next();
}

export const config = {
    matcher: ['/api/users/:path*', '/api/products/:path*']
};