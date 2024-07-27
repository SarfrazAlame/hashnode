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
import { BookMark, userFollow, UserProfile } from "@/auth/Recieve";
import { getAuthOptions } from "@/lib/auth";
import Follow from "./Follow";
import { getUserId } from "@/lib/utils";

const Post = async ({
  post,
  className,
}: {
  post: PostWithAll;
  className: string;
}) => {
  const user = await UserProfile(post.user.username!);
  const ownerUser = await getAuthOptions();
  const userId = await getUserId();
  const followUser = await userFollow(post.user.id, userId);
  const bookmark = await BookMark(post.id, ownerUser?.user.id!);
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
    <div className={`${className} flex flex-col gap-y-2  p-5`}>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-y-3 w-3/4 lg:w-full">
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
                      {post.userId !== userId ? (
                        <Follow
                          // @ts-ignore
                          user={user}
                          post={post}
                          // @ts-ignore
                          followUser={followUser}
                          className="border-blue-600 text-blue-500 py-1 px-2 "
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <p className="font-bold text-lg">{post.user.name}</p>
                      <p className="text-gray-600 text-sm dark:text-gray-200">
                        {post.user.tagline}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <p className="text-[12px]">
                        {user?.followers.length} followers
                      </p>
                      <p className="text-[12px]">
                        {user?.following.length} following
                      </p>
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
              <div className="flex gap-2 items-center">
                <p className="text-[12px] font-[500] text-slate-500 dark:text-slate-400">
                  {post.user.username}
                </p>
                <span className="-mt-2 text-slate-600 dark:text-slate-400">
                  .
                </span>
                <p className="text-[13px] font-[500] text-slate-500 dark:text-slate-400">
                  {" "}
                  {monthNames[post.createdAt.getMonth()]}{" "}
                  {post.createdAt.getDate()}, {post.createdAt.getFullYear()}
                </p>
              </div>
            </Link>
          </div>
          <Link href={`/blog/${post.id}`}>
            <p className="text-lg font-bold text-slate-700 dark:text-slate-200">
              {post.title}
            </p>
            <p className="text-sm text-gray-600 my-2 dark:text-slate-400">
              {post.story.slice(0, 100)}
            </p>
          </Link>
        </div>
        <Link href={`/blogs/${post.title}`}>
          <Image
            src={post.imageUrl!}
            alt=""
            width={150}
            height={80}
            className="rounded-md"
          />
        </Link>
      </div>
      <LikeComment post={post} bookmark={bookmark} />
    </div>
  );
};

export default Post;
