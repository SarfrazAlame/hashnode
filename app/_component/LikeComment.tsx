"use client";
import { BookMarkPost } from "@/auth/action";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PostWithAll } from "@/lib/type";
import Link from "next/link";
import React, { useOptimistic } from "react";
import { FaRegComments } from "react-icons/fa6";
import { Save } from "@prisma/client";
import { Bookmark } from "lucide-react";
import toast from "react-hot-toast";

const LikeComment = ({
  post,
  userId,
}: {
  post: PostWithAll;
  userId: string;
}) => {
  const predicate = (bookmark: Save) =>
    bookmark.userId === userId && bookmark.postId === post.id;

  const [optimisticBookmark, addOptimisticBookmark] = useOptimistic<Save[]>(
    post.saves,
    // @ts-ignore
    (state: Save[], newBookmark: Save) =>
      state?.find(predicate)
        ? state.filter((save) => save.userId !== userId)
        : [...state, newBookmark]
  );

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
                <form
                  action={async (formData: FormData) => {
                    const postId = formData.get("postId") as string;
                    addOptimisticBookmark({ userId, postId });
                    await BookMarkPost(postId);
                  }}
                >
                  <input type="hidden" name="postId" value={post.id} />
                  <button type="submit">
                    <Bookmark
                      className={
                        optimisticBookmark?.some(predicate)
                          ? "text-gray-800 fill-gray-800 dark:text-gray-50 dark:fill-gray-50"
                          : "text-slate-800 dark:text-slate-200"
                      }
                    />
                  </button>
                </form>
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
