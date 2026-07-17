import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { SkillForm } from '@/components/admin/skill-form'

export default async function EditSkillPage({ params }: { params: { id: string } }) {
  const skill = await prisma.skill.findUnique({ where: { id: params.id } })
  if (!skill) notFound()
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4"><h1 className="text-2xl font-semibold tracking-tight">Edit Skill</h1></div>
      <SkillForm initialData={skill} />
    </div>
  )
}