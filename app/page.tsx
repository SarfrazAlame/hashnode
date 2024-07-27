import { getAuthOptions } from "@/lib/auth";
import { getUserId } from "@/lib/utils";
import { redirect } from "next/navigation";

const page = async () => {
  const userId = await getUserId();
  if (!userId) {
    redirect("/login");
  }
  return redirect("/blogs");
};

export default page;
