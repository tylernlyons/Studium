import { NextRequest, NextResponse } from "next/server";
import { authMWConfig } from "./auth.mw";
import NextAuth from "next-auth";

// Initialize the auth function with middleware config
const { auth } = NextAuth(authMWConfig);

const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Get the current session
  const session = await auth();
  const isAuthenticated = !!session?.user;

  console.log(isAuthenticated, pathname);

  // Public routes that don't require authentication
  const publicPaths = ["/", "/show-item", "/show-items", "/api/items"];

  // Redirect unauthenticated users trying to access protected routes
  if (!isAuthenticated && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

// Match middleware to specific paths only
export const config = {
  matcher: [
    "/create-set/:path*",
    "/update-set/:path*", 
  ],
};

export default middleware;
