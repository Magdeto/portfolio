export default function Footer() {
  return (
    <footer
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        background: '#ffffff',
        color: '#000000',
        minHeight: '100vh',
        padding: '56px 44px 26px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2
        style={{
          margin: 0,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.6,
          fontSize: 'clamp(80px, 10vw, 180px)',
        }}
      >
        Let's Work Together
      </h2>

      <hr style={{ border: 'none', borderTop: '1px solid #000000', margin: '26px 0 0' }} />

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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
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
          href="tel:+359878804121"
          style={{
            color: '#000000',
            fontSize: 'clamp(22px, 2.4vw, 34px)',
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
