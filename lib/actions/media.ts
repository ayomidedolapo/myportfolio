'use server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-guard'
import { z } from 'zod'

const mediaSchema = z.object({ publicId: z.string().min(1), url: z.string().url(), secureUrl: z.string().url(), type: z.enum(['image', 'video']), format: z.string().optional(), width: z.number().optional(), height: z.number().optional(), size: z.number().optional(), tags: z.array(z.string()).default([]) })

export async function createMediaAsset(input: z.infer<typeof mediaSchema>) {
  try { await requireAdmin(); const p = mediaSchema.parse(input); const r = await prisma.mediaAsset.create({ data: p }); revalidatePath('/admin/media'); return { success: true, id: r.id } }
  catch (e: unknown) {
    const error = e instanceof Error ? e.message : String(e)
    return { success: false, error }
  }
}

export async function deleteMediaAsset(id: string) {
  try { await requireAdmin(); await prisma.mediaAsset.delete({ where: { id } }); revalidatePath('/admin/media'); return { success: true } }
  catch (e: unknown) {
    const error = e instanceof Error ? e.message : String(e)
    return { success: false, error }
  }
}