import { CommentById } from "@/auth/Recieve";
import { PostWithAll } from "@/lib/type";
import Image from "next/image";
import React from "react";
import Reply from "./Reply";

const RespectiveComments = async ({ post }: { post: PostWithAll }) => {
  const comments = await CommentById(post.id);
  const comment = comments.comment;

  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dece",
  ];

  return (
    <div className="flex flex-col mx-6">
      {comment?.length! > 1 ? (
        <div className="font-semibold mt-2 text-slate-800 dark:text-slate-200">
          {comment?.length} comments
        </div>
      ) : (
        <>
          <div className="font-semibold mt-2 text-slate-800 dark:text-slate-200">
            {comment?.length} comment
          </div>
        </>
      )}
      <div className="flex flex-col gap-y-4 mt-6">
        {comment?.map((res) => (
          <div key={res.id} className="flex gap-3">
            <div>
              <Image
                src={res.user.image!}
                alt=""
                width={30}
                height={30}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <div className="flex gap-3">
                <p className="text-[14px] font-[500] ">{res.user.name}</p>
                <p className="-mt-2">.</p>
                <p className="text-[13px] text-slate-500 dark:text-slate-400 font-[500]">
                  {monthNames[res.createdAt.getMonth()]}{" "}
                  {res.createdAt.getDate()},
                </p>
                <p className="text-[13px] text-slate-500 dark:text-slate-400 font-[500]">
                  {res.createdAt.getFullYear()}
                </p>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {res.body}
              </p>
              <Reply res={res} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RespectiveComments;
