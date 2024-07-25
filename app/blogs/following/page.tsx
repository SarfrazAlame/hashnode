import Commenters from "@/app/_component/Commenters";
import { AllUser, BlogPost, FolloPost } from "@/auth/Recieve";
import BelowHead from "@/components/BelowHead";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const { posts } = await BlogPost();
  const { users } = await AllUser();
  const ownerUser = await getServerSession(authOptions);
  return (
    <main className="flex w-full justify-center items-center">
      <div className="flex lg:w-fit w-full justify-center mx-3 lg:mx-0 gap-8 my-8">
        <div className="lg:w-2/3 flex flex-col gap-y-6">
          <BelowHead posts={posts} />
        </div>
        {/* @ts-ignore */}
        <Commenters user={users} ownerUser={ownerUser} />
      </div>
    </main>
  );
};
export default page;
