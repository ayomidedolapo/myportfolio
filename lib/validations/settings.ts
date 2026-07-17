import { z } from "zod"

export const siteSettingsSchema = z.object({
  heroTitle: z.string().max(100),
  heroSubtitle: z.string().max(200),
  heroDescription: z.string().optional(),
  aboutContent: z.string().optional(),
  availabilityStatus: z.enum(["open", "limited", "booked"]),
  resumeUrl: z.string().url().optional().or(z.literal("")),
  contactEmail: z.string().email().optional().or(z.literal("")),
  phoneNumber: z.string().optional(),
  whatsappNumber: z.string().min(10),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  socialLinks: z.object({
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    dribbble: z.string().url().optional(),
  }).optional(),
})

export type SiteSettingsSchemaType = z.infer<typeof siteSettingsSchema>