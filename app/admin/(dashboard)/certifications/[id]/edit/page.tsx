import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { CertificationForm } from '@/components/admin/certification-form'
import type { Certification } from '@prisma/client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function EditCertificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let cert: Certification | null = null
  try {
    cert = await prisma.certification.findUnique({ where: { id } })
  } catch {}

  if (!cert) notFound()

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Edit Certification</h1>
      </div>
      <CertificationForm initialData={cert} />
    </div>
  )
}