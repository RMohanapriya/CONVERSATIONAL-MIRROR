import type { Config } from "tailwindcss";

const config: Config = {
  // 1. CONTENT SCANNING
  // This is critical: The wildcard './src/**/*.{js,ts,jsx,tsx,mdx}' 
  // ensures Tailwind finds classes inside (dashboard) and (auth) folders.
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 2. TYPOGRAPHY
      // Connects the Inter and Montserrat fonts from layout.tsx
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-montserrat)"], 
      },
      // 3. COLOR SYSTEM (Mapped to globals.css variables)
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        border: "hsl(var(--border))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      // 4. BORDER RADIUS
      // Standardizes the "Soft" look for the Mirror AI design language.
      borderRadius: {
        xl: "var(--radius)",
        "2xl": "calc(var(--radius) + 0.5rem)",
        "3xl": "calc(var(--radius) + 1rem)",
        "4xl": "calc(var(--radius) + 2rem)",
      },
      // 5. ANIMATIONS (For smooth UI transitions)
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;