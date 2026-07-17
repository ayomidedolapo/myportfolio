import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const categories = [
    { name: 'Web Development', slug: 'web-development' },
    { name: 'Graphics Design', slug: 'graphics-design' },
    { name: 'Video Editing', slug: 'video-editing' },
    { name: 'UI Design', slug: 'ui-design' },
    { name: 'Digital Content', slug: 'digital-content' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }
  console.log('Categories seeded')
}

main().catch(console.error).finally(() => prisma.$disconnect())