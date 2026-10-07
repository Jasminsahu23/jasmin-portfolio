import { useState } from 'react'
import MaskLines from './MaskLines.jsx'
import Reveal from './Reveal.jsx'
import { SKILL_GROUPS } from '../data/site.js'

// Skills orbit a centre label. Rings spin slowly and pause on hover; labels
// counter-rotate so they always stay upright. No proficiency scores are shown.
function Orbit({ group }) {
  const inner = group.skills.slice(0, 3)
  const outer = group.skills.slice(3)
  const rings = [
    { items: inner, radius: 0.24, rev: false, duration: 60 },
    { items: outer, radius: 0.4, rev: true, duration: 80 },
  ].filter((r) => r.items.length)

  return (
    <div className="orbit" aria-hidden="true">
      <div className="orbit__core">
        <span>{group.label}</span>
      </div>
      {rings.map((ring, ri) => (
        <div
          key={ri}
          className={`orbit__ring${ring.rev ? ' orbit__ring--rev' : ''}`}
          style={{ '--radius': ring.radius, '--dur': `${ring.duration}s` }}
        >
          {ring.items.map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="orbit__node"
              style={{ '--a': `${(360 / ring.items.length) * i + (ri ? 30 : 0)}deg` }}
            >
              <span className="orbit__label">{skill}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Skills() {
  const [activeId, setActiveId] = useState(SKILL_GROUPS[0].id)
  const group = SKILL_GROUPS.find((g) => g.id === activeId)

  const onKeyDown = (e) => {
    const i = SKILL_GROUPS.findIndex((g) => g.id === activeId)
    let next = i
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % SKILL_GROUPS.length
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft')
      next = (i - 1 + SKILL_GROUPS.length) % SKILL_GROUPS.length
    else return
    e.preventDefault()
    setActiveId(SKILL_GROUPS[next].id)
    document.getElementById(`tab-${SKILL_GROUPS[next].id}`)?.focus()
  }

  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="wrap">
        <header className="section__head">
          <h2 id="skills-title" className="display">
            <MaskLines lines={['Tools I', 'build with.']} />
          </h2>
        </header>

        <Reveal className="skills__body">
          <div
            className="skills__tabs"
            role="tablist"
            aria-label="Skill categories"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
          >
            {SKILL_GROUPS.map((g) => (
              <button
                key={g.id}
                id={`tab-${g.id}`}
                type="button"
                role="tab"
                aria-selected={g.id === activeId}
                aria-controls="skills-panel"
                tabIndex={g.id === activeId ? 0 : -1}
                className="skills__tab"
                onClick={() => setActiveId(g.id)}
              >
                <span>{g.label}</span>
                <small>{g.skills.length}</small>
              </button>
            ))}
          </div>

          <div
            id="skills-panel"
            className="skills__panel"
            role="tabpanel"
            aria-labelledby={`tab-${group.id}`}
          >
            <Orbit key={group.id} group={group} />
            <ul className="skills__list">
              {group.skills.map((s, i) => (
                <li key={`${s}-${i}`}>{s}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
