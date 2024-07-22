import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma"
import { Post, User } from "@prisma/client";

export const UserDetails = async (id: string, email: string) => {
    noStore()
    try {
        const user = await prisma.user.findUnique({
            where: {
                id,
                email
            }
        })
        return user
    } catch (error) {
        return {
            message: "failed to get user"
        }
    }
}

export const UserProfile = async (username: string): Promise<User | null> => {
    noStore()
    try {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        return user
    } catch (error) {
        console.log(error)
        return null
    } finally {
        await prisma.$disconnect()
    }
}

export const BlogPost = async () => {
    noStore()
    try {
        const posts = await prisma.post.findMany({
            include: {
                likes: {
                    include: {
                        user: true
                    }
                },
                comments: {
                    include: {
                        user: true
                    }
                },
                saves: {
                    include: {
                        user: true
                    }
                },
                user: true
            }
        })
        return { posts }
    } catch (error) {
        console.log(error)
        return {
            message: "can't fetch"
        }
    }
}