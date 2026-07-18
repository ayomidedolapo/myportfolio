import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ProjectForm } from '@/components/admin/project-form'
import type { Project, Category } from '@prisma/client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let project: Project | null = null
  let categories: Category[] = []
  try {
    project = await prisma.project.findUnique({ where: { id } })
    categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })
  } catch {}

  if (!project) notFound()

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Edit Project</h1>
        <p className="text-sm text-muted-foreground">Update project details</p>
      </div>
      <ProjectForm initialData={project} categories={categories} />
    </div>
  )
}