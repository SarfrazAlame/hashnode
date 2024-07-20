import type { User, Session } from "next-auth"
import type { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    interface JWT {
        id: string,
        username: string | null
        bio: string | null
        tagline: string | null
    }
}

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            name: string | null | undefined
            email: string | null | undefined
            image: string | null | undefined
            username: string | null | undefined
            bio: string | null | undefined
            tagline: string | null | undefined
        }
    }
}