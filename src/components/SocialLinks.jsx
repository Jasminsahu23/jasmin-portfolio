import { Github, Linkedin, Mail } from 'lucide-react'
import { SITE, isPlaceholder } from '../data/site.js'

export default function SocialLinks({ className = '' }) {
  const items = [
    { label: 'GitHub', href: SITE.github, Icon: Github, external: true },
    { label: 'LinkedIn', href: SITE.linkedin, Icon: Linkedin, external: true },
    {
      label: 'Email',
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${SITE.email}`,
      Icon: Mail,
      external: true,
    },
  ]

  return (
    <ul
      className={`social${className ? ` ${className}` : ''}`}
      aria-label="Social links"
    >
      {items.map(({ label, href, Icon, external }) => {
        const placeholder = isPlaceholder(href)

        return (
          <li key={label}>
            <a
              href={href}
              aria-label={placeholder ? `${label} (link not added yet)` : label}
              title={
                placeholder
                  ? `${label}: placeholder, edit src/data/site.js`
                  : label
              }
              {...(external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
              <span>{label}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}