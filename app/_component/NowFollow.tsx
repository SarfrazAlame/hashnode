"use client";
import React from "react";
import { IoCheckmark } from "react-icons/io5";
import { FollowUser } from "@/auth/action";
import { Plus } from "lucide-react";
import { Follows, User } from "@prisma/client";

const NowFollow = ({
  follow,
  user,
}: {
  follow: Follows | { message: string } | null;
  user: User;
}) => {
  return (
    <div>
      {follow ? (
        <>
          <button
            onClick={() => FollowUser(user.id)}
            className="mx-4 bg-white hover:bg-slate-200 dark:bg-slate-950 px-3 py-2 rounded-md border border-slate-200 flex items-center text-sm font-[700] text-blue-600 gap-2"
          >
            <IoCheckmark size={16} />
            Following
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => FollowUser(user.id)}
            className="mx-4 bg-white hover:bg-slate-200 dark:bg-slate-950 px-3 py-2 rounded-md border border-slate-200 flex items-center text-sm font-[700] text-blue-600 gap-2"
          >
            <Plus size={16} />
            Follow
          </button>
        </>
      )}
    </div>
  );
};

export default NowFollow;
