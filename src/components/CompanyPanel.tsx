import type { CSSProperties } from 'react'
import { SECTIONS, SRCSET, U } from '../data'
import type { Company } from '../data'
import { useImgGuard, useInView } from '../hooks'

interface Props {
  company: Company
  onPick: (name: string) => void
}

export default function CompanyPanel({ company: c, onPick }: Props) {
  const { ref, inView } = useInView<HTMLElement>()
  const { failed, imgProps } = useImgGuard()
  const external = c.url.startsWith('http')

  return (
    <section
      ref={ref}
      className={`panel-s zoom${inView ? ' in' : ''}${failed ? ' noimg' : ''}`}
      id={c.id}
      style={{ '--g1': c.g[0], '--g2': c.g[1] } as CSSProperties}
      aria-labelledby={`h-${c.id}`}
    >
      <div className="bg">
        <img
          {...imgProps}
          src={U(c.img, 1600, 72)} srcSet={SRCSET(c.img, [[640, 70], [1080, 70], [1600, 72], [2400, 75]])}
          sizes="100vw" width="1600" height="1067" alt={c.alt} loading="lazy" decoding="async"
        />
      </div>
      <div className="top"><p className="kick">{c.kick}</p><h2 id={`h-${c.id}`}>{c.name}</h2><p className="sub">{c.sub}</p></div>
      <div className="bottom">
        <dl className="specs">{c.specs.map(s => <div key={s[0]}><dt>{s[0]}</dt><dd>{s[1]}</dd></div>)}</dl>
        <div className="cta">
          <a className="b blue" href={SECTIONS.contact} onClick={() => onPick(c.name)}>{c.cta}</a>
          <a className="b light" href={c.url} {...(external && { target: '_blank', rel: 'noopener' })}>Learn More about {c.more}</a>
        </div>
      </div>
    </section>
  )
}
