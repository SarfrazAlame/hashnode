import { AllUser, BlogPost } from "@/auth/Recieve";
import { getAuthOptions } from "@/lib/auth";
import { useMemo } from "react";
import dynamic from "next/dynamic";

const BelowHead = dynamic(() => import("@/components/BelowHead"), {
  loading: () => <p>Loading....</p>,
});
const Commenters = dynamic(() => import("../_component/Commenters"));

const AllPost = async () => {
  const Allposts = useMemo(async () => BlogPost(), []);
  const Allusers = AllUser();
  const MainUser = getAuthOptions();

  const [posts, users, ownerUser] = await Promise.all([
    Allposts,
    Allusers,
    MainUser,
  ]);

  return (
    <main className="flex w-full justify-center items-center">
      <div className="flex lg:w-fit w-full justify-center mx-3 lg:mx-0 gap-8 my-8">
        <div className="lg:w-2/3 flex flex-col gap-y-6">
          <BelowHead posts={posts.posts} />
        </div>
        {/* @ts-ignore */}
        <Commenters user={users.users}/>
      </div>
    </main>
  );
};
export default AllPost;
