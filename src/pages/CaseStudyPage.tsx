import { useEffect, useRef, useState } from 'react'
import React from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import Footer from '../components/Footer'
import ImagePlaceholder from '../components/ImagePlaceholder'
import {  caseStudyData, projects, type CaseScreen } from '../data/projects'
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

function MobileGalleryCarousel({ images }: { images: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    function onScroll() {
      if (!el) return
      const index = Math.round(el.scrollLeft / el.clientWidth)
      setActive(Math.min(Math.max(index, 0), images.length - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [images.length])

  function goTo(index: number) {
    const el = trackRef.current
    if (!el) return
    const clamped = Math.min(Math.max(index, 0), images.length - 1)
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={trackRef}
        style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {images.map((src, i) => (
          <div
            key={i}
            style={{ flex: '0 0 100%', width: '100%', aspectRatio: '1 / 1', scrollSnapAlign: 'center' }}
          >
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => goTo(active - 1)}
        disabled={active === 0}
        aria-label="Previous image"
        style={{
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.4)',
          border: 'none',
          borderRadius: '50%',
          width: 32,
          height: 32,
          color: active === 0 ? 'rgba(255,255,255,0.3)' : '#ffffff',
          fontSize: 16,
          cursor: active === 0 ? 'default' : 'pointer',
        }}
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => goTo(active + 1)}
        disabled={active === images.length - 1}
        aria-label="Next image"
        style={{
          position: 'absolute',
          right: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.4)',
          border: 'none',
          borderRadius: '50%',
          width: 32,
          height: 32,
          color: active === images.length - 1 ? 'rgba(255,255,255,0.3)' : '#ffffff',
          fontSize: 16,
          cursor: active === images.length - 1 ? 'default' : 'pointer',
        }}
      >
        ›
      </button>
    </div>
  )
}

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const data = slug ? caseStudyData[slug] : undefined
  const isMobile = useIsMobile()

  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const nextProject = currentIndex !== -1 ? projects[(currentIndex + 1) % projects.length] : undefined
  const previousProject = currentIndex !== -1 ? projects[(currentIndex - 1 + projects.length) % projects.length] : undefined
  useDocumentTitle(data ? `${data.heroTitle} — Magda Tsekova` : 'Magda Tsekova')

  if (!data) return <Navigate to="/" replace />

  return (
    <main style={{ lineHeight: 1.6 }}>
      {/* Project Hero */}
      <section style={{ padding: isMobile ? '16px 24px 40px' : '16px 44px 70px' }}>
        <div
          className="cs-hero-fade"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 40,
            fontSize: isMobile ? 13 : 16,
            letterSpacing: '0.02em',
            color: '#eaeaea',
            animationDelay: '0s',
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
          {data.heroTitle.split(' ').map((word, i) => (
            <span key={i} className="cs-hero-word-mask">
              <span className="cs-hero-word" style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
                {word}
              </span>
            </span>
          ))}
        </h1>
        <div
          className="cs-hero-fade"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 64,
            marginTop: 34,
            animationDelay: `${0.15 + data.heroTitle.split(' ').length * 0.08 + 0.2}s`,
          }}
        >
          <p style={{ margin: 0, fontSize: isMobile ? 13 : 17 }}>
            <span style={{ color: '#8f8f8f' }}>My Role:</span> {data.role}
          </p>
          <p style={{ margin: 0, fontSize: isMobile ? 13 : 17 }}>
            <span style={{ color: '#8f8f8f' }}>Team:</span>&nbsp;{data.team}
          </p>
        </div>
        <i
          className="cs-hero-fade"
          style={{
            display: 'block',
            margin: '34px 0 0',
            fontSize: isMobile ? 13 : 18,
            color: '#8f8f8f',
            animationDelay: `${0.15 + data.heroTitle.split(' ').length * 0.08 + 0.35}s`,
          }}
        >
          {data.year}
        </i>
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
{/* Project sections */}
<section className="cs-padded">
  {data.sections.map((sec) => (
    <React.Fragment key={sec.label}>
      {isMobile ? (
        <div
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

          <p
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.6,
              color: '#c2c2c2',
            }}
          >
            {sec.body}
          </p>

          {sec.subsections &&
            sec.subsections.map((sub, i) => (
              <div key={i}>
                <h4
                  style={{
                    margin: '24px 0 8px',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#8f8f8f',
                  }}
                >
                  {sub.subtitle}
                </h4>
                <h3
                  style={{
                    margin: '16px 0 6px',
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: '#cbc2c2',
                  }}
                >
                  {sub.subtitleSecondary}
                </h3>
                {sub.subtitleBody && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: '#c2c2c2',
                    }}
                  >
                    {sub.subtitleBody}
                  </p>
                )}

                {sub.subtitleBullets && (
                  <ul
                    style={{
                      margin: '12px 0 0',
                      padding: 0,
                      listStyle: 'none',
                    }}
                  >
                    {sub.subtitleBullets.map((line, j) => (
                      <li
                        key={j}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '16px 1fr',
                          gap: 8,
                          fontSize: 16,
                          lineHeight: 1.6,
                          color: '#c2c2c2',
                          marginBottom: 8,
                        }}
                      >
                        <span style={{ color: '#8f8f8f' }}>—</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          {sec.findings && (
            <div
              style={{
                marginTop: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              {sec.findings.map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '24px 1fr',
                    gap: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      color: '#8f8f8f',
                      letterSpacing: '0.04em',
                      paddingTop: '2px',
                    }}
                  >
                    {f.number}
                  </span>

                  <div>
                    <h4
                      style={{
                        margin: '0 0 8px',
                        fontSize: 18,
                        fontWeight: 500,
                        color: sec.FindingColor || '#c16a00',
                        lineHeight: 1.3,
                      }}
                    >
                      {f.title}
                    </h4>

                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        lineHeight: 1.6,
                        color: '#c2c2c2',
                      }}
                    >
                      {f.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {sec.personas && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                marginTop: 20,
              }}
            >
              {sec.personas.map((p) => (
                <div
                  key={p.name}
                  style={{
                    background:
                      sec.personaColor ||
                      'linear-gradient(135deg, #feba001a 0%, #FEB900 100%)',
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 340,
                  }}
                >
                  <div style={{ flex: 1, marginBottom: 16 }}>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          display: 'block',
                        }}
                      />
                    ) : (
                      <ImagePlaceholder label="Persona sticker" />
                    )}
                  </div>

                  <h4
                    style={{
                      margin: '0 0 4px',
                      fontSize: 15,
                      fontWeight: 700,
                      color: '#ffffff',
                    }}
                  >
                    {p.name}
                  </h4>

                  <p
                    style={{
                      margin: '0 0 10px',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: '#e4f5da',
                    }}
                  >
                    {p.meta}
                  </p>

                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      lineHeight: 1.5,
                      color: '#f1fbec',
                    }}
                  >
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {sec.sectionImage && (
            <div style={{ width: '100%', marginTop: 20 }}>
              <img
                src={sec.sectionImage}
                alt={sec.label}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <div
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

          <div>
            {sec.highlight && (
              <p
                style={{
                  margin: '0 0 18px',
                  fontSize: 24,
                  fontWeight: 500,
                  lineHeight: 1.2,
                  color: '#ffffff',
                }}
              >
                {sec.highlight}
              </p>
            )}

            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.6,
                color: '#c2c2c2',
              }}
            >
              {sec.body}
            </p>

            {sec.subsections && (
              <div>
                {sec.subsections.map((sub, i) => (
                  <div key={i}>
                    <h4
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        color: '#fefefe',
                      }}
                    >
                      {sub.subtitle}
                    </h4>

                    <h3
                      style={{
                        margin: '32px 0 8px',
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#cbc2c2',
                      }}
                    >
                      {sub.subtitleSecondary}
                    </h3>

                    {sub.subtitleBody && (
                      <p
                        style={{
                          margin: 0,
                          fontSize: 16,
                          lineHeight: 1.6,
                          color: '#c2c2c2',
                        }}
                      >
                        {sub.subtitleBody}
                      </p>
                    )}

                    {sub.subtitleBullets && (
                      <ul
                        style={{
                          margin: '12px 0 0',
                          padding: 0,
                          listStyle: 'none',
                        }}
                      >
                        {sub.subtitleBullets.map((line, j) => (
                          <li
                            key={j}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '16px 1fr',
                              gap: 8,
                              fontSize: 17,
                              lineHeight: 1.6,
                              color: '#c2c2c2',
                              marginBottom: 8,
                            }}
                          >
                            <span style={{ color: '#8f8f8f' }}>—</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {sec.findings && (
              <div
                style={{
                  marginTop: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                }}
              >
                {sec.findings.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '30px 1fr',
                      gap: 1,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        color: '#8f8f8f',
                        letterSpacing: '0.04em',
                        paddingTop: '3px',
                      }}
                    >
                      {f.number}
                    </span>

                    <div>
                      <h4
                        style={{
                          margin: '0 0 10px',
                          fontSize: 26,
                          fontWeight: 500,
                          color: sec.FindingColor || '#c16a00',
                          lineHeight: 1.3,
                        }}
                      >
                        {f.title}
                      </h4>

                      <p
                        style={{
                          margin: 0,
                          fontSize: 15,
                          lineHeight: 1.6,
                          color: '#c2c2c2',
                        }}
                      >
                        {f.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {sec.personas && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 24,
                  marginTop: 32,
                  maxWidth: 640,
                }}
              >
                {sec.personas.map((p, i) => (
                  <div
                    key={p.name}
                    style={{
                      background:
                        sec.personaColor ||
                        'linear-gradient(135deg, #feba001a 0%, #FEB900 100%)',
                      padding: 24,
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: 420,
                      gridColumn: i === 2 ? 'span 2' : undefined,
                    }}
                  >
                    <div style={{ flex: 1, marginBottom: 20 }}>
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block',
                          }}
                        />
                      ) : (
                        <ImagePlaceholder label="Persona sticker" />
                      )}
                    </div>

                    <h4
                      style={{
                        margin: '0 0 6px',
                        fontSize: 20,
                        fontWeight: 700,
                        color: '#ffffff',
                      }}
                    >
                      {p.name}
                    </h4>

                    <p
                      style={{
                        margin: '0 0 12px',
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: '#e4f5da',
                      }}
                    >
                      {p.meta}
                    </p>

                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: '#f1fbec',
                      }}
                    >
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {sec.sectionImage && (
              <div style={{ width: '100%', marginTop: 24 }}>
                <img
                  src={sec.sectionImage}
                  alt={sec.label}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Full-bleed image belongs to THIS section */}
      {sec.fullBleedImage && (
        <div
          style={{
            position: 'relative',
            left: '50%',
            width: '100vw',
            transform: 'translateX(-50%)',
          }}
        >
          {sec.fullBleedDescription && (
            <p
              className="cs-padded"
              style={{
                margin: 24,
                padding: isMobile ? '24px 0' : '24px 0',
                fontSize: isMobile ? 14 : 18,
                lineHeight: 1.6,
                color: '#c2c2c2',
              }}
            >
              {sec.fullBleedDescription}
            </p>
          )}

          <div
            style={{
              width: '100%',
              background: '#141414',
            }}
          >
            <img
              src={sec.fullBleedImage}
              alt={sec.label}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  ))}
</section>
{data.screens && data.screens.length > 0 && (
  <>
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
          {data.screens?.map((shot) => (
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
</>
)}
{data.galleryImages && data.galleryImages.length > 0 && (
  <section className="cs-padded" style={{ paddingTop: isMobile ? 40 : 80, paddingBottom: isMobile ? 40 : 80, borderTop: '1px solid #1c1c1c' }}>
    {isMobile ? (
      <MobileGalleryCarousel images={data.galleryImages} />
    ) : (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 44,
        }}
      >
        {data.galleryImages.map((src, i) => (
          <div key={i} style={{ width: '100%', aspectRatio: '1 / 1' }}>
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}
      </div>
    )}
  </section>
)}
      {/* Key Changes */}
     {data.bullets && data.bullets.length > 0 && (
  <section
    className="cs-padded"
    style={
      isMobile
        ? {
            paddingTop: 48,
            paddingBottom: 64,
            borderTop: '1px solid #1c1c1c',
          }
        : {
            paddingTop: 64,
            paddingBottom: 90,
            borderTop: '1px solid #1c1c1c',
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            gap: 80,
            alignItems: 'start',
          }
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
)}

     {(previousProject || nextProject) && (
  <section
    className="cs-padded"
    style={{
      paddingTop: 0,
      paddingBottom: isMobile ? 60 : 40,
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        gap: 24,
      }}
    >
      {/* Previous project */}
      {previousProject ? (
        <Link
          to={`/case/${previousProject.slug}`}
          className="project-nav-link project-nav-link--previous"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: isMobile ? '28px 0' : '44px 0',
            textDecoration: 'none',
            color: '#ffffff',
          }}
        >
          <span
            className="project-nav-arrow"
            style={{
              fontSize: isMobile ? 20 : 32,
              lineHeight: 1,
            }}
          >
            ←
          </span>

          <div>
            <span
              style={{
                display: 'block',
                fontSize: 10,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: '#8f8f8f',
                marginBottom: 6,
              }}
            >
              Previous Project
            </span>

            <span
              style={{
                fontSize: isMobile ? 12 : 20,
                fontWeight: 600,
                textTransform: 'uppercase',
                lineHeight: 1,
              }}
            >
              {previousProject.title}
            </span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {/* Next project */}
      {nextProject ? (
        <Link
          to={`/case/${nextProject.slug}`}
          className="project-nav-link project-nav-link--next"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: isMobile ? '28px 0' : '44px 0',
            textDecoration: 'none',
            color: '#ffffff',
            textAlign: 'right',
          }}
        >
          <div>
            <span
              style={{
                display: 'block',
                fontSize: 10,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: '#8f8f8f',
                marginBottom: 6,
              }}
            >
              Next Project
            </span>

            <span
              style={{
                fontSize: isMobile ? 12 : 20,
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              {nextProject.title}
            </span>
          </div>

          <span
            className="project-nav-arrow"
            style={{
              fontSize: isMobile ? 20 : 32,
              lineHeight: 1,
            }}
          >
            →
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  </section>
)}

      <Footer />
    </main>
  )
}
