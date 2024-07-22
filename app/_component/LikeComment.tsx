import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PostWithAll } from "@/lib/type";
import { Bookmark } from "lucide-react";
import React from "react";
import { FaBookmark, FaRegComments } from "react-icons/fa6";

const LikeComment = ({ post }: { post: PostWithAll }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <FaRegComments className=" text-gray-800 dark:text-slate-300" />
          <p className="text-[13px] text-gray-800 dark:text-slate-300">
            Discuss
          </p>
          <p>.</p>
          {post.like?.length > 0 && <p>{post.like?.length} </p>}
        </div>
        <div className="flex items-center gap-3">
          <p className="text-[13px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-900 cursor-pointer">
            {post.category}
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Bookmark
                  size={20}
                  className="text-slate-600 dark:text-slate-400 cursor-pointer"
                />
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
