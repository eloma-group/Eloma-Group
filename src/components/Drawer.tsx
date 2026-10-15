import { useEffect } from 'react'
import type { MouseEvent } from 'react'

interface Props {
  open: boolean
  onClose: () => void
}

export default function Drawer({ open, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [onClose])

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const t = e.target as HTMLElement
    if (t === e.currentTarget || t.tagName === 'A') onClose()
  }

  return (
    <div className={`drawer${open ? ' open' : ''}`} id="drawer" aria-hidden={!open} onClick={onClick}>
      <div className="panel" role="dialog" aria-label="Menu">
        <button className="x" id="drawerX" aria-label="Close menu" onClick={onClose}>×</button>
        <a href="#bivry">Bivry · Logistics</a><a href="#eg-imports">EG Imports</a><a href="#eg-digital">EG Digital</a><a href="#eg-travels">EG Travels</a><a href="#eloma-cx">ELOMA Customer Care</a>
        <a href="#about">About</a><a href="#services">Services</a><a href="#presence">Offices</a><a href="#community">Community</a><a href="#contact">Contact</a>
      </div>
    </div>
  )
}
