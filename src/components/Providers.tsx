"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Providers Component
 * Wraps the application to provide Global Context.
 * * DESIGN CHOICE: Removed ThemeProvider to implement a single, 
 * fixed ASD-friendly "Soft Contrast" color palette.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/* All child components (Dashboard, Chat, etc.) 
           now have access to the authenticated user session.
      */}
      {children}
    </SessionProvider>
  );
}