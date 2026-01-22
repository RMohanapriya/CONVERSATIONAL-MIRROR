import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import clientPromise from "@/lib/mongodb";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; 

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const client = await clientPromise;
        // Updated to your specific DB name: mirrorDB
        const db = client.db("mirrorDB");
        const user = await db.collection("users").findOne({ 
          email: credentials.email 
        });

        if (user && user.password) {
          const isValid = await bcrypt.compare(credentials.password as string, user.password);
          if (isValid) {
            return { 
              id: user._id.toString(), 
              name: user.name, 
              email: user.email,
              lifeStage: user.lifeStage // Required for scenario filtering
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.lifeStage = (user as any).lifeStage;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).lifeStage = token.lifeStage;
      }
      return session;
    },
  },
});