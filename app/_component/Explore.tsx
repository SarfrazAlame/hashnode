import { userFollow } from "@/auth/Recieve";
import { User } from "@prisma/client";
import React from "react";
import NowFollow from "./NowFollow";
import { getUserId } from "@/lib/utils";

const Explore = async ({ user }: { user: User }) => {
  const follow = await userFollow(user.id);
  return (
    <div>
     <NowFollow follow={follow} user={user}/>
    </div>
  );
};

export default Explore;
