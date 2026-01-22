import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `auth`, and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      lifeStage: string // Your custom field
    } & DefaultSession["user"]
  }

  interface User {
    lifeStage?: string
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    id: string
    lifeStage?: string
  }
}