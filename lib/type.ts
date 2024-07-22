import { Comment, Like, Post, Save, User } from "@prisma/client"

export type CommnetWithUser = Comment & { user: User }
export type LikeWithUser = Like & { user: User }
export type SaveWithUser = Save & { user: User }

export type PostWithAll = Post & {
    user: User,
    like: LikeWithUser[],
    comment: CommnetWithUser[],
    save: SaveWithUser[],
}