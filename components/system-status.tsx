'use client'

import { divisionMatches, matchStatus } from '@/lib/championship-results'
import { siteConfig } from '@/lib/site-config'
import { useNow } from '@/lib/use-now'

export function SystemStatus({ className = '' }: { className?: string }) {
  const now = useNow(15_000)
  const holds = now === null ? 0 : divisionMatches.filter((match) => matchStatus(match, now) === 'delayed').length

  return (
    <div className={`sys-status ${className}`} role="status">
      <span className="sys-status__item">
        <span className="sys-status__dot" aria-hidden="true" />
        System status: <strong>Nominal</strong>
      </span>
      {holds > 0 && (
        <span className="sys-status__item sys-status__item--warn">
          {holds} result hold{holds === 1 ? '' : 's'}
        </span>
      )}
      <span className="sys-status__item sys-status__item--dim">ledger {siteConfig.ledgerVersion}</span>
      <span className="sys-status__item sys-status__item--dim">statutes {siteConfig.statutesVersion}</span>
    </div>
  )
}
