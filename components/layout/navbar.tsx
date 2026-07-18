'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, ArrowUpRight, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar({ settings }: { settings?: { heroTitle?: string; whatsappNumber?: string } | null }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Trigger loader on route change
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [pathname, searchParams])

  // Detect link clicks anywhere on site
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      if (link && link.href && link.host === window.location.host && !link.target) {
        const linkPath = new URL(link.href).pathname
        if (linkPath !== pathname) setLoading(true)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [pathname])

  const logoText = settings?.heroTitle || 'Ayomide Dolapo'

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="relative overflow-hidden text-[15px] font-semibold tracking-tight">
            <span className="relative inline-block">
              {logoText}
              {loading && (
               <>
    {/* Glass shimmer sweep — theme safe */}
    <motion.span
      initial={{ x: '-100%' }}
      animate={{ x: '200%' }}
      transition={{ duration: 1.1, ease: 'easeInOut', repeat: Infinity }}
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.6) 60%, transparent 80%)',
        filter: 'blur(6px)',
      }}
    />

    {/* Frost overlay that adapts to theme */}
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.35, 0] }}
      transition={{ duration: 1.1, ease: 'easeInOut', repeat: Infinity }}
      className="pointer-events-none absolute inset-0 bg-foreground/10"
    />
  </>
              )}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </Link>
            ))}
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Sun className="h-4 w-4 dark:hidden" />
              <Moon className="hidden h-4 w-4 dark:block" />
            </button>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground">
              <Sun className="h-4 w-4 dark:hidden" />
              <Moon className="hidden h-4 w-4 dark:block" />
            </button>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground"
              aria-label="Open menu"
            >
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="1" y1="1" x2="19" y2="1" />
                <line x1="1" y1="7" x2="19" y2="7" />
                <line x1="1" y1="13" x2="19" y2="13" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl"
          >
            <div className="container flex h-16 items-center justify-between">
              <span className="text-[15px] font-semibold tracking-tight">{logoText}</span>
              <button onClick={() => setOpen(false)} className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="container mt-12 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 + 0.1 }}>
                  <Link href={link.href} onClick={() => setOpen(false)} className="flex items-center justify-between py-4 text-4xl font-medium tracking-tight transition-colors hover:text-primary">
                    {link.label}
                    <ArrowUpRight className="h-6 w-6 text-muted-foreground" />
                  </Link>
                  <div className="h-px bg-border" />
                </motion.div>
              ))}
            </nav>

            <div className="container mt-12">
              <a href={`https://wa.me/${settings?.whatsappNumber || '2348079460647'}`} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 text-lg font-medium text-primary">
                Start a project <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}