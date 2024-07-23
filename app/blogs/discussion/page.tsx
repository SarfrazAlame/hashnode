import Commenters from "@/app/_component/Commenters";
import Conversations from "@/app/_component/Conversations";
import Post from "@/app/_component/Post";
import { AllUser, BlogPost } from "@/auth/Recieve";
import React from "react";

const page = async () => {
  const { users } = await AllUser();
  const { posts } = await BlogPost();
  const className = "border-t border-r border-l rounded-xl";
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-full justify-center gap-12">
        <div className="w-1/3 flex flex-col gap-y-5  mt-14">
          {posts?.map((post) => (
            <div key={post.id}>
              <Post post={post} key={post.id} className={className} />
              <Conversations post={post} />
            </div>
          ))}
        </div>
        <div className="w-1/6 ">
          <Commenters user={users} />
        </div>
      </div>
    </div>
  );
};

export default page;
