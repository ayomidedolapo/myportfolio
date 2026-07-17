import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">404</p>
      <h1 className="mt-4 text-4xl font-bold">Page Not Found</h1>
      <p className="mt-2 text-muted-foreground">This page does not exist.</p>
      <Link href="/" className="mt-8 inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90">
        Back Home
      </Link>
    </div>
  )
}