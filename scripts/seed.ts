import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env")
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.log("Admin already exists")
  } else {
    const hashed = await bcrypt.hash(password, 12)
    await prisma.user.create({
      data: {
        email,
        password: hashed,
        name: "Ayomide Dolapo",
        isAdmin: true,
      },
    })
    console.log("Admin user created")
  }

  await prisma.siteSettings.upsert({
    where: { id: "site-settings" },
    update: {},
    create: {
      id: "site-settings",
      heroTitle: "Ayomide Dolapo",
      heroSubtitle: "Fullstack Developer & Digital Creator",
      heroDescription:
        "I build premium digital experiences that convert visitors into clients.",
      availabilityStatus: "open",
      whatsappNumber: "2348079460647",
      contactEmail: email,
      seoTitle: "Ayomide Dolapo — Fullstack Developer & Digital Creator",
      seoDescription:
        "Premium fullstack development, UI design, graphics design, and video editing services.",
    },
  })

  console.log("Seed complete")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })