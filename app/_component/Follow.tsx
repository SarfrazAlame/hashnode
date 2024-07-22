"use client";

import { FollowUser } from "@/auth/action";
import { PostWithAll, UserWithAll } from "@/lib/type";
import { Follows } from "@prisma/client";
import { Plus } from "lucide-react";
import React from "react";
import { IoCheckmarkOutline } from "react-icons/io5";

const Follow = ({
  user,
  followUser,
  className,
}: {
  user: UserWithAll;
  followUser: Follows;
  className: string;
}) => {
  return (
    <div>
      {followUser ? (
        <>
          <button
            onClick={() => FollowUser(user?.id)}
            className={`${className} py-1 px-2 rounded-full border text-[13px] flex items-center gap-1`}
          >
            <IoCheckmarkOutline size={16} /> Following
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => FollowUser(user?.id)}
            className={`${className} py-1 px-2 rounded-full bg-blue-600 text-gray-100 text-sm flex items-center gap-2`}
          >
            <Plus size={20} /> Follow
          </button>
        </>
      )}
    </div>
  );
};

export default Follow;
