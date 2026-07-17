import { SkillForm } from '@/components/admin/skill-form'

export default function NewSkillPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4"><h1 className="text-2xl font-semibold tracking-tight">New Skill</h1></div>
      <SkillForm />
    </div>
  )
}