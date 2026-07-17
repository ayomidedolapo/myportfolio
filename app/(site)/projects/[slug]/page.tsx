
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjectBySlug } from '@/lib/data'
import { FadeIn } from '@/components/motion/fade-in'
import { ChevronLeft, ExternalLink, Code2, FileText } from 'lucide-react'
import { BackButton } from '@/components/back-button'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Project Not Found' }

  const title = project.title
  const description = project.subtitle || project.description || `Case study for ${project.title}`
  const ogImage = project.thumbnail || `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(project.category?.name || 'Project')}&type=project`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <>
      <section className="pt-32 pb-12">
        <div className="container">
          <FadeIn>
            <BackButton fallback="/projects" label="Back" />
            <div className="flex flex-wrap gap-2 mb-6">
              {project.category && (
                <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider bg-foreground text-background">
                  {project.category.name}
                </span>
              )}
              {project.tags.map((tag: string) => (
                <span key={tag} className="border border-border px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{project.title}</h1>
            {project.subtitle && <p className="mt-4 text-xl text-muted-foreground">{project.subtitle}</p>}
          </FadeIn>
        </div>
      </section>

      <section className="container">
        <FadeIn>
          <div className="relative aspect-[21/9] w-full overflow-hidden bg-muted">
            {project.thumbnail ? (
              <Image src={project.thumbnail} alt={project.title} fill className="object-cover" priority />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-6xl font-bold text-muted-foreground/20">{project.title[0]}</span>
              </div>
            )}
          </div>
        </FadeIn>
      </section>

      <section className="container py-12">
        <FadeIn>
          <div className="flex flex-wrap items-center gap-4 border-y border-border py-6 text-sm">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 border border-border px-4 text-sm font-medium transition-colors hover:bg-muted">
                <ExternalLink className="h-4 w-4" /> Live Site
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 border border-border px-4 text-sm font-medium transition-colors hover:bg-muted">
                <Code2 className="h-4 w-4" /> Source Code
              </a>
            )}
            {project.blogUrl && (
              <a href={project.blogUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 border border-border px-4 text-sm font-medium transition-colors hover:bg-muted">
                <FileText className="h-4 w-4" /> Blog Post
              </a>
            )}
            <span className="ml-auto text-muted-foreground">{new Date(project.createdAt).getFullYear()}</span>
          </div>
        </FadeIn>
      </section>

      <section className="container pb-24">
        <div className="mx-auto max-w-3xl space-y-12">
          {project.description && (
            <FadeIn>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Overview</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{project.description}</p>
              </div>
            </FadeIn>
          )}
          {project.problem && (
            <FadeIn>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Problem</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{project.problem}</p>
              </div>
            </FadeIn>
          )}
          {project.process && (
            <FadeIn>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Process</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{project.process}</p>
              </div>
            </FadeIn>
          )}
          {project.solution && (
            <FadeIn>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Solution</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{project.solution}</p>
              </div>
            </FadeIn>
          )}
          {project.results && (
            <FadeIn>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Results</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{project.results}</p>
              </div>
            </FadeIn>
          )}

          {project.gallery.length > 0 && (
            <FadeIn>
              <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
                {project.gallery.map((img: string, i: number) => (
                  <div key={i} className="relative aspect-video bg-muted">
                    <Image src={img} alt={`${project.title} ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

          {project.videoUrl && (
            <FadeIn>
              <div className="aspect-video bg-muted">
                <video src={project.videoUrl} controls className="h-full w-full" poster={project.thumbnail || undefined} />
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  )
}