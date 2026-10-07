import { useState } from 'react'
import { Send } from 'lucide-react'
import MaskLines from './MaskLines.jsx'
import Reveal from './Reveal.jsx'
import Magnetic from './Magnetic.jsx'
import { SITE, isPlaceholder } from '../data/site.js'

const DETAILS = [
  { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { label: 'LinkedIn', value: SITE.linkedin.replace('https://', ''), raw: SITE.linkedin, href: SITE.linkedin },
  { label: 'GitHub', value: SITE.github.replace('https://', ''), raw: SITE.github, href: SITE.github },
]

export default function Contact() {
  const [status, setStatus] = useState({ type: 'idle', msg: '' })

  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()

    if (isPlaceholder(SITE.email)) {
      setStatus({
        type: 'info',
        msg: 'This form is not connected yet. Add your email address in src/data/site.js to enable it.',
      })
      return
    }

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\n${name} (${email})`)
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`
    setStatus({ type: 'success', msg: 'Opening your email app with the message ready to send.' })
  }

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="wrap contact__grid">
        <div className="contact__intro">
          <h2 id="contact-title" className="display display--xl">
            <MaskLines lines={['Let’s build', 'something', 'meaningful.']} />
          </h2>
          <Reveal as="p" className="contact__lede">
            Have an opportunity, idea or project in mind? I&rsquo;d love to hear from you.
          </Reveal>

          <Reveal as="dl" className="contact__details" delay={100}>
            {DETAILS.map((d) => {
              const placeholder = isPlaceholder(d.raw ?? d.value)
              return (
                <div key={d.label}>
                  <dt>{d.label}</dt>
                  <dd>
                    <a
                      href={d.href}
                      {...(d.label === 'Email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      {d.value}
                    </a>
                    {placeholder && <span className="tag-ph">Placeholder</span>}
                  </dd>
                </div>
              )
            })}
          </Reveal>
        </div>

        <Reveal as="form" className="form" onSubmit={onSubmit} noValidate={false} delay={120}>
          <div className="field">
            <label htmlFor="cf-name">Name</label>
            <input id="cf-name" name="name" type="text" autoComplete="name" required />
          </div>
          <div className="field">
            <label htmlFor="cf-email">Email</label>
            <input id="cf-email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="field">
            <label htmlFor="cf-message">Message</label>
            <textarea id="cf-message" name="message" rows="5" required />
          </div>
          <Magnetic>
            <button className="btn btn--primary" type="submit">
              Send Message <Send size={17} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </Magnetic>
          <p className={`form__status form__status--${status.type}`} role="status" aria-live="polite">
            {status.msg}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
