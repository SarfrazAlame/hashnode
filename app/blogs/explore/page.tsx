import { AllUser } from "@/auth/Recieve";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const users = await AllUser();
  const userss = users.users;
  return (
    <div className="flex justify-center w-full items-center mt-5">
      <div className="flex flex-col gap-y-3">
        <div className="border w-[40rem] p-6 rounded-lg">
          <h1 className="text-center text-2xl font-extrabold text-slate-700 dark:text-slate-200">
            Explore Tech Blogs & Tags
          </h1>
          <p className="text-center text-sm font-[500] mt-2 text-slate-500 dark:text-slate-400">
            Everything that's… Hashnode. Explore the most popular tech blogs
            from the Hashnode community. A constantly updating list of popular
            tags and the best minds in tech.
          </p>
        </div>
        <div className="border w-[40rem] p-6 rounded-lg">
          <h1 className="pr-5 font-semibold text-[15px] text-slate-600 dark:text-slate-300">
            New And Noteworthy Tech Blogs
          </h1>
          <div className="">
            {userss?.map((user) => (
              <div  className="border bg-slate-100 dark:bg-slate-900 p-4 my-4 rounded-md flex gap-2 items-center">
                <div className="flex gap-2 items-center">
                  <Image
                    src={user.image!}
                    alt=""
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                  <Link
                    href={`/blogs/${user.username}`}
                    className="flex flex-col"
                  >
                    <p className="font-semibold text-gray-700 dark:text-slate-200">
                      {user.name}
                    </p>
                    <p className="text-[14px] text-slate-600 dark:text-slate-400">
                      {user.username}
                    </p>
                  </Link>
                </div>
                <button>Follow</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
