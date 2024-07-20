import prisma from "@/lib/prisma"

export const UserDetails = async (id: string, email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id,
                email
            }
        })
        return user
    } catch (error) {
        console.log(error)
        return {
            message: "failed to get user"
        }
    }
}