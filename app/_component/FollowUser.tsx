import { userFollow } from "@/auth/Recieve";
import { getUserId } from "@/lib/utils";
import { User } from "@prisma/client";
import Fbutton from "./Fbutton";

const FollowUser = async ({ user }: { user: User }) => {
  const userId = await getUserId()

  return <Fbutton user={user} userId={userId}/>;
};

export default FollowUser;
