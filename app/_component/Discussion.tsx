import { CommentById, CommentUser } from "@/auth/Recieve";
import { PostWithAll } from "@/lib/type";
import Image from "next/image";
import React from "react";

const Discussion = async ({post}:{post:PostWithAll}) => {
  const comment = await CommentById(post?.id)
  const comments = comment.comment
  return (
    <div className="flex flex-col gap-y-6">
      <p className="font-bold text-slate-800 dark:text-gray-200">
        {comments?.length} comments
      </p>
      {comments?.map((comment) => (
        <div key={comment.id} className="flex gap-2">
          <div>
            <Image
              src={comment.user.image!}
              alt=""
              width={35}
              height={35}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-sm font-semibold text-slate-600 dark:text-gray-200">
              {comment.user.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              {comment.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Discussion;
