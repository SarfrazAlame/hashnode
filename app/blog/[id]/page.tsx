import PostOptions from "@/app/_component/PostOptions";
import { likeUser, PostById } from "@/auth/Recieve";
import Headers from "@/components/Headers";
import { PostWithAll } from "@/lib/type";
import Image from "next/image";
import React from "react";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  // @ts-ignore
  const post: PostWithAll = await PostById(id);
  const like = await likeUser(post.id)
  return (
    <div className="h-screen">
      {/* @ts-ignore */}
      <Headers post={post} />
      <div className="flex w-full flex-col justify-center items-center">
        <div>
          <Image
            src={post.imageUrl!}
            alt=""
            width={800}
            height={800}
            className="w-full h-full rounded"
          />
        </div>
        <p className="my-7 text-center w-1/2 text-5xl font-bold text-slate-800 dark:text-slate-100">
          {post.title}
        </p>
        <p className="w-5/12 whitespace-pre-wrap">{post.story}</p>
        <div>
          <PostOptions post={post} like={like}/>
        </div>
      </div>
    </div>
  );
};

export default page;
