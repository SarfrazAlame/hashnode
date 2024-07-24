import { LikeOnComment, ReplyByCommentId } from "@/auth/Recieve";
import { Comment, Like } from "@prisma/client";
import React from "react";
import ReplyComment from "./ReplyComment";
import { CommentWithUserAndLike } from "@/lib/type";

const Reply = async ({ res }: { res: CommentWithUserAndLike }) => {
  const likes = await LikeOnComment(res.id);
  const reply = await ReplyByCommentId(res.id)
  const replies = reply.replies

  return <ReplyComment res={res} like={likes} replies={replies}/>;
};

export default Reply;
