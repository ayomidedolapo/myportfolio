import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppFab } from '@/components/layout/whatsapp-fab'
import { SmoothScroll } from '@/components/smooth-scroll'
import { prisma } from '@/lib/prisma'
import { PersonSchema } from '@/components/seo/person-schema'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 'site-settings' } })

  if (!settings) {
    return null
  }

  return (
    <SmoothScroll>
        <PersonSchema settings={settings} />
      <div className="relative flex min-h-dvh flex-col">
        <Navbar settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <WhatsAppFab number={settings.whatsappNumber || '2348079460647'} />
      </div>
    </SmoothScroll>
  )
}