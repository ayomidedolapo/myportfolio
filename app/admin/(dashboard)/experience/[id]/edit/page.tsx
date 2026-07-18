import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ExperienceForm } from '@/components/admin/experience-form'
import type { Experience } from '@prisma/client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let exp: Experience | null = null
  try {
    exp = await prisma.experience.findUnique({ where: { id } })
  } catch {}

  if (!exp) notFound()

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Edit Experience</h1>
      </div>
      <ExperienceForm initialData={exp} />
    </div>
  )
}