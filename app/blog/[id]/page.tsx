import { PostById } from "@/auth/Recieve";
import Headers from "@/components/Headers";
import React from "react";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const post = await PostById(id);
  return (
    <div>
      {/* @ts-ignore */}
      <Headers post={post} />
      <div></div>
    </div>
  );
};

export default page;
