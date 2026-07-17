'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { createSkill, updateSkill } from '@/lib/actions/profile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function SkillForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; msg?: string }>({ type: 'idle' })
  const isEdit = !!initialData?.id

  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      name: initialData?.name || '',
      category: initialData?.category || 'development',
      proficiency: initialData?.proficiency || 80,
      icon: initialData?.icon || '',
      order: initialData?.order || 0,
    }
  })

  const onSubmit = async (data: any) => {
    setStatus({ type: 'idle' })
    const res = isEdit ? await updateSkill(initialData.id, data) : await createSkill(data)
    if (res.success) {
      setStatus({ type: 'success', msg: isEdit ? 'Updated' : 'Created' })
      if (!isEdit) setTimeout(() => router.push('/admin/skills'), 800)
    } else setStatus({ type: 'error', msg: res.error })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="border border-border bg-card p-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Skill Name</label>
          <Input {...register('name', { required: true })} placeholder="React / Next.js" className="h-10 rounded-none" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Category</label>
          <select {...register('category')} className="flex h-10 w-full border border-border bg-muted/30 px-3 text-sm">
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="video">Video</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Proficiency (0-100)</label>
          <Input type="number" min={0} max={100} {...register('proficiency', { valueAsNumber: true })} className="h-10 rounded-none" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Order</label>
          <Input type="number" {...register('order', { valueAsNumber: true })} className="h-10 rounded-none" />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <Button type="submit" disabled={isSubmitting} className="rounded-none">{isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Create'}</Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/skills')} className="rounded-none">Cancel</Button>
        {status.type === 'success' && <span className="text-sm text-emerald-400">✓ {status.msg}</span>}
        {status.type === 'error' && <span className="text-sm text-red-400">✗ {status.msg}</span>}
      </div>
    </form>
  )
}