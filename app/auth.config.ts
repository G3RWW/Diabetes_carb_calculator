import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = request.nextUrl.pathname.startsWith("/login");
      const isOnSignup = request.nextUrl.pathname.startsWith("/signup");

      if (isOnLogin || isOnSignup) return true; // always allow these

      return isLoggedIn; // everything else requires a session
    },
  },
  providers: [], // filled in by the real auth.ts, kept empty here
} satisfies NextAuthConfig;