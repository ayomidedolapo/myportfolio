import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ExperienceForm } from '@/components/admin/experience-form'

export default async function EditExperiencePage({ params }: { params: { id: string } }) {
  const exp = await prisma.experience.findUnique({ where: { id: params.id } })
  if (!exp) notFound()
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4"><h1 className="text-2xl font-semibold tracking-tight">Edit Experience</h1></div>
      <ExperienceForm initialData={exp} />
    </div>
  )
}