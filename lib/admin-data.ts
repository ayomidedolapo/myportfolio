import { cache } from 'react'
import { prisma } from './prisma'

function rel(date: Date) {
  const s = Math.floor((Date.now() - date.getTime()) / 1000)
  if (s < 60) return 'just now'
  const m = Math.floor(s / 60); if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24); if (d < 30) return `${d}d ago`
  return date.toLocaleDateString()
}

// ✅ React cache dedupes calls within a single request
export const getDashboardData = cache(async () => {
  const zero = {
    dbConnected: false,
    projects: { published: 0, draft: 0 },
    posts: { published: 0, draft: 0 },
    submissions: { unread: 0, total: 0 },
    services: 0, skills: 0, testimonials: 0, experiences: 0, education: 0, certifications: 0,
    recent: [] as { id: string; type: string; action: string; target: string; time: string }[],
  }
  try {
    const [pPub, pDra, poPub, poDra, sUn, sTot, sv, sk, te, ex, ed, ce, rP, rB, rS] = await Promise.all([
      prisma.project.count({ where: { status: 'published' } }),
      prisma.project.count({ where: { status: 'draft' } }),
      prisma.blogPost.count({ where: { status: 'published' } }),
      prisma.blogPost.count({ where: { status: 'draft' } }),
      prisma.contactSubmission.count({ where: { read: false } }),
      prisma.contactSubmission.count(),
      prisma.service.count({ where: { isActive: true } }),
      prisma.skill.count(),
      prisma.testimonial.count({ where: { isActive: true } }),
      prisma.experience.count(),
      prisma.education.count(),
      prisma.certification.count(),
      prisma.project.findMany({ select: { id: true, title: true, status: true, updatedAt: true }, orderBy: { updatedAt: 'desc' }, take: 5 }),
      prisma.blogPost.findMany({ select: { id: true, title: true, status: true, updatedAt: true }, orderBy: { updatedAt: 'desc' }, take: 5 }),
      prisma.contactSubmission.findMany({ select: { id: true, name: true, createdAt: true }, orderBy: { createdAt: 'desc' }, take: 5 }),
    ])
    const recent = [
      ...rP.map((p) => ({ id: 'p-' + p.id, type: 'Project', action: p.status === 'published' ? 'Published project' : 'Saved draft', target: p.title, time: rel(p.updatedAt), _t: p.updatedAt.getTime() })),
      ...rB.map((p) => ({ id: 'b-' + p.id, type: 'Blog', action: p.status === 'published' ? 'Published post' : 'Saved draft', target: p.title, time: rel(p.updatedAt), _t: p.updatedAt.getTime() })),
      ...rS.map((s) => ({ id: 's-' + s.id, type: 'Inquiry', action: 'New message', target: s.name, time: rel(s.createdAt), _t: s.createdAt.getTime() })),
    ].sort((a, b) => b._t - a._t).slice(0, 6).map(({ _t, ...rest }) => rest)

    return {
      dbConnected: true,
      projects: { published: pPub, draft: pDra },
      posts: { published: poPub, draft: poDra },
      submissions: { unread: sUn, total: sTot },
      services: sv, skills: sk, testimonials: te, experiences: ex, education: ed, certifications: ce,
      recent,
    }
  } catch (e) {
    console.error('Dashboard data error:', e)
    return zero
  }
})

// ─── Rest stays the same ───
export const getAdminProjects = () => prisma.project.findMany({ include: { category: true }, orderBy: [{ order: 'asc' }, { updatedAt: 'desc' }] })
export const getAdminPosts = () => prisma.blogPost.findMany({ include: { category: true }, orderBy: { updatedAt: 'desc' } })
export const getAdminSubmissions = () => prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } })
export const getAdminServices = () => prisma.service.findMany({ orderBy: { order: 'asc' } })
export const getAdminSkills = () => prisma.skill.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }] })
export const getAdminExperiences = () => prisma.experience.findMany({ orderBy: { order: 'asc' } })
export const getAdminEducation = () => prisma.education.findMany({ orderBy: { order: 'asc' } })
export const getAdminTestimonials = () => prisma.testimonial.findMany({ orderBy: { order: 'asc' } })
export const getAdminCertifications = () => prisma.certification.findMany({ orderBy: { order: 'asc' } })
export const getAdminMedia = () => prisma.mediaAsset.findMany({ orderBy: { createdAt: 'desc' } })