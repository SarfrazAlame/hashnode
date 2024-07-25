import { BlogPost, Bookmark } from "@/auth/Recieve";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const bookmarks = await Bookmark();
  const bookmark = bookmarks.bookmarks;

  return (
    <div className="flex w-full justify-center mt-5">
      <div className="flex flex-col gap-y-8">
        <div className="border w-[40rem] p-5 rounded-xl flex flex-col gap-y-2">
          <h1 className="text-xl font-extrabold text-slate-600 dark:text-slate-300">
            Bookmarks
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            All articles you have bookmarked on Hashnode
          </p>
        </div>
        {bookmark?.map((bookmark) => (
          <div
            key={bookmark.id}
            className="flex flex-col border rounded-xl p-5 w-[40rem]"
          >
            <div className="flex justify-between ">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 ">
                  <div>
                    <Image
                      src={bookmark.post.user.image!}
                      alt=""
                      width={30}
                      height={35}
                      className="rounded-full"
                    />
                  </div>
                  <Link href={`/blogs/${bookmark.post.user.username}`}>
                    <p className="text-[14px] font-[600] text-slate-700 dark:text-slate-300">
                      {bookmark.post.user.name}
                    </p>
                    <p className="text-[13px] font-[500] text-slate-500 dark:text-slate-400">
                      {bookmark.post.user.username}
                    </p>
                  </Link>
                </div>
                <Link href={`/blog/${bookmark.post.id}`} className="w-[25rem]">
                  <p className="text-lg font-bold text-slate-700 dark:text-slate-200">
                    {bookmark.post.title}
                  </p>
                  <p className="text-sm my-1 font-[500] text-slate-500 dark:text-slate-400">
                    {bookmark.post.story.slice(0, 140)}
                  </p>
                </Link>
              </div>
              <div>
                <Image
                  src={bookmark.post.imageUrl!}
                  alt=""
                  width={160}
                  height={160}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div></div>
          </div>
        ))}
        <p className="text-center text-sm text-slate-700 dark:text-slate-400">
          You've reached the end! 👋
        </p>
      </div>
    </div>
  );
};

export default page;
