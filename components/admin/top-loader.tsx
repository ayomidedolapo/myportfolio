'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function TopLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setLoading(true)
    setProgress(0)

    const start = setTimeout(() => setProgress(30), 50)
    const mid = setTimeout(() => setProgress(60), 200)
    const near = setTimeout(() => setProgress(85), 500)
    const done = setTimeout(() => {
      setProgress(100)
      setTimeout(() => setLoading(false), 200)
    }, 700)

    return () => {
      clearTimeout(start)
      clearTimeout(mid)
      clearTimeout(near)
      clearTimeout(done)
    }
  }, [pathname, searchParams])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      if (link && link.href && link.href.includes('/admin') && !link.target) {
        setLoading(true)
        setProgress(20)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  if (!loading) return null

  return (
    <div className="fixed left-0 right-0 top-0 z-[200] h-[2px] bg-transparent">
      <div
        className="h-full bg-white transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: '0 0 10px rgba(255,255,255,0.6), 0 0 5px rgba(255,255,255,0.4)',
        }}
      />
    </div>
  )
}