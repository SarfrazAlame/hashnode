import Follow from "@/app/_component/Follow";
import { PostWithAll } from "@/lib/type";
import Image from "next/image";
import React from "react";

const UserBlog = ({ post }: { post: PostWithAll }) => {
  return (
    <div className="my-12">
      <p className="font-semibold my-1 text-gray-500 dark:text-slate-200">
        Written by
      </p>
      <hr />
      <div className="flex justify-between">
        <div className="my-5 flex gap-3">
          <div>
            <Image
              src={post.user.image!}
              alt=""
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
              {post.user.name}
            </p>
            <p>{post.user.tagline}</p>
          </div>
        </div>
        <div>
          <button className="border m-6 py-3 px-4 rounded-full border-blue-500 text-blue-500">Follow</button>
        </div>
      </div>
    </div>
  );
};

export default UserBlog;
