import { UserProfile } from "@/auth/Recieve";
import { Pen, PenIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({
  params: { username },
}: {
  params: { username: string };
}) => {
  const user = await UserProfile(username);

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
            <Link
              href={"/blogs/settings"}
              className="flex border px-4 py-2 rounded-full gap-1 items-center bg-blue-600 text-gray-100 dark:text-gray-100"
            >
              <PenIcon size={16} />
              Edit
            </Link>
          </div>
        </div>

        <div className="md:flex h-full md:gap-5 justify-between mt-12">
          <div className="border lg:w-1/3 md:w-1/4 h-1/4 rounded-md py-4">
            <h1 className="text-lg font-bold text-center">About Me</h1>
          </div>
          <div className="border lg:w-1/3 md:w-1/4 h-1/4 rounded-md my-3 py-4 md:my-0">
            <h1 className="text-lg font-bold text-center">My Tech Stack</h1>
          </div>
          <div className="border lg:w-1/3 md:w-1/4 h-1/4 rounded-md py-4">
            <h1 className="text-lg font-bold text-center">
              I am available for
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
