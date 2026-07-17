export const dynamic = 'force-dynamic'
export const revalidate = 0
import { HeroSection } from '@/components/sections/hero'
import { FeaturedProjectsSection } from '@/components/sections/featured-projects'
import { ServicesSection } from '@/components/sections/services'
import { SkillsSection } from '@/components/sections/skills'
import { TestimonialsSection } from '@/components/sections/testimonials'
import { CTASection } from '@/components/sections/cta'
import { getSiteSettings, getFeaturedProjects, getServices, getSkills, getTestimonials } from '@/lib/data'

export default async function HomePage() {
  const [settings, projects, services, skills, testimonials] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getServices(),
    getSkills(),
    getTestimonials(),
  ])

  return (
    <>
      <HeroSection settings={settings} />
      <FeaturedProjectsSection projects={projects} />
      <ServicesSection services={services} />
      <SkillsSection skills={skills} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection settings={settings} />
    </>
  )
}