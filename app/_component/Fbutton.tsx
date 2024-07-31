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

const Fbutton = ({ user, userId }: { user: User &{followers:Follows,followings:Follows}; userId: string }) => {
  const isFollow = user.followers.followerId===userId
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {isFollow ? (
            <>
              <IoCheckmark
                className="cursor-pointer"
                onClick={() => FollowUser(user.id, userId)}
              />
            </>
          ) : (
            <>
              <SlUserFollow
                className="cursor-pointer"
                onClick={() => FollowUser(user.id, userId)}
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
