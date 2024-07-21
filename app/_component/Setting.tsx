"use client";
import { UserSchema } from "@/lib/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type User = {
  id: string;
  name: string | null;
  username: string | null;
  bio: string | null;
  tagline: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  location: string | null;
  tech: string | null;
  available: string | null;
  createdAt: Date;
  updatedAt: Date;
} | null;


const Setting = ({ user }: { user: User }) => {
  const {} = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: user?.name!,
      email: user?.email!,
      image: user?.image!,
      username: user?.username!,
      bio: user?.bio!,
      tagline: user?.tagline!,
      location: user?.location!,
      tech: user?.tech!,
      available: user?.available!,
    },
  });
  return (
    <div className="w-1/2 h-fit border flex gap-2 rounded-md">
      <div className="w-1/2 flex flex-col gap-y-4">
        <p>Basic info</p>
      </div>
      <div className="w-1/2">
        <p>Social</p>
      </div>
    </div>
  );
};

export default Setting;
