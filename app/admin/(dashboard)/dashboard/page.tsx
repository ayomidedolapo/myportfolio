export const dynamic = 'force-dynamic'
import { Suspense } from 'react'
import Link from 'next/link'
import { getDashboardData } from '@/lib/admin-data'
import { FolderGit, FileText, MessageSquare, Briefcase, Plus, ArrowUpRight, Code2, Award, Star } from 'lucide-react'
import { Skeleton } from '@/components/admin/skeletons'

// ─── Instant shell ───
export default function DashboardPage() {
  const quick = [
    { label: 'Add Project', href: '/admin/projects', icon: Plus },
    { label: 'Write Post', href: '/admin/blog', icon: FileText },
    { label: 'Settings', href: '/admin/settings', icon: Code2 },
    { label: 'Media', href: '/admin/media', icon: FolderGit },
  ]

  return (
    <div className="space-y-10">

      {/* Header — renders instantly, no data needed */}
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Dashboard</h1>
        </div>
        <div className="flex gap-px border border-border">
          {quick.slice(0, 2).map((q) => (
            <Link key={q.label} href={q.href} className="flex items-center gap-2 bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">
              <q.icon className="h-4 w-4" /> {q.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Stats — streaming */}
      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>

      {/* Activity + Status — streaming */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Suspense fallback={<ActivitySkeleton />}>
            <ActivitySection />
          </Suspense>
        </div>
        <Suspense fallback={<StatusSkeleton />}>
          <StatusSection />
        </Suspense>
      </div>

      {/* Quick Actions — instant */}
      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
          {quick.map((q) => (
            <Link key={q.label} href={q.href} className="group flex items-center justify-between bg-card p-5 transition-colors hover:bg-muted">
              <div className="flex items-center gap-3">
                <q.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{q.label}</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>

      {/* Overview — streaming */}
      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider">Overview</h2>
        <Suspense fallback={<OverviewSkeleton />}>
          <OverviewSection />
        </Suspense>
      </div>

    </div>
  )
}

// ─── Async Data Components ───
async function StatsSection() {
  const data = await getDashboardData()
  const stats = [
    { label: 'Projects', value: data.projects.published + data.projects.draft, sub: `${data.projects.published} published · ${data.projects.draft} draft`, icon: FolderGit },
    { label: 'Blog Posts', value: data.posts.published + data.posts.draft, sub: `${data.posts.published} published · ${data.posts.draft} draft`, icon: FileText },
    { label: 'Inquiries', value: data.submissions.total, sub: `${data.submissions.unread} unread`, icon: MessageSquare },
    { label: 'Services', value: data.services, sub: 'active offerings', icon: Briefcase },
  ]

  return (
    <>
      {!data.dbConnected && (
        <div className="mb-6 border border-border bg-card p-5">
          <p className="text-sm font-medium">Database not connected</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Your database is unreachable. All counts show zero until connection is restored.
          </p>
        </div>
      )}
      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</span>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-4 text-3xl font-semibold tracking-tight">{s.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.sub}</div>
          </div>
        ))}
      </div>
    </>
  )
}

async function ActivitySection() {
  const data = await getDashboardData()
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider">Recent Activity</h2>
        <span className="text-xs text-muted-foreground">{data.recent.length} events</span>
      </div>
      {data.recent.length === 0 ? (
        <div className="px-5 py-16 text-center">
          <p className="text-sm text-muted-foreground">Not listed yet.</p>
          <p className="mt-1 text-xs text-muted-foreground">Publish a project or post to see activity here.</p>
        </div>
      ) : (
        <ul>
          {data.recent.map((a) => (
            <li key={a.id} className="flex items-center justify-between border-b border-border px-5 py-3 last:border-0">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{a.target}</p>
                <p className="text-xs text-muted-foreground">{a.action}</p>
              </div>
              <div className="ml-4 flex shrink-0 items-center gap-3">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{a.type}</span>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

async function StatusSection() {
  const data = await getDashboardData()
  const bars = [
    { label: 'Projects published', done: data.projects.published, total: data.projects.published + data.projects.draft },
    { label: 'Posts published', done: data.posts.published, total: data.posts.published + data.posts.draft },
    { label: 'Inquiries read', done: data.submissions.total - data.submissions.unread, total: data.submissions.total },
  ]
  const pct = (done: number, total: number) => (total > 0 ? Math.round((done / total) * 100) : 0)

  return (
    <div className="border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider">Content Status</h2>
      </div>
      <div className="space-y-5 p-5">
        {bars.map((b) => (
          <div key={b.label}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{b.label}</span>
              <span className="font-medium">{b.done}/{b.total}</span>
            </div>
            <div className="mt-2 h-1 bg-muted">
              <div className="h-full bg-foreground" style={{ width: `${pct(b.done, b.total)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

async function OverviewSection() {
  const data = await getDashboardData()
  const overview = [
    { label: 'Skills', value: data.skills, icon: Code2 },
    { label: 'Testimonials', value: data.testimonials, icon: Star },
    { label: 'Experience', value: data.experiences, icon: Briefcase },
    { label: 'Certifications', value: data.certifications, icon: Award },
  ]
  return (
    <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
      {overview.map((o) => (
        <div key={o.label} className="flex items-center justify-between bg-card p-5">
          <div className="flex items-center gap-3">
            <o.icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{o.label}</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">{o.value}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Skeletons (in-place, replace only the data slot) ───
function StatsSkeleton() {
  return (
    <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-card p-5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-4" />
          </div>
          <Skeleton className="mt-4 h-8 w-16" />
          <Skeleton className="mt-2 h-3 w-32" />
        </div>
      ))}
    </div>
  )
}

function ActivitySkeleton() {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-16" />
      </div>
      <div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between border-b border-border px-5 py-3 last:border-0">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-3 w-12" />
          </div>
        ))}
      </div>
    </div>
  )
}

function StatusSkeleton() {
  return (
    <div className="border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="space-y-5 p-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-10" />
            </div>
            <Skeleton className="h-1 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

function OverviewSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between bg-card p-5">
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-5 w-6" />
        </div>
      ))}
    </div>
  )
}