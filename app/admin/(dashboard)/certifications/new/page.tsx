import { CertificationForm } from '@/components/admin/certification-form'
export default function NewCertificationPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4"><h1 className="text-2xl font-semibold tracking-tight">New Certification</h1></div>
      <CertificationForm />
    </div>
  )
}