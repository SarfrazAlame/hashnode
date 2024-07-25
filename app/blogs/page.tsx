
import React from "react";
import AllPost from "../_component/AllPost";
import { getAuthOptions } from "@/lib/auth";

const page = async() => {
  const session = await getAuthOptions();
  return <AllPost />;
};

export default page;
