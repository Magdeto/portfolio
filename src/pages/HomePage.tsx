import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { projects, type Project } from '../data/projects'
import { FONT_UNBOUNDED } from '../styles/typography'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useIsMobile } from '../hooks/useIsMobile'
import { useInView } from '../hooks/useInView'

const EASE = 'cubic-bezier(0.8, 0, 0.6, 1)' // "easy ease"

// Shared with the real hero H1 so the intro mimic lines up in size/weight
const heroH1Style: React.CSSProperties = {
  margin: 0,
  fontWeight: 700,
  textTransform: 'uppercase',
  lineHeight: 1,
  letterSpacing: '-0.03em',
  fontSize: 'clamp(50px, 11vw, 180px)',
}

// 1. white — blank hold  2. textIn — black lines slide up  3. curtain — one sweep covers then reveals page (text turns white as it passes)  4. stars — draw in last
type IntroPhase = 'white' | 'textIn' | 'curtain' | 'stars' | 'done'

// Intro timing (ms)
const WHITE_HOLD = 800
const TEXT_IN_DURATION = 1000
const CURTAIN_DURATION = 1800 // full sweep: below viewport -> covers -> above viewport
const REVEAL_DELAY = CURTAIN_DURATION / 2 // when the curtain reaches full coverage and starts uncovering
const STAR_DURATION = 1400
const STAR_EARLY_OFFSET = 500 // stars start this much before the curtain sweep finishes

const T_TEXT_IN = WHITE_HOLD // 1000
const T_CURTAIN = T_TEXT_IN + TEXT_IN_DURATION // 1800
const T_REVEAL = T_CURTAIN + REVEAL_DELAY // curtain fully covers here, then starts revealing
const T_STARS = T_CURTAIN + CURTAIN_DURATION // overlay unmounts once the sweep visually finishes
const T_STARS_GO = T_STARS - STAR_EARLY_OFFSET // stars actually start drawing a bit before that
const T_DONE = T_STARS + STAR_DURATION

// Per-line stagger for the black->white flip, top line first (matches the cover rectangle contracting top-down)
const LINE_COLOR_DURATION = 400
const LINE_STAGGER_STEP = 250
const LINE_DELAYS = { imI: 0, magda: LINE_STAGGER_STEP * 1, media: LINE_STAGGER_STEP * 2, designer: LINE_STAGGER_STEP * 3 }

const heroLineWrapperStyle: React.CSSProperties = {
  display: 'block',
  overflow: 'hidden',
}

// linesIn drives the per-line slide-up (text-in phase); white+colorDelay drive the staggered black->white fill (reveal)
function heroLineInnerStyle(linesIn: boolean, white: boolean, colorDelay: number): React.CSSProperties {
  return {
    display: 'block',
    transform: linesIn ? 'translateY(0%)' : 'translateY(100%)',
    color: white ? '#ffffff' : '#000000',
    transition: `transform ${TEXT_IN_DURATION}ms ${EASE}, color ${LINE_COLOR_DURATION}ms ${EASE} ${colorDelay}ms`,
  }
}

// Mobile Latest Work card — plain vertical list, gradient/title always visible (no hover on touch),
// fades in via IntersectionObserver as it scrolls into view.
function MobileProjectCard({ proj }: { proj: Project }) {
  const [ref, inView] = useInView<HTMLAnchorElement>(0.15)
  return (
    <Link
      ref={ref}
      to={`/case/${proj.slug}`}
      className={`m-fade-item${inView ? ' m-fade-in' : ''}`}
      style={{
        position: 'relative',
        display: 'block',
        width: '100%',
        aspectRatio: '4 / 3',
        overflow: 'hidden',
        borderRadius: 2,
        background: '#141414',
        color: '#ffffff',
      }}
    >
      {proj.coverImage ? (
        <img
          src={proj.coverImage}
          alt={proj.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <ImagePlaceholder label={proj.placeholder} />
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.05) 30%, rgba(10,10,10,0.96) 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 20,
            right: 20,
            bottom: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: FONT_UNBOUNDED,
              fontSize: 'clamp(16px, 5vw, 22px)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              color: '#ffffff',
              textShadow: '0 1px 6px rgba(0,0,0,0.6)',
            }}
          >
            {proj.title}
          </span>
          <span style={{ fontSize: 12, color: '#ffffff', whiteSpace: 'nowrap', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            /{proj.year}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function HomePage() {
  useDocumentTitle('Magda Tsekova — Media Designer')
  const isMobile = useIsMobile()

  const workSectionRef = useRef<HTMLElement>(null)
  const workTrackRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const star1Ref = useRef<SVGPathElement>(null)
  const star2Ref = useRef<SVGPathElement>(null)
  const darkWrapperRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLElement>(null)
  const heroLineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const aboutSectionRef = useRef<HTMLElement>(null)
  const powerTwentiesRef = useRef<HTMLDivElement>(null)
  const aboutH2Ref = useRef<HTMLHeadingElement>(null)
  const aboutLabelRef = useRef<HTMLParagraphElement>(null)
  const aboutBodyRef = useRef<HTMLParagraphElement>(null)

  const [introPhase, setIntroPhase] = useState<IntroPhase>('white')
  // Lets the long-lived scroll handler read the latest intro phase without a stale closure
  const introPhaseRef = useRef<IntroPhase>('white')
  useEffect(() => {
    introPhaseRef.current = introPhase
  }, [introPhase])
  // Flips once the curtain has reached full coverage and starts uncovering the page underneath
  const [revealed, setRevealed] = useState(false)
  // Flips a little before the curtain sweep visually finishes, kicking off the star draw-in early
  const [starsGo, setStarsGo] = useState(false)
  // Distance from the document top to the dark wrapper's own top edge (i.e. header + hero height)
  const [coverExtra, setCoverExtra] = useState(0)

  useEffect(() => {
    if (darkWrapperRef.current) {
      setCoverExtra(darkWrapperRef.current.getBoundingClientRect().top + window.scrollY)
    }
  }, [])

  // Play the intro on every mount (i.e. every page load/refresh)
  useEffect(() => {
    const timers = [
      setTimeout(() => setIntroPhase('textIn'), T_TEXT_IN),
      setTimeout(() => setIntroPhase('curtain'), T_CURTAIN),
      setTimeout(() => setRevealed(true), T_REVEAL),
      setTimeout(() => setStarsGo(true), T_STARS_GO),
      setTimeout(() => setIntroPhase('stars'), T_STARS),
      setTimeout(() => setIntroPhase('done'), T_DONE),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // Draw the star paths in sync with the curtain reveal — star 2 starts a beat after star 1
  useEffect(() => {
    const stars = [
      { path: star1Ref.current, delay: 0 },
      { path: star2Ref.current, delay: 350 },
    ]
    stars.forEach(({ path, delay }) => {
      if (!path) return
      if (!path.style.strokeDasharray) {
        const len = path.getTotalLength()
        path.style.strokeDasharray = `${len}`
        path.style.strokeDashoffset = `${len}`
        path.style.transition = `stroke-dashoffset ${STAR_DURATION}ms ${EASE} ${delay}ms`
      }
      if (starsGo) {
        path.style.strokeDashoffset = '0'
      }
    })
  }, [starsGo])

  useEffect(() => {
    function updateWork() {
      const sec = workSectionRef.current
      const track = workTrackRef.current
      if (!sec || !track) return
      const total = sec.offsetHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-sec.getBoundingClientRect().top, 0), total)
      const deadZone = 0.12
      const activeStart = total * deadZone
      const activeEnd = total * (1 - deadZone)
      const activeRange = activeEnd - activeStart
      const clampedScrolled = Math.min(Math.max(scrolled - activeStart, 0), activeRange)
      const progress = activeRange > 0 ? clampedScrolled / activeRange : 0
      const maxX = Math.max(track.scrollWidth - window.innerWidth, 0)
      track.style.transform = `translateX(${-progress * maxX}px)`
    }

    function updateCursor(e: MouseEvent) {
      const el = cursorRef.current
      if (!el) return
      el.style.transform = `translate(${e.clientX - 32}px, ${e.clientY - 32}px)`
    }

    function clamp01(v: number) {
      return Math.min(Math.max(v, 0), 1)
    }

    // Black -> white starting 90% through Hero (so Hero + About read as one continuous fade, no
    // seam at the boundary), reaching 100% white once the About title + "Power Twenties" block are
    // in view. Then back to black starting 90% through About, fully black once Featured Work is
    // engaged. Driven directly (no React state) to stay smooth at 60fps.
    function updateBg() {
      const hero = heroSectionRef.current
      const about = aboutSectionRef.current
      const target = powerTwentiesRef.current
      const work = workSectionRef.current
      const wrapper = darkWrapperRef.current
      if (!hero || !about || !target || !work || !wrapper) return

      const scrollY = window.scrollY

      const heroDocTop = hero.getBoundingClientRect().top + scrollY
      const aboutDocTop = about.getBoundingClientRect().top + scrollY
      const targetDocBottom = target.getBoundingClientRect().bottom + scrollY
      const workDocTop = work.getBoundingClientRect().top + scrollY
      const heroHeight = hero.offsetHeight
      const aboutHeight = about.offsetHeight

      const start1 = heroDocTop + 0.5 * heroHeight // 60% through Hero -> starts fading toward white early
      const end1 = targetDocBottom - window.innerHeight // title + Power Twenties block fully in view -> 100% white
      const start2 = aboutDocTop + 0.5 * aboutHeight // 60% through About -> starts fading back to black early
      const end2 = workDocTop // Featured Work's top reaches the viewport top (carousel engaged) -> 100% black

      const p1 = end1 > start1 ? clamp01((scrollY - start1) / (end1 - start1)) : 1
      const p2 = end2 > start2 ? clamp01((scrollY - start2) / (end2 - start2)) : 0
      const whiteness = clamp01(p1 - p2)

      const bg = Math.round(10 + 245 * whiteness)
      const text = Math.round(255 - 245 * whiteness)
      const bgColor = `rgb(${bg}, ${bg}, ${bg})`
      const textColor = `rgb(${text}, ${text}, ${text})`

      hero.style.background = bgColor
      wrapper.style.background = bgColor
      if (aboutH2Ref.current) aboutH2Ref.current.style.color = textColor
      if (aboutLabelRef.current) aboutLabelRef.current.style.color = textColor
      if (aboutBodyRef.current) aboutBodyRef.current.style.color = textColor
      // Only take over the H1's colour once the intro's own reveal animation has finished
      if (introPhaseRef.current === 'done') {
        heroLineRefs.current.forEach((line) => {
          if (line) line.style.color = textColor
        })
      }
    }

    window.addEventListener('scroll', updateWork, { passive: true })
    window.addEventListener('resize', updateWork)
    window.addEventListener('mousemove', updateCursor)
    window.addEventListener('scroll', updateBg, { passive: true })
    window.addEventListener('resize', updateBg)
    updateWork()
    updateBg()
    return () => {
      window.removeEventListener('scroll', updateWork)
      window.removeEventListener('resize', updateWork)
      window.removeEventListener('scroll', updateBg)
      window.removeEventListener('resize', updateBg)
      window.removeEventListener('mousemove', updateCursor)
    }
  }, [])

  const showOverlay = introPhase === 'white' || introPhase === 'textIn' || introPhase === 'curtain'
  const linesIn = introPhase !== 'white'
  // White bg stays up until the dark rectangle has fully expanded over the screen, so the swap is invisible
  const showWhiteBg = !revealed
  // Resting: covers only the dark wrapper's own box. Expanded: extends up to cover header + hero too.
  const coverTop = introPhase === 'white' || introPhase === 'textIn' ? 0 : !revealed ? -coverExtra : 0

  return (
    <main>
      {/* ---- INTRO ANIMATION ---- */}
      {/* Header/hero stay mounted underneath — never removed, just covered.
          The H1 itself sits above the overlay (z-index) so it can play its own entrance + colour reveal in place. */}
      {showWhiteBg && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9997, background: '#ffffff', pointerEvents: 'auto' }} />
      )}

      {/* ---- HERO ---- */}
      {/* No hardcoded background — folded into the same scroll-driven fade as About (see updateBg). */}
      <section
        ref={heroSectionRef}
        style={
          isMobile
            ? { position: 'relative', padding: '14px 20px 60px', display: 'flex', flexDirection: 'column' }
            : { position: 'relative', padding: '18px 44px 90px', display: 'grid', gridTemplateColumns: '1fr 500px', gap: 56, alignItems: 'end' }
        }
      >
        <h1 style={{ ...heroH1Style, position: 'relative', zIndex: 9999 }}>
          <span style={heroLineWrapperStyle}>
            <span
              ref={(el) => { heroLineRefs.current[0] = el }}
              style={heroLineInnerStyle(linesIn, revealed, LINE_DELAYS.imI)}
            >
              I'm
            </span>
          </span>
          {/* Extra bottom padding so the "g" descender isn't clipped by the mask wrapper */}
          <span style={{ ...heroLineWrapperStyle, paddingBottom: '0.18em' }}>
            <span
              ref={(el) => { heroLineRefs.current[1] = el }}
              style={{
                ...heroLineInnerStyle(linesIn, revealed, LINE_DELAYS.magda),
                fontStyle: 'italic',
                textTransform: 'none',
              }}
            >
              Magda,
            </span>
          </span>
          <span style={heroLineWrapperStyle}>
            <span
              ref={(el) => { heroLineRefs.current[2] = el }}
              style={heroLineInnerStyle(linesIn, revealed, LINE_DELAYS.media)}
            >
              Media
            </span>
          </span>
          <span style={heroLineWrapperStyle}>
            <span
              ref={(el) => { heroLineRefs.current[3] = el }}
              style={heroLineInnerStyle(linesIn, revealed, LINE_DELAYS.designer)}
            >
              Designer
            </span>
          </span>
        </h1>

        {isMobile ? (
          <>
            {/* Caption ("Bulgaria | NL | USA") sits between the headline and the image on mobile */}
            <p
              style={{
                margin: '48px 0 0',
                fontSize: 15,
                lineHeight: 1.5,
                color: '#c9c9c9',
              }}
            >
              Media Designer | UX/UI Designer.
              <br />
              <i style={{ fontStyle: 'italic', fontSize: 13, color: '#8f8f8f' }}>
                *Bulgaria&nbsp;│&nbsp;The Netherlands&nbsp;│&nbsp;USA.
              </i>
            </p>

            <div
              style={{
                marginTop: 24,
                position: 'relative',
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: 2,
                overflow: 'hidden',
                background: '#141414',
              }}
            >
              <img src="/images/landing.jpeg"
                alt="Magda"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                 />

              {/* Stars — shrunk down, stacked on top of the image */}
              <svg
                aria-hidden
                viewBox="0 0 640 529"
                style={{ position: 'absolute', top: 14, left: 10, width: 76, pointerEvents: 'none', zIndex: 10, overflow: 'visible', transform: 'rotate(45deg)' }}
              >
                <path
                  ref={star1Ref}
                  d="M259.2,229.13c33.19-48.5,48.09-143.61,48.09-143.61,0,0,15.87,108.71,54.71,135.06,38.84,26.36,140.12,40.01,140.12,40.01,0,0-107.96,27.85-137.67,63.11-29.71,35.26-48.09,143.61-48.09,143.61,0,0-27.52-109.88-54.71-135.06-27.19-25.19-140.12-40.01-140.12-40.01,0,0,104.48-14.6,137.67-63.11Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="13"
                  strokeMiterlimit="10"
                />
              </svg>
              <svg
                aria-hidden
                viewBox="0 0 640 529"
                style={{ position: 'absolute', bottom: 20, right: 18, width: 42, pointerEvents: 'none', zIndex: 10, overflow: 'visible', transform: 'rotate(45deg)' }}
              >
                <path
                  ref={star2Ref}
                  d="M259.2,229.13c33.19-48.5,48.09-143.61,48.09-143.61,0,0,15.87,108.71,54.71,135.06,38.84,26.36,140.12,40.01,140.12,40.01,0,0-107.96,27.85-137.67,63.11-29.71,35.26-48.09,143.61-48.09,143.61,0,0-27.52-109.88-54.71-135.06-27.19-25.19-140.12-40.01-140.12-40.01,0,0,104.48-14.6,137.67-63.11Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="13"
                  strokeMiterlimit="10"
                />
              </svg>
            </div>
          </>
        ) : (
          <>
            <div style={{ alignSelf: 'start', paddingTop: 24 }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  borderRadius: 2,
                  overflow: 'hidden',
                  background: '#141414',
                }}
              >
                <img src="/images/landing.jpeg"
                  alt="Magda"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                   />
              </div>
              <p
                style={{
                  margin: '20px 0 0',
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: '#c9c9c9',
                }}
              >
                Media Designer | UX/UI Designer.
                <br />
                <i style={{ fontStyle: 'italic', fontSize: 14, color: '#8f8f8f' }}>
                  *Bulgaria&nbsp;│&nbsp;The Netherlands&nbsp;│&nbsp;USA.
                </i>
              </p>
            </div>

            {/* Star — large, straddles the left edge of the portrait */}
            <svg
              aria-hidden
              viewBox="0 0 640 529"
              style={{ position: 'absolute', top: 0, right: 300, width: 400, pointerEvents: 'none', zIndex: 10, overflow: 'visible' }}
            >
              <path
                ref={star1Ref}
                d="M259.2,229.13c33.19-48.5,48.09-143.61,48.09-143.61,0,0,15.87,108.71,54.71,135.06,38.84,26.36,140.12,40.01,140.12,40.01,0,0-107.96,27.85-137.67,63.11-29.71,35.26-48.09,143.61-48.09,143.61,0,0-27.52-109.88-54.71-135.06-27.19-25.19-140.12-40.01-140.12-40.01,0,0,104.48-14.6,137.67-63.11Z"
                fill="none"
                stroke="#ffffff"
                strokeWidth="13"
                strokeMiterlimit="10"
              />
            </svg>

            {/* Star — small, lower and inside the portrait */}
            <svg
              aria-hidden
              viewBox="0 0 640 529"
              style={{ position: 'absolute', top: 230, right: 520, width: 180, pointerEvents: 'none', zIndex: 10, overflow: 'visible' }}
            >
              <path
                ref={star2Ref}
                d="M259.2,229.13c33.19-48.5,48.09-143.61,48.09-143.61,0,0,15.87,108.71,54.71,135.06,38.84,26.36,140.12,40.01,140.12,40.01,0,0-107.96,27.85-137.67,63.11-29.71,35.26-48.09,143.61-48.09,143.61,0,0-27.52-109.88-54.71-135.06-27.19-25.19-140.12-40.01-140.12-40.01,0,0,104.48-14.6,137.67-63.11Z"
                fill="none"
                stroke="#ffffff"
                strokeWidth="13"
                strokeMiterlimit="10"
              />
            </svg>
          </>
        )}
      </section>

      {/* Persistent dark backdrop spanning About -> end of Featured Work (excludes Footer).
          Also hosts the intro's expand/contract cover — it temporarily extends above its own
          top edge to cover the header + hero, then contracts back to reveal them. */}
      <div ref={darkWrapperRef} style={{ position: 'relative', background: '#0a0a0a' }}>
        {showOverlay && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: coverTop,
              bottom: 0,
              background: '#0a0a0a',
              zIndex: 9998,
              transition: `top ${REVEAL_DELAY}ms ${EASE}`,
              pointerEvents: 'auto',
            }}
          />
        )}

      {/* ---- ABOUT ---- */}
      {/* No background/color of its own — the dark wrapper's animated background shows through,
          and text colour is driven by the same scroll progress via refs (see updateBg above). */}
      <section
        ref={aboutSectionRef}
        style={
          isMobile
            ? { position: 'relative', minHeight: '150vh', overflow: 'visible', padding: '48px 20px 64px' }
            : { position: 'relative', minHeight: '150vh', overflow: 'visible', padding: '64px 44px' }
        }
      >
        {isMobile ? (
          <>
            {/* Scroll-in spacer — pure lead-in distance so the black->white fade has room to be gradual */}
            <div aria-hidden style={{ height: '16vh' }} />

            <h2
              ref={aboutH2Ref}
              style={{
                margin: 0,
                color: '#ffffff',
                fontWeight: 600,
                textTransform: 'uppercase',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                fontSize: 'clamp(28px, 8vw, 40px)',
                textWrap: 'balance' as React.CSSProperties['textWrap'],
              }}
            >
              Because design is not just about{' '}
              <span style={{ fontStyle: 'italic' }}>aesthetics</span>&nbsp;- it is about{' '}
              <span style={{ fontStyle: 'italic' }}>solutions.</span>
              <span style={{ fontWeight: 200 }}>/</span>
            </h2>

            <div ref={powerTwentiesRef} style={{ marginTop: 80 }}>
              <p
                ref={aboutLabelRef}
                style={{
                  margin: 0,
                  color: '#ffffff',
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                <i>Power Twenties/</i>
              </p>
              <p
                ref={aboutBodyRef}
                style={{
                  margin: '12px 0 0',
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: '#ffffff',
                }}
              >
                Born and raised in Bulgaria, now calling Eindhoven home.
                <br />
                Keen on technology since I was a child.
                <br />Photographer, ex-musician and a shy donkey.
              </p>
            </div>

            {/* Portrait — square, at the bottom */}
            <div
              style={{
                marginTop: 40,
                width: '100%',
                aspectRatio: '1 / 1',
                position: 'relative',
                overflow: 'hidden',
                background: '#141414',
                borderRadius: 2,
              }}
            >
              <img src="/images/bw about.jpeg"
                  alt="About"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                   />
            </div>
          </>
        ) : (
          <>
            <div style={{ paddingRight: 'min(44%, 460px)' }}>
              {/* Scroll-in spacer — pure lead-in distance so the black->white fade has room to be gradual */}
              <div aria-hidden style={{ height: '20vh' }} />

              <h2
                ref={aboutH2Ref}
                style={{
                  margin: 0,
                  color: '#ffffff',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  lineHeight: 1.02,
                  letterSpacing: '-0.01em',
                  fontSize: 'clamp(30px, 4.2vw, 66px)',
                  maxWidth: 1150,
                  textWrap: 'balance' as React.CSSProperties['textWrap'],
                }}
              >
                Because design is not just about{' '}
                <span style={{ fontStyle: 'italic' }}>aesthetics</span>&nbsp;- it is about{' '}
                <span style={{ fontStyle: 'italic' }}>solutions.</span>
                <span style={{ fontWeight: 200 }}>/</span>
              </h2>

              <div
                ref={powerTwentiesRef}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '220px 1fr',
                  gap: 44,
                  marginTop: 300,
                }}
              >
                <p
                  ref={aboutLabelRef}
                  style={{
                    margin: 0,
                    color: '#ffffff',
                    fontSize: 15,
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  <i>Power Twenties/</i>
                </p>
                <p
                  ref={aboutBodyRef}
                  style={{
                    margin: 0,
                    fontSize: 17,
                    lineHeight: 1.5,
                    color: '#ffffff',
                    maxWidth: 520,
                  }}
                >
                  Born and raised in Bulgaria, now calling Eindhoven home.
                  <br />
                  Keen on technology since I was a child.
                  <br />Photographer, ex-musician and a shy donkey.
                </p>
              </div>
            </div>

            {/* Portrait — right side, overflows section */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: '3.5%',
                width: 'min(25%, 400px)',
                height: '140vh',
                background: '#141414',
                overflow: 'hidden',
                zIndex: 5,
              }}
            >
              <img src="/images/bw about.jpeg"
                  alt="About"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                   />
            </div>
          </>
        )}
      </section>

      {/* ---- FEATURED WORK ---- */}
      {/* Desktop: sticky + scroll-driven horizontal carousel. Mobile: ordinary vertical list, each card fades in on scroll. */}
      <section
        ref={workSectionRef}
        id="work"
        style={isMobile ? { position: 'relative', padding: '64px 20px 40px' } : { position: 'relative', height: '360vh' }}
      >
        {isMobile ? (
          <>
            <h2
              style={{
                margin: '0 0 32px',
                fontStyle: 'italic',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                lineHeight: 0.9,
                fontSize: 'clamp(36px, 12vw, 56px)',
              }}
            >
              #Latest Work
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {projects.map((proj) => (
                <MobileProjectCard key={proj.slug} proj={proj} />
              ))}
            </div>
          </>
        ) : (
          <div
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 24,
                flexWrap: 'wrap',
                padding: '0 44px',
                marginBottom: 40,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontStyle: 'italic',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  lineHeight: 0.9,
                  fontSize: 'clamp(40px, 7vw, 108px)',
                }}
              >
                #Latest Work
              </h2>
            </div>

            <div style={{ overflow: 'hidden' }}>
              <div
                ref={workTrackRef}
                style={{
                  display: 'flex',
                  gap: 24,
                  padding: '0 44px',
                  width: 'max-content',
                  willChange: 'transform',
                }}
              >
                {projects.map((proj) => (
                  <Link
                    key={proj.slug}
                    to={`/case/${proj.slug}`}
                    className="m-tile"
                    style={{
                      position: 'relative',
                      flex: '0 0 auto',
                      height: 'clamp(360px, 64vh, 620px)',
                      aspectRatio: '16 / 10',
                      overflow: 'hidden',
                      borderRadius: 2,
                      background: '#141414',
                      color: '#ffffff',
                      display: 'block',
                      cursor: 'none',
                    }}
                    onMouseEnter={() => {
                      if (cursorRef.current) cursorRef.current.style.opacity = '1'
                    }}
                    onMouseLeave={() => {
                      if (cursorRef.current) cursorRef.current.style.opacity = '0'
                    }}
                  >
                    {proj.coverImage ? (
                      <img
                        src={proj.coverImage}
                        alt={proj.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <ImagePlaceholder label={proj.placeholder} />
                    )}

                    {/* Gradient + text — fades in together on hover */}
                    <div
                      className="m-reveal"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        background:
                          'linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.05) 30%, rgba(10,10,10,0.96) 100%)',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          left: 30,
                          right: 30,
                          bottom: 28,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-end',
                          gap: 16,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: FONT_UNBOUNDED,
                            fontSize: 'clamp(20px, 2.1vw, 32px)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.01em',
                            lineHeight: 1,
                            color: '#ffffff',
                            textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                          }}
                        >
                          {proj.title}
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            color: '#ffffff',
                            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                          }}
                        >
                          {proj.tags}
                        </span>
                        <span style={{ fontSize: 14, color: '#ffffff', whiteSpace: 'nowrap', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                          /{proj.year}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      </div>

      {/* Custom cursor for project cards */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 64,
          height: 64,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.9)',
          background: 'rgba(255,255,255,0.08)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          transition: 'opacity 0.2s ease',
          willChange: 'transform',
        }}
      />

      <Footer />
    </main>
  )
}
