'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { siteSettingsSchema, SiteSettingsSchemaType } from '@/lib/validations/settings'
import { requireAdmin } from '@/lib/admin-guard'

export async function updateSiteSettings(input: SiteSettingsSchemaType) {
  try {
    await requireAdmin()
    const p = siteSettingsSchema.parse(input)
    
console.log('💾 SAVING socialLinks:', JSON.stringify(p.socialLinks))
    
    await prisma.siteSettings.upsert({
      where: { id: 'site-settings' },
      update: {
        heroTitle: p.heroTitle,
        heroSubtitle: p.heroSubtitle,
        heroDescription: p.heroDescription || null,
        aboutContent: p.aboutContent || null,
        availabilityStatus: p.availabilityStatus,
        resumeUrl: p.resumeUrl || null,
        contactEmail: p.contactEmail || null,
        phoneNumber: p.phoneNumber || null,
        whatsappNumber: p.whatsappNumber,
        seoTitle: p.seoTitle || null,
        seoDescription: p.seoDescription || null,
        socialLinks: p.socialLinks as any,
        yearsExperience: p.yearsExperience || null,
projectsCompleted: p.projectsCompleted || null,
clientsWorldwide: p.clientsWorldwide || null,
      },
      create: {
        id: 'site-settings',
        heroTitle: p.heroTitle,
        heroSubtitle: p.heroSubtitle,
        heroDescription: p.heroDescription || null,
        aboutContent: p.aboutContent || null,
        availabilityStatus: p.availabilityStatus,
        resumeUrl: p.resumeUrl || null,
        contactEmail: p.contactEmail || null,
        phoneNumber: p.phoneNumber || null,
        whatsappNumber: p.whatsappNumber,
        seoTitle: p.seoTitle || null,
        seoDescription: p.seoDescription || null,
        socialLinks: p.socialLinks as any,
        yearsExperience: p.yearsExperience || null,
projectsCompleted: p.projectsCompleted || null,
clientsWorldwide: p.clientsWorldwide || null,
      },
    })
    
    revalidatePath('/')
    revalidatePath('/about')
    revalidatePath('/contact')
    revalidatePath('/admin/settings')
    return { success: true }
  } catch (e: any) {
    console.error('Settings save error:', e)
    return { success: false, error: e.message || 'Failed' }
  }
}