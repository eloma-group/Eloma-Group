import { useEffect, useState } from 'react'
import { OFF } from '../data'
import { useImgGuard } from '../hooks'

function localTime(tz: string, now: Date) {
  try {
    return new Intl.DateTimeFormat('en-AU', { timeZone: tz, hour: 'numeric', minute: '2-digit', hour12: true }).format(now)
  } catch {
    return ''
  }
}

export default function Presence() {
  const { failed, imgProps } = useImgGuard()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="sec" id="presence">
      <div className="wrap presence">
        <div className={`ph${failed ? ' noimg' : ''}`} id="melPh">
          <img {...imgProps} src="https://images.unsplash.com/photo-1545044846-351ba102b6d5?auto=format&fit=crop&w=1600&q=80" alt="Melbourne city skyline" loading="lazy" />
        </div>
        <div>
          <p className="eyebrow">National presence</p>
          <h2 className="h2">Coast to coast, five capital cities.</h2>
          <p className="lede">Headquartered in Collingwood, Melbourne, with teams in every mainland state capital. Local time updates live.</p>
          <div className="offices" id="offices">
            {OFF.map(o => (
              <div key={o.city} className={`office${o.hq ? ' hq' : ''}`}>
                <b>{o.city}</b><span>{o.address}</span><time data-tz={o.tz}>{localTime(o.tz, now)}</time>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
