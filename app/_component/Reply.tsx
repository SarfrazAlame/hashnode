import { LikeOnComment } from "@/auth/Recieve";
import { Comment, Like } from "@prisma/client";
import React from "react";
import ReplyComment from "./ReplyComment";
import { CommentWithUserAndLike } from "@/lib/type";

const Reply = async ({ res }: { res: CommentWithUserAndLike }) => {
  const likes = await LikeOnComment(res.id);
  return <ReplyComment res={res} like={likes} />;
};

export default Reply;
