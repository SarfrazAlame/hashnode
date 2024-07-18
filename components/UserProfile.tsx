import React from "react";

const UserProfile = () => {
  return (
    <div>
      <div className="flex gap-5">
        <button className="text-sm">Log in</button>
        <button className="text-sm border px-3 py-2.5 rounded-full border-blue-600 bg-blue-600 text-gray-100">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
