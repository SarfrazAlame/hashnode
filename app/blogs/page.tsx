
import React from "react";
import AllPost from "../_component/AllPost";
import { getAuthOptions } from "@/lib/auth";

const page = async() => {
  const session = await getAuthOptions();
  if(!session?.user) return <p>loading...</p>
  return <AllPost />;
};

export default page;
