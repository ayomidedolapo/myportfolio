import { z } from "zod"

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(150),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  excerpt: z.string().trim().max(300).optional().or(z.literal("")),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().trim().url().optional().or(z.literal("")),
  categoryId: z.string().optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  publishedAt: z.string().optional().or(z.literal("")),
})

export type BlogPostSchemaType = z.infer<typeof blogPostSchema>