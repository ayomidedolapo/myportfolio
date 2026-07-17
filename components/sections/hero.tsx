import Link from 'next/link'
import { FadeIn } from '@/components/motion/fade-in'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export function HeroSection({ settings }: { settings?: any }) {
  const floatingTags = ['Fullstack Dev', 'Video Editor', 'Graphics', 'Digital Creator']

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-center pt-16">
      <div className="container w-full">
        
        {/* MOBILE HERO — Redesigned */}
        <div className="flex flex-col items-center gap-6 py-6 lg:hidden">
          
          {/* Eyebrow */}
          <FadeIn>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {settings?.heroSubtitle || 'Fullstack Developer & Digital Creator'}
            </span>
          </FadeIn>

          {/* Name — Large centered stack */}
          <FadeIn delay={0.1} className="text-center">
            <h1 className="text-7xl font-bold tracking-tighter leading-[0.85] sm:text-8xl">
              <span className="block">Ayomide</span>
              <span className="block text-muted-foreground">Dolapo</span>
            </h1>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.15} className="text-center">
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
              {settings?.heroDescription || 'I build premium digital experiences that convert visitors into clients.'}
            </p>
          </FadeIn>

          {/* 3D Image — Center stage with floating annotations */}
          <FadeIn delay={0.2} className="relative w-full max-w-[300px] py-4">
            <div className="relative mx-auto aspect-[3/4] w-full" style={{ perspective: '1000px' }}>
              <div 
                className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-primary/10"
                style={{ transform: 'rotateY(-8deg) rotateX(4deg)', transformStyle: 'preserve-3d' }}
              >
                {/* Scaled wrapper prevents rotation from clipping the image */}
                <div className="absolute -inset-4 scale-110">
                  <Image
                    src="/images/cutout.png"
                    alt="Ayomide Dolapo"
                    fill
                    className="object-cover"
                    sizes="300px"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.06] via-transparent to-transparent pointer-events-none" />
              </div>
              {/* Floating shadow beneath */}
              <div className="absolute -bottom-4 left-1/2 h-6 w-[80%] -translate-x-1/2 rounded-full bg-black/40 blur-2xl" />
            </div>

            {/* Floating annotation tags — Joker poster style */}
            <div className="absolute top-0 right-0 translate-x-2 -translate-y-2">
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-background/90 backdrop-blur-md px-3 py-2 shadow-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-primary bg-white" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">Fullstack Dev</span>
              </div>
            </div>
            <div className="absolute bottom-1/3 -left-4 -translate-x-1">
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-background/90 backdrop-blur-md px-3 py-2 shadow-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">Video Editor</span>
              </div>
            </div>
            <div className="absolute bottom-8 right-0 translate-x-3">
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-background/90 backdrop-blur-md px-3 py-2 shadow-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">Graphics</span>
              </div>
            </div>
          </FadeIn>

          {/* Tags */}
          <FadeIn delay={0.25}>
            <div className="flex flex-wrap justify-center gap-2">
              {floatingTags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur-md">
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={0.3} className="w-full max-w-sm">
            <div className="flex flex-col gap-3">
              <Link
                href={`https://wa.me/${settings?.whatsappNumber || '2348079460647'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
              >
                Start a Project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                href="/projects" 
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-transparent px-8 text-sm font-medium transition-colors hover:bg-muted"
              >
                View My Work
              </Link>
            </div>
          </FadeIn>

          {/* Scroll indicator */}
          <FadeIn delay={0.35}>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="relative h-10 w-[1px] overflow-hidden bg-muted-foreground/20">
                <div className="absolute top-0 h-4 w-full bg-muted-foreground/60 animate-bounce" />
              </div>
              <span className="uppercase tracking-widest"></span>
            </div>
          </FadeIn>
        </div>

        {/* DESKTOP HERO — Your exact code preserved */}
        <div className="hidden lg:grid lg:grid-cols-5 lg:gap-16 lg:items-center">
          
          <div className="flex flex-col items-start gap-5 lg:col-span-3">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-primary">
                {settings?.heroSubtitle || 'Fullstack Developer & Digital Creator'}
              </span>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-7xl lg:text-8xl leading-[0.9]">
                <span className="block lg:hidden">Ayomide</span>
                <span className="block text-muted-foreground lg:hidden">Dolapo</span>
                <span className="hidden lg:inline">{settings?.heroTitle || 'Ayomide Dolapo'}</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                {settings?.heroDescription || 'I build premium digital experiences that convert visitors into clients.'}
              </p>
            </FadeIn>

            <FadeIn delay={0.25} className="lg:hidden">
              <div className="flex flex-wrap gap-2">
                {floatingTags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur-md">
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="flex w-full flex-col gap-3 sm:flex-row">
                <Link
                  href={`https://wa.me/${settings?.whatsappNumber || '2348079460647'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] sm:w-auto"
                >
                  Start a Project <ArrowRight className="h-4 w-4" />
                </Link>
                <Link 
                  href="/projects" 
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-transparent px-8 text-sm font-medium transition-colors hover:bg-muted sm:w-auto"
                >
                  View My Work
                </Link>
              </div>
            </FadeIn>
          </div>

<FadeIn delay={0.2} direction="left" className="hidden lg:block lg:col-span-2">
  <div className="relative mx-auto aspect-[3/5] w-full max-w-md overflow-hidden bg-secondary">
    <Image
      src="/images/cutout.png"
      alt="Ayomide Dolapo"
      fill
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 40vw"
      priority
    />
  </div>
</FadeIn>
        </div>
        
        {/* Scroll indicator — mobile only */}
        <div className="mt-12 flex items-center gap-3 text-xs text-muted-foreground lg:hidden">
          <div className="relative h-10 w-[1px] overflow-hidden bg-muted-foreground/20">
            <div className="absolute top-0 h-4 w-full bg-muted-foreground/60 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}