import ImagePlaceholder from '../components/ImagePlaceholder'
import Footer from '../components/Footer'

const imgStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
}


function Cell({ image, label, style }: { image: string; label: string; style: React.CSSProperties }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#141414', ...style }}>
      {image
        ? <img src={image} alt="" style={imgStyle} />
        : <ImagePlaceholder label={label} />}
    </div>
  )
}

function Row({ height, children }: { height: string | number; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 6, height, marginBottom: 6 }}>
      {children}
    </div>
  )
}

export default function FeaturedWorkPage() {
  return (
    <main>
      {/* Header quote */}
      <section style={{ padding: '16px 44px 60px' }}>
        <h1
          style={{
            margin: 0,
            fontWeight: 800,
            textTransform: 'uppercase',
            lineHeight: 0.9,
            letterSpacing: '-0.015em',
            fontSize: 'clamp(48px, 9vw, 150px)',
            maxWidth: 1400,
            textWrap: 'balance' as React.CSSProperties['textWrap'],
          }}
        >
          Make art for yourself &amp; despite opinions
        </h1>
        <p style={{ margin: '26px 0 0', fontStyle: 'italic', fontSize: 'clamp(20px, 2vw, 28px)', color: '#8f8f8f' }}>
          — me
        </p>
      </section>

      {/* Row 1 — 3 equal columns */}
      <Row height="80vh">
        <Cell image="/images/2.png"  label="Image 1" style={{ flex: 1 }} />
        <Cell image="/images/3.png"  label="Image 2" style={{ flex: 1 }} />
        <Cell image="/images/4.png"  label="Image 3" style={{ flex: 1 }} />
      </Row>

      {/* Row 2 — 3-column irregular (col 1: stacked, col 2: full, col 3: stacked) */}
      <Row height="72vh">
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Cell image=""                          label="Image 4" style={{ flex: 5 }} />
          <Cell image="/images/lights-bleeding.jpg" label="Image 5" style={{ flex: 3 }} />
        </div>
        <Cell image="/images/gen-z.gif" label="Image 6" style={{ flex: 1 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Cell image="" label="Image 7" style={{ flex: 3 }} />
          <Cell image="" label="Image 8" style={{ flex: 4 }} />
        </div>
      </Row>

      {/* Row 3 — wide + narrow */}
      <Row height="50vh">
        <Cell image="" label="Image 9"  style={{ flex: 2 }} />
        <Cell image="" label="Image 10" style={{ flex: 1 }} />
      </Row>

      {/* Row 4 — 50/50 full-bleed split */}
      <Row height="100%">
        <Cell image="/images/print-01.jpeg" label="Image 11" style={{ flex: 1 }} />
        <Cell image="/images/balchik.jpg"   label="Image 12" style={{ flex: 1 }} />
      </Row>

      <Footer />
    </main>
  )
}
