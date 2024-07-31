'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const page = () => {
  const {data:session} = useSession()
  const userId = session?.user.id
  if (!userId) {
    redirect("/login");
  }
  return redirect("/blogs");
};

export default page;
