import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { EducationForm } from '@/components/admin/education-form'

export default async function EditEducationPage({ params }: { params: { id: string } }) {
  const edu = await prisma.education.findUnique({ where: { id: params.id } })
  if (!edu) notFound()
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4"><h1 className="text-2xl font-semibold tracking-tight">Edit Education</h1></div>
      <EducationForm initialData={edu} />
    </div>
  )
}