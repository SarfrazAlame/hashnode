import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma"
import { User } from "@prisma/client";

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

export const UserProfile = async (username: string):Promise<User | null> => {
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
    }finally{
        await prisma.$disconnect()
    }
}