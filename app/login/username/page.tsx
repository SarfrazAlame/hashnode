import ProfileComplete from "@/app/_component/ProfileComplete";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession();
  const user = session?.user;
  return (
    <div>
      <ProfileComplete user={user} />
    </div>
  );
};

export default page;
