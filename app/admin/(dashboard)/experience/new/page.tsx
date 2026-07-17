import { ExperienceForm } from '@/components/admin/experience-form'
export default function NewExperiencePage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4"><h1 className="text-2xl font-semibold tracking-tight">New Experience</h1></div>
      <ExperienceForm />
    </div>
  )
}