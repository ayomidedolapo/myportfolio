import { prisma } from './prisma'

// ─── Graceful fallback when DB is asleep ───
function fallbackSettings() {
  return {
    id: 'site-settings',
    heroTitle: 'Ayomide Dolapo',
    heroSubtitle: 'Fullstack Developer & Digital Creator',
    heroDescription: 'I build premium digital experiences that convert visitors into clients.',
    aboutContent: 'I am a passionate fullstack developer and digital creator based in Lagos, Nigeria. With expertise in modern web technologies, video editing, and graphics design, I help brands bring their visions to life.',
    availabilityStatus: 'open',
    resumeUrl: '',
    contactEmail: 'ayomidedolapo333@gmail.com',
    phoneNumber: '+234 807 946 0647',
    whatsappNumber: '2348079460647',
    seoTitle: 'Ayomide Dolapo — Fullstack Developer & Digital Creator',
    seoDescription: 'Premium fullstack development, video editing, graphics design, and digital content services.',
    ogImage: '',
    socialLinks: { github: '', linkedin: '', instagram: '', whatsapp: '2348079460647' },
    updatedAt: new Date(),
  }
}

export async function getSiteSettings() {
  try {
    const s = await prisma.siteSettings.findUnique({ where: { id: 'site-settings' } })
    return s || fallbackSettings()
  } catch { return fallbackSettings() }
}

export async function getFeaturedProjects(limit = 6) {
  try {
    return await prisma.project.findMany({
      where: { status: 'published', featured: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      take: limit,
      include: { category: true },
    })
  } catch { return [] }
}

export async function getProjects() {
  try {
    return await prisma.project.findMany({
      where: { status: 'published' },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: { category: true },
    })
  } catch { return [] }
}

export async function getProjectBySlug(slug: string) {
  try {
    return await prisma.project.findUnique({
      where: { slug, status: 'published' },
      include: { category: true, testimonials: true },
    })
  } catch { return null }
}

export async function getServices() {
  try { return await prisma.service.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } }) } catch { return [] }
}

export async function getSkills() {
  try { return await prisma.skill.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }] }) } catch { return [] }
}

export async function getTestimonials() {
  try { return await prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { order: 'asc' }, take: 6 }) } catch { return [] }
}

export async function getBlogPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
      include: { category: true },
    })
  } catch { return [] }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    return await prisma.blogPost.findUnique({
      where: { slug, status: 'published' },
      include: { category: true },
    })
  } catch { return null }
}

export async function getExperiences() {
  try { return await prisma.experience.findMany({ orderBy: { order: 'asc' } }) } catch { return [] }
}

export async function getEducation() {
  try { return await prisma.education.findMany({ orderBy: { order: 'asc' } }) } catch { return [] }
}

export async function getCertifications() {
  try { return await prisma.certification.findMany({ orderBy: { order: 'asc' } }) } catch { return [] }
}