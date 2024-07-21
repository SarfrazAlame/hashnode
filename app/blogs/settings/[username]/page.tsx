import Setting from "@/app/_component/Setting";
import { UserProfile } from "@/auth/Recieve";
import { Settings } from "lucide-react";
import React from "react";
import { HiCodeBracket, HiOutlineUserCircle } from "react-icons/hi2";
import { PiNotebookThin } from "react-icons/pi";

const page = async ({
  params: { username },
}: {
  params: { username: string };
}) => {
  const user = await UserProfile(username);
  return (
    <main className="w-full h-screen flex justify-center">
      <div className="w-full flex justify-center gap-5 my-6">
        <div className="w-1/6 h-fit flex flex-col gap-y-2">
          <div className="border rounded-md text-2xl font-bold h-14  px-3 py-2.5">
            User Settings
          </div>
          <div className="border rounded-md flex flex-col gap-y-2">
            <div className="flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-900">
              <HiOutlineUserCircle
                size={25}
                className="text-gray-600 font-light dark:text-gray-300"
              />
              <p className="text-[13px] font-semibold text-gray-600 dark:text-slate-300">
                PROFILE
              </p>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-900">
              <PiNotebookThin
                size={25}
                className="text-gray-600 font-light dark:text-gray-50"
              />
              <p className="text-[13px] font-semibold text-gray-600 dark:text-slate-300">
                MANAGE BLOGS
              </p>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-900">
              <HiCodeBracket
                size={25}
                className="text-gray-600 font-light dark:text-gray-200"
              />
              <p className="text-[13px] font-semibold text-gray-600 dark:text-slate-300">
                DEVELOPER
              </p>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-900">
              <Settings
                size={25}
                className="text-gray-600 font-light dark:text-gray-200"
              />
              <p className="text-[13px] font-semibold text-gray-600 dark:text-slate-300">
                ACCOUNT
              </p>
            </div>
          </div>
        </div>
        <Setting user={user}/>
      </div>
    </main>
  );
};

export default page;
