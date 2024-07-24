"use client";
import { DeleteReply } from "@/auth/action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReplyWithUser } from "@/lib/type";
import Image from "next/image";
import React from "react";
import { BsThreeDots } from "react-icons/bs";

const ShowReply = ({
  replies,
  userId,
}: {
  replies: ReplyWithUser[] | undefined;
  userId: string;
}) => {
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
    <div className="flex flex-col gap-y-4">
      {replies?.map((reply) => (
        <div className="flex w-[23rem] justify-between">
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
              <p className="text-[13px] text-slate-600 dark:text-slate-400">
                {monthNames[reply.createdAt?.getMonth()]}{" "}
                {reply.createdAt.getDate()} {reply.createdAt.getFullYear()}
              </p>
            </div>
            <p className="mx-10 text-[14px] text-slate-600 dark:text-slate-400">
              {reply.response}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="h-fit">
              <BsThreeDots />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {reply.userId === userId ? (
                <>
                  <button
                    onClick={() => DeleteReply(reply.id)}
                    className="text-sm text-red-500 text-center"
                  >
                    delete
                  </button>
                </>
              ) : (
                <>
                  <p className="text-[13px] text-center text-orange-700">report</p>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
};

export default ShowReply;
