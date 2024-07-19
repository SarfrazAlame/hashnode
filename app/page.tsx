"use client";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return redirect("/blogs");
};

export default page;
