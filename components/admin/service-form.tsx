'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { createService, updateService } from '@/lib/actions/profile'
import { slugify } from '@/lib/slug'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ServiceForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; msg?: string }>({ type: 'idle' })
  const isEdit = !!initialData?.id

  const { register, handleSubmit, watch, setValue, formState: { isSubmitting } } = useForm({
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      description: initialData?.description || '',
      icon: initialData?.icon || 'code',
      features: initialData?.features?.join('\n') || '',
      priceInfo: initialData?.priceInfo || 'Contact for Quote',
      order: initialData?.order || 0,
      isActive: initialData?.isActive ?? true,
    }
  })

  const title = watch('title')
  useEffect(() => { if (!isEdit && title) setValue('slug', slugify(title)) }, [title, isEdit, setValue])

  const onSubmit = async (data: any) => {
    setStatus({ type: 'idle' })
    const payload = { ...data, features: data.features.split('\n').filter(Boolean) }
    const res = isEdit ? await updateService(initialData.id, payload) : await createService(payload)
    if (res.success) {
      setStatus({ type: 'success', msg: isEdit ? 'Updated' : 'Created' })
      if (!isEdit) setTimeout(() => router.push('/admin/services'), 800)
    } else setStatus({ type: 'error', msg: res.error })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="border border-border bg-card p-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Title</label>
          <Input {...register('title', { required: true })} className="h-10 rounded-none" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Slug</label>
          <Input {...register('slug')} className="h-10 rounded-none" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Description</label>
          <Textarea {...register('description')} rows={3} className="rounded-none" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Icon</label>
          <select {...register('icon')} className="flex h-10 w-full border border-border bg-muted/30 px-3 text-sm">
            <option value="code">Code (Development)</option>
            <option value="video">Video Camera</option>
            <option value="graphics">Palette (Graphics)</option>
            <option value="write">Pen (Writing)</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Features (one per line)</label>
          <Textarea {...register('features')} rows={4} placeholder="Fast delivery&#10;Modern tech stack&#10;24/7 support" className="rounded-none font-mono text-sm" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Price Info</label>
          <Input {...register('priceInfo')} className="h-10 rounded-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Order</label>
            <Input type="number" {...register('order', { valueAsNumber: true })} className="h-10 rounded-none" />
          </div>
          <label className="flex items-end gap-2 text-sm">
            <input type="checkbox" {...register('isActive')} className="h-4 w-4" />
            <span>Active</span>
          </label>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
        <Button type="submit" disabled={isSubmitting} className="rounded-none">{isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Create'}</Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/services')} className="rounded-none">Cancel</Button>
        {status.type === 'success' && <span className="text-sm text-emerald-400">✓ {status.msg}</span>}
        {status.type === 'error' && <span className="text-sm text-red-400">✗ {status.msg}</span>}
      </div>
    </form>
  )
}