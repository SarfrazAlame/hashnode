'use server'
import { DiscussionsSchema, formSchems, UserSchema } from "@/lib/Schema";
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
        return {
            message: "Something went wrong"
        }
    }
}

export const FollowUser = async (id: string) => {
    const userId = await UserId()
    const FollowUser = await prisma.follows.findUnique({
        where: {
            followerId_followingId: {
                followerId: userId,
                followingId: id
            }
        }
    })
    if (FollowUser) {
        try {
            await prisma.follows.delete({
                where: {
                    followerId_followingId: {
                        followerId: userId,
                        followingId: id
                    }
                }
            })
            revalidatePath('/blogs')
            return {
                message: "Unfollow user"
            }
        } catch (error) {
            return {
                message: "unable to unfollow"
            }
        }
    }
    try {
        await prisma.follows.create({
            data: {
                followerId: userId,
                followingId: id
            }
        })
        revalidatePath('/blogs')
    } catch (error) {
        console.log(error)
        return {
            message: "unable to follow"
        }
    }
}

export const BookMarkPost = async (id: string) => {
    const userId = await UserId()

    const bookmark = await prisma.save.findUnique({
        where: {
            userId_postId: {
                userId,
                postId: id
            }
        }
    })
    if (bookmark) {
        try {
            await prisma.save.delete({
                where: {
                    userId_postId: {
                        userId,
                        postId: id
                    }
                }
            })
            revalidatePath("/blogs")
            return {
                message: "deleted post"
            }
        } catch (error) {
            return {
                message: "delete savepost"
            }
        }
    }
    try {
        await prisma.save.create({
            data: {
                postId: id,
                userId
            }
        })
        revalidatePath('/blogs')
        return {
            message: "save post"
        }
    } catch (error) {
        return {
            message: "something went wrong"
        }
    }
}

export const AddComment = async (id: string, value: z.infer<typeof DiscussionsSchema>) => {
    const userId = await UserId()
    const validatedField = DiscussionsSchema.safeParse(value)
    if(!validatedField.success){
        throw new Error("Write comment")
    }
    const {body} = validatedField.data
    try {
        await prisma.comment.create({
            data: {
                body,
                postId: id,
                userId
            }
        })
        revalidatePath('/blogs/discussions')
    } catch (error) {
        return {
            message: "comment failed"
        }
    }
}