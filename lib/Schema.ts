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
    bio: z.string().min(5),
    tagline: z.string(),
    email: z.string(),
    image: z.string(),
    location: z.string().optional(),
    tech: z.string().optional(),
    available: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    github: z.string().optional(),
    stackoverflow: z.string().optional(),
    website: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
})

export const DiscussionsSchema = z.object({
    body: z.string().min(1)
})