'use server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { projectSchema, ProjectSchemaType } from '@/lib/validations/project'
import { requireAdmin } from '@/lib/admin-guard'

function clean(p: ProjectSchemaType) {
  return {
    ...p,
    categoryId: p.categoryId || null,
    liveUrl: p.liveUrl || null,
    repoUrl: p.repoUrl || null,
    thumbnail: p.thumbnail || null,
    videoUrl: p.videoUrl || null,
    subtitle: p.subtitle || null,
    description: p.description || null,
  }
}

const reval = () => { revalidatePath('/', 'layout'); revalidatePath('/projects', 'layout'); revalidatePath('/admin/projects') }

export async function createProject(input: ProjectSchemaType) {
  try { await requireAdmin(); const p = projectSchema.parse(input); const r = await prisma.project.create({ data: clean(p) }); reval(); return { success: true, id: r.id } }
  catch (e: unknown) { const error = e instanceof Error ? e.message : String(e); return { success: false, error: error || 'Failed to create project' } }
}

export async function updateProject(id: string, input: ProjectSchemaType) {
  try { await requireAdmin(); const p = projectSchema.parse(input); await prisma.project.update({ where: { id }, data: clean(p) }); reval(); return { success: true } }
  catch (e: unknown) { const error = e instanceof Error ? e.message : String(e); return { success: false, error: error || 'Failed to update project' } }
}

export async function deleteProject(id: string) {
  try {
    await requireAdmin()
    await prisma.testimonial.updateMany({ where: { projectId: id }, data: { projectId: null } })
    await prisma.project.delete({ where: { id } })
    reval(); return { success: true }
  } catch (e: unknown) { const error = e instanceof Error ? e.message : String(e); return { success: false, error: error || 'Failed to delete project' } }
}

export async function setProjectFeatured(id: string, featured: boolean) {
  try { await requireAdmin(); await prisma.project.update({ where: { id }, data: { featured } }); reval(); return { success: true } }
  catch (e: unknown) { const error = e instanceof Error ? e.message : String(e); return { success: false, error: error || 'Failed' } }
}