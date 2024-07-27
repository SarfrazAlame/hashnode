"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaHashnode } from "react-icons/fa6";

const page = () => {
  return (
    <div className="w-full flex flex-col items-center my-16 justify-center">
      <div className="w-3/4 mx-auto flex flex-col gap-y-12">
        <Link href={"/"} className="text-end">
          Go back
        </Link>
        <div className="w-full h-full flex justify-center gap-20">
          <div className="border w-1/3 flex flex-col items-center rounded-3xl">
            <div className="flex items-center my-8 gap-1">
              <FaHashnode size={32} className="fill-blue-600" />
              <p className="text-2xl font-extrabold">Hashnode</p>
            </div>
            <div className="flex flex-col items-center"> 
              <p className="text-lg font-semibold text-gray-800 dark:text-slate-200">
                Log in or Sign up
              </p>
              <button
                onClick={() =>
                  signIn("google", { callbackUrl: "/login/username" })
                }
                className="py-2.5 w-80 bg-blue-600 text-white rounded-full border my-3"
              >
                Continue with Google
              </button>
            </div>
            <div className="flex items-center">
              <p className="text-[12px] p-12 text-center">
                By logging in or signing up using the options above, you agree
                to Hashnode's Terms & Conditions and Privacy Policy
              </p>
            </div>
          </div>
          <div className="w-1/3">
            <p>
              "It's amazing to see how fast devs go from 0 to Blog under a
              domain they own on Hashnode 🤯. It reminds me a lot of what
              Substack did for journalists."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
