"use client";

import { FollowUser } from "@/auth/action";
import { PostWithAll, UserWithAll } from "@/lib/type";
import { Follows } from "@prisma/client";
import { Plus } from "lucide-react";
import React from "react";
import { IoCheckmarkOutline } from "react-icons/io5";

const Follow = ({
  user,
  post,
  followUser,
}: {
  user: UserWithAll;
  post: PostWithAll;
  followUser: Follows;
}) => {
  return (
    <div>
      {followUser ? (
        <>
          <button
            onClick={() => FollowUser(user?.id)}
            className="py-1 px-2 rounded-full border border-blue-600 text-blue-500 text-[13px] flex items-center gap-1"
          >
            <IoCheckmarkOutline  size={16} /> Following
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => FollowUser(user?.id)}
            className="py-1 px-2 rounded-full bg-blue-600 text-gray-100 text-sm flex items-center gap-2"
          >
            <Plus size={20} /> Follow
          </button>
        </>
      )}
    </div>
  );
};

export default Follow;
