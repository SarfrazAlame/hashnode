"use client";
import { LikeComment } from "@/auth/action";
import { CommentWithUserAndLike } from "@/lib/type";
import { Comment, Like } from "@prisma/client";
import React from "react";
import { PiHeartLight } from "react-icons/pi";

const ReplyComment = ({
  res,
  like,
}: {
  res: CommentWithUserAndLike;
  like: Like[] | undefined;
}) => {
  return (
    <div className="flex gap-3 items-center">
      <div className="p-1 w-fit  rounded-full cursor-pointer hover:bg-red-200 hover:dark:bg-red-950">
        {like ? (
          <>
            <PiHeartLight
              size={22}
              className="hover:text-red-500 fill-red-500 border-red-500  font-[500] text-slate-500 dark:text-slate-400"
              onClick={() => LikeComment(res.id)}
            />
          </>
        ) : (
          <>
            <PiHeartLight
              size={22}
              className="hover:text-red-500  font-[500] text-slate-500 dark:text-slate-400"
              onClick={() => LikeComment(res.id)}
            />
          </>
        )}
      </div>
      <p>{like?.length}</p>
      <p className="text-[13px] hover:underline cursor-pointer font-[500] text-slate-500 dark:text-slate-400">
        Reply
      </p>
    </div>
  );
};

export default ReplyComment;
