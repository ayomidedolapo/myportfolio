'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { projectSchema, ProjectSchemaType } from '@/lib/validations/project'
import { createProject, updateProject } from '@/lib/actions/projects'
import { slugify } from '@/lib/slug'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/admin/image-upload'

interface Props {
  initialData?: ProjectSchemaType & { id: string }
  categories: Array<{ id: string; name: string }>
}

export function ProjectForm({ initialData, categories }: Props) {
  const router = useRouter()
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; msg?: string }>({ type: 'idle' })
  const isEdit = !!initialData?.id

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<ProjectSchemaType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      subtitle: initialData?.subtitle || '',
      description: initialData?.description || '',
      problem: initialData?.problem || '',
      process: initialData?.process || '',
      solution: initialData?.solution || '',
      results: initialData?.results || '',
      thumbnail: initialData?.thumbnail || '',
      gallery: initialData?.gallery || [],
      videoUrl: initialData?.videoUrl || '',
      categoryId: initialData?.categoryId || '',
      tags: initialData?.tags || [],
      featured: initialData?.featured || false,
      status: initialData?.status || 'draft',
      order: initialData?.order || 0,
      liveUrl: initialData?.liveUrl || '',
      repoUrl: initialData?.repoUrl || '',
      blogUrl: initialData?.blogUrl || '',
    }
  })

  const title = watch('title')
  const thumbnail = watch('thumbnail')
  const tags = watch('tags') || []

  useEffect(() => {
    if (!isEdit && title) setValue('slug', slugify(title))
  }, [title, isEdit, setValue])

  const onSubmit = async (data: ProjectSchemaType, saveAs?: 'draft' | 'published') => {
  setStatus({ type: 'idle' })
  const payload = saveAs ? { ...data, status: saveAs } : data
  const res = isEdit ? await updateProject(initialData.id, payload) : await createProject(payload)

  if (res.success) {
    setStatus({ type: 'success', msg: isEdit ? 'Updated' : (saveAs === 'draft' ? 'Draft saved' : 'Created') })
    if (!isEdit) {
      setTimeout(() => router.push('/admin/projects'), 800)
    }
  } else {
    setStatus({ type: 'error', msg: res.error })
  }
}

  const section = (title: string, children: React.ReactNode) => (
    <div className="border border-border bg-card p-5 space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      {children}
    </div>
  )

  const field = (label: string, name: keyof ProjectSchemaType, type = 'text', placeholder = '') => (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {type === 'textarea' ? (
        <Textarea {...register(name)} rows={4} placeholder={placeholder} className="rounded-none border-border bg-muted/30" />
      ) : (
        <Input type={type} {...register(name)} placeholder={placeholder} className="h-10 rounded-none border-border bg-muted/30" />
      )}
      {errors[name] && <p className="text-xs text-red-400">{errors[name]?.message as string}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      {section('Basic', <>
        {field('Title', 'title', 'text', 'Patient Tracking System')}
        {field('Slug', 'slug', 'text', 'patient-tracking-system')}
        {field('Subtitle', 'subtitle', 'text', 'A healthcare management platform')}
      </>)}

      {section('Case Study', <>
        {field('Description', 'description', 'textarea', 'Executive summary of the project')}
        {field('Problem', 'problem', 'textarea', 'What problem did this solve?')}
        {field('Process', 'process', 'textarea', 'How did you approach it?')}
        {field('Solution', 'solution', 'textarea', 'What did you build?')}
        {field('Results', 'results', 'textarea', 'What was the impact?')}
      </>)}

      {section('Media', <>
        <ImageUpload
          value={thumbnail || ''}
          onChange={(url) => setValue('thumbnail', url)}
          label="Thumbnail"
        />
        {field('Video URL (optional)', 'videoUrl', 'url', 'https://...')}
      </>)}

      {section('Links', <>
        {field('Live URL', 'liveUrl', 'url', 'https://project.com')}
        {field('Source/Repo URL', 'repoUrl', 'url', 'https://github.com/...')}
        {field('Blog URL', 'blogUrl', 'url', 'https://blog.com/post')}
      </>)}

      {section('Meta', <>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Category</label>
          <select {...register('categoryId')} className="flex h-10 w-full rounded-none border border-border bg-muted/30 px-3 py-2 text-sm">
            <option value="">— None —</option>
            {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Tags (comma-separated)</label>
          <Input
            defaultValue={tags.join(', ')}
            onBlur={(e) => setValue('tags', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
            placeholder="Next.js, TypeScript, Stripe"
            className="h-10 rounded-none border-border bg-muted/30"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Status</label>
          <select {...register('status')} className="flex h-10 w-full rounded-none border border-border bg-muted/30 px-3 py-2 text-sm">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register('featured')} className="h-4 w-4" />
          <span>Featured on homepage</span>
        </label>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Order (lower = first)</label>
          <Input type="number" {...register('order', { valueAsNumber: true })} className="h-10 w-32 rounded-none border-border bg-muted/30" />
        </div>
      </>)}

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
  <Button
    type="button"
    onClick={handleSubmit((d) => onSubmit(d, 'draft'))}
    disabled={isSubmitting}
    variant="outline"
    className="rounded-none"
  >
    {isSubmitting ? 'Saving...' : 'Save as Draft'}
  </Button>

  <Button
    type="button"
    onClick={handleSubmit((d) => onSubmit(d, 'published'))}
    disabled={isSubmitting}
    className="rounded-none"
  >
    {isSubmitting ? 'Saving...' : isEdit ? 'Update & Publish' : 'Publish'}
  </Button>

  <Button
    type="button"
    variant="ghost"
    onClick={() => router.push('/admin/projects')}
    className="rounded-none"
  >
    Cancel
  </Button>

  {status.type === 'success' && <span className="text-sm text-emerald-400">✓ {status.msg}</span>}
  {status.type === 'error' && <span className="text-sm text-red-400">✗ {status.msg}</span>}
</div>
    </form>
  )
}