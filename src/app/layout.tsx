import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google"; 
import { Providers } from "@/components/Providers";
import "./globals.css";

// 1. FONT CONFIGURATION
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap', 
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Mirror AI | Social Metacognition Platform",
  description: "A non-judgmental space for neurodivergent social practice and reflection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body 
        className={`
          ${inter.variable} 
          ${montserrat.variable} 
          font-sans 
          bg-[#F8FAFC] 
          text-slate-900 
          antialiased 
          min-h-screen
          selection:bg-indigo-100 
          selection:text-indigo-900
        `}
      >
        <Providers>
          {/* This div replaces the old 'main' flex centering from globals.css.
            It ensures content stays at the top but is correctly spaced.
          */}
          <div className="relative min-h-screen flex flex-col overflow-x-hidden">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}