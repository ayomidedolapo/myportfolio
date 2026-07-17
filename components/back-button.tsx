'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

export function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/projects')
    }
  }

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 cursor-pointer"
    >
      <ChevronLeft className="h-4 w-4" /> Back
    </button>
  )
}