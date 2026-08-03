import { useIsMobile } from '../hooks/useIsMobile'

export default function Footer() {
  const isMobile = useIsMobile()

  return (
    <footer
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        background: '#ffffff',
        color: '#000000',
        minHeight: '100vh',
        padding: isMobile ? '48px 24px 26px' : '56px 44px 26px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMobile ? 'center' : 'stretch',
        textAlign: isMobile ? 'center' : 'left',
      }}
    >
      <h2
        style={{
          margin: 0,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          fontSize: isMobile ? 'clamp(34px, 11vw, 60px)' : 'clamp(80px, 10vw, 180px)',
        }}
      >
        Let's Work Together
      </h2>

      <hr style={{ border: 'none', borderTop: '1px solid #000000', margin: '26px 0 0', width: '100%' }} />

      <div style={{ flex: 1, padding: '48px 0 0' }}>
        <p
          style={{
            margin: 0,
            fontSize: isMobile ? 'clamp(30px, 9vw, 73px)' : 'clamp(60px, 4.4vw, 73px)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
        >
          CONTACT ME
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'stretch', gap: 20, marginBottom: 32 }}>
        <a
          href="mailto:mcekova48@gmail.com"
          style={{
            color: '#000000',
            fontSize: isMobile ? 'clamp(16px, 5vw, 34px)' : 'clamp(22px, 2.4vw, 34px)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            textDecoration: 'none',
            width: 'max-content',
          }}
        >
          mcekova48@gmail.com
        </a>
        <a
          href="tel:+359878804121"
          style={{
            color: '#000000',
            fontSize: isMobile ? 'clamp(16px, 5vw, 34px)' : 'clamp(22px, 2.4vw, 34px)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            textDecoration: 'none',
            width: 'max-content',
          }}
        >
          +359 878 80 41 21
        </a>
      </div>

      <p style={{ margin: 0, fontSize: 14, letterSpacing: '0.08em', color: '#000000' }}>
        {new Date().getFullYear()} © Magda Tsekova
      </p>
    </footer>
  )
}
