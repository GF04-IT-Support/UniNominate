import NextAuth, { DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import authConfig from "./auth.config";
import { AdminType } from "@/types/adminTypes";
export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user?: User;
      trigger?: "signIn" | "signUp" | "update";
      session?: DefaultSession;
    }): Promise<JWT> {
      if (user) {
        // Initial sign in
        token = {
          name: user.name ?? "",
          email: user.email ?? "",
          id: user.id ?? "",
          role: user.role ?? "",
        };
      }

      if (trigger === "update" && session) {
        return {
          ...token,
          ...session,
        };
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: DefaultSession;
      token: JWT;
    }): Promise<DefaultSession & { user: AdminType }> {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name,
          email: token.email,
          role: token.role,
        };
      }
      return session as DefaultSession & { user: AdminType };
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
});
