'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { X, ExternalLink, Code2, FileText } from 'lucide-react'
import Link from 'next/link'

type Project = {
  title: string
  slug: string
  thumbnail?: string
  subtitle?: string
  category?: {
    name: string
  }
  description?: string
  problem?: string
  solution?: string
  results?: string
  liveUrl?: string
  repoUrl?: string
  blogUrl?: string
}

export function ProjectPanel({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
      />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-border bg-background sm:w-[560px]"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Image */}
          <div className="relative aspect-[16/10] w-full bg-muted">
            {project.thumbnail ? (
              <Image src={project.thumbnail} alt={project.title} fill className="object-cover" sizes="560px" />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-6xl font-bold text-muted-foreground/20">{project.title[0]}</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6 p-6">
            <div>
              {project.category && (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {project.category.name}
                </span>
              )}
              <h2 className="mt-2 text-2xl font-bold tracking-tight">{project.title}</h2>
              {project.subtitle && <p className="mt-2 text-muted-foreground">{project.subtitle}</p>}
            </div>

            {project.description && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Overview</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              </div>
            )}

            {project.problem && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Problem</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
              </div>
            )}

            {project.solution && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Solution</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.solution}</p>
              </div>
            )}

            {project.results && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Results</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.results}</p>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-3 pt-2">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 border border-border bg-muted/30 px-4 text-sm font-medium transition-colors hover:bg-muted">
                  <ExternalLink className="h-4 w-4" /> Live Site
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 border border-border bg-muted/30 px-4 text-sm font-medium transition-colors hover:bg-muted">
                  <Code2 className="h-4 w-4" /> Source
                </a>
              )}
              {project.blogUrl && (
                <a href={project.blogUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 border border-border bg-muted/30 px-4 text-sm font-medium transition-colors hover:bg-muted">
                  <FileText className="h-4 w-4" /> Blog Post
                </a>
              )}
            </div>

            {/* Full page link */}
            <div className="border-t border-border pt-6">
              <Link href={`/projects/${project.slug}`} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                View full case study page →
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}