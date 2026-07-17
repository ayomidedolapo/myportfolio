export const dynamic = 'force-dynamic'
export const revalidate = 0
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Thoughts on development, design, and digital creation.',
  openGraph: {
    title: 'Insights — Ayomide Dolapo',
    description: 'Thoughts on development, design, and digital creation.',
    images: ['/api/og?title=Insights&subtitle=Development · Design · Creation&type=blog'],
  },
}

import Link from 'next/link'
import { FadeIn } from '@/components/motion/fade-in'
import { StaggerContainer, StaggerItem } from '@/components/motion/stagger-container'
import { getBlogPosts } from '@/lib/data'
import { formatDate } from '@/lib/utils'

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <section className="pt-32 pb-24">
      <div className="container">
        <FadeIn>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Insights</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">Thoughts on development, design, and digital creation.</p>
        </FadeIn>

        <StaggerContainer className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                    <span className="text-4xl font-bold text-muted-foreground/30">{post.title[0]}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{post.category?.name}</span>
                  <span>•</span>
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                  {post.readingTime && <><span>•</span><span>{post.readingTime} min read</span></>}
                </div>
                <h3 className="mt-2 text-xl font-semibold group-hover:text-primary transition-colors">{post.title}</h3>
                {post.excerpt && <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>}
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}