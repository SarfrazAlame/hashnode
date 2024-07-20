import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

const UserId = async () => {
  const user = await getServerSession(authOptions);
  const userId = user?.user.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return userId;
};

export default UserId;
