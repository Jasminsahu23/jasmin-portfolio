import { ArrowRight } from 'lucide-react'
import MaskLines from './MaskLines.jsx'
import Reveal from './Reveal.jsx'
import Magnetic from './Magnetic.jsx'
import { TARGET_ROLES } from '../data/site.js'

export default function Career() {
  return (
    <section id="career" className="section career" aria-labelledby="career-title">
      <div className="wrap career__grid">
        <div>
          <h2 id="career-title" className="career__kicker">
            Currently building toward
          </h2>
          <ul className="career__roles">
            {TARGET_ROLES.map((r, i) => (
              <li key={r}>
                <MaskLines lines={[r]} baseDelay={i * 120} />
              </li>
            ))}
          </ul>
        </div>

        <div className="career__side">
          <Reveal as="p">
            I&rsquo;m continuously learning, building projects and strengthening my problem-solving
            skills to prepare for opportunities where I can create meaningful technology solutions.
          </Reveal>
          <Reveal delay={120}>
            <Magnetic>
              <a className="btn btn--primary" href="#contact">
                Let&rsquo;s Work Together <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
