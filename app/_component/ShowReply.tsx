"use client";
import { DeleteReply } from "@/auth/action";
import { ReplyWithUser } from "@/lib/type";
import Image from "next/image";
import React from "react";

const ShowReply = ({ replies }: { replies: ReplyWithUser[] | undefined }) => {
  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dece",
  ];
  return (
    <div>
      {replies?.map((reply) => (
        <div>
          <div className="flex gap-2 items-center">
            <Image
              src={reply.user.image!}
              alt=""
              width={30}
              height={30}
              className="rounded-full"
            />
            <p className="text-[13px] font-[600] text-slate-600 dark:text-slate-200">
              {reply.user.name}
            </p>
            {/* <button onClick={()=>DeleteReply(reply.id)}>delete</button> */}
            <p>{monthNames[reply?.createdAt?.getMonth()]}</p>
          </div>
          <p className="mx-10 text-[14px] text-slate-600 dark:text-slate-400">
            {reply.response}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ShowReply;
