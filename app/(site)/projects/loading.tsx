export default function Loading() {
  return (
    <section className="pt-32 pb-24">
      <div className="container">
        <div className="border-b border-border pb-6 space-y-3">
          <div className="h-12 w-40 animate-pulse bg-muted" />
          <div className="h-4 w-80 animate-pulse bg-muted" />
        </div>
        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card p-4">
              <div className="aspect-[16/10] animate-pulse bg-muted" />
              <div className="mt-4 space-y-2">
                <div className="h-3 w-20 animate-pulse bg-muted" />
                <div className="h-5 w-3/4 animate-pulse bg-muted" />
                <div className="h-3 w-1/2 animate-pulse bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}