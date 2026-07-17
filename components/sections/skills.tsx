'use client'

import { useState } from 'react'
import { FadeIn } from '@/components/motion/fade-in'
import { ChevronDown } from 'lucide-react'

const fallbackSkills = [
  { category: 'Development', items: [
    { name: 'React / Next.js', proficiency: 95 },
    { name: 'TypeScript', proficiency: 90 },
    { name: 'Node.js', proficiency: 85 },
    { name: 'Tailwind CSS', proficiency: 92 },
    { name: 'PostgreSQL / Prisma', proficiency: 88 },
  ]},
  { category: 'Design', items: [
    { name: 'Adobe Photoshop', proficiency: 90 },
    { name: 'Adobe Illustrator', proficiency: 85 },
    { name: 'CorelDRAW', proficiency: 88 },
  ]},
  { category: 'Video', items: [
    { name: 'CapCut', proficiency: 92 },
    { name: 'Canva', proficiency: 90 },
  ]},
  { category: 'Other', items: [
    { name: 'Content Writing', proficiency: 85 },
    { name: 'SEO Basics', proficiency: 80 },
  ]},
]

export function SkillsSection({ skills }: { skills: any[] }) {
  const grouped = skills.length
    ? Object.entries(
        skills.reduce((acc, skill) => {
          acc[skill.category] = acc[skill.category] || []
          acc[skill.category].push(skill)
          return acc
        }, {} as Record<string, any[]>)
      ).map(([category, items]) => ({ category, items }))
    : fallbackSkills

  const [openCategory, setOpenCategory] = useState<string | null>('Development')

  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Skills & Technologies</h2>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">Tools and technologies I use to bring ideas to life.</p>
          </div>
        </FadeIn>

        <div className="mt-10 md:mt-12 md:grid md:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {grouped.map((group) => (
            <FadeIn key={group.category} direction="up">
              <div className="border-b border-border md:border-none">
                <button 
                  onClick={() => setOpenCategory(openCategory === group.category ? null : group.category)}
                  className="flex w-full items-center justify-between py-4 md:hidden"
                >
                  <h3 className="text-lg font-semibold">{group.category}</h3>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openCategory === group.category ? 'rotate-180' : ''}`} />
                </button>
                
                <h3 className="hidden text-lg font-semibold md:block">{group.category}</h3>
                
                <div className={`space-y-4 overflow-hidden transition-all md:mt-6 md:block ${openCategory === group.category ? 'max-h-[500px] pb-6' : 'max-h-0 md:max-h-none'}`}>
                  {group.items.map((skill: any) => (
                    <div key={skill.name} className="flex items-center gap-4">
                      <span className="min-w-[120px] text-sm font-medium">{skill.name}</span>
                      <div className="flex-1">
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${skill.proficiency || 80}%` }} />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{skill.proficiency || 80}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}