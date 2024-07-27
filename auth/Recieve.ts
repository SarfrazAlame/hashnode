import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/utils";
import { cache } from 'react'

export const UserDetails = cache(async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id:userId,
            }
        })
        return user
    } catch (error) {
        return {
            message: "failed to get user"
        }
    }
})

export const UserProfile = cache(async (username: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username
            },
            include: {
                comments: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                },
                likes: {
                    include: {
                        user: true
                    }
                },
                saves: {
                    include: {
                        user: true
                    }
                },
                followers: true,
                following: true
            }
        })

        return user
    } catch (error) {
        console.log(error)
        return null
    } finally {
        await prisma.$disconnect()
    }
})

export const BlogPost = cache(async () => {
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
                user: {
                    include: {
                        followers: true,
                        following: true
                    }
                }
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
})

export const userFollow = cache(async (id: string, userId: string) => {
    try {
        const follow = await prisma.follows.findUnique({
            where: {
                followerId_followingId: {
                    followerId: userId,
                    followingId: id
                }
            }
        })
        revalidatePath('/blogs')
        return follow
    } catch (error) {
        return {
            message: "cann't get follower"
        }
    }
})

export const BookMark = cache(async (id: string, userId: string) => {
    try {
        const bookmark = await prisma.save.findUnique({
            where: {
                userId_postId: {
                    postId: id,
                    userId
                }
            }
        })
        revalidatePath('/blogs')
        return bookmark
    } catch (error) {
        return {
            message: "failed to get bookmark"
        }
    }
})

export const PostById = cache(async (id: string) => {

    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            },
            include: {
                comments: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                },
                likes: {
                    include: {
                        user: true
                    }
                },
                saves: true,
                user: true
            }
        })

        return post
    } catch (error) {
        return {
            message: "failed to get post"
        }
    }
})

export const CommentUser = cache(async () => {
    try {
        const comments = await prisma.comment.findMany({
            include: {
                user: true
            }
        })
        revalidatePath('/blogs/discussoions')
        return { comments }
    } catch (error) {
        return {
            message: "cann't get comment"
        }
    }
})

export const likeUser = cache(async (id: string, userId: string) => {
    try {
        const like = await prisma.like.findFirst({
            where: {
                postId: id,
                userId
            }
        })
        return like
    } catch (error) {
        return {
            message: "like user"
        }
    }
})

export const AllUser = cache(async () => {
    try {
        const users = await prisma.user.findMany({
            include: {
                followers: true,
                following: true
            }
        })
        return { users }
    } catch (error) {
        return {
            message: "failed to get user"
        }
    }
})

export const CommentById = cache(async (postId: string) => {
    try {
        const comment = await prisma.comment.findMany({
            where: {
                postId
            },
            include: {
                user: true,
                likes: {
                    include: {
                        user: true
                    }
                },
            }
        })
        return { comment }
    } catch (error) {
        return {
            message: "can't fatch"
        }
    }
})

export const LikeOnComment = cache(async (commentId: string) => {
    const userId = await getUserId()
    try {
        const like = await prisma.like.findFirst({
            where: {
                commentId,
                userId
            },
        })
        return like
    } catch (error) {
        return {
            message: "failed to get like"
        }
    }
})

export const ReplyByCommentId = cache(async (commentId: string) => {
    try {
        const replies = await prisma.reply.findMany({
            where: {
                commentId
            },
            include: {
                user: true
            }
        })
        return { replies }
    } catch (error) {
        return {
            message: "failed to get"
        }
    }
})

export const Bookmark = cache(async () => {
    try {
        const bookmarks = await prisma.save.findMany({
            include: {
                post: {
                    include: {
                        user: true
                    }
                }
            }
        })
        return { bookmarks }
    } catch (error) {
        return {
            message: "failed to get bookmark"
        }
    }
})

export const UserById = cache(async (userId: string) => {
    try {
        const user = await prisma.user.findMany({
            where: {
                id: userId
            },
            include: {
                posts: true
            }
        })
        return { user }

    } catch (error) {
        return {
            message: "can't get data"
        }
    }
})

export const FolloPost = cache(async (followerId: string) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                user: {
                    AND: {
                        followers: {
                            every: {
                                followerId
                            }
                        }
                    }
                },
            },
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
                user: {
                    include: {
                        followers: true,
                        following: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }

        })
    } catch (error) {
        return {
            message: "can't fatch"
        }
    }
})