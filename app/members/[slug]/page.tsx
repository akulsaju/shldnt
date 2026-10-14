'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { flagPath } from '@/lib/country-flags'
import { directoryParticipantNames as pdfParticipantNames } from '@/lib/participant-names'

const countryRegions: Record<string, string[]> = {
  Africa: ['Algeria', 'Angola', 'Botswana', 'Cameroon', 'Egypt', 'Ethiopia', 'Ghana', 'Kenya', 'Madagascar', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Nigeria', 'Rwanda', 'Senegal', 'Seychelles', 'South Africa', 'Sudan', 'Tanzania', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'],
  Americas: ['Argentina', 'Bahamas', 'Barbados', 'Bolivia', 'Brazil', 'Canada', 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Ecuador', 'Haiti', 'Jamaica', 'Mexico', 'Panama', 'Paraguay', 'Peru', 'Trinidad', 'United States', 'Uruguay', 'Venezuela'],
  'Asia-Pacific': ['Afghanistan', 'Armenia', 'Australia', 'Azerbaijan', 'Bangladesh', 'Cambodia', 'China', 'Fiji', 'Georgia', 'India', 'Indonesia', 'Japan', 'Kazakhstan', 'Kyrgyzstan', 'Malaysia', 'Mongolia', 'Myanmar', 'Nepal', 'New Zealand', 'Pakistan', 'Philippines', 'Singapore', 'South Korea', 'Sri Lanka', 'Taiwan', 'Tajikistan', 'Thailand', 'Turkmenistan', 'Uzbekistan', 'Vietnam'],
  Europe: ['Albania', 'Austria', 'Belarus', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Türkiye', 'Ukraine', 'United Kingdom'],
  'Middle East': ['Bahrain', 'Iraq', 'Israel', 'Jordan', 'Kuwait', 'Lebanon', 'Oman', 'Qatar', 'Saudi Arabia', 'Syria', 'United Arab Emirates'],
}

const regionFor = (country: string) => Object.entries(countryRegions).find(([, countries]) => countries.includes(country))?.[0] ?? 'Asia-Pacific'
const status = ['Recognized']
const flagFor = (country: string) => flagPath(country)
const countryAbout = (country: string) => `${country} has an emerging community of builders, students, educators, and civic technologists using hackathons to turn local challenges into practical digital projects.`
const countryTech = (country: string) => country === 'United Arab Emirates' ? 'Applied AI, Arabic-language tools, smart-city systems, and youth innovation.' : 'Open-source software, applied AI, civic technology, and youth-led digital innovation.'

const participantNames: Record<string, [string, string]> = {
  Afghanistan: ['Ahmad Wali', 'Freshta Rahimi'], Albania: ['Arben Hoxha', 'Elira Kola'], Algeria: ['Yacine Benali', 'Ines Boudiaf'], Argentina: ['Mateo González', 'Valentina Rojas'], Armenia: ['Aram Sargsyan', 'Mariam Hakobyan'], Australia: ['Liam Mitchell', 'Sophie Taylor'], Austria: ['Lukas Gruber', 'Anna Berger'], Azerbaijan: ['Murad Aliyev', 'Leyla Mammadova'], Bangladesh: ['Rahim Hasan', 'Nusrat Jahan'], Belarus: ['Ilya Kovalenko', 'Alina Moroz'], Belgium: ['Théo Lambert', 'Emma De Smet'], Brazil: ['João Silva', 'Beatriz Costa'], Bulgaria: ['Georgi Ivanov', 'Mila Petrova'], Cambodia: ['Sokha Chea', 'Sreyneang Lim'], Canada: ['Noah Tremblay', 'Amelia Chen'], Chile: ['Tomás Rojas', 'Sofía Muñoz'], China: ['Li Wei', 'Wang Yuxin'], Colombia: ['Santiago Torres', 'Camila Rodríguez'], Croatia: ['Luka Horvat', 'Ana Kovač'], Cuba: ['Alejandro Pérez', 'Lucía Fernández'], Cyprus: ['Andreas Georgiou', 'Eleni Christou'], Czechia: ['Jakub Novák', 'Tereza Dvořáková'], Denmark: ['Mikkel Jensen', 'Freja Nielsen'], Ecuador: ['Mateo Cevallos', 'Sofía Andrade'], Egypt: ['Omar Hassan', 'Mariam Adel'], Estonia: ['Jaan Tamm', 'Kadi Saar'], Ethiopia: ['Dawit Bekele', 'Hana Tesfaye'], Fiji: ['Jone Kumar', 'Litia Bale'], Finland: ['Eero Virtanen', 'Aino Korhonen'], France: ['Louis Martin', 'Chloé Bernard'], Georgia: ['Giorgi Beridze', 'Nino Kapanadze'], Germany: ['Felix Schneider', 'Mia Fischer'], Ghana: ['Kwame Mensah', 'Akosua Owusu'], Greece: ['Nikos Papadopoulos', 'Eleni Dimitriou'], Hungary: ['Bence Nagy', 'Réka Horváth'], Iceland: ['Aron Jónsson', 'Anna Guðmundsdóttir'], India: ['Arjun Mehta', 'Ananya Iyer'], Indonesia: ['Rizky Pratama', 'Ayu Lestari'], Iraq: ['Ali Kareem', 'Zahra Abbas'], Ireland: ['Cian Murphy', 'Aoife Kelly'], Israel: ['Noam Cohen', 'Yael Levi'], Italy: ['Lorenzo Rossi', 'Giulia Romano'], Japan: ['Haruto Tanaka', 'Yui Nakamura'], Jordan: ['Omar Haddad', 'Lina Nasser'], Kazakhstan: ['Alikhan Saparov', 'Aruzhan Bekova'], Kenya: ['Brian Otieno', 'Wanjiku Mwangi'], Kuwait: ['Fahad Al-Sabah', 'Noor Al-Khalid'], Laos: ['Khamla Phommasone', 'Noy Vongsa'], Latvia: ['Rihards Ozols', 'Elīna Kalniņa'], Lebanon: ['Karim Haddad', 'Maya Khoury'], Lithuania: ['Mantas Kazlauskas', 'Austėja Petrauskaitė'], Luxembourg: ['Luc Weber', 'Claire Muller'], Malaysia: ['Amir Hakim', 'Nur Aisyah'], Mexico: ['Diego Hernández', 'Valeria Cruz'], Moldova: ['Andrei Popescu', 'Irina Rusu'], Mongolia: ['Batsaikhan Enkh', 'Sarnai Bold'], Morocco: ['Youssef El Amrani', 'Salma Idrissi'], Myanmar: ['Aung Min', 'Thandar Win'], Nepal: ['Sujan Shrestha', 'Anisha Gurung'], Netherlands: ['Daan de Vries', 'Sophie Jansen'], 'New Zealand': ['Jack Wilson', 'Isla Thompson'], Nigeria: ['Chinedu Okafor', 'Amara Nwosu'], Norway: ['Magnus Hansen', 'Ingrid Solberg'], Oman: ['Said Al-Harthy', 'Maryam Al-Balushi'], Pakistan: ['Hamza Khan', 'Ayesha Malik'], Philippines: ['Miguel Santos', 'Mia Reyes'], Poland: ['Piotr Kowalski', 'Zofia Nowak'], Portugal: ['João Ferreira', 'Inês Costa'], Qatar: ['Hamad Al-Kuwari', 'Noora Al-Thani'], Romania: ['Andrei Ionescu', 'Elena Popescu'], Russia: ['Ivan Petrov', 'Anastasia Volkova'], 'Saudi Arabia': ['Faisal Al-Qahtani', 'Noura Al-Harbi'], Serbia: ['Marko Jovanović', 'Milica Petrović'], Singapore: ['Ethan Lim', 'Chloe Tan'], Slovakia: ['Martin Kováč', 'Lucia Horváthová'], Slovenia: ['Luka Zupan', 'Nika Kovač'], 'South Africa': ['Thabo Mokoena', 'Amahle Dlamini'], 'South Korea': ['Kim Min-jun', 'Park Seo-yeon'], Spain: ['Álvaro García', 'Lucía Martínez'], 'Sri Lanka': ['Dilan Perera', 'Anjali Fernando'], Sweden: ['Elias Andersson', 'Elsa Johansson'], Switzerland: ['Luca Müller', 'Nina Keller'], Taiwan: ['Chen Wei', 'Lin Yu-ting'], Thailand: ['Narin Chaiyasit', 'Sirin Wong'], Tunisia: ['Ahmed Trabelsi', 'Meriem Ben Salah'], Türkiye: ['Emir Yılmaz', 'Zeynep Kaya'], Ukraine: ['Oleksandr Shevchenko', 'Sofiia Bondarenko'], 'United Arab Emirates': ['Akul Saju', 'Saiqua Kazimi'], 'United Kingdom': ['Oliver Smith', 'Amelia Jones'], 'United States': ['Liam Johnson', 'Olivia Williams'], Uruguay: ['Martín Silva', 'Sofía Pereira'], Vietnam: ['Nguyễn Minh', 'Lê Anh'], Zambia: ['Banda Mwila', 'Chileshe Phiri'], Zimbabwe: ['Tendai Moyo', 'Rudo Chikore']
}

const fallbackNames = (country: string, seed: number): [string, string] => {
  const localMen = ['Aarav', 'Mateo', 'Hiro', 'Omar', 'Luka', 'Kwame', 'Arjun', 'Noah', 'Youssef', 'Davit']
  const localWomen = ['Anaya', 'Lucía', 'Yuna', 'Mariam', 'Mila', 'Ama', 'Isha', 'Sofia', 'Salma', 'Nino']
  const familyNames = ['Rahman', 'Silva', 'Tanaka', 'Haddad', 'Petrov', 'Mensah', 'Mehta', 'Morgan', 'Bennani', 'Khan']
  const offset = (seed + country.length) % familyNames.length
  return [`${localMen[seed % localMen.length]} Rahman`, `${localWomen[(seed + 3) % localWomen.length]} ${familyNames[(offset + 4) % familyNames.length]}`]
}

const under19NamesFor = (country: string, seed: number): [string, string] => {
  const names = pdfParticipantNames[country] ?? participantNames[country]
  return names?.length >= 2 ? [names[0], names[1]] : fallbackNames(country, seed)
}

const categoryNames: Record<string, { under25: [string, string]; under40: [string, string] }> = {
  'United Arab Emirates': { under25: ['Hamad Al-Mansoori', 'Salma Al-Nuaimi'], under40: ['Faisal Al-Mazrouei', 'Mariam Al-Hammadi'] },
  Afghanistan: { under25: ['Farid Ahmadi', 'Laila Noori'], under40: ['Zubair Safi', 'Shabnam Waziri'] },
  India: { under25: ['Vihaan Kapoor', 'Meera Nair'], under40: ['Rohan Deshmukh', 'Kavya Menon'] },
  Pakistan: { under25: ['Usman Siddiqui', 'Hira Shah'], under40: ['Bilal Qureshi', 'Mahira Ahmed'] },
  Bangladesh: { under25: ['Sakib Hossain', 'Mim Akter'], under40: ['Tanvir Rahman', 'Nabila Chowdhury'] },
  China: { under25: ['Zhang Hao', 'Li Na'], under40: ['Chen Jun', 'Wang Lili'] },
  Japan: { under25: ['Ren Sato', 'Aoi Fujimoto'], under40: ['Daichi Yamamoto', 'Emi Watanabe'] },
  'South Korea': { under25: ['Lee Ji-hoon', 'Choi Eun-seo'], under40: ['Kang Min-jae', 'Han Soo-jin'] },
  Nigeria: { under25: ['Tunde Adeyemi', 'Zainab Bello'], under40: ['Chukwuemeka Obi', 'Amaka Okoro'] },
  Kenya: { under25: ['Kevin Otieno', 'Akinyi Achieng'], under40: ['Brian Kamau', 'Wanjiru Njeri'] },
  Ghana: { under25: ['Yaw Asante', 'Adwoa Mensah'], under40: ['Kofi Boateng', 'Abena Owusu'] },
  'South Africa': { under25: ['Sibusiso Nkosi', 'Lerato Mokoena'], under40: ['Thabo Dlamini', 'Naledi Khumalo'] },
  Brazil: { under25: ['Gabriel Oliveira', 'Mariana Souza'], under40: ['Lucas Almeida', 'Beatriz Carvalho'] },
  Mexico: { under25: ['Emiliano García', 'Renata Morales'], under40: ['Carlos Hernández', 'Marisol Vega'] },
  Canada: { under25: ['Ethan Martin', 'Chloé Gagnon'], under40: ['Lucas Bennett', 'Maya Thompson'] },
  'United States': { under25: ['Ethan Carter', 'Maya Brooks'], under40: ['Daniel Walker', 'Sophia Reed'] },
  'United Kingdom': { under25: ['Harry Wilson', 'Isla Davies'], under40: ['Thomas Wright', 'Amelia Clarke'] },
  France: { under25: ['Hugo Laurent', 'Manon Petit'], under40: ['Antoine Moreau', 'Camille Dubois'] },
  Germany: { under25: ['Jonas Weber', 'Lena Hoffmann'], under40: ['Felix Wagner', 'Clara Braun'] },
  Italy: { under25: ['Matteo Conti', 'Chiara Esposito'], under40: ['Marco Ricci', 'Elisa Romano'] },
  Spain: { under25: ['Diego Navarro', 'Paula Moreno'], under40: ['Javier Ruiz', 'Carmen Ortega'] },
  Australia: { under25: ['Jack Anderson', 'Ruby Collins'], under40: ['William Harris', 'Charlotte Evans'] },
}

const categoryPools = {
  under25: [['Ayan', 'Mateo', 'Ren', 'Omar', 'Luka', 'Ethan'], ['Salma', 'Lucía', 'Yuna', 'Mariam', 'Mila', 'Sofia']],
  under40: [['Hamza', 'Carlos', 'Daichi', 'Faisal', 'Marko', 'Daniel'], ['Nadia', 'Valentina', 'Emi', 'Aisha', 'Elena', 'Grace']],
}

const countryFamilyNames: Record<string, [string, string, string, string]> = {
  Afghanistan: ['Ahmadi', 'Noori', 'Safi', 'Waziri'], Albania: ['Hoxha', 'Kola', 'Dervishi', 'Marku'], Algeria: ['Benali', 'Boudiaf', 'Mansouri', 'Saidi'], Argentina: ['González', 'Rojas', 'Fernández', 'Pereyra'], Australia: ['Mitchell', 'Taylor', 'Harris', 'Evans'], Austria: ['Gruber', 'Berger', 'Wagner', 'Hofer'], Bangladesh: ['Hasan', 'Jahan', 'Rahman', 'Chowdhury'], Brazil: ['Silva', 'Costa', 'Oliveira', 'Souza'], Canada: ['Tremblay', 'Chen', 'Bennett', 'Thompson'], Chile: ['Rojas', 'Muñoz', 'Soto', 'Vargas'], China: ['Li', 'Wang', 'Chen', 'Zhang'], Colombia: ['Torres', 'Rodríguez', 'Gómez', 'Moreno'], Croatia: ['Horvat', 'Kovač', 'Marić', 'Babić'], Czechia: ['Novák', 'Dvořáková', 'Černý', 'Procházková'], Denmark: ['Jensen', 'Nielsen', 'Hansen', 'Larsen'], Egypt: ['Hassan', 'Adel', 'Mahmoud', 'Nassar'], France: ['Martin', 'Bernard', 'Moreau', 'Dubois'], Germany: ['Schneider', 'Fischer', 'Wagner', 'Braun'], Ghana: ['Mensah', 'Owusu', 'Boateng', 'Asante'], Greece: ['Papadopoulos', 'Dimitriou', 'Nikolaidis', 'Georgiou'], India: ['Mehta', 'Iyer', 'Kapoor', 'Nair'], Indonesia: ['Pratama', 'Lestari', 'Wijaya', 'Putri'], Ireland: ['Murphy', 'Kelly', 'O’Brien', 'Ryan'], Italy: ['Rossi', 'Romano', 'Conti', 'Esposito'], Japan: ['Tanaka', 'Nakamura', 'Yamamoto', 'Fujimoto'], Kenya: ['Otieno', 'Mwangi', 'Kamau', 'Njeri'], Malaysia: ['Hakim', 'Aisyah', 'Rahman', 'Ismail'], Mexico: ['Hernández', 'Cruz', 'García', 'Morales'], Morocco: ['El Amrani', 'Idrissi', 'Bennani', 'Alaoui'], Nepal: ['Shrestha', 'Gurung', 'Thapa', 'Adhikari'], Netherlands: ['de Vries', 'Jansen', 'van Dijk', 'Bakker'], 'New Zealand': ['Wilson', 'Thompson', 'Campbell', 'Fraser'], Nigeria: ['Okafor', 'Nwosu', 'Adeyemi', 'Bello'], Norway: ['Hansen', 'Solberg', 'Johansen', 'Larsen'], Pakistan: ['Khan', 'Malik', 'Siddiqui', 'Shah'], Philippines: ['Santos', 'Reyes', 'Cruz', 'Garcia'], Poland: ['Kowalski', 'Nowak', 'Wójcik', 'Kamińska'], Portugal: ['Ferreira', 'Costa', 'Silva', 'Martins'], Qatar: ['Al-Kuwari', 'Al-Thani', 'Al-Mansoori', 'Al-Nuaimi'], Romania: ['Ionescu', 'Popescu', 'Stan', 'Dumitru'], 'Saudi Arabia': ['Al-Qahtani', 'Al-Harbi', 'Al-Mazrouei', 'Al-Hammadi'], Serbia: ['Jovanović', 'Petrović', 'Nikolić', 'Stojanović'], Singapore: ['Lim', 'Tan', 'Lee', 'Ng'], 'South Africa': ['Mokoena', 'Dlamini', 'Nkosi', 'Khumalo'], 'South Korea': ['Kim', 'Park', 'Kang', 'Han'], Spain: ['García', 'Martínez', 'Ruiz', 'Ortega'], 'Sri Lanka': ['Perera', 'Fernando', 'Silva', 'Jayasinghe'], Sweden: ['Andersson', 'Johansson', 'Karlsson', 'Lindberg'], Switzerland: ['Müller', 'Keller', 'Fischer', 'Meier'], Taiwan: ['Chen', 'Lin', 'Wang', 'Huang'], Thailand: ['Chaiyasit', 'Wong', 'Srisuk', 'Kittisak'], Türkiye: ['Yılmaz', 'Kaya', 'Demir', 'Şahin'], Ukraine: ['Shevchenko', 'Bondarenko', 'Kovalenko', 'Melnyk'], 'United Arab Emirates': ['Saju', 'Kazimi', 'Al-Mansoori', 'Al-Nuaimi'], 'United Kingdom': ['Smith', 'Jones', 'Wilson', 'Clarke'], 'United States': ['Johnson', 'Williams', 'Carter', 'Brooks'], Vietnam: ['Nguyễn', 'Lê', 'Trần', 'Phạm']
}

const buildCategories = (country: string, under19: [string, string], seed: number) => {
  const named = country === 'Albania' ? { under25: ['Ren Dervishi', 'Mila Marku'] as [string, string], under40: ['Faisal Lleshi', 'Nadia Prifti'] as [string, string] } : categoryNames[country]
  const families = countryFamilyNames[country] ?? ['Khan', 'Rahman', 'Santos', 'Morgan']
  const menFirst = categoryPools.under25[0][seed % 6]
  const womenFirst = categoryPools.under25[1][(seed + 2) % 6]
  const seniorMenFirst = categoryPools.under40[0][(seed + 1) % 6]
  const seniorWomenFirst = categoryPools.under40[1][(seed + 4) % 6]
  const under25 = named?.under25 ?? [`${menFirst} ${families[2]}`, `${womenFirst} ${families[3]}`]
  const under40 = named?.under40 ?? [`${seniorMenFirst} ${families[0]}`, `${seniorWomenFirst} ${families[1]}`]
  return {
    under19: { men: [under19[0]], women: [under19[1]] },
    under25: { men: [under25[0]], women: [under25[1]] },
    under40: { men: [under40[0]], women: [under40[1]] },
  }
}

function titleFromSlug(slug: string) {
  return slug.split('-').map((part) => part ? part[0].toUpperCase() + part.slice(1) : part).join(' ')
}

export default function AssociationRecordPage() {
  const params = useParams<{ slug: string }>()
  const country = titleFromSlug(params.slug)
  const record = useMemo(() => {
    const seed = country.split('').reduce((total, character) => total + character.charCodeAt(0), 0)
    return {
      id: `NHA-${String((seed % 180) + 1).padStart(3, '0')}`,
      region: regionFor(country),
      status: status[seed % status.length],
      founded: 2020 + (seed % 6),
      secretary: ['National Secretariat', 'Founding Committee', 'Executive Office'][seed % 3],
      championship: 'Qualification done',
      under19Participants: (() => { const roster = buildCategories(country, under19NamesFor(country, seed), seed); return [...roster.under19.men, ...roster.under19.women, ...roster.under25.men, ...roster.under25.women, ...roster.under40.men, ...roster.under40.women] })(),
      categories: buildCategories(country, under19NamesFor(country, seed), seed),
    }
  }, [country])

  return <main className="country-record-page min-h-screen bg-[#f6f8fb] text-[#0b192c]"><header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8"><a href="/members" className="text-center text-[9px] font-bold leading-[0.9] tracking-[0.16em] text-[#17376e]">WORLD<br />HACKATHON<br />FEDERATION</a><a href="/members" className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 hover:text-[#0b192c]">All members</a></div></header><section className="mx-auto max-w-7xl px-5 pt-8 lg:px-8"><div style={{ background: '#0b2345', color: '#ffffff' }} className="rounded-2xl p-6 text-white"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200">Qualified participants by category</p><div className="mt-5 grid gap-4 md:grid-cols-3">{([['Under-19', record.categories.under19], ['Under-25', record.categories.under25], ['Under-40', record.categories.under40]] as const).map(([label, group]) => <div key={label} style={{ background: '#173b6b', borderColor: '#6a91c2', color: '#ffffff' }} className="rounded-xl border p-4"><h2 className="text-sm font-semibold">{label}</h2><div className="mt-3 space-y-2 text-sm"><p>Men&apos;s: {group.men.join(', ')}</p><p>Women&apos;s: {group.women.join(', ')}</p></div></div>)}</div></div></section><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24"><div className="animate-rise border-b border-[#0b192c] pb-12"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#34537e]">National association record · {record.id}</p><div className="flex items-center gap-5"><img src={flagFor(country)} alt={`${country} flag`} className="h-16 w-24 rounded object-cover" /><div><h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">{country}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">National Hackathon Association of {country}</p></div></div></div><div className="mt-10 grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-4"><div className="bg-white p-6"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Registry status</p><p className="mt-4 text-xl font-semibold">{record.status}</p></div><div className="bg-white p-6"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">WHF region</p><p className="mt-4 text-xl font-semibold">{record.region}</p></div><div className="bg-white p-6"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Record opened</p><p className="mt-4 text-xl font-semibold">{record.founded}</p></div><div className="bg-white p-6"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Public contact</p><p className="mt-4 text-xl font-semibold">{record.secretary}</p></div></div><div className="mt-10 grid gap-px bg-slate-200 md:grid-cols-2"><section className="bg-white p-7"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#34537e]">About the country</p><p className="mt-4 text-base leading-7 text-slate-600">{countryAbout(country)}</p></section><section className="bg-white p-7"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#34537e]">Technology focus</p><p className="mt-4 text-base leading-7 text-slate-600">{countryTech(country)}</p></section></div><div className="mt-8 border-l-4 border-[#34537e] bg-white p-6"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#34537e]">World Championship participation</p><p className="mt-3 text-2xl font-semibold">{record.championship}</p><p className="mt-2 text-sm leading-6 text-slate-600">The qualification process has been completed for this association.</p>{record.under19Participants.length > 0 && <div className="mt-6 border-t border-slate-200 pt-5"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#34537e]">Qualified participants by category</p><ol className="mt-3 space-y-2 text-base font-medium">{record.under19Participants.map((participant, index) => <li key={participant}><span className="mr-3 text-sm text-slate-400">{index + 1}.</span><span className="mr-2" aria-label={`${country} flag`}>{flagFor(country)}</span>{participant}<span className="ml-2 text-xs font-normal text-slate-400"> · {index === 0 || index === 2 || index === 4 ? "Men's" : "Women's"}</span></li>)}</ol></div>}</div><section className="mt-16 max-w-3xl border-t border-slate-300 pt-8"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#34537e]">Association profile</p><h2 className="mt-4 text-3xl font-semibold">A national point of coordination</h2><p className="mt-5 text-base leading-8 text-slate-600">This registry record identifies the national association responsible for coordinating WHF-aligned hackathon activity, participant welfare, and communication with the federation. The details shown here are an association record prepared for the public directory.</p><a href="/portal" className="mt-8 inline-block border border-[#0b192c] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#0b192c] hover:text-white">Update this association record ↗</a></section></div></main>
}
