// src/proxy.ts
import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  // If trying to access dashboard without being logged in -> Redirect to Login
  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  // Protect all routes except auth, api, and static files
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
