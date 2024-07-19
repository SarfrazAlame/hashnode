"use client";
import { Form, FormField, FormItem } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const formSchems = z.object({
  title: z.string().min(1),
  story: z.string().min(1),
  imageUrl: z.string().optional(),
});

const page = () => {
  const form = useForm<z.infer<typeof formSchems>>({
    resolver: zodResolver(formSchems),
    defaultValues: {
      title: "",
      story: "",
      imageUrl: undefined,
    },
  });
  const onSubmit = async (value: z.infer<typeof formSchems>) => {
    console.log(value);
  };
  return (
    <Form {...form}>
      <form>
        <div className="w-full flex">
          <Link href={"/blogs"} className="mx-auto w-1/2">
            <ArrowLeft className="mx-auto" />
          </Link>
        </div>
        <div className="flex flex-col h-full my-12 w-full items-center gap-y-3 ">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => <FormItem></FormItem>}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <textarea
                  placeholder="Article Title..."
                  className="bg-inherit h-16 placeholder:text-3xl placeholder:font-bold lg:w-[50rem] md:w-[40rem] sm:w-[30rem] w-[20rem] outline-none text-3xl font-bold"
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="story"
            render={({ field }) => (
              <FormItem>
                <textarea
                  placeholder="Type for commands..."
                  className="bg-inherit h-56 placeholder:text-xl placeholder:font-semibold lg:w-[50rem] md:w-[40rem] sm:w-[30rem] w-[20rem] outline-none text-xl"
                />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default page;
