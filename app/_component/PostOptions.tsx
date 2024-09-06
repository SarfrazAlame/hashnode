"use client";
import { CommnetWithUser, PostWithAll } from "@/lib/type";
import React, { useOptimistic } from "react";
import { HiOutlineHeart } from "react-icons/hi2";
import { AiOutlineComment } from "react-icons/ai";
import { Bookmark, Heart } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AddComment, LikePost } from "@/auth/action";
import { Comment, Like, Post, User } from "@prisma/client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DiscussionsSchema } from "@/lib/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ActionIcon from "@/components/ActionIcon";

const PostOptions = ({
  post,
  like,
  user,
  comments,
  userId,
}: {
  post: PostWithAll;
  like: Like | { message: string } | null;
  user: User;
  comments: CommnetWithUser[];
  userId: string;
}) => {
  const form = useForm<z.infer<typeof DiscussionsSchema>>({
    resolver: zodResolver(DiscussionsSchema),
    defaultValues: {
      body: "",
    },
  });
  const CommentNow = async (value: z.infer<typeof DiscussionsSchema>) => {
    try {
      await AddComment(post.id, value);
      toast.success("comment added");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const predicate = (like: Like) =>
    like.userId === userId && like.postId === post.id;

  const [optimisticLike, addOptimisticlike] = useOptimistic<Like[]>(
    post.likes,
    // @ts-ignore
    (state: Like[], newLike: Like) => {
      return [...state, newLike];
    }
  );

  return (
    <div className="h-16 my-12 px-8 flex gap-4 items-center border dark:border-slate-200 w-full rounded-full">
      <div className="flex items-center gap-2 p-1 hover:bg-gray-200 hover:dark:bg-gray-900 rounded-full cursor-pointer">
        <form
          action={async (formData: FormData) => {
            const postId = formData.get("postId") as string;
            addOptimisticlike({ userId, postId });
            await LikePost(postId);
          }}
        >
          <input type="hidden" name="postId" value={post.id} />
          <button type="submit">
            <Heart
              className={
                optimisticLike?.some(predicate)
                  ? "text-red-600 fill-red-600 dark:text-slate-200"
                  : "text-slate-800 dark:text-slate-200"
              }
            />
          </button>
          {/* <HiOutlineHeart
            size={30}
            type="submit"
            className={
              optimisticLike.some(predicate)
                ? " text-red-600 fill-red-600 dark:text-slate-200"
                : "text-slate-800 dark:text-slate-200"
            }
          /> */}
        </form>

        <p>{optimisticLike?.length}</p>
      </div>
      <div className="flex items-center gap-2 p-1 hover:bg-gray-200 hover:dark:bg-gray-900 rounded-full cursor-pointer">
        <Sheet>
          <SheetTrigger className="flex items-center gap-2">
            <AiOutlineComment
              size={30}
              className="text-slate-800 dark:text-slate-200 hover:dark:bg-gray-900"
            />
            <p>{post?.comments?.length}</p>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="flex flex-col gap-y-6">
              <h1 className="text-xl">Comments({post?.comments?.length})</h1>
              <div className="flex gap-2 items-center">
                <Image
                  src={user?.image!}
                  alt=""
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <p className="font-semibold text-sm text-slate-700 dark:text-slate-200">
                  {user?.name}
                </p>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(CommentNow)}>
                  <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                      <FormItem>
                        <Input
                          {...field}
                          placeholder="Write a thoughtful comment"
                          className="h-14 border-none placeholder:text-md focus-visible:ring-slate-50"
                        />
                      </FormItem>
                    )}
                  />
                  <button className="text-end mt-5 border px-3 py-0.5 rounded-full bg-blue-600 text-white">
                    comment
                  </button>
                </form>
              </Form>
              <hr />
              <div className="flex flex-col gap-y-6">
                {comments.map((com: CommnetWithUser) => (
                  <div className="flex flex-col gap-y-3" key={com.id}>
                    <div className="flex items-center gap-1">
                      <Image
                        src={com.user.image!}
                        alt=""
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <p className="-mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                        {com.user.name}
                      </p>
                    </div>
                    <p className="text-[14px] mx-8 -mt-2">{com.body}</p>
                  </div>
                ))}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex p-1 hover:bg-gray-200 hover:dark:bg-gray-900 rounded-full cursor-pointer">
        <Bookmark size={30} className="text-slate-800 dark:text-slate-200" />
      </div>
      <div className="flex p-1 hover:bg-gray-200 hover:dark:bg-gray-900 rounded-full cursor-pointer">
        <BsThreeDotsVertical
          size={30}
          className="text-slate-800 dark:text-slate-200 hover:dark:bg-gray-900"
        />
      </div>
    </div>
  );
};

export default PostOptions;
