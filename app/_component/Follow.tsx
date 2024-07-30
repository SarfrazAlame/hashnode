"use client";

import { FollowUser } from "@/auth/action";
import { UserWithAll } from "@/lib/type";
import { Follows } from "@prisma/client";
import { Plus } from "lucide-react";
import React from "react";
import { IoCheckmarkOutline } from "react-icons/io5";

const Follow = ({
  user,
  followUser,
  className,
  userId,
}: {
  user: UserWithAll;
  followUser: Follows;
  className: string;
  userId: string;
}) => {
  // console.log(followUser)
  return (
    <div>
      {followUser ? (
        <>
          <button
            onClick={() => FollowUser(user?.id, userId)}
            className={`${className} bg-inherit rounded-full border text-[13px] flex items-center gap-1`}
          >
            <IoCheckmarkOutline size={16} /> Following
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => FollowUser(user?.id, userId)}
            className={`${className} rounded-full text-sm flex items-center gap-2`}
          >
            <Plus size={20} /> Follow
          </button>
        </>
      )}
    </div>
  );
};

export default Follow;
