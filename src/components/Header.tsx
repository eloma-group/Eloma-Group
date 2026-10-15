import { useEffect, useState } from 'react'

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
        <a className="logo" href="#top" aria-label="ELOMA Group home">ELOMA</a>
        <nav aria-label="Companies">
          <a href="#bivry">Logistics</a><a href="#eg-imports">Imports</a><a href="#eg-digital">Digital</a><a href="#eg-travels">Travel</a><a href="#eloma-cx">Customer Care</a>
        </nav>
        <div className="right">
          <nav aria-label="Group"><a href="#about">About</a><a href="#presence">Offices</a><a href="#contact">Contact</a></nav>
          <button className="menu" id="menuBtn" aria-expanded={menuOpen} aria-controls="drawer" onClick={onMenu}>Menu</button>
        </div>
      </div>
    </header>
  )
}
