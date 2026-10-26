import type { CSSProperties } from 'react'
import { SECTIONS } from '../data'
import { useImgGuard } from '../hooks'

/* Self-hosted hero (scripts/hero-images.mjs). Keep media, srcsets and sizes in sync with the preload tags in index.html */
const PHONE = '(max-width: 600px) and (orientation: portrait)'
const set = (name: string, ext: string, widths: number[]) =>
  widths.map(w => `/hero/${name}-${w}.${ext} ${w}w`).join(', ')
const TALL = [480, 720]
const WIDE = [960, 1440, 1920, 2560]
/* Landscape phones get half-width files; the dark overlay hides the softness */
const WIDE_SIZES = '(max-height: 500px) 50vw, 100vw'

/* No zoom on the hero, so the LCP image paints immediately */
export default function Hero() {
  const { failed, imgProps } = useImgGuard()

  return (
    <section
      className={`panel-s${failed ? ' noimg' : ''}`}
      id="top"
      style={{ '--g1': '#3B6E99', '--g2': '#0E2236' } as CSSProperties}
      aria-labelledby="h-hero"
    >
      <div className="bg">
        <picture>
          <source media={PHONE} type="image/avif" srcSet={set('tall', 'avif', TALL)} sizes="100vw" width="720" height="1200" />
          <source media={PHONE} type="image/webp" srcSet={set('tall', 'webp', TALL)} sizes="100vw" width="720" height="1200" />
          <source type="image/avif" srcSet={set('wide', 'avif', WIDE)} sizes={WIDE_SIZES} />
          <img
            {...imgProps}
            src="/hero/wide-1440.webp" srcSet={set('wide', 'webp', WIDE)} sizes={WIDE_SIZES} width="1440" height="960"
            alt="Aerial view of the Sydney Harbour Bridge and Opera House" fetchPriority="high"
          />
        </picture>
      </div>
      <div className="top">
        <p className="kick">ELOMA Group</p>
        <h1 id="h-hero">Five Businesses. One Standard.</h1>
        <p className="sub">Logistics, imports, IT, travel and customer care, across Australia.</p>
      </div>
      <div className="bottom">
        <div className="cta"><a className="b blue" href={SECTIONS.bivry}>Explore Companies</a><a className="b light" href={SECTIONS.contact}>Contact Us</a></div>
        <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </div>
    </section>
  )
}
