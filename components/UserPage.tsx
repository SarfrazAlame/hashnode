import { Post, User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import SwitchThemeProvider from "./SwitchThemeProvider";
import { Search } from "lucide-react";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsStackOverflow,
} from "react-icons/bs";
import Link from "next/link";

const UserPage = ({
  user,
  ownerUser,
}: {
  user: User & Post;
  ownerUser: User;
}) => {
  return (
    <div className="h-56 bg-yellow-500  justify-around flex  gap-y-2">
      <div className="flex h-24 items-center gap-3">
        <div className="relative">
          <Image
            src={user.image!}
            alt=""
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="absolute top-20 flex gap-6 ">
            <Link href={`${user.instagram}`}>
              <BsInstagram size={22} className="text-slate-700" />
            </Link>
            <Link href={`${user.github}`}>
              <BsGithub size={22} className="text-slate-700" />
            </Link>
            <Link href={`${user.linkedin}`}>
              <BsLinkedin size={22} className="text-slate-700" />
            </Link>

            <Link href={`${user.stackoverflow}`}>
              <BsStackOverflow size={22} className="text-slate-700" />
            </Link>
            <Link href={`${user.facebook}`}>
              <BsFacebook size={22} className="text-slate-700" />
            </Link>
          </div>
        </div>
        <p className="text-xl font-extrabold">{user.name}</p>
      </div>
      <div className="flex h-24 gap-5 items-center">
        <Search />
        <SwitchThemeProvider style="" />
        <div>
          <Image
            src={ownerUser.image!}
            alt=""
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
