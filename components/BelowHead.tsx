import { PostWithAll } from "@/lib/type";
import { Medal } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { LiaPencilAltSolid } from "react-icons/lia";
import { MdPeople } from "react-icons/md";
import PostSkeleton from "./PostSkeleton";

const Post = dynamic(() => import("@/app/_component/Post"), {
  loading: () => (
    <p>
      <PostSkeleton />
    </p>
  ),
});

const BelowHead = ({ posts }: { posts: PostWithAll[] | undefined }) => {
  const className = "border rounded-xl";
  return (
    <div>
      <div className="lg:w-2/3 flex justify-center gap-2 mb-3 my-3">
        <div className="flex w-fit px-3 py-1.5 rounded-full items-center gap-1 hover:bg-slate-100 hover:dark:bg-slate-900 cursor-pointer">
          <LiaPencilAltSolid className="text-gray-500 dark:text-slate-300" />
          <Link
            href={`/blogs`}
            className="text-[13px] font-semibold text-slate-500 dark:text-slate-200 "
          >
            Personalized
          </Link>
        </div>
        <div className="flex w-fit px-3 py-1.5 rounded-full items-center gap-1 hover:bg-slate-100 hover:dark:bg-slate-900 cursor-pointer">
          <MdPeople className="text-gray-500 dark:text-slate-300" />
          <Link
            href={"/blogs/following"}
            className="text-[13px] font-semibold text-slate-500 dark:text-slate-200 "
          >
            Following
          </Link>
        </div>
        <div className="flex w-fit px-3 py-1.5 rounded-full items-center gap-1 hover:bg-slate-100 hover:dark:bg-slate-900 cursor-pointer">
          <Medal size={16} className="text-gray-500 dark:text-slate-300" />
          <p className="text-[13px] font-semibold text-slate-500 dark:text-slate-200 ">
            Featured
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-5">
        {posts?.map((post) => (
          <Post key={post.id} post={post} className={className} />
        ))}
      </div>
    </div>
  );
};

export default BelowHead;
