'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { createTestimonial, updateTestimonial } from '@/lib/actions/profile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/admin/image-upload'

export function TestimonialForm({ initialData, projects }: { initialData?: any; projects: any[] }) {
  const router = useRouter()
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; msg?: string }>({ type: 'idle' })
  const isEdit = !!initialData?.id

  const { register, handleSubmit, watch, setValue, formState: { isSubmitting } } = useForm({
    defaultValues: {
      clientName: initialData?.clientName || '',
      clientRole: initialData?.clientRole || '',
      company: initialData?.company || '',
      content: initialData?.content || '',
      image: initialData?.image || '',
      rating: initialData?.rating || 5,
      projectId: initialData?.projectId || '',
      isActive: initialData?.isActive ?? true,
      order: initialData?.order || 0,
    }
  })

  const image = watch('image')

  const onSubmit = async (data: any) => {
    setStatus({ type: 'idle' })
    const res = isEdit ? await updateTestimonial(initialData.id, data) : await createTestimonial(data)
    if (res.success) {
      setStatus({ type: 'success', msg: isEdit ? 'Updated' : 'Created' })
      if (!isEdit) setTimeout(() => router.push('/admin/testimonials'), 800)
    } else setStatus({ type: 'error', msg: res.error })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="border border-border bg-card p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Client Name</label>
            <Input {...register('clientName', { required: true })} className="h-10 rounded-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Role</label>
            <Input {...register('clientRole')} placeholder="CEO, Product Lead" className="h-10 rounded-none" />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Company</label>
          <Input {...register('company')} className="h-10 rounded-none" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Testimonial Content</label>
          <Textarea {...register('content', { required: true })} rows={5} className="rounded-none" />
        </div>
        <ImageUpload value={image || ''} onChange={(url) => setValue('image', url)} label="Client Photo (optional)" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Rating (1-5)</label>
            <Input type="number" min={1} max={5} {...register('rating', { valueAsNumber: true })} className="h-10 rounded-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Related Project</label>
            <select {...register('projectId')} className="flex h-10 w-full border border-border bg-muted/30 px-3 text-sm">
              <option value="">— None —</option>
              {projects.map((p) => (<option key={p.id} value={p.id}>{p.title}</option>))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register('isActive')} className="h-4 w-4" />
            <span>Active (show on site)</span>
          </label>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Order</label>
            <Input type="number" {...register('order', { valueAsNumber: true })} className="h-10 w-32 rounded-none" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <Button type="submit" disabled={isSubmitting} className="rounded-none">{isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Create'}</Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/testimonials')} className="rounded-none">Cancel</Button>
        {status.type === 'success' && <span className="text-sm text-emerald-400">✓ {status.msg}</span>}
        {status.type === 'error' && <span className="text-sm text-red-400">✗ {status.msg}</span>}
      </div>
    </form>
  )
}