import { directoryParticipantNames } from '@/lib/participant-names'

export const championshipDivisions = [
  { key: 'under19', label: 'Under-19', startOffsetHours: 0 },
  { key: 'under25', label: 'Under-25', startOffsetHours: 8 },
  { key: 'under40', label: 'Under-40', startOffsetHours: 16 },
] as const

export type ChampionshipDivision = (typeof championshipDivisions)[number]

const countryAliases: Record<string, string> = {
  'Cape Verde': 'Cabo Verde',
  Czechia: 'Czech Republic',
  Macedonia: 'North Macedonia',
  'Sao Tome and Principe': 'São Tomé and Príncipe',
}

const fallbackFirstNames: Record<ChampionshipDivision['key'], [string[], string[]]> = {
  under19: [
    ['Aarav', 'Mateo', 'Hiro', 'Omar', 'Luka', 'Kwame', 'Arjun', 'Noah', 'Youssef', 'Davit'],
    ['Anaya', 'Lucía', 'Yuna', 'Mariam', 'Mila', 'Ama', 'Isha', 'Sofia', 'Salma', 'Nino'],
  ],
  under25: [
    ['Ayan', 'Carlos', 'Ren', 'Hamza', 'Mateo', 'Ethan', 'Ravi', 'Luis', 'Min', 'Daniel'],
    ['Maya', 'Ines', 'Aiko', 'Nadia', 'Valentina', 'Grace', 'Sana', 'Elena', 'Yara', 'Chloe'],
  ],
  under40: [
    ['Faisal', 'Marco', 'Daichi', 'Andre', 'Samuel', 'Kofi', 'Rohan', 'Ivan', 'Tariq', 'Adam'],
    ['Mariam', 'Camila', 'Emi', 'Aisha', 'Nina', 'Amahle', 'Kavya', 'Sofia', 'Layla', 'Hana'],
  ],
}

const familyNames = ['Rahman', 'Silva', 'Tanaka', 'Haddad', 'Petrov', 'Mensah', 'Mehta', 'Morgan', 'Bennani', 'Khan']

function fallbackPlayers(country: string, division: ChampionshipDivision['key']): [string, string] {
  const seed = country.split('').reduce((total, character) => total + character.charCodeAt(0), 0)
  if (division === 'under19') {
    const men = ['Aarav', 'Mateo', 'Hiro', 'Omar', 'Luka', 'Kwame', 'Arjun', 'Noah', 'Youssef', 'Davit']
    const women = ['Anaya', 'Lucía', 'Yuna', 'Mariam', 'Mila', 'Ama', 'Isha', 'Sofia', 'Salma', 'Nino']
    const familyNameOffset = (seed + country.length) % familyNames.length
    return [
      `${men[seed % men.length]} Rahman`,
      `${women[(seed + 3) % women.length]} ${familyNames[(familyNameOffset + 4) % familyNames.length]}`,
    ]
  }

  const divisionIndex = championshipDivisions.findIndex(({ key }) => key === division)
  const [men, women] = fallbackFirstNames[division]
  return [
    `${men[seed % men.length]} ${familyNames[(seed + divisionIndex) % familyNames.length]}`,
    `${women[(seed + 3) % women.length]} ${familyNames[(seed + divisionIndex + 4) % familyNames.length]}`,
  ]
}

export function playersForCountryAndDivision(country: string, division: ChampionshipDivision['key']) {
  const names = directoryParticipantNames[country] ?? directoryParticipantNames[countryAliases[country]]
  const divisionIndex = championshipDivisions.findIndex(({ key }) => key === division)
  const roster = names?.slice(divisionIndex * 2, divisionIndex * 2 + 2)
  return roster?.length === 2 ? roster : fallbackPlayers(country, division)
}
