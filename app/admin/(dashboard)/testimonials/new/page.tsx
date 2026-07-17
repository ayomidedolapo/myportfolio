import { prisma } from '@/lib/prisma'
import { TestimonialForm } from '@/components/admin/testimonial-form'

export default async function NewTestimonialPage() {
  let projects: any[] = []
  try { projects = await prisma.project.findMany({ orderBy: { title: 'asc' } }) } catch {}
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4"><h1 className="text-2xl font-semibold tracking-tight">New Testimonial</h1></div>
      <TestimonialForm projects={projects} />
    </div>
  )
}