import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { TestimonialForm } from '@/components/admin/testimonial-form'

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  let testimonial: any = null
  let projects: any[] = []
  try {
    testimonial = await prisma.testimonial.findUnique({ where: { id: params.id } })
    projects = await prisma.project.findMany({ orderBy: { title: 'asc' } })
  } catch {}
  if (!testimonial) notFound()
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4"><h1 className="text-2xl font-semibold tracking-tight">Edit Testimonial</h1></div>
      <TestimonialForm initialData={testimonial} projects={projects} />
    </div>
  )
}