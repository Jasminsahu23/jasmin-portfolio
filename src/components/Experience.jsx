import MaskLines from './MaskLines.jsx'
import Reveal from './Reveal.jsx'
import { EXPERIENCE } from '../data/site.js'

export default function Experience() {
  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <div className="wrap">
        <header className="section__head">
          <h2 id="experience-title" className="display">
            <MaskLines lines={['Experience &', 'certifications.']} />
          </h2>
        </header>

        <ol className="timeline">
          {EXPERIENCE.map((item, i) => (
            <Reveal as="li" key={item.org} delay={i * 80} className="timeline__item">
              <div className="timeline__meta">
                <p className="timeline__org">{item.org}</p>
                <p className="timeline__kind">{item.kind}</p>
              </div>
              <div className="timeline__body">
                <h3>{item.role}</h3>
                {item.project && (
                  <p className="timeline__project">
                    Project: <span>{item.project}</span>
                  </p>
                )}
                {item.skills.length > 0 && (
                  <ul className="inline-list" aria-label="Skills used">
                    {item.skills.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
