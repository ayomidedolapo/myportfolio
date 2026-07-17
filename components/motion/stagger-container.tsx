'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'

export const StaggerContainer = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
)
StaggerContainer.displayName = 'StaggerContainer'

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}