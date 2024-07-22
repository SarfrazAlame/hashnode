import { PostById } from "@/auth/Recieve";
import Headers from "@/components/Headers";
import { PostWithAll } from "@/lib/type";
import { Post } from "@prisma/client";
import Image from "next/image";
import React from "react";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  // @ts-ignore
  const post: PostWithAll = await PostById(id);
  return (
    <div>
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
        <p className="my-7 w-1/2 text-5xl font-bold text-slate-800 dark:text-slate-100">
          {post.title}
        </p>
        <p className="w-1/2 whitespace-pre-wrap">{post.story}</p>
      </div>
    </div>
  );
};

export default page;
