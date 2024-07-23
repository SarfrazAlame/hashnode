import { AllUser, BlogPost, UserProfile } from "@/auth/Recieve";
import { Medal } from "lucide-react";
import { LiaPencilAltSolid } from "react-icons/lia";
import { MdPeople } from "react-icons/md";
import Post from "../_component/Post";
import Image from "next/image";
import FollowUser from "../_component/FollowUser";

const page = async () => {
  const { posts } = await BlogPost();
  const {users} = await AllUser()

  return (
    <main className="flex w-full justify-center items-center">
      <div className="flex w-7/12 gap-8 my-8">
        <div className="w-2/3 flex flex-col gap-y-6">
          <div className="w-2/3 flex gap-2">
            <div className="flex w-fit px-3 py-1.5 rounded-full items-center gap-1 hover:bg-slate-100 hover:dark:bg-slate-900 cursor-pointer">
              <LiaPencilAltSolid className="text-gray-500 dark:text-slate-300" />
              <p className="text-[13px] font-semibold text-slate-500 dark:text-slate-200 ">
                Personalized
              </p>
            </div>
            <div className="flex w-fit px-3 py-1.5 rounded-full items-center gap-1 hover:bg-slate-100 hover:dark:bg-slate-900 cursor-pointer">
              <MdPeople className="text-gray-500 dark:text-slate-300" />
              <p className="text-[13px] font-semibold text-slate-500 dark:text-slate-200 ">
                Following
              </p>
            </div>
            <div className="flex w-fit px-3 py-1.5 rounded-full items-center gap-1 hover:bg-slate-100 hover:dark:bg-slate-900 cursor-pointer">
              <Medal size={16} className="text-gray-500 dark:text-slate-300" />
              <p className="text-[13px] font-semibold text-slate-500 dark:text-slate-200 ">
                Featured
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            {posts?.map((post) => (
              // @ts-ignore
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div className="border h-fit w-1/3 mt-14 rounded-lg p-5">
          <h1 className="font-semibold text-lg text-slate-700 dark:text-slate-200">
            Top commenters this week
          </h1>
          <div className="flex flex-col gap-y-5 my-4">
            {users?.map((user) => (
              <div key={user.id} className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={user.image!}
                    alt=""
                    height={25}
                    width={25}
                    className="rounded-full "
                  />
                  <p className="text-[13px] font-[600] text-slate-600 dark:text-slate-400">
                    {user.name}
                  </p>
                </div>
                <div className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                  <FollowUser user={user} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
export default page;
