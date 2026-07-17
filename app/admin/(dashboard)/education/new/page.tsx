import { EducationForm } from '@/components/admin/education-form'
export default function NewEducationPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4"><h1 className="text-2xl font-semibold tracking-tight">New Education</h1></div>
      <EducationForm />
    </div>
  )
}