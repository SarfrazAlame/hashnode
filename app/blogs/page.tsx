import PostSkeleton from "@/components/PostSkeleton";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
// import AllPost from "../_component/AllPost";

const AllPost = dynamic(() => import("../_component/AllPost"), {
  loading: () => (
    <p>
      <PostSkeleton />
    </p>
  ),
});

const page = () => {
  return <AllPost />;
};

export default page;
