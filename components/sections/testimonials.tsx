import { FadeIn } from '@/components/motion/fade-in'
import { StaggerContainer, StaggerItem } from '@/components/motion/stagger-container'
import { Quote } from 'lucide-react'

export function TestimonialsSection({ testimonials }: { testimonials: any[] }) {
  const display = testimonials.length ? testimonials : [
    { id: '1', clientName: 'Future Client', clientRole: 'CEO', company: 'Company', content: 'Ayomide delivered exceptional work on our platform. The attention to detail and technical expertise is world-class.' },
    { id: '2', clientName: 'Future Client', clientRole: 'Product Lead', company: 'Startup', content: 'Working with Ayomide was seamless. The designs were intuitive and the development was flawless.' },
  ]

  return (
    <section className="border-t border-white/5 bg-muted/30 py-20 md:py-24">
      <div className="container">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Client Testimonials</h2>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">What people say about working with me.</p>
          </div>
        </FadeIn>
        
        <StaggerContainer className="mt-10 flex flex-col gap-6 md:mt-12 md:grid md:grid-cols-2">
          {display.map((t) => (
            <StaggerItem key={t.id}>
              <div className="relative rounded-2xl border border-border bg-card p-6 md:p-8">
                <Quote className="h-8 w-8 text-primary/20" />
                <p className="mt-4 text-lg leading-relaxed text-foreground/90 md:text-xl">&ldquo;{t.content}&rdquo;</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-bold">
                    {t.clientName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.clientName}</p>
                    <p className="text-xs text-muted-foreground">{t.clientRole}{t.company ? `, ${t.company}` : ''}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}