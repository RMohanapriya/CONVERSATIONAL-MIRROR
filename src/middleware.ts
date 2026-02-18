import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

/**
 * Middleware runs on Edge Runtime.
 * ONLY uses authConfig which has zero Node.js dependencies.
 * The `authorized` callback in authConfig handles all route protection.
 */
export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - api routes (handled separately)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
