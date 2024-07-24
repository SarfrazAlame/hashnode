"use client";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Bookmark, LogOut, Notebook } from "lucide-react";
import { MdAccountCircle } from "react-icons/md";
import { signOut } from "next-auth/react";
import Link from "next/link";

type User = {
  id: string;
  name: string | null;
  username: string | null;
  bio: string | null;
  tagline: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

const UserProfile = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={user?.image || ""}
          alt=""
          width={35}
          height={35}
          className="rounded-full cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="py-4 w-56">
        <DropdownMenuItem>
          <Link
            className="flex items-center gap-1  cursor-pointer"
            href={`/blogs/${user.username}`}
          >
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
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2 my-2 cursor-pointer">
          <Notebook size={16} />
          <Link href={`/draft`} className="text-[13px]">
            My drafts
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 my-2 cursor-pointer">
          <Bookmark size={16} />
          <p className="text-[13px]">Bookmarks</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 my-2 cursor-pointer">
          <MdAccountCircle size={16} />
          <Link href={`/blogs/${user.username}`} className="text-[13px]">
            Account settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex gap-2 mt-3 cursor-pointer"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut size={16} />
          <p className="text-[13px] text-orange-600">Log out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
