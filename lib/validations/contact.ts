import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  budget: z.string().optional(),
  serviceInterest: z.string().optional(),
  website: z.string().optional(), // honeypot
})

export type ContactSchemaType = z.infer<typeof contactSchema>