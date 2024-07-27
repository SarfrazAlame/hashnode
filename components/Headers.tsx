import { PostWithAll } from "@/lib/type";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoChevronLeft } from "react-icons/go";
import SwitchThemeProvider from "./SwitchThemeProvider";
import Follow from "@/app/_component/Follow";
import { userFollow, UserProfile } from "@/auth/Recieve";
import { getAuthOptions } from "@/lib/auth";
import { getUserId } from "@/lib/utils";

const Headers = async ({ post }: { post: PostWithAll }) => {
  const user = await UserProfile(post?.user.username!);
  const ownerUser = await getAuthOptions();
  const userId = await getUserId()
  const followUser = await userFollow(post?.user.id,userId);
  const style = "text-gray-200";

  return (
    <div className="h-20 sticky top-0 flex items-center justify-around w-full bg-blue-500">
      <div className="flex items-center gap-2">
        <Link href={"/blogs"}>
          <GoChevronLeft size={28} className="mx-4 text-slate-200" />
        </Link>
        <Link
          href={`/random/${post?.user.id}`}
          className="flex items-center gap-2"
        >
          <Image
            src={post?.user.image!}
            alt=""
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="text-xl text-white font-bold">{post?.user.name}</p>
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <Search size={20} className="text-white" />
        <SwitchThemeProvider style={style} />
        <Follow
          // @ts-ignore
          user={user}
          // @ts-ignore
          followUser={followUser}
          className="border-white py-2 px-4 bg-white text-black"
        />
        <Image
          src={ownerUser?.user.image!}
          alt=""
          height={35}
          width={35}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Headers;
