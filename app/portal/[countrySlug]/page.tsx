import PortalPage from '@/app/portal/page'

export default async function CountryPortalPage({ params }: { params: Promise<{ countrySlug: string }> }) {
  const { countrySlug } = await params
  return <PortalPage countrySlug={countrySlug} />
}
