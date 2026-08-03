import { useParams, Navigate } from 'react-router-dom'
import Footer from '../components/Footer'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { caseStudyData } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const data = slug ? caseStudyData[slug] : undefined

  useDocumentTitle(data ? `${data.heroTitle} — Magda Tsekova` : 'Magda Tsekova')

  if (!data) return <Navigate to="/" replace />

  return (
    <main style={{ lineHeight: 1.6 }}>
      {/* Project Hero */}
      <section style={{ padding: '16px 44px 70px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 40,
            fontSize: 16,
            letterSpacing: '0.02em',
            color: '#eaeaea',
          }}
        >
          {data.heroLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <h1
          style={{
            margin: 0,
            fontWeight: 800,
            textTransform: 'uppercase',
            lineHeight: 0.9,
            letterSpacing: '-0.015em',
            fontSize: 'clamp(52px, 10vw, 168px)',
          }}
        >
          {data.heroTitle}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 64, marginTop: 34 }}>
          <p style={{ margin: 0, fontSize: 17 }}>
            <span style={{ color: '#8f8f8f' }}>My Role:</span> {data.role}
          </p>
          <p style={{ margin: 0, fontSize: 17 }}>
            <span style={{ color: '#8f8f8f' }}>Team:</span>&nbsp;{data.team}
          </p>
        </div>
        <i style={{ display: 'block', margin: '34px 0 0', fontSize: 18, color: '#8f8f8f' }}>{data.year}</i>
      </section>

      {/* Intro */}
      <section
        className="cs-padded"
        style={{
          paddingTop: 56,
          paddingBottom: 56,
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: 80,
          alignItems: 'start',
        }}
      >
        <h3 style={{ margin: 0 }} />
        <div
          style={{
            fontSize: 20,
            lineHeight: 1.4,
            fontWeight: 400,
            color: '#ffffff',
          }}
        >
          {data.intro.map((para, i) => (
            <p key={i} style={{ margin: i === 0 ? '0 0 16px' : 0 }}>{para}</p>
          ))}
        </div>
      </section>

      {/* Full-viewport cover image */}
      <section style={{ width: '100%', height: '100vh', background: '#141414', position: 'relative' }}>
        {data.showcaseImage ? (
          <img
            src={data.showcaseImage}
            alt={data.heroTitle}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : data.coverImage ? (
          <img
            src={data.coverImage}
            alt={data.heroTitle}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <ImagePlaceholder label="Final product — full-screen image" />
        )}
      </section>

      {/* Project sections */}
      <section className="cs-padded" style={{}}>
        {data.sections.map((sec) => (
          <div
            key={sec.label}
            style={{
              display: 'grid',
              gridTemplateColumns: '300px 1fr',
              gap: 300,
              alignItems: 'start',
              padding: '44px 0',
              borderTop: '1px solid #1c1c1c',
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#ffffff',
              }}
            >
              {sec.label}
            </h3>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: '#c2c2c2' }}>
              {sec.body}
            </p>
          </div>
        ))}
      </section>

      {/* Phone screens showcase */}
      <section
        className="cs-padded"
        style={{
          paddingTop: 80,
          paddingBottom: 80,
          borderTop: '1px solid #1c1c1c',
        }}
      >
        <h3
          style={{
            margin: '0 0 44px',
            fontSize: 13,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          Screens
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {data.screens.map((shot) => (
            <div key={shot.title}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '9 / 19',
                }}
              >
                <div>
                  {shot.image ? (
                    <img
                      src={shot.image}
                      alt={shot.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <ImagePlaceholder label={shot.placeholder} />
                  )}
                </div>
              </div>
              <h3
                style={{
                  margin: '22px 0 8px',
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {shot.title}
              </h3>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: '#8f8f8f' }}>
                {shot.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Changes */}
      <section
        className="cs-padded"
        style={{
          paddingTop: 64,
          paddingBottom: 90,
          borderTop: '1px solid #1c1c1c',
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: 80,
          alignItems: 'start',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          Key Changes
        </h3>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {data.bullets.map((b, i) => (
            <li
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '24px 1fr',
                gap: 14,
                padding: '16px 0',
                borderBottom: '1px solid #1c1c1c',
                fontSize: 16,
                lineHeight: 1.6,
                color: '#d4d4d4',
              }}
            >
              <span style={{ color: '#6f6f6f' }}>—</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </main>
  )
}
