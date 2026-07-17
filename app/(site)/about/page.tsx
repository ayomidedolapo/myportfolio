export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Ayomide Dolapo — fullstack developer, video editor, and graphics designer based in Lagos, Nigeria.',
  openGraph: {
    title: 'About Ayomide Dolapo',
    description: 'Fullstack developer & digital creator based in Lagos, Nigeria.',
    images: ['/api/og?title=About Me&subtitle=Fullstack Developer %26 Digital Creator&type=about'],
  },
}

import Link from 'next/link'
import { FadeIn } from '@/components/motion/fade-in'
import { getSiteSettings, getExperiences, getEducation, getCertifications } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import { Download, MapPin, Mail, Briefcase } from 'lucide-react'

export default async function AboutPage() {
  const [settings, experiences, education, certifications] = await Promise.all([
    getSiteSettings(),
    getExperiences(),
    getEducation(),
    getCertifications(),
  ])

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container">
          <FadeIn>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">About Me</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {settings.aboutContent}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <FadeIn className="lg:col-span-2">
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  I specialize in building scalable web applications using Next.js, TypeScript, and Node.js. 
                  Beyond code, I craft visual stories through video editing and create brand identities that resonate.
                </p>
                <p>
                  My toolkit includes CapCut and Canva for video, Photoshop and Illustrator for design, and modern 
                  web technologies for development. This hybrid skill set allows me to own projects from concept to deployment.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> Lagos, Nigeria
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" /> {settings.contactEmail}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4" /> Open for work
                  </div>
                </div>
                {settings.resumeUrl && (
                  <a href={settings.resumeUrl} download className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                    <Download className="h-4 w-4" /> Download CV
                  </a>
                )}
              </div>
            </FadeIn>
            
            <FadeIn direction="left" className="hidden lg:block">
              <div className="rounded-2xl border border-border bg-card p-8">
                <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Quick Facts</h3>
                <dl className="mt-6 space-y-4">
                  <div><dt className="text-xs text-muted-foreground">Experience</dt><dd className="text-lg font-semibold">3+ Years</dd></div>
                  <div><dt className="text-xs text-muted-foreground">Projects Completed</dt><dd className="text-lg font-semibold">50+</dd></div>
                  <div><dt className="text-xs text-muted-foreground">Clients Worldwide</dt><dd className="text-lg font-semibold">20+</dd></div>
                </dl>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-muted/30 py-16">
        <div className="container">
          <FadeIn><h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Work Experience</h2></FadeIn>
          <div className="mt-10 space-y-8">
            {experiences.map((exp) => (
              <FadeIn key={exp.id}>
                <div className="md:grid md:grid-cols-[200px_1fr] md:gap-8">
                  <div className="text-sm text-muted-foreground">
                    {formatDate(exp.startDate)} — {exp.isCurrent ? 'Present' : formatDate(exp.endDate!)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <p className="text-primary">{exp.company}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{exp.description}</p>
                    {exp.achievements.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {exp.achievements.map((a, i) => <li key={i} className="text-sm text-muted-foreground">• {a}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <FadeIn><h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Education</h2></FadeIn>
              <div className="mt-8 space-y-6">
                {education.map((edu) => (
                  <FadeIn key={edu.id}>
                    <div className="rounded-xl border border-border bg-card p-6">
                      <h3 className="font-semibold">{edu.institution}</h3>
                      <p className="text-sm text-primary">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{formatDate(edu.startDate)} — {edu.isCurrent ? 'Present' : formatDate(edu.endDate!)}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
            <div>
              <FadeIn><h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Certifications</h2></FadeIn>
              <div className="mt-8 space-y-6">
                {certifications.map((cert) => (
                  <FadeIn key={cert.id}>
                    <div className="rounded-xl border border-border bg-card p-6">
                      <h3 className="font-semibold">{cert.name}</h3>
                      <p className="text-sm text-primary">{cert.issuer}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Issued {formatDate(cert.issueDate)}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}