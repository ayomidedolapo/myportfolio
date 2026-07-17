import Link from 'next/link'
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'

type FooterSettings = {
  heroTitle?: string
  heroSubtitle?: string
  contactEmail?: string
  phoneNumber?: string
  socialLinks?: Record<string, string>
}

export function Footer({ settings }: { settings?: FooterSettings }) {
  const socials = settings?.socialLinks || {}

  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Link href="/" className="text-lg font-semibold tracking-tight">
              {settings?.heroTitle || 'Ayomide Dolapo'}
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {settings?.heroSubtitle || 'Fullstack Developer & Digital Creator'}
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socials.github && (
                <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <FaGithub className="h-5 w-5" />
                </a>
              )}
              {socials.linkedin && (
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <FaLinkedin className="h-5 w-5" />
                </a>
              )}
              {socials.instagram && (
                <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <FaInstagram className="h-5 w-5" />
                </a>
              )}
              {socials.whatsapp && (
                <a href={`https://wa.me/${socials.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <FaWhatsapp className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-medium">Sitemap</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-foreground">Home</Link></li>
                <li><Link href="/projects" className="hover:text-foreground">Work</Link></li>
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Services</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>Web Development</li>
                <li>UI Design</li>
                <li>Graphics Design</li>
                <li>Video Editing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Contact</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>{settings?.contactEmail || 'hello@example.com'}</li>
                <li>{settings?.phoneNumber || '+234 807 946 0647'}</li>
                <li>Lagos, Nigeria</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} {settings?.heroTitle || 'Ayomide Dolapo'}. All rights reserved.</p>
          <p>Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}