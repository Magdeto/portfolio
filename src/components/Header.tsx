import { Link } from 'react-router-dom'
import { useIsMobile } from '../hooks/useIsMobile'

export default function Header() {
  const isMobile = useIsMobile()

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isMobile ? '16px 20px' : '24px 44px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        fontFamily: 'Unbounded',
      }}
    >
      <Link to="/" className="logo-link" style={{ display: 'inline-flex' }}>
        <img
          src="/images/watermark-logo.svg"
          alt="Magda Tsekova"
          style={{ width: isMobile ? 46 : 90, height: isMobile ? 46 : 90, display: 'block' }}
        />
      </Link>

      <nav
        style={{
          display: 'flex',
          gap: isMobile ? 14 : 40,
          fontSize: isMobile ? 11 : 17,
          fontWeight: 500,
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
        }}
      >
        <Link to="/visual-work" className="nav-link">Visual Work</Link>
        <a href="#" className="nav-link">CV</a>
        <a href="www.linkedin.com/in/magda-tsekova" target="_blank" rel="noopener noreferrer" className="nav-link">
          LinkedIn
        </a>
      </nav>
    </header>
  )
}
