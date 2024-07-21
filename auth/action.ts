'use server'
import { formSchems, UserSchema } from "@/lib/Schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "@/lib/prisma";
import UserId from "@/app/_component/UserId";
import { redirect } from "next/navigation";

export const CreateUser = async (value: z.infer<typeof UserSchema>, mail: string) => {
    const validatedField = UserSchema.safeParse(value)

    if (!validatedField.success) {
        throw new Error("Complete all field")
    }

    const { name, email, username, bio, tagline, image, available, facebook, github, instagram, linkedin, location, stackoverflow, tech, twitter, website, youtube } = validatedField.data

    try {
        await prisma.user.update({
            where: {
                email: mail
            },
            data: {
                name,
                email,
                username,
                bio,
                tagline,
                available,
                facebook,
                github,
                instagram,
                location,
                linkedin,
                stackoverflow,
                tech,
                twitter,
                website, youtube
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


export const PostBlog = async (value: z.infer<typeof formSchems>) => {
    const userId = await UserId()

    const validatedField = formSchems.safeParse(value)

    if (!validatedField.success) {
        throw new Error("can't post")
    }

    const { title, category, story, imageUrl } = validatedField.data

    try {
        await prisma.post.create({
            data: {
                title,
                category,
                story,
                imageUrl,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
        revalidatePath('/blogs')
        redirect('/blogs')
    } catch (error) {
        console.log(error)
        return {
            message: "Something went wrong"
        }
    }
}