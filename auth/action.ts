'use server'
import { AccountSchema, DiscussionsSchema, formSchems, ReplySchema, UserSchema } from "@/lib/Schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getUserId } from "@/lib/utils";

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

export const CreateAccount = async (value: z.infer<typeof AccountSchema>, mail: string) => {
    const validatedField = AccountSchema.safeParse(value)

    if (!validatedField.success) {
        throw new Error("Complete all field")
    }
    const { name, bio, email, tagline, username } = validatedField.data

    try {
        await prisma.user.update({
            where: {
                email: mail
            },
            data: {
                name,
                bio,
                email,
                tagline,
                username
            }
        })
        revalidatePath('/login/username')
    } catch (error) {
        return {
            message: "something went wrong"
        }
    }
}

export const PostBlog = async (value: z.infer<typeof formSchems>) => {
    const userId = await getUserId()

    const validatedField = formSchems.safeParse(value)

    if (!validatedField.success || !userId) {
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
    const userId = await getUserId()
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
                followerId: userId!,
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
    const userId = await getUserId()

    if (!userId) {
        throw new Error("Unauthorized")
    }

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
    const userId = await getUserId()
    const validatedField = DiscussionsSchema.safeParse(value)
    if (!validatedField.success || !userId) {
        throw new Error("Write comment")
    }
    const { body } = validatedField.data
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

export const LikePost = async (id: string) => {
    const userId = await getUserId()
    if (!userId) {
        throw new Error("Unauthorized")
    }
    try {
        await prisma.like.create({
            data: {
                postId: id,
                userId
            }
        })
        revalidatePath('blog')
    } catch (error) {
        return {
            message: "can't like"
        }
    }
}

export const LikeComment = async (commentId: string) => {
    const userId = await getUserId()
    if (!userId) {
        throw new Error("Unauthorized")
    }
    try {
        await prisma.like.create({
            data: {
                commentId,
                userId
            }
        })
        revalidatePath('/blogs/discussion')
    } catch (error) {
        return {
            message: "failed to post"
        }
    }
}

export const CommentOnReply = async (commentId: string, value: z.infer<typeof ReplySchema>) => {
    const userId = await getUserId()
    const validatedField = ReplySchema.safeParse(value)
    if (!validatedField.success || !userId) {
        throw new Error('Unauthorized')
    }
    const { response } = validatedField.data;

    try {
        await prisma.reply.create({
            data: {
                response,
                commentId,
                userId
            }
        })
        revalidatePath('/blogs/discussion')
    } catch (error) {
        return {
            message: "failed to reply"
        }
    }
}

export const DeleteReply = async (replyId: string) => {
    try {
        await prisma.reply.delete({
            where: {
                id: replyId,
            }

        })
        revalidatePath('/blogs/discussion')
    } catch (error) {
        return {
            message: "failed to delete"
        }
    }
}