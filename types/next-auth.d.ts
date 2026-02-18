import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      lifeStage: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    lifeStage?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    lifeStage?: string;
  }
}
