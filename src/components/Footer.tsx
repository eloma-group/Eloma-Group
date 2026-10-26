import { ABN, COUNTRIES, EMAIL, PHONE, SECTIONS, TEL } from '../data'

const PHONE_ICON = 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z'
const MAIL = 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6'
const PIN = 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
const BUILDING = 'M4 22V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v18M2 22h20M9 6h1M14 6h1M9 10h1M14 10h1M9 14h1M14 14h1M10 22v-4h4v4'
const DOC = 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5'

function Icon({ d }: { d: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
}

export default function Footer() {
  return (
    <footer>
      <nav aria-label="Footer">
        <ul>
          <li><a href={SECTIONS.about}>About</a></li>
          <li><a href={SECTIONS.services}>Services</a></li>
          <li><a href={SECTIONS.presence}>Offices</a></li>
          <li><a href={SECTIONS.community}>Community</a></li>
          <li><a href={SECTIONS.contact}>Contact</a></li>
        </ul>
      </nav>
      <nav aria-label="Countries">
        <ul>
          {COUNTRIES.map(c => <li key={c.path}><a href={c.path}>{c.name}</a></li>)}
        </ul>
      </nav>
      <address className="foot-info">
        <a href={TEL}><Icon d={PHONE_ICON} />{PHONE}</a>
        <a href={`mailto:${EMAIL}`}><Icon d={MAIL} />{EMAIL}</a>
        <span><Icon d={PIN} />71 Gipps Street, Collingwood, Melbourne, VIC 3066, Australia</span>
      </address>
      <div className="foot-info">
        <span><Icon d={BUILDING} />Eloma Group Of Companies Pty Ltd</span>
        <span><Icon d={DOC} />ABN {ABN}</span>
      </div>
      <p>ELOMA Group © <span id="yr" suppressHydrationWarning>{new Date().getFullYear()}</span> · Australia · Photography: Unsplash (incl. Jamie Davies, Vitaly Gariev, Jelly Marketing)</p>
      <p>We acknowledge the Traditional Custodians of the lands on which we work and pay respect to Elders past and present.</p>
    </footer>
  )
}
