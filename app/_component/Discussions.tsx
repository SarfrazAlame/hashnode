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
  user,
}: {
  post: PostWithAll;
  userId: string;
  user: User;
}) => {
  const form = useForm<z.infer<typeof DiscussionsSchema>>({
    resolver: zodResolver(DiscussionsSchema),
    defaultValues: {
      body: "",
    },
  });
  const handlerComment = async (value: z.infer<typeof DiscussionsSchema>) => {
    try {
      await AddComment(post.id, value);
      toast.success("comment added");
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlerComment)}
          className="w-full flex flex-col"
        >
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <div className="absolute px-4 py-6">
                  <Image
                    src={user.image!}
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
          <button
            type="submit"
            className="border mt-3 w-fit px-3 py-0.5 rounded-full bg-blue-600 text-slate-100"
          >
            comment
          </button>
        </form>
      </Form>
    </div>
  );
};

export default Discussions;
