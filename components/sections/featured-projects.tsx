import Link from 'next/link'
import Image from 'next/image'
import { FadeIn } from '@/components/motion/fade-in'
import { StaggerContainer, StaggerItem } from '@/components/motion/stagger-container'
import { ArrowUpRight } from 'lucide-react'

export function FeaturedProjectsSection({ projects }: { projects: any[] }) {
  if (!projects.length) {
    return (
      <section id="projects" className="py-20 md:py-24">
        <div className="container">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Selected Work</h2>
            <p className="mt-2 text-muted-foreground">Projects will appear here once added from the admin dashboard.</p>
          </FadeIn>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 md:py-24">
      <div className="container">
        <FadeIn>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Selected Work</h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">A curated collection of my best projects.</p>
            </div>
            <Link href="/projects" className="text-sm font-medium text-primary hover:underline">View All Work</Link>
          </div>
        </FadeIn>
        
        <StaggerContainer className="mt-10 flex flex-col gap-8 md:mt-12 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted md:aspect-[16/10]">
                  {project.thumbnail ? (
                    <Image 
                      src={project.thumbnail} 
                      alt={project.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                      <span className="text-5xl font-bold text-muted-foreground/30 md:text-4xl">{project.title[0]}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:items-end md:from-black/60 md:p-6">
                    <span className="flex items-center gap-2 text-sm font-medium text-white">
                      View Case Study <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    {project.category && <span className="text-xs font-medium text-primary uppercase tracking-wider">{project.category.name}</span>}
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight md:text-lg">{project.title}</h3>
                  {project.subtitle && <p className="text-sm text-muted-foreground">{project.subtitle}</p>}
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}