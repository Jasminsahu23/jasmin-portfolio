import { useInView } from '../hooks/useInView.js'

// Each line slides up out of a mask. Lines are block-level so screen readers
// still read the heading as ordinary words.
export default function MaskLines({ lines, immediate = false, baseDelay = 0, className = '' }) {
  const [ref, inView] = useInView({ immediate, threshold: 0.3 })
  return (
    <span
      ref={ref}
      className={`mask-group${inView ? ' is-in' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--base': `${baseDelay}ms` }}
    >
      {lines.map((line, i) => (
        <span className="mask" key={line}>
          <span className="mask__inner" style={{ '--i': i }}>
            {line}
          </span>
        </span>
      ))}
    </span>
  )
}
