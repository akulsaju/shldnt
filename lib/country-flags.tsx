export const countryCodes: Record<string, string> = {
  "Afghanistan": "AF", "Albania": "AL", "Algeria": "DZ", "Andorra": "AD", "Angola": "AO", "Argentina": "AR", "Armenia": "AM", "Australia": "AU", "Austria": "AT", "Azerbaijan": "AZ", "Bahamas": "BS", "Bahrain": "BH", "Bangladesh": "BD", "Barbados": "BB", "Belarus": "BY", "Belgium": "BE", "Belize": "BZ", "Benin": "BJ", "Bhutan": "BT", "Bolivia": "BO", "Bosnia and Herzegovina": "BA", "Botswana": "BW", "Brazil": "BR", "Brunei": "BN", "Bulgaria": "BG", "Burkina Faso": "BF", "Burundi": "BI", "Cambodia": "KH", "Cameroon": "CM", "Canada": "CA", "Cape Verde": "CV", "Central African Republic": "CF", "Chad": "TD", "Chile": "CL", "China": "CN", "Colombia": "CO", "Costa Rica": "CR", "Croatia": "HR", "Cuba": "CU", "Cyprus": "CY", "Czechia": "CZ", "Denmark": "DK", "Dominica": "DM", "Dominican Republic": "DO", "Ecuador": "EC", "Egypt": "EG", "El Salvador": "SV", "Equatorial Guinea": "GQ", "Estonia": "EE", "Ethiopia": "ET", "Fiji": "FJ", "Finland": "FI", "France": "FR", "Gabon": "GA", "Gambia": "GM", "Georgia": "GE", "Germany": "DE", "Ghana": "GH", "Greece": "GR", "Grenada": "GD", "Guatemala": "GT", "Guinea": "GN", "Guyana": "GY", "Haiti": "HT", "Honduras": "HN", "Hungary": "HU", "Iceland": "IS", "India": "IN", "Indonesia": "ID", "Iraq": "IQ", "Ireland": "IE", "Israel": "IL", "Italy": "IT", "Jamaica": "JM", "Japan": "JP", "Jordan": "JO", "Kazakhstan": "KZ", "Kenya": "KE", "Kiribati": "KI", "Kosovo": "XK", "Kuwait": "KW", "Kyrgyzstan": "KG", "Laos": "LA", "Latvia": "LV", "Lebanon": "LB", "Lesotho": "LS", "Liberia": "LR", "Libya": "LY", "Liechtenstein": "LI", "Lithuania": "LT", "Luxembourg": "LU", "Madagascar": "MG", "Malawi": "MW", "Malaysia": "MY", "Maldives": "MV", "Mali": "ML", "Malta": "MT", "Mauritania": "MR", "Mauritius": "MU", "Mexico": "MX", "Micronesia": "FM", "Moldova": "MD", "Monaco": "MC", "Mongolia": "MN", "Montenegro": "ME", "Morocco": "MA", "Mozambique": "MZ", "Myanmar": "MM", "Namibia": "NA", "Nauru": "NR", "Nepal": "NP", "Netherlands": "NL", "New Zealand": "NZ", "Nicaragua": "NI", "Niger": "NE", "Nigeria": "NG", "North Macedonia": "MK", "Norway": "NO", "Oman": "OM", "Pakistan": "PK", "Palau": "PW", "Palestine": "PS", "Panama": "PA", "Papua New Guinea": "PG", "Paraguay": "PY", "Peru": "PE", "Philippines": "PH", "Poland": "PL", "Portugal": "PT", "Puerto Rico": "PR", "Qatar": "QA", "Romania": "RO", "Russia": "RU", "Rwanda": "RW", "Saint Lucia": "LC", "Samoa": "WS", "San Marino": "SM", "Saudi Arabia": "SA", "Senegal": "SN", "Serbia": "RS", "Seychelles": "SC", "Sierra Leone": "SL", "Singapore": "SG", "Slovakia": "SK", "Slovenia": "SI", "Solomon Islands": "SB", "Somalia": "SO", "South Africa": "ZA", "South Korea": "KR", "Spain": "ES", "Sri Lanka": "LK", "South Sudan": "SS", "Sudan": "SD", "Suriname": "SR", "Sweden": "SE", "Switzerland": "CH", "Taiwan": "TW", "Tajikistan": "TJ", "Tanzania": "TZ", "Thailand": "TH", "Timor-Leste": "TL", "Togo": "TG", "Tonga": "TO", "Trinidad and Tobago": "TT", "Tunisia": "TN", "Türkiye": "TR", "Turkmenistan": "TM", "Tuvalu": "TV", "Uganda": "UG", "Ukraine": "UA", "United Arab Emirates": "AE", "United Kingdom": "GB", "United States": "US", "Uruguay": "UY", "Uzbekistan": "UZ", "Vanuatu": "VU", "Venezuela": "VE", "Vietnam": "VN", "Yemen": "YE", "Zambia": "ZM", "Zimbabwe": "ZW"
}

const countryAliases: Record<string, string> = {
  'Türkiye': 'TR',
  'South Korea': 'KR',
  'North Macedonia': 'MK',
  'Macedonia': 'MK',
  'Vatican City': 'VA',
  'Cabo Verde': 'CV',
  'Czech Republic': 'CZ',
  'United States of America': 'US',
  'Micronesia': 'FM',
  'Moldova': 'MD',
  'Laos': 'LA',
  'Bolivia': 'BO',
  'Tanzania': 'TZ',
  'Venezuela': 'VE',
  'Vietnam': 'VN',
  'Brunei': 'BN',
  'South Sudan': 'SS',
  'Antigua and Barbuda': 'AG',
  'Saint Kitts and Nevis': 'KN',
  'Saint Vincent and the Grenadines': 'VC',
  'Comoros': 'KM',
  'Djibouti': 'DJ',
  'Eritrea': 'ER',
  'Eswatini': 'SZ',
  'Lesotho': 'LS',
  'Malawi': 'MW',
  'Sao Tome and Principe': 'ST',
  'São Tomé and Príncipe': 'ST',
  'Western Sahara': 'EH',
  'Congo': 'CG',
  'Democratic Republic of the Congo': 'CD',
  'Kosovo': 'XK',
}

function resolveCountryCode(country: string) {
  const canonical = countryAliases[country] ?? country
  return countryCodes[country] ?? countryCodes[canonical] ?? (canonical.length === 2 ? canonical : undefined)
}

export function flagPath(country: string) {
  const code = resolveCountryCode(country)
  return code ? `/country-flags-main/svg/${code.toLowerCase()}.svg` : '/country-flags-main/svg/un.svg'
}

export function Flag({ country, className = '' }: { country: string; className?: string }) {
  return <img src={flagPath(country)} alt={`${country} flag`} className={className} />
}

export function flagCode(country: string) {
  return countryCodes[country]
}

export function flagFor(country: string) {
  return countryCodes[country] ? `/country-flags-main/svg/${countryCodes[country].toLowerCase()}.svg` : undefined
}
