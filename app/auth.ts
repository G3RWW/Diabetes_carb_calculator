import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/app/auth.config";

export const {handlers, signIn, signOut, auth} = NextAuth({
    ...authConfig,
    providers: 
        [
            Credentials(
                {
                credentials: 
                {
                    email: {},
                    password: {},
                },
                async authorize(credentials) 
                {
                    const email = credentials.email as string;
                    const password = credentials.password as string;

                    const user = await prisma.user.findUnique({where: { email },});

                    if (!user) 
                        {
                            throw new Error("No user found with the email");
                        }

                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) {throw new Error("Incorrect password");}

                    return { id: user.id, email: user.email };
                },
            }),
        ],
});