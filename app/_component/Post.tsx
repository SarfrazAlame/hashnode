import { PostWithAll } from "@/lib/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LikeComment from "./LikeComment";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Plus } from "lucide-react";
import { UserProfile } from "@/auth/Recieve";

const Post = async ({ post }: { post: PostWithAll }) => {
  const user = await UserProfile(post.user.username!);
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex w-full justify-between">
        <div className="flex w-2/3 flex-col gap-y-3">
          <div className="flex gap-2">
            <div>
              <HoverCard>
                <HoverCardTrigger>
                  <Image
                    src={post.user.image!}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                  />
                </HoverCardTrigger>
                <HoverCardContent className="w-72">
                  <div className="flex flex-col gap-y-3">
                    <div className="flex items-center justify-between">
                      <Image
                        src={post.user.image!}
                        alt=""
                        width={70}
                        height={70}
                        className="rounded-full"
                      />
                      <button className="py-1 px-2 rounded-full bg-blue-600 text-gray-100 text-sm flex items-center gap-2">
                        <Plus size={20} /> Follow
                      </button>
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <p className="font-bold text-lg">{post.user.name}</p>
                      <p className="text-gray-600 text-sm dark:text-gray-200">
                        {post.user.tagline}
                      </p>
                    </div>
                    <div>
                      <p>{user?.followers.length} followers</p>
                      <p>{user?.following.length} followers</p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            <Link
              href={`/blogs/${post.user.username}`}
              className="flex flex-col"
            >
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
