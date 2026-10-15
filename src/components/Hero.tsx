import type { CSSProperties } from 'react'
import { useImgGuard, useInView } from '../hooks'

export default function Hero() {
  const { ref, inView } = useInView<HTMLElement>()
  const { failed, imgProps } = useImgGuard()

  return (
    <section
      ref={ref}
      className={`panel-s${inView ? ' in' : ''}${failed ? ' noimg' : ''}`}
      id="hero"
      style={{ '--g1': '#C0783A', '--g2': '#3A1E0E' } as CSSProperties}
    >
      <div className="bg"><img {...imgProps} src="https://images.unsplash.com/photo-1737621806371-80fe6fab29e2?auto=format&fit=crop&w=2400&q=80" alt="An open road through the Australian outback" fetchPriority="high" /></div>
      <div className="clouds" aria-hidden="true"><i></i><i></i><i></i></div>
      <div className="top">
        <p className="kick">ELOMA Group</p>
        <h1>Five Businesses. One Standard.</h1>
        <p className="sub">Logistics, imports, IT, travel and customer care, across Australia.</p>
      </div>
      <div className="bottom">
        <div className="cta"><a className="b blue" href="#bivry">Explore Companies</a><a className="b light" href="#contact">Contact Us</a></div>
        <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </div>
    </section>
  )
}
