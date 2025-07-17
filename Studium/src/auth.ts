import { authOptions } from "./auth.config";
import NextAuth from "next-auth";


export const {
  handlers: { GET, POST }, // API route handlers for auth endpoints (GET, POST)
  auth,                    // Middleware function to protect server components/routes
  signIn,
  signOut,
} = NextAuth(authOptions);  // Initialize NextAuth with the provided config
