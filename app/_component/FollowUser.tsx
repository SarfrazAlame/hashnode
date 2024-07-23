import UserId from "./UserId";
import Fbutton from "./Fbutton";
import { userFollow } from "@/auth/Recieve";
import { User } from "@prisma/client";

const FollowUser = async ({ user }: { user: User }) => {
  const userId = await UserId();
  const follow = await userFollow(user.id,userId)

  return <Fbutton follow={follow} user={user}/>;
};

export default FollowUser;
