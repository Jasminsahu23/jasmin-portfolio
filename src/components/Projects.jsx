import { useEffect, useRef } from 'react'
import { Github, ExternalLink } from 'lucide-react'
import MaskLines from './MaskLines.jsx'
import Reveal from './Reveal.jsx'
import { VISUALS } from './ProjectVisuals.jsx'
import { PROJECTS } from '../data/projects.js'
import { prefersReducedMotion } from '../hooks/useInView.js'

function LinkButton({ href, children, Icon, label }) {
  if (!href) {
    return (
      <span className="btn btn--ghost btn--sm is-disabled" aria-disabled="true" title="Link will be added soon">
        <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
        {children}
        <small>soon</small>
      </span>
    )
  }
  return (
    <a className="btn btn--ghost btn--sm" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
      {children}
    </a>
  )
}

function Project({ project, index }) {
  const rootRef = useRef(null)
  const visualRef = useRef(null)
  const innerRef = useRef(null)
  const Visual = VISUALS[project.id]
  const motion = !prefersReducedMotion()

  // Gentle parallax on the visual while the project crosses the viewport.
  useEffect(() => {
    if (!motion) return undefined
    let raf = 0
    const update = () => {
      raf = 0
      const el = rootRef.current
      const inner = innerRef.current
      if (!el || !inner) return
      const r = el.getBoundingClientRect()
      const progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
      inner.style.transform = `translate3d(0, ${Math.max(-1, Math.min(1, progress)) * -14}px, 0) scale(1.07)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [motion])

  // Subtle tilt toward the pointer (fine pointers only).
  const onMove = (e) => {
    if (!motion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = visualRef.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${(-py * 5).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(px * 6).toFixed(2)}deg`)
  }
  const onLeave = () => {
    visualRef.current?.style.setProperty('--rx', '0deg')
    visualRef.current?.style.setProperty('--ry', '0deg')
  }

  return (
    <article
      ref={rootRef}
      className={`project${index % 2 ? ' project--flip' : ''}${project.flagship ? ' project--flagship' : ''}`}
      aria-labelledby={`${project.id}-title`}
    >
      <Reveal className="project__visual-wrap">
        <div
          ref={visualRef}
          className="project__visual"
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <div ref={innerRef} className="project__visual-inner">
            {project.image ? (
              <img src={project.image} alt={project.alt} loading="lazy" decoding="async" width="640" height="420" />
            ) : (
              <Visual label={project.alt} motion={motion} />
            )}
          </div>
        </div>
      </Reveal>

      <div className="project__body">
        {project.flagship && <p className="project__badge">Flagship project</p>}
        <p className="project__number">Project {project.number}</p>
        <h3 id={`${project.id}-title`} className="project__title">
          <MaskLines lines={[project.title]} />
        </h3>
        <Reveal as="p" className="project__summary">
          {project.summary}
        </Reveal>

        <Reveal delay={60}>
          <h4 className="project__label">{project.stackLabel}</h4>
          <ul className="inline-list">
            {project.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Reveal>

        {project.features.length > 0 && (
          <Reveal delay={100}>
            <h4 className="project__label">{project.featuresLabel || 'Key features'}</h4>
            <ul className="features">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal delay={140} className="project__links">
          <LinkButton href={project.github} Icon={Github} label={`${project.title} on GitHub`}>
            GitHub
          </LinkButton>
          <LinkButton href={project.demo} Icon={ExternalLink} label={`${project.title} live demo`}>
            Live demo
          </LinkButton>
        </Reveal>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="wrap">
        <header className="section__head">
          <h2 id="projects-title" className="display">
            <MaskLines lines={['What I', 'build.']} />
          </h2>
        </header>
        <div className="projects__list">
          {PROJECTS.map((p, i) => (
            <Project key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
