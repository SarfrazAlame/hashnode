"use client";
import { FollowUser } from "@/auth/action";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Follows, User } from "@prisma/client";
import { IoCheckmark } from "react-icons/io5";
import { SlUserFollow } from "react-icons/sl";

const Fbutton = ({
  follow,
  user,
  userId
}: {
  follow: Follows | { message: string } | null;
  user: User;
  userId:string
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {follow ? (
            <>
              <IoCheckmark
                className="cursor-pointer"
                onClick={() => FollowUser(user.id,userId)}
              />
            </>
          ) : (
            <>
              <SlUserFollow
                className="cursor-pointer"
                onClick={() => FollowUser(user.id,userId)}
              />
            </>
          )}
        </TooltipTrigger>
        <TooltipContent>
          {follow ? <p>Unfollow user</p> : <p>Follow user</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Fbutton;
