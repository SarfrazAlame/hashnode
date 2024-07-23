import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FollowUser from "./FollowUser";

const Commenters = ({ user }: { user: User[]|undefined }) => {
  return (
    <div className="border h-fit w-1/3 mt-14 rounded-lg p-5">
      <h1 className="font-semibold text-lg text-slate-700 dark:text-slate-200">
        Top commenters this week
      </h1>
      <div className="flex flex-col gap-y-5 my-4">
        {user?.map((user) => (
          <div key={user.id} className="flex justify-between">
            <Link
              href={`/blogs/${user.username}`}
              className="flex items-center gap-2"
            >
              <Image
                src={user.image!}
                alt=""
                height={25}
                width={25}
                className="rounded-full "
              />
              <p className="text-[13px] font-[600] text-slate-600 dark:text-slate-400">
                {user.name}
              </p>
            </Link>
            <div className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <FollowUser user={user} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commenters;
