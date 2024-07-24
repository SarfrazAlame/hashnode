'use client'
import { LikePost } from "@/auth/action";
import { Comment } from "@prisma/client";
import React from "react";
import { PiHeartLight } from "react-icons/pi";

const Reply = ({res}:{res:Comment}) => {
  return (
    <div className="flex gap-3 items-center">
      <div className="p-1 w-fit  rounded-full cursor-pointer hover:bg-red-200 hover:dark:bg-red-950">
        <PiHeartLight
          size={22}
          className="hover:text-red-500  font-[500] text-slate-500 dark:text-slate-400"
          onClick={()=>LikePost(res.id)}
        />
      </div>
      <p className="text-[13px] hover:underline cursor-pointer font-[500] text-slate-500 dark:text-slate-400">
        Reply
      </p>
    </div>
  );
};

export default Reply;
