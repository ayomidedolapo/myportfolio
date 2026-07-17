import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ayomidedolapo.dev'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/about', '/projects', '/blog', '/contact'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  let projects: any[] = []
  let posts: any[] = []

  try {
    projects = await prisma.project.findMany({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true },
    })
    posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true },
    })
  } catch {
    return staticRoutes
  }

  const projectRoutes = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const postRoutes = posts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes, ...postRoutes]
}