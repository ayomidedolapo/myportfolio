import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { BlogForm } from '@/components/admin/blog-form'
import type { BlogPost, Category } from '@prisma/client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let post: BlogPost | null = null
  let categories: Category[] = []
  try {
    post = await prisma.blogPost.findUnique({ where: { id } })
    categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })
  } catch {}

  if (!post) notFound()

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Edit Post</h1>
        <p className="text-sm text-muted-foreground">Update blog post</p>
      </div>
      <BlogForm initialData={post} categories={categories} />
    </div>
  )
}