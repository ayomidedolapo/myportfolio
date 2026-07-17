
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }

  const title = post.title
  const description = post.excerpt || `Read ${post.title} on Ayomide Dolapo's blog`
  const ogImage = post.coverImage || `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(post.category?.name || 'Blog')}&type=blog`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FadeIn } from '@/components/motion/fade-in'
import { getBlogPostBySlug } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { BackButton } from '@/components/back-button'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <article className="pt-32 pb-24">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <BackButton fallback="/blog" label="Back" />
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{post.category?.name}</span>
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
              {post.readingTime && <><span>•</span><span>{post.readingTime} min read</span></>}
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{post.title}</h1>
            {post.excerpt && <p className="mt-4 text-xl text-muted-foreground">{post.excerpt}</p>}
          </FadeIn>

          <FadeIn delay={0.2} className="mt-12">
            <div className="prose prose-invert prose-zinc max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </FadeIn>

          {post.tags.length > 0 && (
            <FadeIn className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{tag}</span>
              ))}
            </FadeIn>
          )}
        </div>
      </div>
    </article>
  )
}