import { Download } from 'lucide-react'
import MaskLines from './MaskLines.jsx'
import Reveal from './Reveal.jsx'
import Magnetic from './Magnetic.jsx'
import { SITE } from '../data/site.js'

export default function Resume() {
  return (
    <section id="resume" className="section resume" aria-labelledby="resume-title">
      <div className="wrap resume__grid">
        <div className="resume__copy">
          <h2 id="resume-title" className="display">
            <MaskLines lines={['Want the', 'full story?']} />
          </h2>
          <Reveal as="p">Explore my experience, skills and projects in detail.</Reveal>
          <Reveal delay={100}>
            <Magnetic>
              <a className="btn btn--primary" href={SITE.resume} download>
                Download Resume <Download size={18} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal className="paper-stack" aria-hidden="true">
          <div className="paper paper--back" />
          <div className="paper paper--mid" />
          <div className="paper paper--front">
            <span className="paper__name" />
            <span className="paper__role" />
            <span className="paper__rule" />
            <span className="paper__line" />
            <span className="paper__line paper__line--s" />
            <span className="paper__line" />
            <span className="paper__rule" />
            <span className="paper__line paper__line--s" />
            <span className="paper__line" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
