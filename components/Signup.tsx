import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <div>
      <div className="flex gap-5 items-center">
        <Link href={"/login"} className="text-sm">
          Log in
        </Link>
        <Link
          href={"/login"}
          className="text-sm border px-3 py-2.5 rounded-full border-blue-600 bg-blue-600 text-gray-100"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Signup;
