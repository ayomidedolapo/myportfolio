'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence } from 'framer-motion'
import { ProjectPanel } from '@/components/project-panel'

type Project = {
  id: string | number
  slug: string
  title: string
  thumbnail?: string
  category?: {
    name: string
  }
  subtitle?: string
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null)

  if (projects.length === 0) {
    return (
      <div className="mt-12 border border-border bg-card py-16 text-center">
        <p className="text-sm font-medium text-muted-foreground">Not listed yet.</p>
        <p className="mt-1 text-xs text-muted-foreground">Add projects from the admin dashboard to see them here.</p>
      </div>
    )
  }

  return (
    <div className="relative mt-12">
      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            onClick={(e) => {
              if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                e.preventDefault()
                setSelected(project)
              }
            }}
            className="group block bg-card transition-colors hover:bg-muted"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              {project.thumbnail ? (
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-5xl font-bold text-muted-foreground/30">{project.title[0]}</span>
                </div>
              )}
            </div>
            <div className="p-4">
              {project.category && (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {project.category.name}
                </span>
              )}
              <h3 className="mt-1 text-lg font-semibold tracking-tight">{project.title}</h3>
              {project.subtitle && <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p>}
            </div>
          </Link>
        ))}
      </div>

      <AnimatePresence>
        {selected && <ProjectPanel project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  )
}