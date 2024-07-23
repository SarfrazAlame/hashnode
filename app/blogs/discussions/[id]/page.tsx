import Connect from "@/app/_component/Connect";
import Conversation from "@/app/_component/Conversation";
import Discussion from "@/app/_component/Discussion";
import Discussions from "@/app/_component/Discussions";
import LikeComment from "@/app/_component/LikeComment";
import UserId from "@/app/_component/UserId";
import { FollowUser } from "@/auth/action";
import { BookMark, PostById, userFollow } from "@/auth/Recieve";
import { authOptions } from "@/lib/auth";
import { PostWithAll } from "@/lib/type";
import { getServerSession } from "next-auth";
import React from "react";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  // @ts-ignore
  const post = (await PostById(id)) as PostWithAll;
  const ownerUser = await getServerSession(authOptions);
  const bookmark = await BookMark(post.id, ownerUser?.user.id!);
  const userId = await UserId();
  const user = ownerUser?.user;
  const follow = await userFollow(post.user.id, userId);
  return (
    <Conversation
      post={post}
      bookmark={bookmark}
      userId={userId}
      // @ts-ignore
      user={user}
      follow={follow}
    />
  );
};

export default page;
