'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { contactSchema, ContactSchemaType } from '@/lib/validations/contact'
import { requireAdmin } from '@/lib/admin-guard'

// ─── Public: Contact form submission ───
export async function submitContact(data: ContactSchemaType) {
  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: 'Invalid data' }
  }

  // Honeypot spam check — silent success to fool bots
  if (data.website) return { success: true }

  try {
    await prisma.contactSubmission.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        subject: parsed.data.subject || null,
        message: parsed.data.message,
        budget: parsed.data.budget || null,
        serviceInterest: parsed.data.serviceInterest || null,
      },
    })

    revalidatePath('/admin/submissions')
    revalidatePath('/admin/dashboard')

    return { success: true }
  } catch (e: unknown) {
    console.error('Contact submission error:', e)
    return { success: false, error: 'Failed to send message. Please try again.' }
  }
}

// ─── Admin: Inbox actions ───
export async function markSubmissionRead(id: string, read = true) {
  try {
    await requireAdmin()
    await prisma.contactSubmission.update({ where: { id }, data: { read } })
    revalidatePath('/admin/submissions')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (e: unknown) {
    return { success: false, error: e instanceof Error ? e.message : String(e) }
  }
}

export async function deleteSubmission(id: string) {
  try {
    await requireAdmin()
    await prisma.contactSubmission.delete({ where: { id } })
    revalidatePath('/admin/submissions')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (e: unknown) {
    return { success: false, error: e instanceof Error ? e.message : String(e) }
  }
}