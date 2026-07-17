'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => console.error(error), [error])

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">An unexpected error occurred.</p>
      <button onClick={reset} className="mt-8 inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">
        Try again
      </button>
    </div>
  )
}