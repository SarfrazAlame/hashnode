import Commenters from "@/app/_component/Commenters";
import Conversations from "@/app/_component/Conversations";
import Post from "@/app/_component/Post";
import RespectiveComments from "@/app/_component/RespectiveComments";
import { AllUser, BlogPost } from "@/auth/Recieve";
import { authOptions, getAuthOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const { users } = await AllUser();
  const { posts } = await BlogPost();
  const className = "border-t border-r border-l rounded-xl";
  const ownerUser = await getAuthOptions();

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-full justify-center gap-12">
        <div className="flex flex-col gap-y-5 mt-14  mx-3 lg:mx-0">
          {posts?.map((post) => (
            <div key={post.id}>
              <Post post={post} key={post.id} className={className} />
              {/* @ts-ignore */}
              <Conversations post={post} user={ownerUser?.user} />
              <RespectiveComments post={post} />
            </div>
          ))}
        </div>
        <div className="hidden lg:block w-72">
          {/* @ts-ignore */}
          <Commenters user={users} ownerUser={ownerUser?.user} />
        </div>
      </div>
    </div>
  );
};

export default page;
