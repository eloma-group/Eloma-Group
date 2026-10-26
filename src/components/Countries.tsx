import { COUNTRIES } from '../data'

export default function Countries() {
  return (
    <section className="sec grey" id="countries" aria-labelledby="h-countries">
      <div className="wrap">
        <div className="split">
          <div><p className="eyebrow">Where we work</p><h2 className="h2" id="h-countries">Australian-owned. Serving five countries.</h2></div>
          <p className="lede">All five ELOMA businesses operate across Australia. Through EG Eloma, our IT, Microsoft and digital marketing services also reach businesses in the United States, Canada, the United Kingdom and New Zealand.</p>
        </div>
        <ul className="countries">
          {COUNTRIES.map(c => (
            <li key={c.path}><a className="country" href={c.path}><span className="cc">{c.cc}</span><h3>{c.name}</h3><p>{c.d}</p></a></li>
          ))}
        </ul>
      </div>
    </section>
  )
}
