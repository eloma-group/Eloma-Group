import { useEffect, useState } from 'react'
import { SECTIONS } from '../data'

interface Props {
  menuOpen: boolean
  onMenu: () => void
}

export default function Header({ menuOpen, onMenu }: Props) {
  const [solid, setSolid] = useState(false)

  /* Header turns solid after the photo panels */
  useEffect(() => {
    const about = document.getElementById('about')
    const setHdr = () => setSolid(!!about && about.getBoundingClientRect().top <= 56)
    addEventListener('scroll', setHdr, { passive: true })
    setHdr()
    return () => removeEventListener('scroll', setHdr)
  }, [])

  return (
    <header className={`hdr${solid ? ' solid' : ''}`} id="hdr">
      <div className="bar">
        <a className="logo" href="/" aria-label="ELOMA Group home">
          <img className="mark mark-light" src="/logo-full-white-268.webp" srcSet="/logo-full-white-134.webp 1x, /logo-full-white-268.webp 2x, /logo-full-white-402.webp 3x" alt="" width="474" height="120" />
          <img className="mark mark-dark" src="/logo-full-268.webp" srcSet="/logo-full-134.webp 1x, /logo-full-268.webp 2x, /logo-full-402.webp 3x" alt="" width="474" height="120" />
        </a>
        <nav aria-label="Companies">
          <a href={SECTIONS.bivry}>Logistics</a><a href={SECTIONS['eg-imports']}>Imports</a><a href={SECTIONS['eg-eloma']}>Digital</a><a href={SECTIONS['eg-travels']}>Travel</a><a href={SECTIONS['eloma-cx']}>Customer Care</a>
        </nav>
        <div className="right">
          <nav aria-label="Group"><a href={SECTIONS.about}>About</a><a href={SECTIONS.presence}>Offices</a><a href={SECTIONS.contact}>Contact</a></nav>
          <button className="menu" id="menuBtn" type="button" aria-expanded={menuOpen} aria-controls="drawer" onClick={onMenu}>Menu</button>
        </div>
      </div>
    </header>
  )
}
