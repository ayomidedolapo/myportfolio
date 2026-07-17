'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, ArrowRight, Shield } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', { email, password, redirect: false })

    if (res?.error) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-[420px]"
      >
        {/* Glass card */}
        <div className="rounded-2xl border border-white/10 bg-card/80 backdrop-blur-xl p-8 shadow-2xl">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight">Welcome Back</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your admin dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-lg border-border bg-muted/50 px-4 text-sm focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 rounded-lg border-border bg-muted/50 px-4 pr-12 text-sm focus-visible:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sm text-red-400"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Protected area. Authorized personnel only.
            </p>
          </div>
        </div>

        {/* Brand mark */}
        <p className="mt-6 text-center text-xs font-medium tracking-tight text-muted-foreground">
          Ayomide Dolapo — Portfolio Admin
        </p>
      </motion.div>
    </div>
  )
}