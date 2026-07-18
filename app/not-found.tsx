"use client"

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Error 404</p>
      <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">Page Not Found</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleBack}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" /> Go Back
        </button>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm font-medium transition-colors hover:bg-muted"
        >
          <Home className="h-4 w-4" /> Homepage
        </Link>
      </div>
    </div>
  )
}