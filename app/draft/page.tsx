"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formSchems } from "@/lib/Schema";
import { UploadButton } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import { PostBlog } from "@/auth/action";
import Image from "next/image";

const page = () => {
  const form = useForm<z.infer<typeof formSchems>>({
    resolver: zodResolver(formSchems),
    defaultValues: {
      title: "",
      story: "",
      category: "",
      imageUrl: undefined,
    },
  });

  const imageUrl = form.watch("imageUrl");

  const hanldleForm = async (value: z.infer<typeof formSchems>) => {
    try {
      await PostBlog(value);
      toast.success("Article created successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="w-full flex">
        <Link href={"/blogs"} className="mx-auto w-1/2">
          <ArrowLeft className="mx-auto" />
        </Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(hanldleForm)}
          className="flex flex-col h-full my-12 w-full items-center gap-y-3 "
        >
          {!!imageUrl ? (
            <div>
              <Image src={imageUrl} alt="" width={300} height={300} />
            </div>
          ) : (
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field, fieldState }) => (
                <FormItem className="mb-6">
                  <FormLabel>Add picture</FormLabel>
                  <FormControl>
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        form.setValue("imageUrl", res[0].url);
                      }}
                      onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <textarea
                {...field}
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
                {...field}
                  placeholder="Type for commands..."
                  className="bg-inherit h-72 placeholder:text-xl placeholder:font-semibold lg:w-[50rem] md:w-[40rem] sm:w-[30rem] w-[20rem] outline-none text-xl whitespace-pre-wrap"
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <input
                {...field}
                  placeholder="write category..."
                  className="bg-inherit mt-12 placeholder:text-xl placeholder:font-semibold lg:w-[50rem] md:w-[40rem] sm:w-[30rem] w-[20rem] outline-none text-xl"
                />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="border px-4 py-2 rounded-full bg-blue-700 text-white hover:bg-blue-800"
          >
            Publish
          </button>
        </form>
      </Form>
    </>
  );
};

export default page;
