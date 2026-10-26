import { useEffect } from 'react'
import type { MouseEvent } from 'react'
import { SECTIONS } from '../data'

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
    <div className={`drawer${open ? ' open' : ''}`} id="drawer" aria-hidden={!open} inert={!open} onClick={onClick}>
      <div className="panel" role="dialog" aria-label="Menu">
        <button className="x" id="drawerX" type="button" aria-label="Close menu" onClick={onClose}>×</button>
        <a href={SECTIONS.bivry}>Bivry · Logistics</a><a href={SECTIONS['eg-imports']}>EG Imports</a><a href={SECTIONS['eg-eloma']}>EG Eloma</a><a href={SECTIONS['eg-travels']}>EG Travels</a><a href={SECTIONS['eloma-cx']}>ELOMA Customer Care</a>
        <a href={SECTIONS.about}>About</a><a href={SECTIONS.services}>Services</a><a href={SECTIONS.presence}>Offices</a><a href={SECTIONS.countries}>Countries</a><a href={SECTIONS.community}>Community</a><a href={SECTIONS.contact}>Contact</a>
      </div>
    </div>
  )
}
