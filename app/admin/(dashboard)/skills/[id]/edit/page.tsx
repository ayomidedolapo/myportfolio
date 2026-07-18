import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { SkillForm } from '@/components/admin/skill-form'
import type { Skill } from '@prisma/client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let skill: Skill | null = null
  try {
    skill = await prisma.skill.findUnique({ where: { id } })
  } catch {}

  if (!skill) notFound()

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Edit Skill</h1>
      </div>
      <SkillForm initialData={skill} />
    </div>
  )
}