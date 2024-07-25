"use client";
import { CreateAccount, CreateUser } from "@/auth/action";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AccountSchema, UserSchema } from "@/lib/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: user?.name!,
      username: user?.username || "",
      bio: user?.bio || "",
      tagline: user?.tagline || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (value: z.infer<typeof AccountSchema>) => {
    try {
      await CreateAccount(value, user?.email!);
      toast.success("Profile completed");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="">
      <header className="flex w-full gap-2 justify-center items-center h-16 bg-zinc-100 dark:bg-gray-950">
        <FaHashnode size={32} className="fill-blue-600" />
        <Link href={"/blogs"} className="text-3xl font-bold">
          hashnode {user?.username}
        </Link>
      </header>
      <div className="text-center mt-12 ">
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-400">
          Create your account
        </p>
        <p className="my-2 text-gray-600 dark:text-gray-400">
          Let's git init your Hashnode journey
        </p>
      </div>
      <div className="flex w-full gap-2 justify-center items-center my-12 ">
        <Form {...form}>
          <form
            className="flex flex-col mx-4 md:mx-0"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="md:flex w-full gap-4 mx-auto items-center justify-center">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-gray-600 font-semibold dark:text-gray-400">
                      Full Name *
                    </FormLabel>
                    <Input
                      {...field}
                      className="md:w-80 bg-gray-50 dark:bg-gray-900  rounded-full h-12 focus-visible:ring-blue-500 focus-visible:ring-1"
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="my-3">
                    <FormLabel className="text-gray-600 font-semibold dark:text-gray-400">
                      Pick a username *
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder="Pick a username"
                      className="placeholder:text-gray-400 bg-gray-50 dark:bg-gray-900  md:w-80  rounded-full h-12 focus-visible:ring-blue-500 focus-visible:ring-1"
                    />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:flex w-full gap-4 mx-auto items-center justify-center">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-gray-600 font-semibold dark:text-gray-400">
                      Your email address *
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder="Pick a username"
                      className="placeholder:text-gray-400 bg-gray-50 dark:bg-gray-900  md:w-80   rounded-full h-12 focus-visible:ring-blue-500 focus-visible:ring-1"
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="my-3">
                    <FormLabel className="text-gray-600 font-semibold dark:text-gray-400">
                      Who you are? *
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder="Your profession..."
                      className="placeholder:text-gray-400 bg-gray-50 dark:bg-gray-900  md:w-80  rounded-full h-12 focus-visible:ring-blue-500 focus-visible:ring-1"
                    />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem className="my-6">
                  <FormLabel className="text-gray-600 font-semibold dark:text-gray-400">
                    Enter your tagline. Tell us about what you do:
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your tagline..."
                    className="placeholder:text-gray-400 bg-gray-50 dark:bg-gray-900 rounded-full h-12 focus-visible:ring-blue-500 focus-visible:ring-1"
                  />
                </FormItem>
              )}
            />
            <p className="text-sm italic text-gray-500 dark:text-gray-400">
              By continuing to the next step, you agree to Hashnode's{" "}
              <span className="text-blue-600">privacy policy</span> and{" "}
              <span className="text-blue-600">terms of use</span>.
            </p>

            <button
              type="submit"
              className="w-1/2 border mt-5 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold "
            >
              Next
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileComplete;
