"use client";
import { FollowUser } from "@/auth/action";
import { Follows, User } from "@prisma/client";
import React from "react";

const Connect = ({
  user,
  userId,
  follow,
}: {
  user: User;
  userId: string;
  follow: Follows | { message: string } | null;
}) => {
  return (
    <div className="mx-auto">
      {follow ? (
        <button
          onClick={() => FollowUser(user.id,userId)}
          className="px-5 border py-2 rounded-full border-blue-500 text-center text-blue-500"
        >
          following
        </button>
      ) : (
        <button
          onClick={() => FollowUser(user.id,userId)}
          className="px-5 border py-2 rounded-full border-blue-500 text-blue-500"
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default Connect;
