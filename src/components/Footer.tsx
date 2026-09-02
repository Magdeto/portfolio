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
      {isMobile ? (
        <div
          style={{
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 28,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              fontSize: 'clamp(34px, 11vw, 60px)',
            }}
          >
            Let's Work Together
          </h2>

          <hr style={{ border: 'none', borderTop: '1px solid #000000', margin: 0, width: '100%' }} />

          <p
            style={{
              margin: 0,
              fontSize: 'clamp(30px, 9vw, 73px)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}
          >
            CONTACT ME
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <a
              href="mailto:mcekova48@gmail.com"
              style={{
                color: '#000000',
                fontSize: 'clamp(16px, 5vw, 34px)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                textDecoration: 'none',
                width: 'max-content',
              }}
            >
              mcekova48@gmail.com
            </a>
            <a
              href="tel:+1 (570) 872-2445"
              style={{
                color: '#000000',
                fontSize: 'clamp(16px, 5vw, 34px)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                textDecoration: 'none',
                width: 'max-content',
              }}
            >
              +1 (570) 872-2445
            </a>
          </div>
        </div>
      ) : (
        <>
          <h2
            style={{
              margin: 0,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              fontSize: 'clamp(80px, 10vw, 180px)',
            }}
          >
            Let's Work Together
          </h2>

          <hr style={{ border: 'none', borderTop: '1px solid #000000', margin: '26px 0 0', width: '100%' }} />

          <div style={{ flex: 1, padding: '48px 0 0' }}>
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(60px, 4.4vw, 73px)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
              }}
            >
              CONTACT ME
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 20, marginBottom: 32 }}>
            <a
              href="mailto:mcekova48@gmail.com"
              style={{
                color: '#000000',
                fontSize: 'clamp(22px, 2.4vw, 34px)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                textDecoration: 'none',
                width: 'max-content',
              }}
            >
              mcekova48@gmail.com
            </a>
            <a
              href="tel:+1 (570) 872-2445"
              style={{
                color: '#000000',
                fontSize: 'clamp(22px, 2.4vw, 34px)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                textDecoration: 'none',
                width: 'max-content',
              }}
            >
              +1 (570) 872-2445
            </a>
          </div>
        </>
      )}

      <p style={{ margin: 0, fontSize: isMobile ? 12 : 8, letterSpacing: '0.08em', color: '#000000' }}>
        {new Date().getFullYear()} © Magda Tsekova
      </p>
    </footer>
  )
}
