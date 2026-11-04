import { Clock3, Trophy } from 'lucide-react'
import type { MatchStatus } from '@/lib/championship-results'

const labels: Record<MatchStatus, string> = {
  live: 'Live',
  delayed: 'Delayed',
  upcoming: 'Scheduled',
  complete: 'Final',
}

export function MatchStatusBadge({ status, holdMinutes, className = '' }: { status: MatchStatus; holdMinutes?: number; className?: string }) {
  return (
    <span className={`match-badge is-${status} ${className}`}>
      {status === 'live' || status === 'delayed'
        ? <span className="match-badge__dot" aria-hidden="true" />
        : status === 'complete'
          ? <Trophy size={11} aria-hidden="true" />
          : <Clock3 size={11} aria-hidden="true" />}
      {labels[status]}
      {status === 'delayed' && holdMinutes ? <span className="match-badge__extra">+{holdMinutes}m</span> : null}
    </span>
  )
}
