"use client";

import { AddComment } from "@/auth/action";
import { Form, FormField, FormItem } from "@/components/ui/form";
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

const Discussions = ({
  post,
  userId,
}: {
  post: PostWithAll;
  userId: string;
}) => {
  const form = useForm<z.infer<typeof DiscussionsSchema>>({
    resolver: zodResolver(DiscussionsSchema),
    defaultValues: {
      body: "",
    },
  });
  const handlerComment = async (value: z.infer<typeof DiscussionsSchema>) => {
    try {
      await AddComment(post.id, userId, value);
      toast.success("comment added");
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={() => form.handleSubmit(handlerComment)}
          className="w-full flex flex-col"
        >
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <div className="absolute p-4">
                  <Image
                    src={post.user.image!}
                    alt=""
                    height={25}
                    width={25}
                    className="rounded-full"
                  />
                </div>
                <Input
                  {...field}
                  className="h-14 px-14 focus-visible:ring-1 focus-visible:ring-blue-600"
                  placeholder="Add a thoughtful comment"
                />
              </FormItem>
            )}
          />
          <div className="w-full flex">
            <button className="border mt-3 text-end w-fit">comment</button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Discussions;
