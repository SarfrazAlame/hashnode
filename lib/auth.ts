import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import prisma from "@/lib/prisma";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENTID!,
            clientSecret: process.env.GOOGLE_CLIENTSECRET!,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async session({ session, token }) {
            if (session) {
                session.user.id = token.id as string
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
                session.user.bio = token.bio as string
                session.user.username = token.username as string
                session.user.tagline = token.tagline as string
            }
            return session
        },
        async jwt({ token, user }) {
            if (token) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.picture = user.image
            }
            return token
        },

    }
}