import { PostWithAll } from "@/lib/type";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoChevronLeft } from "react-icons/go";
import SwitchThemeProvider from "./SwitchThemeProvider";
import Follow from "@/app/_component/Follow";
import { userFollow, UserProfile } from "@/auth/Recieve";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const Headers = async ({ post }: { post: PostWithAll }) => {
  const user = await UserProfile(post.user.username!);
  const ownerUser = await getServerSession(authOptions);
  const followUser = await userFollow(post.user.id, ownerUser?.user.id!);
  const style = "text-gray-200";


  return (
    <div className="h-20 flex items-center justify-around w-full bg-blue-500">
      <div className="flex items-center gap-2">
        <Link href={"/blogs"}>
          <GoChevronLeft size={28} className="mx-4 text-slate-200" />
        </Link>
        <Image
          src={post?.user.image!}
          alt=""
          width={40}
          height={40}
          className="rounded-full"
        />
        <p className="text-xl text-white font-bold">{post?.user.name}</p>
      </div>
      <div className="flex items-center gap-5">
        <Search size={20} className="text-white" />
        <SwitchThemeProvider style={style} />
        {/* @ts-ignore */}
        <Follow user={user} followUser={followUser} className="text-white border-white"/>
      </div>
    </div>
  );
};

export default Headers;
