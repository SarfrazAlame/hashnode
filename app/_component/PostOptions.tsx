"use client";

import { PostWithAll } from "@/lib/type";
import React from "react";
import { HiOutlineHeart } from "react-icons/hi2";
import { AiOutlineComment } from "react-icons/ai";
import { Bookmark } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LikePost } from "@/auth/action";
import { Like } from "@prisma/client";

const PostOptions = ({
  post,
  like,
}: {
  post: PostWithAll;
  like: Like | { message: string } | null;
}) => {
  return (
    <div className="h-16 my-12 px-8 flex gap-4 items-center border dark:border-slate-200 w-full rounded-full">
      <div className="flex items-center gap-2 p-1 hover:bg-gray-200 hover:dark:bg-gray-900 rounded-full cursor-pointer">
        <HiOutlineHeart
          size={30}
          onClick={() => LikePost(post.id)}
          className={like?" text-red-600 fill-red-600 dark:text-slate-200":"text-slate-800 dark:text-slate-200"}
        />
        <p>{post?.likes?.length}</p>
      </div>
      <div className="flex items-center gap-2 p-1 hover:bg-gray-200 hover:dark:bg-gray-900 rounded-full cursor-pointer">
        <AiOutlineComment
          size={30}
          className="text-slate-800 dark:text-slate-200 hover:dark:bg-gray-900"
        />
        <p>{post?.comments?.length}</p>
      </div>
      <div className="flex p-1 hover:bg-gray-200 hover:dark:bg-gray-900 rounded-full cursor-pointer">
        <Bookmark size={30} className="text-slate-800 dark:text-slate-200" />
      </div>
      <div className="flex p-1 hover:bg-gray-200 hover:dark:bg-gray-900 rounded-full cursor-pointer">
        <BsThreeDotsVertical
          size={30}
          className="text-slate-800 dark:text-slate-200 hover:dark:bg-gray-900"
        />
      </div>
    </div>
  );
};

export default PostOptions;
