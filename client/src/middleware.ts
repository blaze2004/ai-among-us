import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';
import { env } from './config/env';

export async function middleware(req: NextRequest) {
    const res=NextResponse.next()

    const session=await getToken({ req, secret: env.NEXTAUTH_SECRET });

    // if user is not signed in and the current path is not / redirect the user to /
    if (!session?.email&&(req.nextUrl.pathname!=="/")) {
        return NextResponse.redirect(new URL('/api/auth/signin?callback='+encodeURIComponent(req.nextUrl.pathname), req.url))
    }

    return res
}

export const config={
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api/ routes
         * 2. /_next/ (Next.js internals)
         * 3. /_proxy/ (special page for OG tags proxying)
         * 4. /_static (inside /public)
         * 5. /_vercel (Vercel internals)
         * 6. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt, etc.)
         */
        "/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};