"use client";
import { BookMarkPost } from "@/auth/action";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PostWithAll } from "@/lib/type";
import { Save } from "@prisma/client";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaRegComments } from "react-icons/fa6";
import { RiBookmarkFill } from "react-icons/ri";

const LikeComment = ({
  post,
  bookmark,
}: {
  post: PostWithAll;
  bookmark: Save | { message: string } | null;
}) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Link
            href={`/blogs/discussions/${post.id}`}
            className="flex gap-2 items-center"
          >
            <FaRegComments className=" text-gray-800 dark:text-slate-300" />
            <p className="text-[13px] text-gray-800 dark:text-slate-300">
              Discuss
            </p>
          </Link>
          <p className="-mt-2">.</p>
          {post.likes?.length > 0 && (
            <p className="text-[13px] mt-0.5">{post.likes?.length} likes</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <p className="text-[13px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-900 cursor-pointer">
            {post.category}
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {bookmark ? (
                  <>
                    <RiBookmarkFill
                      onClick={() => BookMarkPost(post.id)}
                      size={20}
                      className="text-slate-600 dark:text-slate-400 cursor-pointer"
                    />
                  </>
                ) : (
                  <>
                    <Bookmark
                      onClick={() => BookMarkPost(post.id)}
                      size={20}
                      className="text-slate-600 dark:text-slate-400 cursor-pointer"
                    />
                  </>
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-[11px]">Save for later</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default LikeComment;
