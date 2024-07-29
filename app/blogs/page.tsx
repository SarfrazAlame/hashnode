import dynamic from "next/dynamic";
import React, { Suspense } from "react";
// import AllPost from "../_component/AllPost";

const AllPost = dynamic(() => import("../_component/AllPost"), {
  loading: () => <p>I am loading...</p>,
});

const page = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <AllPost />
    </Suspense>
  );
};

export default page;
