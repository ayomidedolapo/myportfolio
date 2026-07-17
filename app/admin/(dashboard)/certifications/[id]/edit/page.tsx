import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { CertificationForm } from '@/components/admin/certification-form'

export default async function EditCertificationPage({ params }: { params: { id: string } }) {
  const cert = await prisma.certification.findUnique({ where: { id: params.id } })
  if (!cert) notFound()
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4"><h1 className="text-2xl font-semibold tracking-tight">Edit Certification</h1></div>
      <CertificationForm initialData={cert} />
    </div>
  )
}