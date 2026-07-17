'use client'

import { useTransition } from 'react'
import { Trash2 } from 'lucide-react'

interface Props {
  id: string
  action: (id: string) => Promise<{ success: boolean; error?: string }>
  label?: string
}

export function DeleteButton({ id, action, label = 'item' }: Props) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm(`Delete this ${label}? This cannot be undone.`)) return
    startTransition(async () => {
      await action(id)
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex h-8 w-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
      title={`Delete ${label}`}
    >
      <Trash2 className="h-3.5 w-3.5" />
    </button>
  )
}