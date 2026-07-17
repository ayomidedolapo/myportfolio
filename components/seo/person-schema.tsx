interface SocialLinks {
  github?: string
  linkedin?: string
  instagram?: string
}

interface Settings {
  heroTitle?: string
  heroSubtitle?: string
  contactEmail?: string
  phoneNumber?: string
  socialLinks?: SocialLinks
}

export function PersonSchema({ settings }: { settings: Settings }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings.heroTitle || 'Ayomide Dolapo',
    jobTitle: settings.heroSubtitle || 'Fullstack Developer & Digital Creator',
    email: settings.contactEmail,
    telephone: settings.phoneNumber,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lagos',
      addressCountry: 'NG',
    },
    sameAs: [
      settings.socialLinks?.github,
      settings.socialLinks?.linkedin,
      settings.socialLinks?.instagram,
    ].filter(Boolean),
    knowsAbout: ['Web Development', 'UI Design', 'Video Editing', 'Graphics Design'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}