import { LikeOnComment, ReplyByCommentId } from "@/auth/Recieve";
import { Comment, Like } from "@prisma/client";
import React from "react";
import ReplyComment from "./ReplyComment";
import { CommentWithUserAndLike } from "@/lib/type";
import { getUserId } from "@/lib/utils";

const Reply = async ({ res }: { res: CommentWithUserAndLike }) => {
  const likes = await LikeOnComment(res.id);
  const reply = await ReplyByCommentId(res.id)
  const replies = reply.replies
  const userId = await getUserId()

  return <ReplyComment res={res} like={likes} replies={replies} userId={userId}/>;
};

export default Reply;
