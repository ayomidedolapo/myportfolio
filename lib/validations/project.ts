import { z } from "zod"

const optionalUrl = z.string().trim().url("Must be a valid URL").optional().or(z.literal(""))
const optionalText = z.string().trim().optional().or(z.literal(""))

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  subtitle: optionalText,
  description: optionalText,
  problem: optionalText,
  process: optionalText,
  solution: optionalText,
  results: optionalText,
  thumbnail: optionalUrl,
  gallery: z.array(z.string().url()).default([]),
  videoUrl: optionalUrl,
  categoryId: z.string().optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  order: z.number().default(0),
  liveUrl: optionalUrl,
  repoUrl: optionalUrl,
  blogUrl: optionalUrl,
})

export type ProjectSchemaType = z.infer<typeof projectSchema>