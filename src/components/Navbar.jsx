import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { NAV_LINKS } from '../data/site.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const toggleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    if (typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav__bar">
        <a href="#home" className="nav__logo" aria-label="Jasmin Sahu, back to top" onClick={close}>
          JS<span aria-hidden="true">.</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} aria-current={active === l.id ? 'true' : undefined}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="nav__cta" href="#contact" onClick={close}>
          Let&rsquo;s Connect <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className="menu">
        <nav aria-label="Mobile">
          <ul>
            {NAV_LINKS.map((l, i) => (
              <li key={l.id} style={{ '--i': i }}>
                <a href={`#${l.id}`} onClick={close}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="menu__cta" href="#contact" onClick={close}>
          Let&rsquo;s Connect <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
        </a>
      </div>
    </header>
  )
}
