'use client'

import { useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { useForm, get, type Path } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { siteSettingsSchema, SiteSettingsSchemaType } from '@/lib/validations/settings'
import { updateSiteSettings } from '@/lib/actions/settings'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function SettingsForm({ initialData }: { initialData: Partial<SiteSettingsSchemaType> }) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SiteSettingsSchemaType>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      heroTitle: initialData.heroTitle || '',
      heroSubtitle: initialData.heroSubtitle || '',
      heroDescription: initialData.heroDescription || '',
      aboutContent: initialData.aboutContent || '',
      availabilityStatus: initialData.availabilityStatus || 'open',
      contactEmail: initialData.contactEmail || '',
      phoneNumber: initialData.phoneNumber || '',
      whatsappNumber: initialData.whatsappNumber || '',
      seoTitle: initialData.seoTitle || '',
      seoDescription: initialData.seoDescription || '',
      resumeUrl: initialData.resumeUrl || '',
      socialLinks: initialData.socialLinks || {},
      yearsExperience: initialData.yearsExperience || '',
projectsCompleted: initialData.projectsCompleted || '',
clientsWorldwide: initialData.clientsWorldwide || '',
    }
  })

  const onSubmit = async (data: SiteSettingsSchemaType) => {
    setStatus('idle')
    const res = await updateSiteSettings(data)
    if (res.success) setStatus('success')
    else setStatus('error')
  }

  const section = (title: string, children: React.ReactNode) => (
    <div className="border border-border bg-card p-5 space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      {children}
    </div>
  )

  const field = (
    label: string,
    name: Path<SiteSettingsSchemaType> | string,
    type = 'text',
    opts?: InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>
  ) => {
    const inputProps = opts as InputHTMLAttributes<HTMLInputElement>
    const textareaProps = opts as TextareaHTMLAttributes<HTMLTextAreaElement>
    const error = get(errors, name)

    return (
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">{label}</label>
        {type === 'textarea' ? (
          <Textarea
            {...register(name as Path<SiteSettingsSchemaType>) as unknown as TextareaHTMLAttributes<HTMLTextAreaElement>}
            rows={4}
            className="rounded-none border-border bg-muted/30"
            {...textareaProps}
          />
        ) : (
          <Input
            type={type}
            {...register(name as Path<SiteSettingsSchemaType>) as unknown as InputHTMLAttributes<HTMLInputElement>}
            className="h-10 rounded-none border-border bg-muted/30"
            {...inputProps}
          />
        )}
        {error && <p className="text-xs text-red-400">{error.message as string}</p>}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {section('Identity', <>
        {field('Hero Title', 'heroTitle')}
        {field('Hero Subtitle', 'heroSubtitle')}
        {field('Hero Description', 'heroDescription', 'textarea')}
        {field('About Content', 'aboutContent', 'textarea')}
      </>)}

      {section('Availability', <>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Status</label>
          <select {...register('availabilityStatus')} className="flex h-10 w-full rounded-none border border-border bg-muted/30 px-3 py-2 text-sm">
            <option value="open">Open for work</option>
            <option value="limited">Limited availability</option>
            <option value="booked">Booked out</option>
          </select>
        </div>
      </>)}

      {section('Contact', <>
        {field('Email', 'contactEmail', 'email')}
        {field('Phone Number', 'phoneNumber')}
        {field('WhatsApp Number', 'whatsappNumber')}
        {field('Resume URL', 'resumeUrl')}
      </>)}

      {section('SEO', <>
        {field('SEO Title', 'seoTitle')}
        {field('SEO Description', 'seoDescription', 'textarea')}
      </>)}

      {section('Social Links', <>
        {field('GitHub', 'socialLinks.github')}
        {field('LinkedIn', 'socialLinks.linkedin')}
        {field('Instagram', 'socialLinks.instagram')}
      </>)}

      {section('Quick Facts', <>
  {field('Years of Experience', 'yearsExperience', 'text')}
  {field('Projects Completed', 'projectsCompleted', 'text')}
  {field('Clients Worldwide', 'clientsWorldwide', 'text')}
</>)}

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isSubmitting} className="rounded-none">
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
        {status === 'success' && <span className="text-sm text-emerald-400">Saved successfully</span>}
        {status === 'error' && <span className="text-sm text-red-400">Failed to save</span>}
      </div>
    </form>
  )
}