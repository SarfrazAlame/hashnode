"use client";
import { AddComment } from "@/auth/action";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DiscussionsSchema } from "@/lib/Schema";
import { PostWithAll } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import RespectiveComments from "./RespectiveComments";

const Conversations = ({
  post,
  user,
}: {
  post: PostWithAll;
  user: User | null;
}) => {
  const form = useForm<z.infer<typeof DiscussionsSchema>>({
    resolver: zodResolver(DiscussionsSchema),
    defaultValues: {
      body: "",
    },
  });
  const onSubmit = async (value: z.infer<typeof DiscussionsSchema>) => {
    try {
      await AddComment(post?.id, value);
      toast.success("comment added");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="px-6 relative">
      <Form {...form}>
        <form className="w-full flex flex-col">
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Image
                    src={user?.image!}
                    alt=""
                    width={25}
                    height={25}
                    className="rounded-full absolute top-7 left-10"
                  />
                </FormLabel>
                <Input
                  placeholder="Add a thoughtful comment"
                  className="px-14 h-16 focus-visible:ring-1 focus-visible:ring-blue-500"
                />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="border w-fit py-0.5 my-2 px-3 rounded-full bg-blue-600 text-sm text-white"
          >
            comment
          </button>
        </form>
      </Form>
      <RespectiveComments post={post} />
    </div>
  );
};

export default Conversations;
