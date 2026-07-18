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
  yearsExperience: z.string().optional(),
projectsCompleted: z.string().optional(),
clientsWorldwide: z.string().optional(),
 socialLinks: z.object({
  github: z.string().optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),
  instagram: z.string().optional().or(z.literal("")),
  whatsapp: z.string().optional().or(z.literal("")),
  twitter: z.string().optional().or(z.literal("")),
  dribbble: z.string().optional().or(z.literal("")),
}).optional(),
})

export type SiteSettingsSchemaType = z.infer<typeof siteSettingsSchema>