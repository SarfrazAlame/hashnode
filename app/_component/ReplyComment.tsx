"use client";
import { LikeComment } from "@/auth/action";
import { CommentWithUserAndLike } from "@/lib/type";
import { Like } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import React, { useState } from "react";
import { PiHeartLight } from "react-icons/pi";
import CommentReply from "./CommentReply";

const ReplyComment = ({
  res,
  like,
}: {
  res: CommentWithUserAndLike;
  like: Like | { message: string } | null;
}) => {
  return (
    <div className="">
      <div className="flex gap-1 items-center">
        <div className="p-1 w-fit rounded-full cursor-pointer hover:bg-red-200 hover:dark:bg-red-950">
          {like ? (
            <>
              <HeartIcon
                size={22}
                className="hover:text-red-500 fill-red-500 text-red-500 font-[500] dark:text-slate-400"
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
        <p className="text-sm">{res.likes.length}</p>
        <p className="-mt-2">.</p>
      </div>
      <div className="-mt-7 ml-14">
        <CommentReply res={res} />
      </div>
    </div>
  );
};

export default ReplyComment;
