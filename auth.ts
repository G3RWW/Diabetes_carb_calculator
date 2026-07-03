import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = request.nextUrl.pathname.startsWith("/login");
      const isOnSignup = request.nextUrl.pathname.startsWith("/signup");
      if (isOnLogin || isOnSignup) return true;
      return isLoggedIn;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // runs once at login, copies id onto the token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // runs every session read, copies id onto session.user
      }
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          throw new Error("No user found with the email");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return { id: user.id, email: user.email };
      },
    }),
  ],
});