import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const UserId = async () => {
  const user = await getServerSession(authOptions);
  const userId = user?.user.id;
  if (!userId) {
    throw new Error("Unauthorized user");
  }
  return userId;
};

export default UserId;
