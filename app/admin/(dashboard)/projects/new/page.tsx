import { prisma } from '@/lib/prisma'
import { ProjectForm } from '@/components/admin/project-form'

export default async function NewProjectPage() {
  let categories: Awaited<ReturnType<typeof prisma.category.findMany>> = []
  try { categories = await prisma.category.findMany({ orderBy: { name: 'asc' } }) } catch {}

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">New Project</h1>
        <p className="text-sm text-muted-foreground">Add a project to your portfolio</p>
      </div>
      <ProjectForm categories={categories} />
    </div>
  )
}