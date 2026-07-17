'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, ContactSchemaType } from '@/lib/validations/contact'
import { submitContact } from '@/lib/actions/contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchemaType>({
    resolver: zodResolver(contactSchema),
  })

const onSubmit = async (data: ContactSchemaType) => {
  const res = await submitContact(data)
  if (res.success) {
    setStatus('success')
    reset()
  } else {
    setStatus('error')
  }
}

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Input placeholder="Name" {...register('name')} />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <Input placeholder="Email" type="email" {...register('email')} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>
      
      <div>
        <Input placeholder="Subject" {...register('subject')} />
      </div>
      
      <div>
  <Input 
    placeholder="Budget (e.g. $2,500 or ₦500,000)" 
    {...register('budget')} 
  />
</div>
      
      <div>
        <Textarea placeholder="Tell me about your project..." rows={5} {...register('message')} />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <input {...register('website')} className="hidden" tabIndex={-1} autoComplete="off" />

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>

      {status === 'success' && <p className="text-sm text-green-500">Message sent successfully!</p>}
      {status === 'error' && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
    </form>
  )
}