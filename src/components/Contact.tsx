import { useState } from 'react'
import type { FormEvent } from 'react'
import { EMAIL, HQ, PHONE, TEL, TOPICS } from '../data'

interface Props {
  topic: string
  onTopic: (t: string) => void
}

/* FormSubmit emails every enquiry to EMAIL. The first submission sends a one-time activation email there. */
const FORM_ACTION = `https://formsubmit.co/${EMAIL}`
const FORM_AJAX = `https://formsubmit.co/ajax/${EMAIL}`

export default function Contact({ topic, onTopic }: Props) {
  const [note, setNote] = useState('')
  const [sending, setSending] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const get = (k: string) => String(fd.get(k) ?? '').trim()
    const n = get('first')
    const em = get('email')
    const m = get('message')
    if (!n || !/^\S+@\S+\.\S+$/.test(em) || !m) {
      setNote('Please add your first name, a valid email and a message.')
      return
    }
    if (get('_honey')) return

    setSending(true)
    setNote('Sending…')
    try {
      const res = await fetch(FORM_AJAX, {
        method: 'POST',
        referrerPolicy: 'strict-origin-when-cross-origin', // FormSubmit needs the Referer; Azure sends Referrer-Policy: same-origin
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Name: `${n} ${get('last')}`.trim(),
          Email: em,
          Phone: get('phone'),
          Company: get('company'),
          Service: topic,
          Message: m,
          _subject: `Website enquiry: ${topic}`,
          _replyto: em,
          _template: 'table',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || res.statusText)
      form.reset()
      setNote(`Thanks, ${n}. We've received your enquiry about ${topic} and will be in touch soon.`)
    } catch {
      setNote(`Sorry, your enquiry couldn't be sent. Please email ${EMAIL} or call ${PHONE}.`)
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="sec" id="contact" aria-labelledby="h-contact">
      <div className="wrap contact">
        <div>
          <p className="eyebrow">Contact us</p>
          <h2 className="h2" id="h-contact">Let's plan your next move.</h2>
          <p className="lede">Tell us what you need. We'll connect you with the right ELOMA business.</p>
          <dl className="reach">
            <div><dt>Phone</dt><dd><a href={TEL}>{PHONE}</a></dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
            <div><dt>Hours</dt><dd>Mon–Fri, 9am–6pm AEST</dd></div>
            <div><dt>Head office</dt><dd>{HQ}</dd></div>
            <div><dt>EG Eloma</dt><dd><a href="mailto:connect@egeloma.com.au">connect@egeloma.com.au</a></dd></div>
            <div><dt>Bivry</dt><dd><a href="https://bivry.com.au" target="_blank" rel="noopener">bivry.com.au</a></dd></div>
          </dl>
        </div>
        {/* Without JavaScript the form still posts straight to FormSubmit */}
        <form id="enquiry" method="post" action={FORM_ACTION} noValidate onSubmit={onSubmit}>
          <input type="text" name="_honey" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <label>First name<input id="f-first" name="first" autoComplete="given-name" required /></label>
          <label>Last name<input id="f-last" name="last" autoComplete="family-name" /></label>
          <label>Email<input id="f-email" name="email" type="email" autoComplete="email" required /></label>
          <label>Phone<input id="f-phone" name="phone" type="tel" autoComplete="tel" /></label>
          <label className="full">Company<input id="f-company" name="company" autoComplete="organization" /></label>
          <label className="full">Service<select id="f-topic" name="topic" value={topic} onChange={e => onTopic(e.target.value)}>
            {TOPICS.map(t => <option key={t}>{t}</option>)}
          </select></label>
          <label className="full">Message<textarea id="f-msg" name="message" required></textarea></label>
          <div className="full"><button className="b blue" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send Enquiry'}</button></div>
          <p className="note" id="note" aria-live="polite">{note}</p>
        </form>
      </div>
    </section>
  )
}
