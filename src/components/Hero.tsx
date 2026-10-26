import type { CSSProperties } from 'react'
import { SECTIONS, SRCSET, U } from '../data'
import { useImgGuard } from '../hooks'

const HERO = '1546268060-2592ff93ee24'
/* Keep in sync with the preload tag in index.html */
const HERO_SRCSET = SRCSET(HERO, [[640, 75], [1080, 78], [1600, 80], [2400, 82], [3200, 80]])

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
        <img
          {...imgProps}
          src={U(HERO, 1600, 80)} srcSet={HERO_SRCSET} sizes="100vw" width="1600" height="1067"
          alt="Aerial view of the Sydney Harbour Bridge and Opera House" fetchPriority="high"
        />
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
