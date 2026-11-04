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
