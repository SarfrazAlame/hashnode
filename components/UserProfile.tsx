import Image from "next/image";
import React from "react";

type User =
  | {
      id: string;
      name: string | null | undefined;
      email: string | null | undefined;
      image: string | null | undefined;
      username: string | null | undefined;
      bio: string | null | undefined;
      tagline: string | null | undefined;
    }
  | undefined;

const UserProfile = ({ user }: { user: User }) => {
  return <div>
    <Image src={user?.image!} alt="" width={35} height={35} className="rounded-full"/>
  </div>;
};

export default UserProfile;
