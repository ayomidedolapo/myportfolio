import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ThemeProvider } from '@/components/providers'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ayomidedolapo.dev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ayomide Dolapo — Fullstack Developer & Digital Creator',
    template: '%s | Ayomide Dolapo',
  },
  description: 'Premium fullstack development, video editing, graphics design, and digital content services. Building experiences that convert visitors into clients.',
  keywords: ['Ayomide Dolapo', 'Fullstack Developer', 'Web Developer Nigeria', 'UI Designer Lagos', 'Video Editor', 'Graphics Designer', 'Next.js Developer', 'React Developer'],
  authors: [{ name: 'Ayomide Dolapo', url: siteUrl }],
  creator: 'Ayomide Dolapo',
  publisher: 'Ayomide Dolapo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Ayomide Dolapo',
    title: 'Ayomide Dolapo — Fullstack Developer & Digital Creator',
    description: 'Premium fullstack development, video editing, graphics design, and digital content services.',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Ayomide Dolapo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayomide Dolapo — Fullstack Developer & Digital Creator',
    description: 'Premium fullstack development, video editing, graphics design, and digital content services.',
    images: ['/api/og'],
    creator: '@ayomidedolapo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}