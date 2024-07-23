import { CommentById } from "@/auth/Recieve";
import { PostWithAll } from "@/lib/type";
import Image from "next/image";
import React from "react";

const RespectiveComments = async ({ post }: { post: PostWithAll }) => {
  const comments = await CommentById(post.id);
  const comment = comments.comment;
  return (
    <div className="flex flex-col">
      {comment?.length === 0 && <><p></p></>}
      {comment?.length! > 1 ? (
        <p className="font-semibold mt-2 text-slate-800 dark:text-slate-200">
          {comment?.length} comments
        </p>
      ) : (
        <>
          <p className="font-semibold mt-2 text-slate-800 dark:text-slate-200">
            {comment?.length} comment
          </p>
        </>
      )}
      <div className="flex flex-col gap-y-8 mt-6">
        {comment?.map((res) => (
          <div key={res.id} className="flex items-center gap-3">
           <div> <Image
              src={res.user.image!}
              alt=""
              width={30}
              height={30}
              className="rounded-full"
            /></div>
            <p className="text-[13px] font-[500]">{res.user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RespectiveComments;
