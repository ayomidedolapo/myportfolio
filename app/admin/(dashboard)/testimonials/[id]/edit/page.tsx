import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { TestimonialForm } from '@/components/admin/testimonial-form'
import type { Testimonial, Project } from '@prisma/client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let testimonial: Testimonial | null = null
  let projects: Project[] = []
  try {
    testimonial = await prisma.testimonial.findUnique({ where: { id } })
    projects = await prisma.project.findMany({ orderBy: { title: 'asc' } })
  } catch {}

  if (!testimonial) notFound()

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Edit Testimonial</h1>
      </div>
      <TestimonialForm initialData={testimonial} projects={projects} />
    </div>
  )
}