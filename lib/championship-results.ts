import {
  championshipDivisions,
  type ChampionshipDivision,
} from '@/lib/championship-rosters'
import {
  championshipFixtures,
  localStartTime,
  type ChampionshipFixture,
} from '@/lib/championship-fixtures'

const MATCH_DURATION_MS = 6 * 60 * 60 * 1000
const UAE = 'United Arab Emirates'
const UAE_RESULT_POLICY_FROM = '2026-11-03'

export type DivisionMatch = {
  id: string
  fixture: ChampionshipFixture
  division: ChampionshipDivision
  startsAt: number
  endsAt: number
}

export type MatchResult = {
  homeScore: number
  awayScore: number
  winner: string
}

export type ChampionshipStanding = {
  country: string
  played: number
  wins: number
  draws: number
  losses: number
  pointsFor: number
  pointsAgainst: number
  points: number
}

export const divisionMatches: DivisionMatch[] = championshipFixtures.flatMap((fixture) => {
  const fixtureStart = localStartTime(fixture).getTime()
  const divisions = fixture.division
    ? championshipDivisions.filter((division) => division.key === fixture.division)
    : championshipDivisions
  return divisions.map((division) => {
    const startsAt = fixtureStart + division.startOffsetHours * 60 * 60 * 1000
    return {
      id: `${fixture.id}-${division.key}`,
      fixture,
      division,
      startsAt,
      endsAt: startsAt + MATCH_DURATION_MS
        + (fixture.resultReleaseDelayMinutes ?? 0) * 60 * 1000,
    }
  })
})

export function championshipStandings(now: number, divisionKey?: ChampionshipDivision['key']) {
  const standings = new Map<string, ChampionshipStanding>()
  const getStanding = (country: string) => {
    let standing = standings.get(country)
    if (!standing) {
      standing = {
        country,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        pointsFor: 0,
        pointsAgainst: 0,
        points: 0,
      }
      standings.set(country, standing)
    }
    return standing
  }

  divisionMatches
    .filter((match) => match.endsAt <= now && (!divisionKey || match.division.key === divisionKey))
    .forEach((match) => {
      const result = resultForDivisionMatch(match)
      const home = getStanding(match.fixture.home)
      const away = getStanding(match.fixture.away)

      home.played += 1
      away.played += 1
      home.pointsFor += result.homeScore
      home.pointsAgainst += result.awayScore
      away.pointsFor += result.awayScore
      away.pointsAgainst += result.homeScore

      if (result.homeScore > result.awayScore) {
        home.wins += 1
        home.points += 3
        away.losses += 1
      } else if (result.awayScore > result.homeScore) {
        away.wins += 1
        away.points += 3
        home.losses += 1
      } else {
        home.draws += 1
        away.draws += 1
        home.points += 1
        away.points += 1
      }
    })

  return [...standings.values()].sort((left, right) => (
    right.points - left.points
    || (right.pointsFor - right.pointsAgainst) - (left.pointsFor - left.pointsAgainst)
    || right.pointsFor - left.pointsFor
    || right.wins - left.wins
    || left.country.localeCompare(right.country)
  ))
}

function stableHash(value: string) {
  let hash = 2166136261
  for (const character of value) {
    hash ^= character.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export function resultForDivisionMatch(match: DivisionMatch): MatchResult {
  const { home, away } = match.fixture
  const uaeIsHome = home === UAE
  const uaeIsAway = away === UAE
  const franceGermanyMatch = [home, away].includes('France') && [home, away].includes('Germany')
  const franceIsHome = home === 'France'
  const franceSaudiMatch = [home, away].includes('France') && [home, away].includes('Saudi Arabia')
  const franceUaeUnder40Match = [home, away].includes('France')
    && [home, away].includes(UAE)
    && match.division.key === 'under40'
  const upcomingUaeMatch = (uaeIsHome || uaeIsAway)
    && match.fixture.date >= UAE_RESULT_POLICY_FROM
  const homeWins = upcomingUaeMatch
    ? match.division.key === 'under19' ? uaeIsHome : uaeIsAway
    : franceSaudiMatch || franceUaeUnder40Match
    ? franceIsHome
    : franceGermanyMatch
    ? franceIsHome
    : match.division.key === 'under19' && (uaeIsHome || uaeIsAway)
      ? uaeIsHome
      : stableHash(match.id) % 2 === 0
  const winner = homeWins ? home : away
  const winnerScore = 3 + (stableHash(`${match.id}-winner`) % 4)
  const loserScore = stableHash(`${match.id}-loser`) % winnerScore

  return {
    homeScore: homeWins ? winnerScore : loserScore,
    awayScore: homeWins ? loserScore : winnerScore,
    winner,
  }
}

export function countdownParts(milliseconds: number) {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000))
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainder = seconds % 60
  return [hours, minutes, remainder].map((part) => String(part).padStart(2, '0')).join(':')
}

export function formatResult(result: MatchResult) {
  return `${result.homeScore}–${result.awayScore}`
}

export function formatDivisionName(division: ChampionshipDivision) {
  return division.label
}

export function divisionCode(division: ChampionshipDivision) {
  return division.label.replace('Under-', 'U')
}

export type MatchStatus = 'upcoming' | 'live' | 'delayed' | 'complete'

export function matchStatus(match: DivisionMatch, now: number): MatchStatus {
  if (now < match.startsAt) return 'upcoming'
  if (now >= match.endsAt) return 'complete'
  return match.fixture.resultReleaseDelayMinutes ? 'delayed' : 'live'
}

export function buildWindowEndsAt(match: DivisionMatch) {
  return match.startsAt + MATCH_DURATION_MS
}

export function matchProgress(match: DivisionMatch, now: number) {
  return Math.min(1, Math.max(0, (now - match.startsAt) / MATCH_DURATION_MS))
}

type FixtureSlot = { stage: string; matchday: number; board: string }

const fixtureSlots = (() => {
  const buckets = new Map<string, ChampionshipFixture[]>()
  championshipFixtures.forEach((fixture) => {
    const key = fixture.id.startsWith('additional-') ? 'inter' : `g${fixture.group}`
    buckets.set(key, [...(buckets.get(key) ?? []), fixture])
  })
  const slots = new Map<string, FixtureSlot>()
  buckets.forEach((fixtures, key) => {
    const dates = [...new Set(fixtures.map(({ date }) => date))].sort()
    const boardsByDate = new Map<string, number>()
    fixtures.forEach((fixture) => {
      const boardIndex = boardsByDate.get(fixture.date) ?? 0
      boardsByDate.set(fixture.date, boardIndex + 1)
      slots.set(fixture.id, {
        stage: key === 'inter' ? 'Inter-group' : `Group ${fixture.group}`,
        matchday: dates.indexOf(fixture.date) + 1,
        board: String.fromCharCode(65 + boardIndex),
      })
    })
  })
  return slots
})()

export function fixtureSlotLabel(fixture: ChampionshipFixture) {
  const slot = fixtureSlots.get(fixture.id)
  return slot ? `${slot.stage} · MD${slot.matchday} // Board ${slot.board}` : `Group ${fixture.group}`
}

export function seedRanks(now: number) {
  return new Map(championshipStandings(now).map(({ country }, index) => [country, index + 1]))
}

export function shortHash(value: string, length = 7) {
  return (stableHash(value).toString(16).padStart(8, '0') + stableHash(`${value}:salt`).toString(16).padStart(8, '0'))
    .slice(0, length)
}

export function formatRelativeAge(milliseconds: number) {
  const minutes = Math.max(0, Math.floor(milliseconds / 60_000))
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 48) return `${hours}h ${minutes % 60}m ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function lastLedgerWriteAt(now: number) {
  return divisionMatches.reduce((latest, match) => (
    match.endsAt <= now && match.endsAt > latest ? match.endsAt : latest
  ), 0)
}

export type FormResult = 'W' | 'D' | 'L'

export function recentForms(now: number, divisionKey?: ChampionshipDivision['key'], limit = 5) {
  const forms = new Map<string, FormResult[]>()
  const push = (country: string, form: FormResult) => {
    forms.set(country, [...(forms.get(country) ?? []), form].slice(-limit))
  }
  divisionMatches
    .filter((match) => match.endsAt <= now && (!divisionKey || match.division.key === divisionKey))
    .sort((left, right) => left.endsAt - right.endsAt)
    .forEach((match) => {
      const { homeScore, awayScore } = resultForDivisionMatch(match)
      const homeForm: FormResult = homeScore > awayScore ? 'W' : homeScore < awayScore ? 'L' : 'D'
      push(match.fixture.home, homeForm)
      push(match.fixture.away, homeForm === 'W' ? 'L' : homeForm === 'L' ? 'W' : 'D')
    })
  return forms
}

export function inPlayByCountry(now: number, divisionKey?: ChampionshipDivision['key']) {
  const statuses = new Map<string, 'live' | 'delayed'>()
  divisionMatches
    .filter((match) => !divisionKey || match.division.key === divisionKey)
    .forEach((match) => {
      const status = matchStatus(match, now)
      if (status !== 'live' && status !== 'delayed') return
      ;[match.fixture.home, match.fixture.away].forEach((country) => {
        if (statuses.get(country) !== 'delayed') statuses.set(country, status)
      })
    })
  return statuses
}

export function matchClock(match: DivisionMatch, now: number) {
  const status = matchStatus(match, now)
  if (status === 'upcoming') return { main: `T-${countdownParts(match.startsAt - now)}`, sub: 'to tip-off' }
  if (status === 'complete') return { main: 'FT', sub: formatRelativeAge(now - match.endsAt) }
  const buildEnd = buildWindowEndsAt(match)
  if (now < buildEnd) {
    return {
      main: countdownParts(buildEnd - now),
      sub: status === 'delayed' ? `remaining · +${match.fixture.resultReleaseDelayMinutes}m hold` : 'remaining',
    }
  }
  return { main: countdownParts(match.endsAt - now), sub: 'result hold' }
}
