import ProfileComplete from "@/app/_component/ProfileComplete";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";

const page = async() => {
    const session = await getServerSession(authOptions)
    const user = session?.user
  return (
    <div>
      <ProfileComplete user={user}/>
    </div>
  );
};

export default page;
