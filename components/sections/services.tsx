'use client'

import { useState, useRef, useEffect } from 'react'
import { FadeIn } from '@/components/motion/fade-in'
import { StaggerContainer, StaggerItem } from '@/components/motion/stagger-container'
import { Code2, Clapperboard, Palette, PenTool, ArrowUpRight } from 'lucide-react'

const iconMap: Record<string, any> = {
  code: Code2,
  video: Clapperboard,
  graphics: Palette,
  write: PenTool,
}

export function ServicesSection({ services }: { services: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const display = services.length ? services : [
    { id: '1', title: 'Fullstack Development', description: 'End-to-end web applications with modern technologies.', icon: 'code', priceInfo: 'Contact for Quote' },
    { id: '2', title: 'Video Editing', description: 'Cinematic edits and motion content using CapCut.', icon: 'video', priceInfo: 'Contact for Quote' },
    { id: '3', title: 'Graphics Design', description: 'Visual identities and creative assets with Photoshop & Illustrator.', icon: 'graphics', priceInfo: 'Contact for Quote' },
    { id: '4', title: 'Content Writing', description: 'Compelling digital copy and technical content.', icon: 'write', priceInfo: 'Contact for Quote' },
  ]

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft
      const cardWidth = el.offsetWidth * 0.85 + 16
      const index = Math.round(scrollLeft / cardWidth)
      setActiveIndex(Math.min(Math.max(index, 0), display.length - 1))
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [display.length])

  return (
    <section className="border-t border-white/5 bg-muted/30 py-20 md:py-24">
      <div className="container">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Services</h2>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">Premium digital services tailored to your needs.</p>
          </div>
        </FadeIn>

        <div className="relative mt-10 md:mt-12">
          <StaggerContainer
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible lg:grid-cols-4 scrollbar-hide"
          >
            {display.map((service) => {
              const Icon = iconMap[service.icon as string] || Code2
              return (
                <StaggerItem key={service.id} className="w-[85vw] shrink-0 snap-center md:w-auto">
                  <div className="group relative h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                      {service.priceInfo || 'Contact for Quote'} <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>

          {/* Mobile scroll indicators — visible dots */}
<div className="mt-6 flex justify-center gap-2 md:hidden">
  {display.map((_, i) => (
    <button
      key={i}
      onClick={() => {
        const el = scrollRef.current
        if (!el) return
        const cardWidth = el.offsetWidth * 0.85 + 16
        el.scrollTo({ left: cardWidth * i, behavior: 'smooth' })
      }}
      className={`h-2 rounded-full transition-all duration-500 ease-out ${
        i === activeIndex   
          ? 'w-8 bg-foreground'
          : 'w-2 bg-foreground/20'
      }`}
      aria-label={`Go to slide ${i + 1}`}
    />
  ))}
</div>
        </div>
      </div>
    </section>
  )
}