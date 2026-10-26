import type { CSSProperties } from 'react'
import { SECTIONS, SERV, SRCSET, U } from '../data'
import type { Service } from '../data'
import { useImgGuard } from '../hooks'

function Card({ s }: { s: Service }) {
  const { failed, imgProps } = useImgGuard()
  return (
    <li>
      <a className="card" href={SECTIONS[s.to]}>
        <div className={`ph${failed ? ' noimg' : ''}`} style={{ '--g1': s.g[0], '--g2': s.g[1] } as CSSProperties}>
          <img
            {...imgProps}
            src={U(s.img, 700, 70)} srcSet={SRCSET(s.img, [[480, 70], [900, 70]])}
            sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 420px" width="900" height="675"
            alt="" loading="lazy" decoding="async"
          />
        </div>
        <div className="body"><h3>{s.t}</h3><p>{s.d}</p><span className="go">Read more →</span></div>
      </a>
    </li>
  )
}

export default function Services() {
  return (
    <section className="sec grey" id="services" aria-labelledby="h-services">
      <div className="wrap">
        <div className="split">
          <div><p className="eyebrow">Services</p><h2 className="h2" id="h-services">Everything your business needs to move.</h2></div>
          <p className="lede">Specialist teams for every part of the journey, from the warehouse floor to the customer's phone call.</p>
        </div>
        <ul className="cards">
          {SERV.map(s => <Card key={s.t} s={s} />)}
        </ul>
      </div>
    </section>
  )
}
