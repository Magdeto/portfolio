import { useEffect, useRef, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Footer from '../components/Footer'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { caseStudyData, type CaseScreen } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useIsMobile } from '../hooks/useIsMobile'

// Mobile Screens carousel — Instagram-style horizontal scroll-snap, with a small "1/4 ‹ ›"
// progress readout underneath that also doubles as prev/next controls.
function MobileScreensCarousel({ screens }: { screens: CaseScreen[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    function onScroll() {
      if (!el) return
      const index = Math.round(el.scrollLeft / el.clientWidth)
      setActive(Math.min(Math.max(index, 0), screens.length - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [screens.length])

  function goTo(index: number) {
    const el = trackRef.current
    if (!el) return
    const clamped = Math.min(Math.max(index, 0), screens.length - 1)
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <>
      <div
        ref={trackRef}
        className="cs-screens-scroll"
        style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {screens.map((shot) => (
          <div
            key={shot.title}
            style={{ flex: '0 0 100%', width: '100%', scrollSnapAlign: 'center', padding: '0 6px' }}
          >
            <div style={{ position: 'relative', width: '100%', height: '78vh' }}>
              {shot.image ? (
                <img
                  src={shot.image}
                  alt={shot.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              ) : (
                <ImagePlaceholder label={shot.placeholder} />
              )}
            </div>
            <div className="cs-padded" style={{ paddingTop: 20, paddingBottom: 8 }}>
              <h3
                style={{
                  margin: '0 0 8px',
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
          </div>
        ))}
      </div>

      {/* Progress readout — also acts as prev/next */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 12 }}>
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous screen"
          style={{
            background: 'none',
            border: 'none',
            padding: 4,
            color: active === 0 ? '#3a3a3a' : '#ffffff',
            fontSize: 16,
            cursor: active === 0 ? 'default' : 'pointer',
          }}
        >
          ‹
        </button>
        <span style={{ fontSize: 12, letterSpacing: '0.06em', color: '#8f8f8f' }}>
          {active + 1}/{screens.length}
        </span>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          disabled={active === screens.length - 1}
          aria-label="Next screen"
          style={{
            background: 'none',
            border: 'none',
            padding: 4,
            color: active === screens.length - 1 ? '#3a3a3a' : '#ffffff',
            fontSize: 16,
            cursor: active === screens.length - 1 ? 'default' : 'pointer',
          }}
        >
          ›
        </button>
      </div>
    </>
  )
}

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const data = slug ? caseStudyData[slug] : undefined
  const isMobile = useIsMobile()

  useDocumentTitle(data ? `${data.heroTitle} — Magda Tsekova` : 'Magda Tsekova')

  if (!data) return <Navigate to="/" replace />

  return (
    <main style={{ lineHeight: 1.6 }}>
      {/* Project Hero */}
      <section style={{ padding: isMobile ? '16px 24px 40px' : '16px 44px 70px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 40,
            fontSize: isMobile ? 13 : 16,
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
            fontSize: isMobile ? 'clamp(34px, 11vw, 168px)' : 'clamp(52px, 10vw, 168px)',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          {data.heroTitle}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 64, marginTop: 34 }}>
          <p style={{ margin: 0, fontSize: isMobile ? 13 : 17 }}>
            <span style={{ color: '#8f8f8f' }}>My Role:</span> {data.role}
          </p>
          <p style={{ margin: 0, fontSize: isMobile ? 13 : 17 }}>
            <span style={{ color: '#8f8f8f' }}>Team:</span>&nbsp;{data.team}
          </p>
        </div>
        <i style={{ display: 'block', margin: '34px 0 0', fontSize: isMobile ? 13 : 18, color: '#8f8f8f' }}>{data.year}</i>
      </section>

      {/* Intro */}
      <section
        className="cs-padded"
        style={
          isMobile
            ? { paddingTop: 40, paddingBottom: 40 }
            : { paddingTop: 56, paddingBottom: 56, display: 'grid', gridTemplateColumns: '300px 1fr', gap: 80, alignItems: 'start' }
        }
      >
        {!isMobile && <h3 style={{ margin: 0 }} />}
        <div
          style={{
            fontSize: isMobile ? 15 : 20,
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

      {/* Project sections — mobile: each one takes the full screen, title top, copy right under */}
      <section className="cs-padded" style={{}}>
        {data.sections.map((sec) =>
          isMobile ? (
            <div
              key={sec.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '28px 0',
                borderTop: '1px solid #1c1c1c',
              }}
            >
              <h3
                style={{
                  margin: '0 0 14px',
                  fontSize: 17,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#ffffff',
                }}
              >
                {sec.label}
              </h3>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: '#c2c2c2' }}>
                {sec.body}
              </p>
            </div>
          ) : (
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
          )
        )}
      </section>

      {/* Phone screens showcase */}
      {isMobile ? (
        // Instagram-style horizontal scroll-snap carousel — full-screen image + copy per slide
        <section style={{ paddingTop: 40, paddingBottom: 40, borderTop: '1px solid #1c1c1c' }}>
          <h3
            className="cs-padded"
            style={{
              margin: '0 0 24px',
              fontSize: 13,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Screens
          </h3>
          <MobileScreensCarousel screens={data.screens} />
        </section>
      ) : (
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
      )}

      {/* Key Changes */}
      <section
        className="cs-padded"
        style={
          isMobile
            ? { paddingTop: 48, paddingBottom: 64, borderTop: '1px solid #1c1c1c' }
            : { paddingTop: 64, paddingBottom: 90, borderTop: '1px solid #1c1c1c', display: 'grid', gridTemplateColumns: '300px 1fr', gap: 80, alignItems: 'start' }
        }
      >
        <h3
          style={{
            margin: isMobile ? '0 0 20px' : 0,
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
                fontSize: isMobile ? 13 : 16,
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
