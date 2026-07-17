'use server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { blogPostSchema, BlogPostSchemaType } from '@/lib/validations/blog'
import { requireAdmin } from '@/lib/admin-guard'

function clean(p: BlogPostSchemaType) {
  return {
    ...p,
    categoryId: p.categoryId || null,
    coverImage: p.coverImage || null,
    excerpt: p.excerpt || null,
    publishedAt: p.publishedAt ? new Date(p.publishedAt) : null,
  }
}

const reval = () => { revalidatePath('/blog', 'layout'); revalidatePath('/admin/blog') }

export async function createBlogPost(input: BlogPostSchemaType) {
  try { await requireAdmin(); const p = blogPostSchema.parse(input); const r = await prisma.blogPost.create({ data: clean(p) }); reval(); return { success: true, id: r.id } }
  catch (e: unknown) { return { success: false, error: e instanceof Error ? e.message : 'Failed' } }
}

export async function updateBlogPost(id: string, input: BlogPostSchemaType) {
  try { await requireAdmin(); const p = blogPostSchema.parse(input); await prisma.blogPost.update({ where: { id }, data: clean(p) }); reval(); return { success: true } }
  catch (e: unknown) { return { success: false, error: e instanceof Error ? e.message : 'Failed' } }
}

export async function deleteBlogPost(id: string) {
  try { await requireAdmin(); await prisma.blogPost.delete({ where: { id } }); reval(); return { success: true } }
  catch (e: unknown) { return { success: false, error: e instanceof Error ? e.message : 'Failed' } }
}