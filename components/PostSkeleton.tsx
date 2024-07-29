import React from "react";
import { Skeleton } from "./ui/skeleton";

const PostSkeleton = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col gap-y-1">
        <div className="flex w-fit">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-44 rounded-full" />
        </div>
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-12 w-[47rem]" />
          <Skeleton className="h-32 w-[47rem]" />
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
