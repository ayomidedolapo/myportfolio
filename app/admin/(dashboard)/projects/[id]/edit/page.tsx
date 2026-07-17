import type { ComponentProps } from 'react'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ProjectForm } from '@/components/admin/project-form'

type ProjectFormProps = ComponentProps<typeof ProjectForm>

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  let project: ProjectFormProps['initialData'] | null = null
  let categories: Awaited<ReturnType<typeof prisma.category.findMany>> = []
  try {
    project = await prisma.project.findUnique({ where: { id: params.id } }) as ProjectFormProps['initialData']
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