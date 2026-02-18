import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { authConfig } from "@/auth.config";
import { Db } from "mongodb";

/**
 * Full auth configuration for Node.js runtime.
 * Used by Server Components, Server Actions, and API Routes.
 * Safe to import bcryptjs and mongodb here.
 *
 * Spreads authConfig to keep callbacks and pages in sync
 * with the Edge-safe config used by middleware.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const client = await clientPromise;
        const db: Db = client.db("mirrorDB");

        const user = await db.collection("users").findOne({
          email: (credentials.email as string).toLowerCase(),
        });

        if (!user || !user.password) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!isPasswordCorrect) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          lifeStage: user.lifeStage,
        };
      },
    }),
  ],
});
