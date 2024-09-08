"use client";

import { FollowUser } from "@/auth/action";
import { PostWithAll, UserWithAll } from "@/lib/type";
import { Follows } from "@prisma/client";
import { Plus } from "lucide-react";
import React, { useOptimistic } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";

const Follow = ({
  user,
  className,
  userId,
  post,
}: {
  user: UserWithAll;
  className: string;
  userId: string;
  post: PostWithAll;
}) => {
  const isFollowing = user.follower?.some((user) => user.followerId === userId);

  const [optimistFollow, addOptimisticFollow] = useOptimistic(
    user.follower,
    // @ts-ignore
    (state: Follows[], newFollow: Follows) => {
      state.some((user) => user.followerId === userId)
        ? state.filter((user) => user.followerId !== userId)
        : [...state, newFollow];
    }
  );

  return (
    <div>
      {isFollowing ? (
        <>
          <button
            onClick={() => FollowUser(user?.id)}
            className={`${className} bg-inherit rounded-full border text-[13px] flex items-center gap-1`}
          >
            <IoCheckmarkOutline size={16} /> Following
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => FollowUser(user?.id)}
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
