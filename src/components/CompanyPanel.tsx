import type { CSSProperties } from 'react'
import { U } from '../data'
import type { Company } from '../data'
import { useImgGuard, useInView } from '../hooks'

interface Props {
  company: Company
  onPick: (name: string) => void
}

export default function CompanyPanel({ company: c, onPick }: Props) {
  const { ref, inView } = useInView<HTMLElement>()
  const { failed, imgProps } = useImgGuard()

  return (
    <section
      ref={ref}
      className={`panel-s${inView ? ' in' : ''}${failed ? ' noimg' : ''}`}
      id={c.id}
      style={{ '--g1': c.g[0], '--g2': c.g[1] } as CSSProperties}
    >
      <div className="bg"><img {...imgProps} src={U(c.img)} alt={c.alt} loading="lazy" /></div>
      <div className="top"><p className="kick">{c.kick}</p><h2>{c.name}</h2><p className="sub">{c.sub}</p></div>
      <div className="bottom">
        <div className="specs">{c.specs.map(s => <div key={s[0]}><b>{s[0]}</b><span>{s[1]}</span></div>)}</div>
        <div className="cta">
          <a className="b blue" href="#contact" onClick={() => onPick(c.name)}>{c.cta}</a>
          <a className="b light" href={c.url} target="_blank" rel="noopener">Learn More</a>
        </div>
      </div>
    </section>
  )
}
