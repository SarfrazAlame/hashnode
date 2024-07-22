import { Comment, Follows, Like, Post, Save, User } from "@prisma/client"

export type CommnetWithUser = Comment & { user: User }
export type LikeWithUser = Like & { user: User }
export type SaveWithUser = Save & { user: User }

export type PostWithAll = Post & {
    user: User,
    likes: LikeWithUser[],
    comments: CommnetWithUser[],
    saves: SaveWithUser[],
}

export type UserWithAll = User & {
    like: LikeWithUser[],
    comment: CommnetWithUser[],
    save: SaveWithUser[]
    follower: Follows[],
    following: Follows[]
}
