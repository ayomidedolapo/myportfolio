export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Have a project in mind? Get in touch with Ayomide Dolapo.',
  openGraph: {
    title: 'Contact — Ayomide Dolapo',
    description: 'Have a project in mind? Get in touch.',
    images: ['/api/og?title=Let%27s Talk&subtitle=Have a project in mind%3F&type=contact'],
  },
}

import { FadeIn } from '@/components/motion/fade-in'
import { getSiteSettings } from '@/lib/data'
import { ContactForm } from '@/components/contact-form'
import { MapPin, Mail, Phone, MessageCircle } from 'lucide-react'

export default async function ContactPage() {
  const settings = await getSiteSettings()

  return (
    <section className="pt-32 pb-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <FadeIn>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Let&apos;s Talk</h1>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">Have a project or opportunity? I typically respond within 24 hours.</p>
            </FadeIn>

            <FadeIn delay={0.1} className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a href={`mailto:${settings.contactEmail}`} className="text-sm text-muted-foreground hover:text-primary">{settings.contactEmail}</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-sm text-muted-foreground">{settings.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-sm text-muted-foreground">Lagos, Nigeria</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">WhatsApp</h3>
                  <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-green-500">Start a chat</a>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} direction="left">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-xl font-semibold">Send a message</h2>
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}