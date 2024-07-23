import { BlogPost } from "@/auth/Recieve";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Articles = async ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) => {
  const articles = await BlogPost();
  const article = articles.posts?.filter(
    (post) => post.userId === userId && post.id !== postId
  );
  return (
    <div className="w-full h-screen mt-12">
      <p className="font-semibold text-center text-slate-500 dark:text-slate-300">
        MORE ARTICLES
      </p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-3 sm:mx-0 place-items-center items-center justify-center mt-8">
        {article?.map((post) => (
          <div
            key={post.id}
            className="border flex flex-col gay-4 rounded-md p-4 "
          >
            <Link
              href={`/blogs/${post.user.username}`}
              className="flex gap-2 w-96"
            >
              <Image
                src={post.user.image!}
                alt=""
                width={25}
                height={25}
                className="rounded-full"
              />
              <p className="font-bold text-slate-800 dark:text-slate-200">
                {post.user.name}
              </p>
            </Link>
            <Link href={`/blog/${post.id}`} className="my-4 w-96">
              <Image
                src={post.imageUrl!}
                alt=""
                width={400}
                height={400}
                className="rounded-md "
              />
            </Link>
            <Link href={`/blog/${post.id}`} className="w-96">
              <p className="text-xl font-extrabold text-slate-800 dark:text-slate-200">
                {post.title}
              </p>
              <p className="my-2 text-slate-500 font-[500] dark:text-slate-400">
                {post.story.slice(0, 100)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
