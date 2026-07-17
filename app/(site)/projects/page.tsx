export const dynamic = 'force-dynamic'
export const revalidate = 0
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects across web development, UI design, graphics, and video editing.',
  openGraph: {
    title: 'Work — Ayomide Dolapo',
    description: 'Selected projects across development, design, and video.',
    images: ['/api/og?title=Selected Work&subtitle=Development · Design · Video&type=work'],
  },
}

import { getProjects } from '@/lib/data'
import { ProjectGrid } from '@/components/project-grid'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className="pt-32 pb-24">
      <div className="container">
        <div className="border-b border-border pb-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Work</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">Selected projects across development, design, and video.</p>
        </div>
        <ProjectGrid projects={projects} />
      </div>
    </section>
  )
}