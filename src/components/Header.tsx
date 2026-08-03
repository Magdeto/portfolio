import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 44px',
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
          style={{ width: 90, height: 90, display: 'block' }}
        />
      </Link>

      <nav
        style={{
          display: 'flex',
          gap: 40,
          fontSize: 17,
          fontWeight: 500,
          letterSpacing: '0.01em',
        }}
      >
        <Link to="/work">Visual Work</Link>
        <a href="#">CV</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </nav>
    </header>
  )
}
