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

export const divisionMatches: DivisionMatch[] = championshipFixtures.flatMap((fixture) => {
  const fixtureStart = localStartTime(fixture).getTime()
  return championshipDivisions.map((division) => {
    const startsAt = fixtureStart + division.startOffsetHours * 60 * 60 * 1000
    return {
      id: `${fixture.id}-${division.key}`,
      fixture,
      division,
      startsAt,
      endsAt: startsAt + MATCH_DURATION_MS,
    }
  })
})

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
  const homeWins = match.division.key === 'under19' && (uaeIsHome || uaeIsAway)
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
