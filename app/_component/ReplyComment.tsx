"use client";
import { LikeComment } from "@/auth/action";
import { CommentWithUserAndLike, ReplyWithUser } from "@/lib/type";
import { Like, Reply } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import React, { useState } from "react";
import { PiHeartLight } from "react-icons/pi";
import CommentReply from "./CommentReply";
import ShowReply from "./ShowReply";

const ReplyComment = ({
  res,
  like,
  replies,
}: {
  res: CommentWithUserAndLike;
  like: Like | { message: string } | null;
  replies: ReplyWithUser[] | undefined;
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
      <div className="ml-14 mt-2">
        <ShowReply replies={replies}/>
      </div>
    </div>
  );
};

export default ReplyComment;
