'use client'
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { RiDraftFill } from "react-icons/ri";
import { Bookmark, LogOut, Notebook } from "lucide-react";
import { MdAccountCircle } from "react-icons/md";
import { signOut } from "next-auth/react";

type User =
  | {
      id: string;
      name: string | null | undefined;
      email: string | null | undefined;
      image: string | null | undefined;
      username: string | null | undefined;
      bio: string | null | undefined;
      tagline: string | null | undefined;
    }
  | undefined;

const UserProfile = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={user?.image!}
          alt=""
          width={35}
          height={35}
          className="rounded-full cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="py-4 w-56">
        <DropdownMenuItem className="flex items-center gap-1  cursor-pointer">
          <Image
            src={user?.image!}
            alt=""
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p>{user?.name}</p>
            <p>{user?.username}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2 my-2 cursor-pointer">
          <Notebook size={16} />
          <p className="text-[13px]">My drafts</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 my-2 cursor-pointer">
          <Bookmark size={16} />
          <p className="text-[13px]">Bookmarks</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 my-2 cursor-pointer">
          <MdAccountCircle size={16} />
          <p className="text-[13px]">Account settings</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2 mt-3 cursor-pointer" onClick={()=>signOut({callbackUrl:'/login'})}>
          <LogOut size={16} />
          <p className="text-[13px] text-orange-600">Log out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
