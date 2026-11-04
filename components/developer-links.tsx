import { ArrowUpRight, BookOpen, Braces, FileCode, GitBranch } from 'lucide-react'
import { developerLinks } from '@/lib/site-config'

const icons = {
  Documentation: BookOpen,
  'GitHub Repository': GitBranch,
  'API Reference': Braces,
  'Core Protocol Spec': FileCode,
} as const

export function DeveloperLinks({ className = '', label = 'Developer resources' }: { className?: string; label?: string }) {
  return (
    <nav aria-label={label} className={`dev-links ${className}`}>
      {developerLinks.map((link) => {
        const Icon = icons[link.label]
        const external = 'external' in link && link.external
        return (
          <a
            key={link.label}
            href={link.href}
            className="dev-link"
            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            <Icon size={12} aria-hidden="true" />
            {link.label}
            {external && <ArrowUpRight size={11} aria-hidden="true" className="dev-link__ext" />}
          </a>
        )
      })}
    </nav>
  )
}
