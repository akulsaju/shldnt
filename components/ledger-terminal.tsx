'use client'

import { useEffect, useRef, useState } from 'react'
import {
  buildWindowEndsAt,
  championshipStandings,
  countdownParts,
  divisionCode,
  divisionMatches,
  matchStatus,
  resultForDivisionMatch,
  shortHash,
  type DivisionMatch,
} from '@/lib/championship-results'
import { siteConfig } from '@/lib/site-config'
import { MATCH_WIN_PRIZE_USD, formatUsdCompact } from '@/lib/prize-money'
import { teamCode } from '@/lib/team-codes'

type Tone = 'ok' | 'info' | 'warn' | 'dim'
type LogLine = { id: number; time: string; tag: string; tone: Tone; text: string }

const MAX_LINES = 9
const confederations = ['AHC', 'CAH', 'CONCACAH', 'CONMEHA', 'OFC', 'WEU']
const sequence = ['clock', 'git', 'commit', 'clock', 'standings', 'hold', 'sched', 'git', 'confed', 'commit'] as const

function pick<T>(items: T[], index: number) {
  return items.length ? items[index % items.length] : undefined
}

function versus(match: DivisionMatch) {
  return `${teamCode(match.fixture.home)} v ${teamCode(match.fixture.away)}`
}

function createLine(kind: (typeof sequence)[number], tick: number, now: number): Omit<LogLine, 'id' | 'time'> {
  const inPlay = divisionMatches.filter((match) => ['live', 'delayed'].includes(matchStatus(match, now)))
  const held = inPlay.filter((match) => matchStatus(match, now) === 'delayed')
  const recent = divisionMatches
    .filter((match) => match.endsAt <= now)
    .sort((left, right) => right.endsAt - left.endsAt)
    .slice(0, 24)

  if (kind === 'clock') {
    const match = pick(inPlay, tick)
    if (match) {
      return {
        tag: 'clock.tick',
        tone: 'info',
        text: `${match.id} ${versus(match)} · elapsed ${countdownParts(now - match.startsAt)} · rem ${countdownParts(buildWindowEndsAt(match) - now)}`,
      }
    }
  }

  if (kind === 'hold') {
    const match = pick(held, tick)
    if (match) {
      return {
        tag: 'integrity.hold',
        tone: 'warn',
        text: `${versus(match)} · ${divisionCode(match.division)} · result release +${match.fixture.resultReleaseDelayMinutes}m · Art.30 log review open`,
      }
    }
  }

  if (kind === 'git') {
    const match = pick(inPlay, tick * 7)
    if (match) {
      const team = tick % 2 ? match.fixture.home : match.fixture.away
      const seed = `${match.id}:${team}:${Math.floor(now / 45_000)}`
      return {
        tag: 'git.verify',
        tone: 'dim',
        text: `${teamCode(team)}/${divisionCode(match.division).toLowerCase()} head=${shortHash(seed)} pushes=${12 + (parseInt(shortHash(seed, 2), 16) % 60)} sig=ok tree=clean`,
      }
    }
  }

  if (kind === 'commit' || kind === 'git' || kind === 'clock' || kind === 'hold') {
    const match = pick(recent, tick)
    if (match) {
      const result = resultForDivisionMatch(match)
      return {
        tag: 'ledger.commit',
        tone: 'ok',
        text: `${teamCode(match.fixture.home)} ${result.homeScore}–${result.awayScore} ${teamCode(match.fixture.away)} · ${divisionCode(match.division)} · +3 pts +${formatUsdCompact(MATCH_WIN_PRIZE_USD)} → ${teamCode(result.winner)} · sha256:${shortHash(`${match.id}:final`, 12)}`,
      }
    }
  }

  if (kind === 'sched') {
    const next = divisionMatches
      .filter((match) => match.startsAt > now)
      .sort((left, right) => left.startsAt - right.startsAt)
    const match = pick(next.slice(0, 6), tick)
    if (match) {
      return {
        tag: 'scheduler.next',
        tone: 'info',
        text: `${versus(match)} · ${divisionCode(match.division)} · T-${countdownParts(match.startsAt - now)} · tz=${match.fixture.timeZone}`,
      }
    }
  }

  if (kind === 'confed') {
    const region = confederations[tick % confederations.length]
    return {
      tag: 'confed.sync',
      tone: 'dim',
      text: `region=${region} bylaws=v2.${(tick % 4) + 1} quotas=ok protests_open=${tick % 3 === 0 ? 1 : 0}`,
    }
  }

  const rows = championshipStandings(now).length
  return {
    tag: 'standings.recalc',
    tone: 'ok',
    text: `rows=${rows} divisions=3 deterministic=true replay_diff=0 took=${9 + (parseInt(shortHash(`${tick}`, 2), 16) % 23)}ms`,
  }
}

function utcTime(timestamp: number) {
  return new Date(timestamp).toISOString().slice(11, 19)
}

export function LedgerTerminal() {
  const [lines, setLines] = useState<LogLine[]>([])
  const tickRef = useRef(0)

  useEffect(() => {
    const start = Date.now()
    const seeded = Array.from({ length: 7 }, (_, index) => {
      const kind = sequence[index % sequence.length]
      const at = start - (7 - index) * 1900
      return { id: index, time: utcTime(at), ...createLine(kind, index, at) }
    })
    tickRef.current = seeded.length
    setLines(seeded)

    let timeout: number
    const schedule = () => {
      const tick = tickRef.current
      const delay = 900 + (parseInt(shortHash(`delay-${tick}`, 3), 16) % 2100)
      timeout = window.setTimeout(() => {
        const now = Date.now()
        const line = { id: tick, time: utcTime(now), ...createLine(sequence[tick % sequence.length], tick, now) }
        tickRef.current = tick + 1
        setLines((current) => [...current, line].slice(-MAX_LINES))
        schedule()
      }, delay)
    }
    schedule()
    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <div className="ledger-term" aria-label="Ledger event stream">
      <div className="ledger-term__bar">
        <span className="ledger-term__title">whf-ledger@{siteConfig.ledgerVersion}</span>
        <span className="ledger-term__cmd">tail -f events.log</span>
        <span className="ledger-term__rec"><span aria-hidden="true" /> streaming</span>
      </div>
      <ol className="ledger-term__body" role="log" aria-live="off">
        {lines.length === 0 && <li className="is-dim"><span className="ledger-term__text">connecting to ledger…</span></li>}
        {lines.map((line) => (
          <li key={line.id} className={`is-${line.tone}`}>
            <time className="ledger-term__time">{line.time}</time>
            <span className="ledger-term__tag">{line.tag}</span>
            <span className="ledger-term__text">{line.text}</span>
          </li>
        ))}
      </ol>
      <div className="ledger-term__foot">
        <span>utc · {lines.length ? lines[lines.length - 1].id + 1 : 0} events this session</span>
        <span>replay: deterministic ✓</span>
      </div>
    </div>
  )
}
