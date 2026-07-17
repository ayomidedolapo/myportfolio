import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ServiceForm } from '@/components/admin/service-form'

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const service = await prisma.service.findUnique({ where: { id: params.id } })
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