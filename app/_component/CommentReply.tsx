"use client";
import { CommentOnReply } from "@/auth/action";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReplySchema } from "@/lib/Schema";
import { CommentWithUserAndLike } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const CommentReply = ({ res }: { res: CommentWithUserAndLike }) => {
  const [state, setState] = useState(false);
  const form = useForm<z.infer<typeof ReplySchema>>({
    resolver: zodResolver(ReplySchema),
    defaultValues: {
      response: "",
    },
  });
  const onSubmit = async (value: z.infer<typeof ReplySchema>) => {
    try {
      await CommentOnReply(res.id, value);
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <div className="">
      <button
        onClick={() => setState(true)}
        className="text-[13px] mx-2 hover:underline cursor-pointer font-[500] text-slate-500 dark:text-slate-400"
      >
        Reply
      </button>
      {state && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3">
            <FormField
              control={form.control}
              name="response"
              render={({ field }) => (
                <FormItem className="">
                  <Input
                    {...field}
                    className="h-12 focus-visible:ring-1 focus-visible:ring-blue-500"
                  />
                </FormItem>
              )}
            />
            <div>
              <button
                type="submit"
                className="text-[13px] border mt-3 px-2 py-0.5 bg-blue-500 text-white rounded-full"
              >
                comment
              </button>
              <button onClick={() => setState(false)} className="text-[13px] border mt-3 px-2 py-0.5 bg-gray-500 text-white rounded-full">cancel</button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CommentReply;
