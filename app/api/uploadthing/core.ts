import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { authOptions } from "../auth/[...nextauth]/route";

const f = createUploadthing();


export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .middleware(async ({ req }) => {
            const user = await getServerSession(authOptions)

            if (!user) throw new UploadThingError("Unauthorized");

            return { userId: user.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);

            console.log("file url", file.url);

            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;