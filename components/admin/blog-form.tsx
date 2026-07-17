'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { blogPostSchema, BlogPostSchemaType } from '@/lib/validations/blog'
import { createBlogPost, updateBlogPost } from '@/lib/actions/blog'
import { slugify } from '@/lib/slug'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/admin/image-upload'

interface Props {
  initialData?: any
  categories: any[]
}

export function BlogForm({ initialData, categories }: Props) {
  const router = useRouter()
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; msg?: string }>({ type: 'idle' })
  const isEdit = !!initialData?.id

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<BlogPostSchemaType>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      excerpt: initialData?.excerpt || '',
      content: initialData?.content || '',
      coverImage: initialData?.coverImage || '',
      categoryId: initialData?.categoryId || '',
      tags: initialData?.tags || [],
      status: initialData?.status || 'draft',
      publishedAt: initialData?.publishedAt ? new Date(initialData.publishedAt).toISOString() : '',
    }
  })

  const title = watch('title')
  const coverImage = watch('coverImage')
  const tags = watch('tags') || []

  useEffect(() => {
    if (!isEdit && title) setValue('slug', slugify(title))
  }, [title, isEdit, setValue])

  const onSubmit = async (data: BlogPostSchemaType) => {
    setStatus({ type: 'idle' })
    if (data.status === 'published' && !data.publishedAt) {
      data.publishedAt = new Date().toISOString()
    }
    const res = isEdit ? await updateBlogPost(initialData.id, data) : await createBlogPost(data)

    if (res.success) {
      setStatus({ type: 'success', msg: isEdit ? 'Updated' : 'Created' })
      setTimeout(() => router.push('/admin/blog'), 800)
    } else {
      setStatus({ type: 'error', msg: res.error })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      <div className="border border-border bg-card p-5 space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Basic</h3>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Title</label>
          <Input {...register('title')} placeholder="Building Scalable APIs" className="h-10 rounded-none border-border bg-muted/30" />
          {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Slug</label>
          <Input {...register('slug')} placeholder="building-scalable-apis" className="h-10 rounded-none border-border bg-muted/30" />
          {errors.slug && <p className="text-xs text-red-400">{errors.slug.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Excerpt</label>
          <Textarea {...register('excerpt')} rows={3} placeholder="Short summary" className="rounded-none border-border bg-muted/30" />
        </div>
      </div>

      <div className="border border-border bg-card p-5 space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content (Markdown)</h3>
        <Textarea
          {...register('content')}
          rows={20}
          placeholder="# Heading&#10;&#10;Write your post in Markdown..."
          className="rounded-none border-border bg-muted/30 font-mono text-sm"
        />
        {errors.content && <p className="text-xs text-red-400">{errors.content.message}</p>}
      </div>

      <div className="border border-border bg-card p-5 space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cover Image</h3>
        <ImageUpload value={coverImage || ''} onChange={(url) => setValue('coverImage', url)} label="" />
      </div>

      <div className="border border-border bg-card p-5 space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Meta</h3>
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
            placeholder="Next.js, TypeScript, Backend"
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
      </div>

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