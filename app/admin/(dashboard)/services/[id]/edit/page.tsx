import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ServiceForm } from '@/components/admin/service-form'
import type { Service } from '@prisma/client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let service: Service | null = null
  try {
    service = await prisma.service.findUnique({ where: { id } })
  } catch {}

  if (!service) notFound()

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Edit Service</h1>
      </div>
      <ServiceForm initialData={service} />
    </div>
  )
}