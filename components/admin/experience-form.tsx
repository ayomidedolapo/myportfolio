'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { createExperience, updateExperience } from '@/lib/actions/profile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ExperienceForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; msg?: string }>({ type: 'idle' })
  const isEdit = !!initialData?.id

  const toDate = (d: any) => d ? new Date(d).toISOString().split('T')[0] : ''

  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm({
    defaultValues: {
      company: initialData?.company || '',
      role: initialData?.role || '',
      type: initialData?.type || 'fulltime',
      location: initialData?.location || '',
      startDate: toDate(initialData?.startDate),
      endDate: toDate(initialData?.endDate),
      isCurrent: initialData?.isCurrent || false,
      description: initialData?.description || '',
      achievements: initialData?.achievements?.join('\n') || '',
      companyUrl: initialData?.companyUrl || '',
      order: initialData?.order || 0,
    }
  })

  const isCurrent = watch('isCurrent')

  const onSubmit = async (data: any) => {
    setStatus({ type: 'idle' })
    const payload = { ...data, achievements: data.achievements.split('\n').filter(Boolean), endDate: data.isCurrent ? '' : data.endDate }
    const res = isEdit ? await updateExperience(initialData.id, payload) : await createExperience(payload)
    if (res.success) {
      setStatus({ type: 'success', msg: isEdit ? 'Updated' : 'Created' })
      if (!isEdit) setTimeout(() => router.push('/admin/experience'), 800)
    } else setStatus({ type: 'error', msg: res.error })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="border border-border bg-card p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Company</label>
            <Input {...register('company', { required: true })} className="h-10 rounded-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Role</label>
            <Input {...register('role', { required: true })} className="h-10 rounded-none" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Type</label>
            <select {...register('type')} className="flex h-10 w-full border border-border bg-muted/30 px-3 text-sm">
              <option value="fulltime">Full-time</option>
              <option value="parttime">Part-time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Location</label>
            <Input {...register('location')} placeholder="Lagos, Nigeria" className="h-10 rounded-none" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Start Date</label>
            <Input type="date" {...register('startDate', { required: true })} className="h-10 rounded-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">End Date</label>
            <Input type="date" {...register('endDate')} disabled={isCurrent} className="h-10 rounded-none disabled:opacity-50" />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register('isCurrent')} className="h-4 w-4" />
          <span>Currently working here</span>
        </label>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Description</label>
          <Textarea {...register('description')} rows={3} className="rounded-none" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Achievements (one per line)</label>
          <Textarea {...register('achievements')} rows={4} placeholder="Delivered 50+ projects&#10;Led team of 5" className="rounded-none font-mono text-sm" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Company URL</label>
          <Input {...register('companyUrl')} placeholder="https://" className="h-10 rounded-none" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Order</label>
          <Input type="number" {...register('order', { valueAsNumber: true })} className="h-10 w-32 rounded-none" />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <Button type="submit" disabled={isSubmitting} className="rounded-none">{isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Create'}</Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/experience')} className="rounded-none">Cancel</Button>
        {status.type === 'success' && <span className="text-sm text-emerald-400">✓ {status.msg}</span>}
        {status.type === 'error' && <span className="text-sm text-red-400">✗ {status.msg}</span>}
      </div>
    </form>
  )
}