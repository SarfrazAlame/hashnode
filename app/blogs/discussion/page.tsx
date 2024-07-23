import Commenters from "@/app/_component/Commenters";
import { AllUser } from "@/auth/Recieve";
import React from "react";

const page = async () => {
  const { users } = await AllUser();
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-auto ">
        <div className="w-1/2 border">s</div>
        <div className=""><Commenters user={users} /></div>
      </div>
    </div>
  );
};

export default page;
