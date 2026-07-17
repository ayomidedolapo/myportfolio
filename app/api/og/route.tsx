import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'Ayomide Dolapo'
    const subtitle = searchParams.get('subtitle') || 'Fullstack Developer & Digital Creator'
    const type = searchParams.get('type') || 'default'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#09090b',
            padding: '80px',
            position: 'relative',
          }}
        >
          {/* Grid pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#8b5cf6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 700,
                }}
              >
                AD
              </div>
              <span style={{ color: '#a1a1aa', fontSize: '20px', fontWeight: 500 }}>
                ayomidedolapo.dev
              </span>
            </div>
            <span style={{ color: '#8b5cf6', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>
              {type}
            </span>
          </div>

          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px' }}>
            <h1
              style={{
                color: 'white',
                fontSize: '80px',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                margin: 0,
              }}
            >
              {title}
            </h1>
            <p style={{ color: '#a1a1aa', fontSize: '28px', lineHeight: 1.4, margin: 0 }}>
              {subtitle}
            </p>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Fullstack', 'Design', 'Video', 'Graphics'].map((tag) => (
                <div
                  key={tag}
                  style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '8px 16px',
                    color: '#a1a1aa',
                    fontSize: '14px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#8b5cf6',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              Available for work →
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    )
  } catch (e) {
    return new Response('Failed to generate OG image', { status: 500 })
  }
}