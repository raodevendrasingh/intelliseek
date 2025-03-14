import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "@/lib/auth";

if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_BASE_URL environment variable");
}

const privateRoutes = ["/chat/*", "/settings/*"];

const authRoutes = ["/login", "/register", "/verify"];

export async function middleware(request: NextRequest) {
    const { data: session } = await betterFetch<Session>("/api/auth/session", {
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
            cookie: request.headers.get("cookie") || "",
        },
    });

    const pathName = request.nextUrl.pathname;

    const isAuthRoute = authRoutes.includes(pathName);
    const isPrivateRoute = privateRoutes.some((route) => {
        return route.endsWith("/*")
            ? pathName.startsWith(route.slice(0, -2))
            : pathName === route;
    });

    if (isPrivateRoute) {
        if (!session) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    if (isAuthRoute) {
        if (session) {
            return NextResponse.redirect(new URL("/chat", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher:
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
};
