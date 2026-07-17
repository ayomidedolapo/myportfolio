'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { createCertification, updateCertification } from '@/lib/actions/profile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImageUpload } from '@/components/admin/image-upload'

export function CertificationForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; msg?: string }>({ type: 'idle' })
  const isEdit = !!initialData?.id
  const toDate = (d: any) => d ? new Date(d).toISOString().split('T')[0] : ''

  const { register, handleSubmit, watch, setValue, formState: { isSubmitting } } = useForm({
    defaultValues: {
      name: initialData?.name || '',
      issuer: initialData?.issuer || '',
      issueDate: toDate(initialData?.issueDate),
      expiryDate: toDate(initialData?.expiryDate),
      credentialUrl: initialData?.credentialUrl || '',
      image: initialData?.image || '',
      order: initialData?.order || 0,
    }
  })

  const image = watch('image')

  const onSubmit = async (data: any) => {
    setStatus({ type: 'idle' })
    const res = isEdit ? await updateCertification(initialData.id, data) : await createCertification(data)
    if (res.success) {
      setStatus({ type: 'success', msg: isEdit ? 'Updated' : 'Created' })
      if (!isEdit) setTimeout(() => router.push('/admin/certifications'), 800)
    } else setStatus({ type: 'error', msg: res.error })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="border border-border bg-card p-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Certification Name</label>
          <Input {...register('name', { required: true })} className="h-10 rounded-none" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Issuer</label>
          <Input {...register('issuer', { required: true })} placeholder="AWS, Meta, Google" className="h-10 rounded-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Issue Date</label>
            <Input type="date" {...register('issueDate', { required: true })} className="h-10 rounded-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Expiry Date</label>
            <Input type="date" {...register('expiryDate')} className="h-10 rounded-none" />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Credential URL</label>
          <Input {...register('credentialUrl')} placeholder="https://verify.com/..." className="h-10 rounded-none" />
        </div>
        <ImageUpload value={image || ''} onChange={(url) => setValue('image', url)} label="Badge/Certificate Image" />
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Order</label>
          <Input type="number" {...register('order', { valueAsNumber: true })} className="h-10 w-32 rounded-none" />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <Button type="submit" disabled={isSubmitting} className="rounded-none">{isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Create'}</Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/certifications')} className="rounded-none">Cancel</Button>
        {status.type === 'success' && <span className="text-sm text-emerald-400">✓ {status.msg}</span>}
        {status.type === 'error' && <span className="text-sm text-red-400">✗ {status.msg}</span>}
      </div>
    </form>
  )
}