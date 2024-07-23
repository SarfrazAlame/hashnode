import FollowIcon from "@/app/_component/FollowIcon";
import UserId from "@/app/_component/UserId";
import { userFollow, UserProfile } from "@/auth/Recieve";
import { authOptions } from "@/lib/auth";
import { PenIcon, Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaLocationDot,
  FaStackOverflow,
} from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";

const page = async ({
  params: { username },
}: {
  params: { username: string };
}) => {
  const user = await UserProfile(username) ;
  const ownerUser = await getServerSession(authOptions);
  const userId = await UserId()
  const follow = await userFollow(user?.id!,userId)

  return (
    <div className="w-full h-screen flex ">
      <div className="xl:w-1/2 lg:w-2/3 sm:w-11/12 w-11/12 h-screen my-12 md:border rounded-md m-auto lg:py-12 sm:py-6 py-3 lg:px-20 md:px-12 sm:px-4 px-2 ">
        <div className="sm:flex w-full justify-between">
          <div className="flex gap-8">
            <div>
              <Image
                src={user?.image!}
                alt=""
                height={100}
                width={100}
                className="rounded-full cursor-pointer "
              />
            </div>
            <div>
              <p className="text-3xl font-bold cursor-pointer">{user?.name}</p>
              <p>{user?.tagline}</p>
            </div>
          </div>
          <div className="mx-32 sm:mx-0 -mt-6 sm:">
            {user?.id === ownerUser?.user.id ? (
              <Link
                href={`/blogs/settings/${user?.username}`}
                className="flex border cursor-pointer px-4 py-2 rounded-full gap-1 items-center bg-blue-600 text-gray-100 dark:text-gray-100"
              >
                <PenIcon size={16} />
                Edit
              </Link>
            ) : (
              // @ts-ignore
             <FollowIcon user={user} follow={follow}/>
            )}
          </div>
        </div>

        <div className="my-6 border flex items-center gap-8 justify-center h-20 rounded-md">
          <div className="flex items-center gap-4 justify-center">
            <Link
              href={`${user?.linkedin}`}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <FaLinkedin className="text-gray-500 dark:text-gray-400" />
            </Link>
            <Link
              href={`${user?.stackoverflow}`}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <FaStackOverflow className="text-gray-500 dark:text-gray-400" />
            </Link>
            <Link
              href={`${user?.github}`}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <FaGithub className="text-gray-500 dark:text-gray-400" />
            </Link>
            <Link
              href={`${user?.website}`}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {" "}
              <TbWorld className="text-gray-500 dark:text-gray-400" />
            </Link>
            <Link
              href={`${user?.facebook}`}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {" "}
              <FaFacebook className="text-gray-500 dark:text-gray-400" />
            </Link>
            <Link
              href={`${user?.instagram}`}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {" "}
              <FaInstagram className="text-gray-500 dark:text-gray-400" />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <FaLocationDot className="text-gray-500 dark:text-gray-400" />
            <p className="text-sm">{user?.location}</p>
          </div>
        </div>

        <div className="md:flex h-full md:gap-5 justify-between mt-12">
          <div className="border lg:w-1/3 md:w-1/4 h-1/4 rounded-md py-4">
            <h1 className="text-lg font-bold text-center text-gray-700 dark:text-gray-200">
              About Me
            </h1>
            <p className="text-center my-5 px-6 text-sm">{user?.bio}</p>
          </div>
          <div className="border lg:w-1/3 md:w-1/4 h-1/4 rounded-md my-3 py-4 md:my-0">
            <h1 className="text-lg font-bold text-center text-gray-700 dark:text-gray-200">
              My Tech Stack
            </h1>
            <p className="text-center my-5 px-6 text-sm">{user?.tech}</p>
          </div>
          <div className="border lg:w-1/3 md:w-1/4 h-1/4 rounded-md py-4">
            <h1 className="text-lg font-bold text-center text-gray-700 dark:text-gray-200">
              I am available for
            </h1>
            <p className="text-center my-5 px-6 text-sm">{user?.available}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
