'use server'
import { UserSchema } from "@/lib/Schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "@/lib/prisma";

export const CreateUser = async (value: z.infer<typeof UserSchema>, id: string | undefined) => {
    const validatedField = UserSchema.safeParse(value)

    if (!validatedField.success) {
        throw new Error("Complete all field")
    }

    const { name, email, username, bio, tagline } = validatedField.data

    try {
        await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                username,
                bio,
                tagline
            }
        })
        revalidatePath('/login/username')
    } catch (error) {
        console.log(error)
        return {
            message: "Something went wrong"
        }
    }
}
