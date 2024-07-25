import Fbutton from "./Fbutton";
import { userFollow } from "@/auth/Recieve";
import { User } from "@prisma/client";

const FollowUser = async ({ user }: { user: User }) => {
  const follow = await userFollow(user?.id)

  return <Fbutton follow={follow} user={user}/>;
};

export default FollowUser;
