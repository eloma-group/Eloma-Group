import type { CSSProperties } from 'react'
import { SERV, U } from '../data'
import type { Service } from '../data'
import { useImgGuard } from '../hooks'

function Card({ s }: { s: Service }) {
  const { failed, imgProps } = useImgGuard()
  return (
    <a className="card" href={s.to}>
      <div className={`ph${failed ? ' noimg' : ''}`} style={{ '--g1': s.g[0], '--g2': s.g[1] } as CSSProperties}>
        <img {...imgProps} src={U(s.img, 900)} alt="" loading="lazy" />
      </div>
      <div className="body"><h3>{s.t}</h3><p>{s.d}</p><span className="go">Read more →</span></div>
    </a>
  )
}

export default function Services() {
  return (
    <section className="sec grey" id="services">
      <div className="wrap">
        <div className="split">
          <div><p className="eyebrow">Services</p><h2 className="h2">Everything your business needs to move.</h2></div>
          <p className="lede">Specialist teams for every part of the journey, from the warehouse floor to the customer's phone call.</p>
        </div>
        <div className="cards" id="cards">
          {SERV.map(s => <Card key={s.t} s={s} />)}
        </div>
      </div>
    </section>
  )
}
