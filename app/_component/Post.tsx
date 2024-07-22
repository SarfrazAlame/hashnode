import { PostWithAll } from "@/lib/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LikeComment from "./LikeComment";

const Post = ({ post }: { post: PostWithAll }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex w-full justify-between">
        <div className="flex w-2/3 flex-col gap-y-3">
          <div className="flex gap-2">
            <div>
              
              <Image
                src={post.user.image!}
                alt=""
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <Link href={`/blogs/${post.user.username}`} className="flex flex-col">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {post.user.name}
              </p>
              <p className="text-[12px]">{post.user.username}</p>
            </Link>
          </div>
          <Link href={`/blogs`}>
            <p className="text-lg font-bold text-slate-700 dark:text-slate-200">
              {post.title}
            </p>
            <p className="text-sm text-gray-600 my-2 dark:text-slate-400">
              {post.story.slice(0, 100)}
            </p>
          </Link>
        </div>
        <Link href={`/blogs`}>
          <Image
            src={post.imageUrl!}
            alt=""
            width={150}
            height={80}
            className="rounded-md"
          />
        </Link>
      </div>
      <LikeComment post={post} />
    </div>
  );
};

export default Post;
