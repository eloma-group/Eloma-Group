import { useEffect, useState } from 'react'
import { OFF, PHOTO_WIDTHS } from '../data'
import Photo from './Photo'
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
  /* Clocks start empty so the pre-rendered HTML matches the first client render */
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="sec" id="presence" aria-labelledby="h-presence">
      <div className="wrap presence">
        <div className={`ph${failed ? ' noimg' : ''}`} id="melPh">
          <Photo
            {...imgProps}
            name="melbourne" widths={PHOTO_WIDTHS.office}
            sizes="(max-width:860px) 100vw, 640px" width="1000" height="800"
            alt="Melbourne city skyline" loading="lazy" decoding="async"
          />
        </div>
        <div>
          <p className="eyebrow">National presence</p>
          <h2 className="h2" id="h-presence">Coast to coast, five capital cities.</h2>
          <p className="lede">Headquartered in Collingwood, Melbourne, with teams in every mainland state capital. Local time updates live.</p>
          <ul className="offices" id="offices">
            {OFF.map(o => (
              <li key={o.city} className={`office${o.hq ? ' hq' : ''}`}>
                <h3>{o.city}</h3><address>{o.address}</address><time data-tz={o.tz}>{now && localTime(o.tz, now)}</time>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
