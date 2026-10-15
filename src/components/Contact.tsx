import { useState } from 'react'
import type { FormEvent } from 'react'
import { TOPICS } from '../data'

interface Props {
  topic: string
  onTopic: (t: string) => void
}

export default function Contact({ topic, onTopic }: Props) {
  const [note, setNote] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const n = String(fd.get('first') ?? '').trim()
    const em = String(fd.get('email') ?? '').trim()
    const m = String(fd.get('message') ?? '').trim()
    if (!n || !/^\S+@\S+\.\S+$/.test(em) || !m) {
      setNote('Please add your first name, a valid email and a message.')
      return
    }
    setNote(`Thanks, ${n}. Your enquiry about ${topic} is ready to send once this form is connected to your inbox.`)
  }

  return (
    <section className="sec" id="contact">
      <div className="wrap contact">
        <div>
          <p className="eyebrow">Contact us</p>
          <h2 className="h2">Let's plan your next move.</h2>
          <p className="lede">Tell us what you need. We'll connect you with the right ELOMA business.</p>
          <div className="reach">
            <div><span>Phone</span><span>1800 054 555</span></div>
            <div><span>Hours</span><span>Mon–Fri, 9am–6pm AEST</span></div>
            <div><span>Head office</span><span>71 Gipps Street, Collingwood VIC 3066</span></div>
            <div><span>EG Digital</span><span>connect@egdigital.com.au</span></div>
            <div><span>Bivry</span><span>bivry.com.au</span></div>
          </div>
        </div>
        <form id="enquiry" noValidate onSubmit={onSubmit}>
          <label>First name<input id="f-first" name="first" autoComplete="given-name" /></label>
          <label>Last name<input id="f-last" name="last" autoComplete="family-name" /></label>
          <label>Email<input id="f-email" name="email" type="email" autoComplete="email" /></label>
          <label>Phone<input id="f-phone" name="phone" type="tel" autoComplete="tel" /></label>
          <label className="full">Company<input id="f-company" name="company" autoComplete="organization" /></label>
          <label className="full">Service<select id="f-topic" name="topic" value={topic} onChange={e => onTopic(e.target.value)}>
            {TOPICS.map(t => <option key={t}>{t}</option>)}
          </select></label>
          <label className="full">Message<textarea id="f-msg" name="message"></textarea></label>
          <div className="full"><button className="b blue" type="submit">Send Enquiry</button></div>
          <p className="note" id="note" aria-live="polite">{note}</p>
        </form>
      </div>
    </section>
  )
}
