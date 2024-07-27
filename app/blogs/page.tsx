import { AllUser, BlogPost } from "@/auth/Recieve";
import Commenters from "../_component/Commenters";
import { getAuthOptions } from "@/lib/auth";
import BelowHead from "@/components/BelowHead";

const page = async () => {
  const { users } = await AllUser();
  const { posts } = await BlogPost();
  const ownerUser = await getAuthOptions();

  return (
    <main className="flex w-full justify-center items-center">
      <div className="flex lg:w-fit w-full justify-center mx-3 lg:mx-0 gap-8 my-8">
        <div className="lg:w-2/3 flex flex-col gap-y-6">
          <BelowHead posts={posts} />
        </div>
        {/* @ts-ignore */}
        <Commenters user={users} ownerUser={ownerUser?.user} />
      </div>
    </main>
  );
};
export default page;
