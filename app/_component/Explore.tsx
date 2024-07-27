import { userFollow } from "@/auth/Recieve";
import { User } from "@prisma/client";
import React from "react";
import NowFollow from "./NowFollow";
import { getUserId } from "@/lib/utils";

const Explore = async ({ user }: { user: User }) => {
  const userId = await getUserId();
  const follow = await userFollow(user.id, userId);
  return (
    <div>
      <NowFollow follow={follow} user={user} />
    </div>
  );
};

export default Explore;
