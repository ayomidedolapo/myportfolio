'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsAppFab({ number }: { number: string }) {
  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 fill-current" />
    </a>
  )
}