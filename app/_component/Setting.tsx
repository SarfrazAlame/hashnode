"use client";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserSchema } from "@/lib/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
import { CreateUser } from "@/auth/action";
import toast from "react-hot-toast";

type User = {
  id: string;
  name: string | null;
  username: string | null;
  bio: string | null;
  tagline: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  location: string | null;
  tech: string | null;
  available: string | null;
  createdAt: Date;
  updatedAt: Date;
  twitter: string | null;
  github: string | null;
  instagram: string | null;
  facebook: string | null;
  website: string | null;
  linkedin: string | null;
  stackoverflow: string | null;
  youtube: string | null;
} | null;

const Setting = ({ user }: { user: User }) => {
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      image: user?.image || "",
      username: user?.username || "",
      bio: user?.bio || "",
      tagline: user?.tagline || "",
      location: user?.location || "",
      tech: user?.tech || "",
      available: user?.available || "",
      twitter: user?.twitter || "",
      facebook: user?.facebook || "",
      instagram: user?.instagram || "",
      linkedin: user?.linkedin || "",
      github: user?.github || "",
      youtube: user?.youtube || "",
      stackoverflow: user?.stackoverflow || "",
      website: user?.website || "",
    },
  });
  const onSubmit = async (value: z.infer<typeof UserSchema>) => {
    try {
      await CreateUser(value, user?.email!);
      toast.success("profile updated");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full p-7 h-fit border flex  gap-8 rounded-md">
      <div className="w-full flex flex-col gap-y-4">
        <p className="font-bold text-gray-700 dark:text-zinc-200">Basic info</p>
        <Form {...form}>
          <form
            className="w-full items-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="lg:flex w-full gap-8 lg:justify-between ">
              <div className="flex lg:w-1/2 flex-col gap-y-4 my-12 lg:my-0">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px] dark:text-zinc-200 font-semibold">
                        Full name
                      </FormLabel>
                      <Input
                        {...field}
                        className="h-12 focus-visible:ring-1 focus-visible:ring-blue-600"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tagline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px] dark:text-zinc-200 font-semibold">
                        Profile Tagline
                      </FormLabel>
                      <Input
                        {...field}
                        className="h-12 focus-visible:ring-1 focus-visible:ring-blue-600"
                      />
                    </FormItem>
                  )}
                />
                <div className="flex">
                  <div>
                    <p className="text-[13px] dark:text-zinc-200 font-semibold mb-1">
                      Profile Photo
                    </p>
                    <Image
                      src={user?.image!}
                      alt=""
                      width={100}
                      height={100}
                      className="rounded-full cursor-pointer"
                    />
                  </div>
                  <RiDeleteBin6Line
                    size={24}
                    className="mt-5 -ml-5 cursor-pointer border rounded-full bg-gray-100 text-gray-900"
                  />
                </div>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px] dark:text-zinc-200 font-semibold">
                        Location
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="Delhi, India"
                        className="h-12 focus-visible:ring-1 focus-visible:ring-blue-600"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <p className="font-bold my-2">About You</p>
                      <FormLabel className="text-[13px] dark:text-zinc-200 font-semibold">
                        Profile Bio (About you)
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="I am developer from..."
                        className="h-12 focus-visible:ring-1 focus-visible:ring-blue-600"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tech"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px] dark:text-zinc-200 font-semibold">
                        Tech Stack
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="Add technologies, topics, more..."
                        className="h-12 focus-visible:ring-1 focus-visible:ring-blue-600"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="available"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px] dark:text-zinc-200 font-semibold">
                        Available for
                      </FormLabel>
                      <Textarea
                        {...field}
                        placeholder="I am available for mentoring..."
                        className="h-12 focus-visible:ring-1 focus-visible:ring-blue-600"
                      />
                    </FormItem>
                  )}
                />
              </div>
              <div className="lg:w-1/2">
                <p className="font-bold -mt-10 text-gray-700 dark:text-zinc-200">
                  Social
                </p>
                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="text-[13px] dark:text-zinc-200 font-semibold">
                        Twitter Profile
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="https://twitter.com/johndeo"
                        className="h-12 focus-visible:ring-1 focus-visible:ring-blue-600"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="text-[13px] dark:text-zinc-200 font-semibold">
                        Instagram Profile
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="https://instagram.com/johndeo"
                        className="h-12 focus-visible:ring-1 focus-visible:ring-blue-600"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="text-[13px] dark:text-zinc-200 font-semibold">
                        Github Profile
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="https://github.com/johndeo"
                        className="h-12 focus-visible:ring-1 focus-visible:ring-blue-600"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stackoverflow"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="text-[13px] dark:text-zinc-200 font-semibold">
                        StackOverflow Profile
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="https://stackoverflow.com/johndeo"
                        className="h-12 focus-visible:ring-1 focus-visible:ring-blue-600"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="text-[13px] dark:text-zinc-200 font-semibold">
                        Facebook Profile
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="https://facebook.com/johndeo"
                        className="h-12 focus-visible:ring-1 focus-visible:ring-blue-600"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="text-[13px] dark:text-zinc-200 font-semibold">
                        Website URL
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="https://facebook.com/johndeo"
                        className="h-12 focus-visible:ring-1 focus-visible:ring-blue-600"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="text-[13px] dark:text-zinc-200 font-semibold">
                        LinkedIn URL
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="https://facebook.com/johndeo"
                        className="h-12 focus-visible:ring-1 focus-visible:ring-blue-600"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="youtube"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="text-[13px] dark:text-zinc-200 font-semibold">
                        Youtube Channel
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="https://facebook.com/johndeo"
                        className="h-12 focus-visible:ring-1 focus-visible:ring-blue-600"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="mt-8">
                      <p className="text-xl font-bold">Profile Identity</p>
                      <FormLabel className="text-[13px] dark:text-zinc-200 font-semibold">
                        Username
                      </FormLabel>
                      <p className="text-sm italic -mt-1 text-gray-600 dark:text-gray-400">
                        You have the option to change your username once. Please
                        choose carefully as it cannot be changed again.
                      </p>
                      <Input
                        {...field}
                        className="h-12 focus-visible:ring-1 focus-visible:ring-blue-600"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="mt-8">
                      <FormLabel className="text-[13px] dark:text-zinc-200 font-semibold">
                        Email address
                      </FormLabel>
                      <p className="text-sm italic -mt-1 text-gray-600 dark:text-gray-400">
                        Changing your email address might break your OAuth
                        sign-in if your social media accounts do not use the
                        same email address. Please use magic link sign-in if you
                        encounter such an issue.
                      </p>
                      <Input
                        {...field}
                        className="h-12 focus-visible:ring-1 focus-visible:ring-blue-600"
                      />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-start mt-7 border w-fit py-2 px-3.5 rounded-full text-blue-600 font-bold border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-900"
            >
              Update
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Setting;
