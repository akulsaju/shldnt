import { memberCountries } from '@/lib/member-countries'

export type ChampionshipFixture = {
  id: string
  group: number
  home: string
  away: string
  date: string
  timeZone: string
  startHour: number
  startMinute: number
  result?: string
  division?: 'under19' | 'under25' | 'under40'
  resultReleaseDelayMinutes?: number
}

const countryTimeZones: Record<string, string> = {
  'United Arab Emirates': 'Asia/Dubai',
  'Saudi Arabia': 'Asia/Riyadh',
  France: 'Europe/Paris',
  Germany: 'Europe/Berlin',
  India: 'Asia/Kolkata',
  Japan: 'Asia/Tokyo',
  China: 'Asia/Shanghai',
  Singapore: 'Asia/Singapore',
  'South Korea': 'Asia/Seoul',
  Türkiye: 'Europe/Istanbul',
  Australia: 'Australia/Sydney',
  'New Zealand': 'Pacific/Auckland',
  'United States': 'America/New_York',
  Canada: 'America/Toronto',
  Brazil: 'America/Sao_Paulo',
  Argentina: 'America/Argentina/Buenos_Aires',
  Mexico: 'America/Mexico_City',
  Egypt: 'Africa/Cairo',
  'South Africa': 'Africa/Johannesburg',
  Nigeria: 'Africa/Lagos',
  Kenya: 'Africa/Nairobi',
  Ghana: 'Africa/Accra',
  Morocco: 'Africa/Casablanca',
  'United Kingdom': 'Europe/London',
  Portugal: 'Europe/Lisbon',
  Iceland: 'Atlantic/Reykjavik',
  Russia: 'Europe/Moscow',
  Pakistan: 'Asia/Karachi',
  Bangladesh: 'Asia/Dhaka',
  Nepal: 'Asia/Kathmandu',
  Thailand: 'Asia/Bangkok',
  Indonesia: 'Asia/Jakarta',
  Philippines: 'Asia/Manila',
  Vietnam: 'Asia/Ho_Chi_Minh',
  Taiwan: 'Asia/Taipei',
  Fiji: 'Pacific/Fiji',
  Samoa: 'Pacific/Apia',
}

const europe = new Set([
  'Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria',
  'Croatia', 'Cyprus', 'Czechia', 'Denmark', 'Estonia', 'Finland', 'Greece', 'Hungary',
  'Ireland', 'Italy', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg',
  'Macedonia', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia',
  'Norway', 'Poland', 'Romania', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain',
  'Sweden', 'Switzerland', 'Ukraine', 'Vatican City',
])
const africa = new Set([
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Cabo Verde', 'Cameroon',
  'Cape Verde', 'Central African Republic', 'Chad', 'Comoros', 'Congo', 'Djibouti',
  'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Guinea', 'Liberia',
  'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco',
  'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'Sao Tome and Principe', 'Senegal',
  'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Tanzania',
  'Togo', 'Tunisia', 'Uganda', 'Western Sahara', 'Zambia', 'Zimbabwe',
])
const americas = new Set([
  'Antigua and Barbuda', 'Argentina', 'Bahamas', 'Barbados', 'Belize', 'Bolivia', 'Brazil',
  'Canada', 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Dominica', 'Dominican Republic',
  'Ecuador', 'El Salvador', 'Grenada', 'Guatemala', 'Guyana', 'Haiti', 'Honduras', 'Jamaica',
  'Mexico', 'Nicaragua', 'Panama', 'Paraguay', 'Peru', 'Puerto Rico', 'Saint Kitts and Nevis',
  'Saint Lucia', 'Saint Vincent and the Grenadines', 'Suriname', 'Trinidad and Tobago',
  'United States', 'Uruguay', 'Venezuela',
])
const oceania = new Set([
  'Australia', 'Fiji', 'Kiribati', 'Marshall Islands', 'Micronesia', 'Nauru', 'New Zealand',
  'Palau', 'Papua New Guinea', 'Samoa', 'Solomon Islands', 'Tonga', 'Tuvalu', 'Vanuatu',
])

export function regionTimeZone(country: string) {
  if (countryTimeZones[country]) return countryTimeZones[country]
  if (europe.has(country)) return 'Europe/Paris'
  if (africa.has(country)) return 'Africa/Johannesburg'
  if (americas.has(country)) return 'America/New_York'
  if (oceania.has(country)) return 'Pacific/Auckland'
  if (['Afghanistan', 'Bangladesh', 'Bhutan', 'India', 'Maldives', 'Nepal', 'Pakistan', 'Sri Lanka'].includes(country)) return 'Asia/Kolkata'
  if (['Brunei', 'Cambodia', 'Laos', 'Malaysia', 'Myanmar', 'Thailand'].includes(country)) return 'Asia/Bangkok'
  if (['Japan', 'North Korea', 'South Korea'].includes(country)) return 'Asia/Tokyo'
  if (['Kazakhstan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan', 'Uzbekistan'].includes(country)) return 'Asia/Tashkent'
  return 'Asia/Dubai'
}

function shuffled<T>(items: T[]) {
  const result = [...items]
  let seed = 20261018
  for (let index = result.length - 1; index > 0; index--) {
    seed = (seed * 48271) % 2147483647
    const swapIndex = seed % (index + 1)
    ;[result[index], result[swapIndex]] = [result[swapIndex], result[index]]
  }
  return result
}

function dateAtOffset(month: number, day: number, offset: number) {
  const date = new Date(Date.UTC(2026, month - 1, day + offset))
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`
}

function fixtureDate(group: number, round: number) {
  if (round === 0) return dateAtOffset(10, 18, Math.floor((group - 2) / 4))
  if (round === 1) return dateAtOffset(10, 30, Math.floor(((group - 2) * 10) / 46))
  return dateAtOffset(11, 10, Math.floor(((group - 2) * 9) / 46))
}

function createFixture(
  group: number,
  home: string,
  away: string,
  date: string,
  round: number,
  game: number,
  overrides: Partial<ChampionshipFixture> = {},
): ChampionshipFixture {
  const windows = [[7, 30], [8, 30], [9, 30]]
  const [startHour, startMinute] = windows[(group + round + game) % windows.length]
  return {
    id: `g${group}-${round}-${game}`,
    group,
    home,
    away,
    date,
    timeZone: regionTimeZone(home),
    startHour,
    startMinute,
    ...overrides,
  }
}

function createFixtures() {
  const fixedTeams = ['United Arab Emirates', 'Saudi Arabia', 'France', 'Germany']
  const otherCountries = shuffled(memberCountries.filter((country) => !fixedTeams.includes(country)))
  const groups = [fixedTeams, ...Array.from({ length: 46 }, (_, index) => otherCountries.slice(index * 4, index * 4 + 4)), otherCountries.slice(184)]
  const groupForCountry = new Map(groups.flatMap((teams, index) => teams.map((country) => [country, index + 1] as const)))
  const fixtures: ChampionshipFixture[] = []

  const uaeGames = [
    ['United Arab Emirates', 'Saudi Arabia', '2026-10-16', 8, 30, 'UAE won'],
    ['France', 'Germany', '2026-10-16', 8, 30, undefined],
    ['United Arab Emirates', 'France', '2026-10-21', 8, 30, undefined],
    ['Saudi Arabia', 'Germany', '2026-10-21', 8, 30, undefined],
    ['United Arab Emirates', 'Germany', '2026-10-23', 7, 30, undefined],
    ['France', 'Saudi Arabia', '2026-10-23', 8, 30, undefined],
  ] as const
  uaeGames.forEach(([home, away, date, startHour, startMinute, result], game) => {
    fixtures.push(createFixture(1, home, away, date, 0, game, {
      timeZone: home === 'United Arab Emirates' ? 'Asia/Dubai' : regionTimeZone(home),
      startHour,
      startMinute,
      ...(home === 'United Arab Emirates' && away === 'France' && date === '2026-10-21'
        ? { resultReleaseDelayMinutes: 8 }
        : {}),
      ...(result ? { result } : {}),
    }))
  })
  fixtures.push(createFixture(1, 'United Arab Emirates', 'France', '2026-10-22', 0, uaeGames.length, {
    timeZone: 'Asia/Dubai',
    startHour: 8,
    startMinute: 30,
    division: 'under19',
  }))

  groups.slice(1).forEach((teams, groupIndex) => {
    const group = groupIndex + 2
    const [a, b, c, d] = teams
    const rounds: Array<Array<[string, string]>> = teams.length === 3
      ? [[[a, b]], [[a, c]], [[b, c]]]
      : [[[a, b], [c, d]], [[a, c], [b, d]], [[a, d], [b, c]]]
    rounds.forEach((games, round) => {
      games.forEach(([home, away], game) => {
        fixtures.push(createFixture(group, home, away, fixtureDate(group, round), round, game))
      })
    })
  })

  const additionalFixtures = [
    { home: 'United States', away: 'United Arab Emirates', date: '2026-11-03' },
    { home: 'United Arab Emirates', away: 'China', date: '2026-11-04' },
    { home: 'United States', away: 'Germany', date: '2026-11-06' },
    { home: 'United States', away: 'China', date: '2026-11-07' },
    { home: 'Germany', away: 'China', date: '2026-11-08' },
  ]
  additionalFixtures.forEach(({ home, away, date }, game) => {
    const group = groupForCountry.get(home)
    if (group === undefined) throw new Error(`Missing championship group for ${home}`)
    fixtures.push(createFixture(group, home, away, date, 3, game, {
      id: `additional-${date}-${game}`,
      timeZone: 'Asia/Dubai',
      startHour: 8,
      startMinute: 30,
    }))
  })

  return fixtures
}

export const championshipFixtures = createFixtures()

export function localStartTime(fixture: ChampionshipFixture) {
  const [year, month, day] = fixture.date.split('-').map(Number)
  const targetWallClock = Date.UTC(year, month - 1, day, fixture.startHour, fixture.startMinute)
  let timestamp = targetWallClock

  for (let attempt = 0; attempt < 3; attempt++) {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: fixture.timeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(new Date(timestamp))
    const values = Object.fromEntries(parts.filter((part) => part.type !== 'literal').map(({ type, value }) => [type, Number(value)]))
    const observedWallClock = Date.UTC(values.year, values.month - 1, values.day, values.hour, values.minute)
    timestamp += targetWallClock - observedWallClock
  }

  return new Date(timestamp)
}

export function formatLocalTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('en', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hourCycle: 'h12',
    timeZoneName: 'short',
  }).format(date)
}

export function formatLocalDate(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('en', {
    timeZone,
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function localEndTime(fixture: ChampionshipFixture) {
  return new Date(localStartTime(fixture).getTime() + 6 * 60 * 60 * 1000)
}

export function formatMatchDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    timeZone: 'UTC',
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00Z`))
}
