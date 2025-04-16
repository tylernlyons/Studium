import { NextRequest, NextResponse } from "next/server";
import { authMWConfig } from "./auth.mw";
import NextAuth from "next-auth";

const { auth } = NextAuth(authMWConfig);

const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const session = await auth();
    const isAuthenticated = !!session?.user;
    console.log(isAuthenticated, pathname); 

    const publicPaths = ["/", "/show-item", "/show-items", "/api/items"];

    if (!isAuthenticated && !publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
 
};

export const config = {
  matcher: [
    "/create-set/:path*",
    "/update-set/:path*",
  ],
};

export default middleware;