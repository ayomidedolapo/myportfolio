'use server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { siteSettingsSchema, SiteSettingsSchemaType } from '@/lib/validations/settings'
import { requireAdmin } from '@/lib/admin-guard'

export async function updateSiteSettings(input: SiteSettingsSchemaType) {
  try {
    await requireAdmin()
    const p = siteSettingsSchema.parse(input)
    await prisma.siteSettings.upsert({
      where: { id: 'site-settings' },
      update: { ...p, resumeUrl: p.resumeUrl || null, contactEmail: p.contactEmail || null, seoTitle: p.seoTitle || null, seoDescription: p.seoDescription || null, socialLinks: p.socialLinks ?? undefined },
      create: { id: 'site-settings', ...p },
    })
    revalidatePath('/'); revalidatePath('/about'); revalidatePath('/contact'); revalidatePath('/admin/settings')
    return { success: true }
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : 'Failed'
    return { success: false, error }
  }
}