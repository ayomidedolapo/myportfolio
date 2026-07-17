export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-muted ${className}`} />
}

export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between border-b border-border pb-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-9 w-32" />
      </div>
      <div className="border border-border">
        <div className="border-b border-border bg-muted/30 p-3 flex gap-4">
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="border-b border-border p-4 flex gap-4 last:border-0">
            {Array.from({ length: cols }).map((_, j) => (
              <Skeleton key={j} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="max-w-2xl space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border border-border bg-card p-5 space-y-4">
            <Skeleton className="h-3 w-24" />
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function GridSkeleton({ items = 8 }: { items?: number }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-56" />
      </div>
      <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className="bg-card p-3">
            <Skeleton className="aspect-square w-full" />
            <div className="mt-2 flex items-center justify-between">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-6 w-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}