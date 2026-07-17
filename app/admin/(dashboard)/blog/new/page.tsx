import { prisma } from '@/lib/prisma'
import { BlogForm } from '@/components/admin/blog-form'

export default async function NewBlogPage() {
  let categories: Awaited<ReturnType<typeof prisma.category.findMany>> = []
  try { categories = await prisma.category.findMany({ orderBy: { name: 'asc' } }) } catch {}
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">New Post</h1>
        <p className="text-sm text-muted-foreground">Write a new blog post</p>
      </div>
      <BlogForm categories={categories} />
    </div>
  )
}