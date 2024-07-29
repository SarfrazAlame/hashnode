"use client";
import { FollowUser } from "@/auth/action";
import { UserWithAll } from "@/lib/type";
import { Follows } from "@prisma/client";
import { Plus } from "lucide-react";
import React from "react";
import { IoCheckmark } from "react-icons/io5";

const FollowIcon = ({
  user,
  follow,
  userId
}: {
  user: UserWithAll;
  follow: Follows | { message: string } | null;
  userId:string
}) => {
  return (
    <div>
      {follow ? (
        <>
          <button
            onClick={() => FollowUser(user?.id,userId)}
            className="flex items-center gap-1 border border-blue-500 text-blue-500  px-3 py-2 rounded-full font-[500] text-sm"
          >
            <IoCheckmark size={18} />
            Following
          </button>
        </>
      ) : (
        <button
          onClick={() => FollowUser(user.id,userId)}
          className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-[500] bg-blue-600 text-white "
        >
          <Plus size={18} className="text-white" />
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowIcon;
