import { PostWithAll } from "@/lib/type";
import { Follows, Save, User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import LikeComment from "./LikeComment";
import Discussion from "./Discussion";
import Discussions from "./Discussions";
import Connect from "./Connect";

const Conversation = ({
  post,
  bookmark,
  userId,
  user,
  follow,
}: {
  post: PostWithAll;
  bookmark: Save | { message: string } | null;
  userId: string;
  user: User[] | null;
  follow: Follows | { message: string } | null;
}) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex w-2/3 my-8 gap-10 justify-center">
        <div className="flex flex-col gap-y-6 w-1/2 border rounded-lg p-6">
          <Image
            src={post?.imageUrl!}
            alt=""
            width={500}
            height={500}
            className="w-full rounded-lg"
          />
          <div className="flex items-center gap-3">
            <div>
              <Image
                src={post.user.image!}
                alt=""
                height={35}
                width={35}
                className="rounded-full"
              />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-slate-700 dark:text-slate-200">
                {post.user.name}
              </p>
              <p className="text-[12px]">{post.user.username}</p>
            </div>
          </div>
          <div>
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300">
              {post.title}
            </p>
            <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">
              {post.story.slice(0, 150)}
            </p>
          </div>
          <div>
            <LikeComment post={post} bookmark={bookmark} />
          </div>
          <div>
            {/* @ts-ignore */}
            <Discussions post={post} userId={userId} user={user} />
          </div>
          <div>
            <Discussion />
          </div>
        </div>
        <div className="border flex items-center justify-center w-1/5 h-fit rounded-lg">
          <div className="flex flex-col items-center justify-center gap-y-2 mx-auto py-5">
            <div>
              <Image
                src={post.user.image!}
                alt=""
                height={90}
                width={90}
                className="rounded-full"
              />
            </div>
            <h1 className="font-semibold text-slate-800 dark:text-slate-200">
              {post.user.name}
            </h1>
            <h1 className="text-center text-sm">{post.user.bio}</h1>
            <div className="flex justify-between  w-full">
              <Connect user={post.user} userId={userId} follow={follow} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
