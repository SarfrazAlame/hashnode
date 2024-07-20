import { z } from "zod";

export const formSchems = z.object({
    title: z.string().min(1),
    story: z.string().min(1),
    category: z.string().min(1),
    imageUrl: z.string().optional(),
});

export const UserSchema = z.object({
    name: z.string().min(1),
    username: z.string().min(3),
    bio: z.string().min(10),
    tagline: z.string(),
    email: z.string()
})