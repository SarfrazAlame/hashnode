import { Bell, SearchIcon } from "lucide-react";
import React from "react";
import { FaHashnode } from "react-icons/fa6";
import { TbPencilMinus } from "react-icons/tb";
import SwitchThemeProvider from "./SwitchThemeProvider";
import UserProfile from "./UserProfile";
import Link from "next/link";
import Signup from "./Signup";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { getUserId } from "@/lib/utils";
import { authOptions} from "@/lib/auth";
import { UserDetails } from "@/auth/Recieve";
import { getServerSession } from "next-auth";

const Header = async () => {
  const userId = await getUserId();
  const session = await getServerSession(authOptions);
  const mainUser = await UserDetails(session?.user.id!);
  const style = "text-gray-500";

  const user = session?.user;

  return (
    <div className="h-[67px] w-full flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-slate-100 dark:bg-gray-900 md:px-12 sm:px-5 px-3">
      <div className="flex items-center gap-1">
        <FaHashnode className="fill-blue-600" size={24} />
        <Link
          href={"/blogs"}
          className="text-xl hidden sm:flex font-bold text-gray-800 dark:text-gray-300"
        >
          Hashnode
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-10">
        <Link
          href={"/blogs"}
          className="text-[13px] font-semibold text-gray-500 dark:text-gray-300 cursor-pointer hover:border hover:border-gray-300 dark:hover:border-gray-700 px-4  py-1.5 rounded-full"
        >
          My Feed
        </Link>
        <Link
          href={"/blogs/discussion"}
          className="text-[13px] font-semibold text-gray-500 dark:text-gray-300 cursor-pointer hover:border hover:border-gray-300 dark:hover:border-gray-700 px-4  py-1.5 rounded-full"
        >
          Discussions
        </Link>
        <Link
          href={"/blogs/explore"}
          className="text-[13px] font-semibold text-gray-500 dark:text-gray-300 cursor-pointer hover:border hover:border-gray-300 dark:hover:border-gray-700 px-4  py-1.5 rounded-full"
        >
          Explore
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <SearchIcon
          size={20}
          className="text-gray-500 cursor-pointer dark:text-gray-300"
        />
        <div className="flex gap-1 items-center bg-blue-600 py-1.5 px-3 rounded-full">
          <TbPencilMinus className="text-white cursor-pointer" />
          {userId ? (
            <>
              <Link href={"/draft"} className="text-white text-[13px]">
                Write
              </Link>
            </>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button className="text-white text-[13px]">Write</button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <p>Please Sign in to write blogs</p>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
        {userId ? (
          <>
            <div>
              <SwitchThemeProvider style={style} />
            </div>
            <Bell
              size={22}
              className="text-gray-500 cursor-pointer dark:text-gray-300"
            />
            {/* @ts-ignore */}
            <UserProfile user={user} mainUser={mainUser} />
          </>
        ) : (
          <>
            <div>
              <SwitchThemeProvider style={style} />
            </div>
            <Bell
              size={22}
              className="text-gray-500 cursor-pointer dark:text-gray-300"
            />
            <Signup />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
