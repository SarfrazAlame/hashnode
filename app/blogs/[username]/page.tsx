import React from "react";

const page = ({ params: { username } }: { params: { username: string } }) => {
  return <div>age {username}</div>;
};

export default page;
