import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const client = await clientPromise;
        const db = client.db("mirrorDB");

        // Find user by email
        const user = await db.collection("users").findOne({
          email: (credentials.email as string).toLowerCase(),
        });

        if (!user || !user.password) return null;

        // Verify password
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!isPasswordCorrect) return null;

        // Return the user object with lifeStage included
        // This object is passed to the 'jwt' callback below as 'user'
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          lifeStage: user.lifeStage,
        };
      },
    }),
  ],
  callbacks: {
    // 1. JWT Callback: Persists the lifeStage into the encrypted token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.lifeStage = user.lifeStage;
      }
      return token;
    },
    // 2. Session Callback: Makes the data available to your Server & Client components
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.lifeStage = token.lifeStage as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
