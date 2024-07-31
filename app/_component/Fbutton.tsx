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

const Fbutton = ({ user, userId }: { user: User; userId: string }) => {
  const isFollow = undefined;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {isFollow ? (
            <>
              <IoCheckmark
                className="cursor-pointer"
                onClick={() => FollowUser(user.id)}
              />
            </>
          ) : (
            <>
              <SlUserFollow
                className="cursor-pointer"
                onClick={() => FollowUser(user.id)}
              />
            </>
          )}
        </TooltipTrigger>
        <TooltipContent>
          {isFollow ? <p>Unfollow user</p> : <p>Follow user</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Fbutton;
