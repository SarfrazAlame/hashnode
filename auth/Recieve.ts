import { unstable_noStore as noStore } from "next/cache";
import { Post, User } from "@prisma/client";
import prisma from "@/lib/prisma";

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

export const UserProfile = async (username: string)=> {
    noStore()
    try {
        const user = await prisma.user.findUnique({
            where: {
                username
            },
            include:{
                comments:{
                    include:{
                        user:true
                    },
                    orderBy:{
                        createdAt:"desc"
                    }
                },
                likes:{
                    include:{
                        user:true
                    }
                },
                saves:{
                    include:{
                        user:true
                    }
                },
                followers:true,
                following:true
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
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                saves: {
                    include: {
                        user: true
                    }
                },
                user: true
            },
            orderBy: {
                createdAt: 'desc'
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