import { UserProfile } from "@/auth/Recieve";
import Image from "next/image";
import React from "react";

const page = async ({
  params: { username },
}: {
  params: { username: string };
}) => {
  const user = await UserProfile(username);

  return (
    <div className="w-full h-screen flex ">
      <div className="xl:w-1/2 lg:w-2/3 sm:w-3/4 w-11/12 h-screen my-12 border m-auto p-12">
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
            <p className="text-3xl font-bold">{user?.name}</p>
            <p>{user?.tagline}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
