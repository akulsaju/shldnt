import { directoryParticipantNames } from '@/lib/participant-names'

const countryAliases: Record<string, string> = {
  'Cape Verde': 'Cabo Verde',
  Czechia: 'Czech Republic',
  Macedonia: 'North Macedonia',
  'Sao Tome and Principe': 'São Tomé and Príncipe',
}

export function under19PlayersForCountry(country: string) {
  const names = directoryParticipantNames[country] ?? directoryParticipantNames[countryAliases[country]]
  if (names?.length >= 2) return names.slice(0, 2)

  const localMen = ['Aarav', 'Mateo', 'Hiro', 'Omar', 'Luka', 'Kwame', 'Arjun', 'Noah', 'Youssef', 'Davit']
  const localWomen = ['Anaya', 'Lucía', 'Yuna', 'Mariam', 'Mila', 'Ama', 'Isha', 'Sofia', 'Salma', 'Nino']
  const familyNames = ['Rahman', 'Silva', 'Tanaka', 'Haddad', 'Petrov', 'Mensah', 'Mehta', 'Morgan', 'Bennani', 'Khan']
  const seed = country.split('').reduce((total, character) => total + character.charCodeAt(0), 0)
  const offset = (seed + country.length) % familyNames.length
  return [
    `${localMen[seed % localMen.length]} Rahman`,
    `${localWomen[(seed + 3) % localWomen.length]} ${familyNames[(offset + 4) % familyNames.length]}`,
  ]
}
