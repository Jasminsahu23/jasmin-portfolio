import { ArrowRight } from 'lucide-react'
import NetworkCanvas from './NetworkCanvas.jsx'
import MaskLines from './MaskLines.jsx'
import Magnetic from './Magnetic.jsx'
import SocialLinks from './SocialLinks.jsx'
import { SITE } from '../data/site.js'

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <NetworkCanvas />
      <div className="hero__veil" aria-hidden="true" />

      <div className="wrap hero__inner">
        <p className="hero__eyebrow">IT ENGINEER • DATA SCIENCE • FULL-STACK DEVELOPMENT</p>

        <h1 id="hero-title" className="hero__title">
          <span className="hero__name">
            <MaskLines immediate lines={['JASMIN SAHU']} baseDelay={150} />
          </span>
          <span className="hero__headline">
            <MaskLines
              immediate
              baseDelay={350}
              lines={['Building ideas', 'into digital', 'experiences.']}
            />
          </span>
        </h1>

        <div className="hero__foot">
          <p className="hero__lede">
            Information Technology undergraduate passionate about Data Science, AI and Full-Stack
            Development, building practical solutions that connect technology, data and real-world
            impact.
          </p>

          <div className="hero__actions">
            <div className="hero__buttons">
              <Magnetic>
                <a className="btn btn--primary" href="#projects">
                  Explore My Work <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn btn--ghost" href={SITE.resume} download>
                  Download Resume
                </a>
              </Magnetic>
            </div>
            <SocialLinks />
          </div>
        </div>
      </div>

      <a className="hero__scroll" href="#about" aria-label="Scroll to About section">
        <span aria-hidden="true" />
      </a>
    </section>
  )
}
