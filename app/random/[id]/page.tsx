import { UserById } from "@/auth/Recieve";
import UserPage from "@/components/UserPage";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await UserById(id);
  const users = user.user;
  const ownerUser = await getServerSession(authOptions);
  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>
          {/* @ts-ignore */}
          <UserPage user={user} ownerUser={ownerUser?.user} />
          <div className="grid grid-cols-3 place-items-center">
            {user.posts.map((post) => (
              <div className="w-96 mt-3">
                <Link href={`/blog/${post.id}`}>
                  <Image
                    src={post.imageUrl!}
                    alt=""
                    height={350}
                    width={350}
                    className="rounded-md "
                  />
                  <p className="text-xl font-bold my-3 text-slate-800 dark:text-slate-200">
                    {post.title}
                  </p>
                  <p className="text-sm font-[500] text-slate-600 dark:text-slate-400">
                    {post.story.slice(0, 100)}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
