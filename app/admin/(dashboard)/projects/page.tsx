export const dynamic = 'force-dynamic'
import { Suspense } from 'react'
import Link from 'next/link'
import { getAdminProjects } from '@/lib/admin-data'
import { deleteProject } from '@/lib/actions/projects'
import { DeleteButton } from '@/components/admin/delete-button'
import { Button } from '@/components/ui/button'
import { Plus, Pencil } from 'lucide-react'
import { Skeleton } from '@/components/admin/skeletons'

export default function AdminProjectsPage() {
  return (
    <div className="space-y-6">
      {/* Instant header */}
      <div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">Manage your portfolio work</p>
        </div>
        <Link href="/admin/projects/new">
          <Button size="sm" className="gap-2 rounded-none"><Plus className="h-4 w-4" /> Add Project</Button>
        </Link>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <ProjectsTable />
      </Suspense>
    </div>
  )
}

type Project = {
  id: string
  title: string
  category?: { name?: string } | null
  status: string
  featured: boolean
}

async function ProjectsTable() {
  let projects: Project[] = []
  let error = ''
  try { projects = await getAdminProjects() } catch (e) { error = 'Database not connected' }

  if (error) return <div className="border border-border bg-card p-4 text-sm text-muted-foreground">{error}</div>

  if (projects.length === 0) {
    return (
      <div className="border border-border bg-card py-16 text-center">
        <p className="text-sm font-medium text-muted-foreground">Not listed yet.</p>
        <p className="mt-1 text-xs text-muted-foreground">Add your first project to see it here.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Featured</th>
            <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {projects.map((p) => (
            <tr key={p.id} className="transition-colors hover:bg-muted/20">
              <td className="px-4 py-3 font-medium">{p.title}</td>
              <td className="px-4 py-3 text-muted-foreground">{p.category?.name || '—'}</td>
              <td className="px-4 py-3">
                <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${p.status === 'published' ? 'bg-foreground text-background' : 'border border-border text-muted-foreground'}`}>
                  {p.status}
                </span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{p.featured ? 'Yes' : 'No'}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/projects/${p.id}/edit`} className="inline-flex h-8 w-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <DeleteButton id={p.id} action={deleteProject} label="project" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="border border-border">
      <div className="border-b border-border bg-muted/30 px-4 py-3 flex gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border-b border-border px-4 py-4 flex items-center gap-4 last:border-0">
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-12" />
          <div className="flex gap-2 ml-auto">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      ))}
    </div>
  )
}