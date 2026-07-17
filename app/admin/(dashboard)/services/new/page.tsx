import { ServiceForm } from '@/components/admin/service-form'

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">New Service</h1>
      </div>
      <ServiceForm />
    </div>
  )
}