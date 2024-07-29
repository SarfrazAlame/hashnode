import {
  BlogPost,
  CommentById,
  likeUser,
  PostById,
  UserDetails,
  userFollow,
} from "@/auth/Recieve";
import Headers from "@/components/Headers";
import { authOptions } from "@/lib/auth";
import { PostWithAll } from "@/lib/type";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import { HiOutlineBookOpen } from "react-icons/hi2";
import Link from "next/link";
import { getUserId } from "@/lib/utils";
import dynamic from "next/dynamic";

export async function generateStaticParams(): Promise<string[]> {
  const posts = await BlogPost();
  return posts.posts?.map(({ id }) => id) as string[];
}

const PostOptions = dynamic(() => import("@/app/_component/PostOptions"), {
  loading: () => <p>wait loading...</p>,
});
const UserBlog = dynamic(() => import("@/components/UserBlog"), {
  loading: () => <p>wait loading...</p>,
});
const Articles = dynamic(() => import("@/components/Articles"), {
  loading: () => <p>wait loading...</p>,
});

const page = async ({ params: { id } }: { params: { id: string } }) => {
  // @ts-ignore
  const post: PostWithAll = await PostById(id);
  const ownerUser = await getServerSession(authOptions);
  const user = await UserDetails(ownerUser?.user.id!);
  const comment = await CommentById(post.id);
  const comments = comment.comment;
  const userId = await getUserId();
  const like = await likeUser(post?.id, userId);
  const follow = await userFollow(post.user.id, userId);

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
    <div className="h-screen">
      {/* @ts-ignore */}
      <Headers post={post} />
      <div className="flex w-full flex-col justify-center items-center">
        <div>
          <Image
            src={post?.imageUrl!}
            alt=""
            width={800}
            height={800}
            className="w-full h-full rounded"
          />
        </div>
        <p className="my-7 text-center w-1/2 text-5xl font-bold text-slate-800 dark:text-slate-100">
          {post?.title}
        </p>
        <div className="flex items-center gap-3 mb-7">
          <Link
            href={`/blogs/${post.user.username}`}
            className="flex items-center gap-3 mb-7"
          >
            <Image
              src={post.user.image!}
              alt=""
              width={45}
              height={45}
              className="rounded-full"
            />
            <p className="text-xl font-semibold text-slate-700 dark:text-slate-200">
              {post.user.name}
            </p>
          </Link>
          <span className="-mt-2">.</span>
          <HiOutlineBookOpen
            size={24}
            className="text-slate-800 dark:text-slate-300"
          />
          <div>
            <p>
              {monthNames[post.createdAt.getMonth()]} {post.createdAt.getDate()}
            </p>
          </div>
          <span className="-mt-2">.</span>
          <p className="text-slate-600 dark:text-slate-300">4 min read</p>
        </div>
        <p className="w-5/12 whitespace-pre-wrap font-[500] text-slate-800 dark:text-slate-300">
          {post?.story}
        </p>
        <div>
          <PostOptions
            post={post}
            like={like}
            // @ts-ignore
            user={user}
            // @ts-ignore
            comments={comments}
          />
        </div>
        <div className="w-5/12 ">
          <UserBlog post={post} follow={follow} />
        </div>
      </div>
      <div>
        <Articles userId={post.user.id} postId={post.id} />
      </div>
    </div>
  );
};

export default page;
