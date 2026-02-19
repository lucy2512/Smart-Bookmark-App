import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // detect supabase auth cookie
    const hasSession = request.cookies.getAll().some((cookie) =>
        cookie.name.startsWith("sb-") &&
        cookie.name.endsWith("-auth-token")
    );

    const { pathname } = request.nextUrl;

    const isLoginPage = pathname === "/";
    const isDashboardPage = pathname.startsWith("/dashboard");

    // ❌ not logged in → block dashboard
    if (!hasSession && isDashboardPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // ❌ logged in → block login page
    if (hasSession && isLoginPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/dashboard/:path*"],
};