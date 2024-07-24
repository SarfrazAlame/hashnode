import { userFollow } from "@/auth/Recieve";
import { User } from "@prisma/client";
import React from "react";
import UserId from "./UserId";
import NowFollow from "./NowFollow";

const Explore = async ({ user }: { user: User }) => {
  const userId = await UserId();
  const follow = await userFollow(user.id, userId);
  return (
    <div>
     <NowFollow follow={follow} user={user}/>
    </div>
  );
};

export default Explore;
