import Fbutton from "./Fbutton";
import { userFollow } from "@/auth/Recieve";
import { getUserId } from "@/lib/utils";
import { User } from "@prisma/client";

const FollowUser = async ({ user }: { user: User }) => {
  const userId = await getUserId()
  const follow = await userFollow(user?.id,userId)

  return <Fbutton follow={follow} user={user} userId={userId}/>;
};

export default FollowUser;
