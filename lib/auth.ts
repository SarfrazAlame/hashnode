import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { Adapter } from "next-auth/adapters";
import prisma from "@/lib/prisma";

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
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
                session.user.bio = token.bio
                session.user.username = token.username
                session.user.tagline = token.tagline
            }
            return session
        },
        async jwt({ token, user }) {
            const prismaUser = await prisma.user.findFirst({
                where: {
                    email: token.email as string
                }
            })
            if (!prismaUser) {
                token.sub = user.id
            }

            if (!prismaUser?.username) {
                await prisma.user.update({
                    where: {
                        id: prismaUser?.id
                    },
                    data: {
                        username: prismaUser?.name?.split(" ").join("").toLowerCase(),
                    }
                })
            }

            if (token && user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.picture = user.image
            }
            return token
        },
    }
}

export const getAuthOptions = () => getServerSession(authOptions)