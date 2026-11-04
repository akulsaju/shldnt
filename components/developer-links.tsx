import { BookOpen, Braces, FileCode } from 'lucide-react'
import { developerLinks } from '@/lib/site-config'

const icons = {
  Documentation: BookOpen,
  'API Reference': Braces,
  'Core Protocol Spec': FileCode,
} as const

export function DeveloperLinks({ className = '', label = 'Developer resources' }: { className?: string; label?: string }) {
  return (
    <nav aria-label={label} className={`dev-links ${className}`}>
      {developerLinks.map((link) => {
        const Icon = icons[link.label]
        return (
          <a key={link.label} href={link.href} className="dev-link">
            <Icon size={12} aria-hidden="true" />
            {link.label}
          </a>
        )
      })}
    </nav>
  )
}
