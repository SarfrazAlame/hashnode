"use client";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserSchema } from "@/lib/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { FaHashnode } from "react-icons/fa6";
import { z } from "zod";

type User =
  | {
      id: string;
      name: string | null | undefined;
      email: string | null | undefined;
      image: string | null | undefined;
      username: string | null | undefined;
      bio: string | null | undefined;
      tagline: string | null | undefined;
    }
  | undefined;

const ProfileComplete = ({ user }: { user: User }) => {
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: user?.name!,
      username: "",
      bio: user?.bio || "",
      tagline: user?.tagline || "",
      email: user?.email || "",
    },
  });

  return (
    <div className="">
      <header className="flex w-full gap-2 justify-center items-center h-16 bg-zinc-100">
        <FaHashnode size={32} className="fill-blue-600" />
        <p className="text-3xl font-bold">hashnode</p>
      </header>
      <div className="text-center mt-12 ">
        <p className="text-2xl font-bold text-gray-800">Create your account</p>
        <p className="my-2 text-gray-600">
          Let's git init your Hashnode journey
        </p>
      </div>
      <div className="flex w-full gap-2 justify-center items-center my-12 ">
        <Form {...form}>
          <form className="flex flex-col gap-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 font-semibold">
                    Full Name *
                  </FormLabel>
                  <Input
                    {...field}
                    className="w-80 rounded-full h-12 focus-visible:ring-blue-500 focus-visible:ring-1"
                  />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 font-semibold">
                      Pick a username *
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder="Pick a username"
                      className="placeholder:text-gray-400  w-80 rounded-full h-12 focus-visible:ring-blue-500 focus-visible:ring-1"
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 font-semibold">
                      Your email address *
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder="Pick a username"
                      className="placeholder:text-gray-400  w-80 rounded-full h-12 focus-visible:ring-blue-500 focus-visible:ring-1"
                    />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 font-semibold">
                    Enter your tagline. Tell us about what you do:
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your tagline..."
                    className="placeholder:text-gray-400 rounded-full h-12 focus-visible:ring-blue-500 focus-visible:ring-1"
                  />
                </FormItem>
              )}
            />
            <p className="text-sm italic">
              By continuing to the next step, you agree to Hashnode's{" "}
              <span className="text-blue-600">privacy policy</span> and{" "}
              <span className="text-blue-600">terms of use</span>.
            </p>

            <button className="w-1/2 border mt-5 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold ">
              Next
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileComplete;
