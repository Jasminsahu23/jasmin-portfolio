import MaskLines from './MaskLines.jsx'
import Reveal from './Reveal.jsx'
import { FLOW, INTERESTS } from '../data/site.js'

export default function DataToIntelligence() {
  return (
    <section id="intelligence" className="section flow" aria-labelledby="flow-title">
      <div className="wrap">
        <header className="section__head">
          <h2 id="flow-title" className="display">
            <MaskLines lines={['Where data', 'meets intelligence.']} />
          </h2>
        </header>

        <Reveal as="ol" className="flow__steps">
          {FLOW.map((step, i) => (
            <li key={step.name} style={{ '--i': i }}>
              <h3>{step.name}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </Reveal>

        <Reveal as="ul" className="flow__interests" aria-label="Areas of interest">
          {INTERESTS.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
