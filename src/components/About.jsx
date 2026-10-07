import MaskLines from './MaskLines.jsx'
import Reveal from './Reveal.jsx'
import { useInView } from '../hooks/useInView.js'
import { useCountUp } from '../hooks/useCountUp.js'
import { STATS } from '../data/site.js'

function Stat({ stat }) {
  const [ref, inView] = useInView({ threshold: 0.6 })
  const hasNumber = typeof stat.value === 'number'
  const value = useCountUp(hasNumber ? stat.value : 0, inView, { from: stat.from ?? 0 })
  const shown = hasNumber ? value.toFixed(stat.decimals) : stat.text

  return (
    <div ref={ref} className="stat">
      <dt>{stat.label}</dt>
      <dd className={hasNumber ? 'stat__num' : 'stat__text'}>{shown}</dd>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="wrap">
        <div className="about__grid">
          <h2 id="about-title" className="display about__title">
            <MaskLines lines={['Curious by', 'nature.', 'Technical by', 'choice.']} />
          </h2>

          <div className="about__copy">
            <Reveal as="p" className="about__lead">
              I&rsquo;m Jasmin, an Information Technology undergraduate at K.C. College of
              Engineering, Thane, pursuing my B.E. with a specialization in Data Science through the
              honours program.
            </Reveal>
            <Reveal as="p" delay={80}>
              I enjoy working at the intersection of software development, data and artificial
              intelligence. From building full-stack applications to analyzing real-world datasets, I
              like turning ideas into practical, usable solutions.
            </Reveal>
            <Reveal as="p" delay={160}>
              Currently, I&rsquo;m focused on strengthening my technical skills and preparing for
              opportunities where I can learn, build and contribute.
            </Reveal>
          </div>
        </div>

        <Reveal as="dl" className="stats" aria-label="At a glance">
          {STATS.map((s) => (
            <Stat key={s.label} stat={s} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
