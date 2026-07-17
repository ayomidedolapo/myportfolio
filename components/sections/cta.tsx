import Link from 'next/link'
import { FadeIn } from '@/components/motion/fade-in'
import { ArrowRight, Clock } from 'lucide-react'

export function CTASection({ settings }: { settings?: any }) {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <FadeIn>
          <div className="mx-auto max-w-3xl rounded-sm border border-border bg-card p-6 text-center sm:p-8 md:p-12 lg:p-16">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Have a project in mind?</h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground md:text-base">Let&apos;s collaborate to build something exceptional. I&apos;m currently accepting new projects.</p>
            
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href={`https://wa.me/${settings?.whatsappNumber || '2348079460647'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
              >
                Start a Conversation <ArrowRight className="h-4 w-4" />
              </Link>
              <a 
  href="mailto:ayomidedolapo333@gmail.com" 
  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-sm border border-border px-8 text-sm font-medium transition-colors hover:bg-muted sm:w-auto"
>
  Send an Email
</a>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> Typically replies within 24 hours
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}