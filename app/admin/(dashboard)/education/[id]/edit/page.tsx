import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { EducationForm } from '@/components/admin/education-form'
import type { Education } from '@prisma/client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let edu: Education | null = null
  try {
    edu = await prisma.education.findUnique({ where: { id } })
  } catch {}

  if (!edu) notFound()

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Edit Education</h1>
      </div>
      <EducationForm initialData={edu} />
    </div>
  )
}