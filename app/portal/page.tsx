'use client'

import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ExternalLink, Mail, MailOpen, PenLine, Search, Send } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { createClient } from '@/lib/supabase/browser'

type Organization = {
  id: string
  name: string
  country: string
  slug: string
  status: string
  admin_email: string
  workspace_label: string | null
}
type Participant = { id: string; name: string; category: string; status: string; email: string | null; nationality: string | null; consent_status: string }
type Invitation = { id: string; email: string; contact_name: string | null; role: string; status: string; created_at: string }
type Team = { id: string; name: string; category: string; status: string; coach_name: string | null; captain_id: string | null }
type Request = { id: string; subject: string; description: string; status: string; created_at: string }
type Notification = { id: string; title: string; body: string; read_at: string | null }
type DocumentRequirement = { id: string; name: string; description: string | null; required_for: string }
type Document = { id: string; name: string; storage_path: string; status: string; mime_type: string | null; size_bytes: number | null; participant_id: string | null; team_id: string | null; requirement_id: string | null; rejection_reason: string | null; created_at: string }
type Submission = { id: string; title: string; description: string | null; status: string; deadline_at: string | null; team_id: string | null; created_at: string }
type Consent = { id: string; participant_id: string; consent_type: string; status: string; expires_at: string | null; notes: string | null }
type Travel = { id: string; participant_id: string | null; team_id: string | null; status: string; visa_required: boolean; visa_support_requested: boolean; arrival_at: string | null; departure_at: string | null; notes: string | null }
type Settings = { profile: Record<string, unknown>; contacts: unknown[]; safeguarding: Record<string, unknown>; accessibility: Record<string, unknown>; dietary: Record<string, unknown> }

const sections = ['Overview', 'Participants', 'Teams', 'Country teams', 'Documents', 'Requests', 'Submissions', 'Compliance', 'Travel', 'Notifications', 'Reports', 'Settings']
const buttonClass = 'rounded-xl bg-[#0b192c] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white disabled:opacity-50'
const inputClass = 'rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm'

export default function PortalPage({ countrySlug }: { countrySlug?: string }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [workspaceLoading, setWorkspaceLoading] = useState(false)
  const [loginId, setLoginId] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [active, setActive] = useState('Overview')
  const [userId, setUserId] = useState('')
  const [userRole, setUserRole] = useState('')
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [organizationId, setOrganizationId] = useState('')
  const [participants, setParticipants] = useState<Participant[]>([])
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [requests, setRequests] = useState<Request[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [notificationFilter, setNotificationFilter] = useState<'all' | 'unread'>('all')
  const [mailSearch, setMailSearch] = useState('')
  const [selectedMailId, setSelectedMailId] = useState<string | null>(null)
  const [composeOpen, setComposeOpen] = useState(false)
  const [composeRecipient, setComposeRecipient] = useState('')
  const [composeSubject, setComposeSubject] = useState('')
  const [composeBody, setComposeBody] = useState('')
  const [requirements, setRequirements] = useState<DocumentRequirement[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [consents, setConsents] = useState<Consent[]>([])
  const [travel, setTravel] = useState<Travel[]>([])
  const [settings, setSettings] = useState<Settings>({ profile: {}, contacts: [], safeguarding: {}, accessibility: {}, dietary: {} })
  const [participantName, setParticipantName] = useState('')
  const [participantCategory, setParticipantCategory] = useState('Under-19')
  const [participantEmail, setParticipantEmail] = useState('')
  const [participantNationality, setParticipantNationality] = useState('')
  const [editingParticipantId, setEditingParticipantId] = useState('')
  const [teamName, setTeamName] = useState('')
  const [teamCategory, setTeamCategory] = useState('Open')
  const [teamParticipantId, setTeamParticipantId] = useState('')
  const [requestSubject, setRequestSubject] = useState('')
  const [requestDescription, setRequestDescription] = useState('')
  const [accountEmail, setAccountEmail] = useState('')
  const [accountContact, setAccountContact] = useState('')
  const [documentName, setDocumentName] = useState('')
  const [documentRequirementId, setDocumentRequirementId] = useState('')
  const [documentParticipantId, setDocumentParticipantId] = useState('')
  const [documentFile, setDocumentFile] = useState<File | null>(null)
  const [submissionTitle, setSubmissionTitle] = useState('')
  const [submissionDescription, setSubmissionDescription] = useState('')
  const [submissionTeamId, setSubmissionTeamId] = useState('')
  const [consentParticipantId, setConsentParticipantId] = useState('')
  const [consentType, setConsentType] = useState('guardian')
  const [consentStatus, setConsentStatus] = useState('pending')
  const [travelParticipantId, setTravelParticipantId] = useState('')
  const [editingTravelId, setEditingTravelId] = useState('')
  const [travelStatus, setTravelStatus] = useState('not_started')
  const [travelVisaRequired, setTravelVisaRequired] = useState(false)
  const [travelVisaSupport, setTravelVisaSupport] = useState(false)
  const [travelNotes, setTravelNotes] = useState('')
  const [settingsText, setSettingsText] = useState('{"profile":{},"contacts":[],"safeguarding":{},"accessibility":{},"dietary":{}}')
  const [saved, setSaved] = useState('')
  const [feedbackIsError, setFeedbackIsError] = useState(false)

  const selectedOrganization = useMemo(() => organizations.find((organization) => organization.id === organizationId), [organizations, organizationId])
  const isOrganizationAdmin = userRole === 'nha_admin' || userRole === 'super_admin'
  const supabase = useMemo(() => createClient(), [])

  async function loadWorkspace(nextUserId: string, preferredOrganizationId?: string) {
    setWorkspaceLoading(true)
    const [{ data: memberships, error: membershipError }, { data: organizationRows, error: organizationError }] = await Promise.all([
      supabase.from('organization_members').select('organization_id, role').eq('user_id', nextUserId),
      supabase.from('organizations').select('id, name, country, slug, status, admin_email, workspace_label').order('country'),
    ])
    if (membershipError || organizationError) {
      setLoginError(membershipError?.message ?? organizationError?.message ?? 'Unable to load the portal workspace.')
      setWorkspaceLoading(false)
      return
    }
    const nextOrganizations = (organizationRows ?? []) as Organization[]
    const hostOrganization = countrySlug
      ? nextOrganizations.find((organization) => organization.slug === countrySlug)
      : undefined
    const nextOrganizationId = countrySlug
      ? hostOrganization?.id ?? ''
      : preferredOrganizationId ?? organizationId ?? memberships?.[0]?.organization_id ?? nextOrganizations[0]?.id ?? ''
    const membership = memberships?.find((item) => item.organization_id === nextOrganizationId)
    setUserRole(membership?.role ?? '')
    setOrganizations(nextOrganizations)
    setOrganizationId(nextOrganizationId)
    if (!nextOrganizationId) {
      setLoginError(countrySlug
        ? `No accessible portal is configured for the country subdomain "${countrySlug}".`
        : 'This account is not assigned to an association workspace.')
      setWorkspaceLoading(false)
      return
    }
    const results = await Promise.all([
      supabase.from('participants').select('id, name, category, status, email, nationality, consent_status').eq('organization_id', nextOrganizationId).order('created_at'),
      supabase.from('invitations').select('id, email, contact_name, role, status, created_at').eq('organization_id', nextOrganizationId).order('created_at', { ascending: false }),
      supabase.from('teams').select('id, name, category, status, coach_name, captain_id').eq('organization_id', nextOrganizationId).order('created_at'),
      supabase.from('requests').select('id, subject, description, status, created_at').eq('organization_id', nextOrganizationId).order('created_at', { ascending: false }),
      supabase.from('notifications').select('id, title, body, read_at').eq('user_id', nextUserId).order('created_at', { ascending: false }).limit(30),
      supabase.from('document_requirements').select('id, name, description, required_for').or(`organization_id.is.null,organization_id.eq.${nextOrganizationId}`).order('name'),
      supabase.from('documents').select('id, name, storage_path, status, mime_type, size_bytes, participant_id, team_id, requirement_id, rejection_reason, created_at').eq('organization_id', nextOrganizationId).order('created_at', { ascending: false }),
      supabase.from('submissions').select('id, title, description, status, deadline_at, team_id, created_at').eq('organization_id', nextOrganizationId).order('created_at', { ascending: false }),
      supabase.from('consent_records').select('id, participant_id, consent_type, status, expires_at, notes').eq('organization_id', nextOrganizationId).order('created_at', { ascending: false }),
      supabase.from('travel_records').select('id, participant_id, team_id, status, visa_required, visa_support_requested, arrival_at, departure_at, notes').eq('organization_id', nextOrganizationId).order('created_at', { ascending: false }),
      supabase.from('organization_settings').select('profile, contacts, safeguarding, accessibility, dietary').eq('organization_id', nextOrganizationId).maybeSingle(),
    ])
    const errors = results.map((result) => result.error).find(Boolean)
    if (errors) setLoginError(errors.message)
    setParticipants((results[0].data ?? []) as Participant[])
    setInvitations((results[1].data ?? []) as Invitation[])
    setTeams((results[2].data ?? []) as Team[])
    setRequests((results[3].data ?? []) as Request[])
    setNotifications((results[4].data ?? []) as Notification[])
    setRequirements((results[5].data ?? []) as DocumentRequirement[])
    setDocuments((results[6].data ?? []) as Document[])
    setSubmissions((results[7].data ?? []) as Submission[])
    setConsents((results[8].data ?? []) as Consent[])
    const nextTravel = (results[9].data ?? []) as Travel[]
    setTravel(nextTravel)
    const nextSettings = (results[10].data as Settings | null) ?? { profile: {}, contacts: [], safeguarding: {}, accessibility: {}, dietary: {} }
    setSettings(nextSettings)
    setSettingsText(JSON.stringify(nextSettings, null, 2))
    setWorkspaceLoading(false)
  }

  useEffect(() => {
    let mounted = true
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (mounted && user) {
        setLoggedIn(true)
        setUserId(user.id)
        void loadWorkspace(user.id)
      }
      if (mounted) setAuthLoading(false)
    }).catch(() => mounted && setAuthLoading(false))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      setLoggedIn(Boolean(session?.user))
      if (session?.user) {
        setUserId(session.user.id)
        void loadWorkspace(session.user.id)
      }
      setAuthLoading(false)
    })
    return () => { mounted = false; subscription.unsubscribe() }
  }, [supabase])

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoginError('')
    const { error } = await supabase.auth.signInWithPassword({ email: loginId.trim(), password: loginPassword })
    if (error) setLoginError(error.message)
  }
  async function handleLogout() {
    await supabase.auth.signOut()
    setLoggedIn(false)
    setUserId('')
    setOrganizations([])
    setOrganizationId('')
  }
  async function changeOrganization(nextId: string) {
    if (countrySlug) return
    setOrganizationId(nextId)
    if (userId) await loadWorkspace(userId, nextId)
  }
  async function refresh(message: string) {
    setFeedbackIsError(false)
    setSaved(message)
    if (userId) await loadWorkspace(userId, organizationId)
  }
  function showActionError(message: string) {
    setFeedbackIsError(true)
    setSaved(message)
  }
  async function addParticipant(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!participantName.trim() || !organizationId || !userId) return
    const values = { name: participantName.trim(), category: participantCategory, email: participantEmail.trim() || null, nationality: participantNationality.trim() || null }
    const query = editingParticipantId ? supabase.from('participants').update(values).eq('id', editingParticipantId).eq('organization_id', organizationId) : supabase.from('participants').insert({ ...values, organization_id: organizationId, status: 'draft', created_by: userId })
    const { error } = await query
    if (error) return showActionError(error.message)
    setParticipantName(''); setParticipantEmail(''); setParticipantNationality(''); setEditingParticipantId('')
    await refresh('Participant saved.')
  }
  async function archiveParticipant(id: string) {
    if (!window.confirm('Archive this participant?')) return
    const { error } = await supabase.from('participants').update({ status: 'archived' }).eq('id', id).eq('organization_id', organizationId)
    if (error) return showActionError(error.message)
    await refresh('Participant archived.')
  }
  async function createTeam(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!teamName.trim() || !organizationId || !userId) return
    const captainId = teamParticipantId || null
    const { data, error } = await supabase.from('teams').insert({ organization_id: organizationId, name: teamName.trim(), category: teamCategory, captain_id: captainId, created_by: userId }).select('id').single()
    if (error) return showActionError(error.message)
    setTeamName(''); setTeamParticipantId('')
    if (data?.id && captainId) {
      const { error: memberError } = await supabase.from('team_members').insert({ team_id: data.id, participant_id: captainId })
      if (memberError) {
        await refresh('Team created.')
        return showActionError(`Team created, but its captain could not be added to the roster: ${memberError.message}`)
      }
    }
    await refresh('Team created.')
  }
  async function updateTeam(id: string, values: Partial<Team>) {
    const { error } = await supabase.from('teams').update(values).eq('id', id).eq('organization_id', organizationId)
    if (error) return showActionError(error.message)
    await refresh('Team updated.')
  }
  async function createRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!requestSubject.trim() || !requestDescription.trim()) return
    const { error } = await supabase.from('requests').insert({ organization_id: organizationId, subject: requestSubject.trim(), description: requestDescription.trim(), created_by: userId })
    if (error) return showActionError(error.message)
    setRequestSubject(''); setRequestDescription('')
    await refresh('Support request submitted.')
  }
  async function createInvitation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!accountEmail.trim() || !accountContact.trim()) return
    const { error } = await supabase.from('invitations').insert({ organization_id: organizationId, email: accountEmail.trim(), contact_name: accountContact.trim(), role: 'nha_admin', invited_by: userId })
    if (error) return showActionError(error.message)
    setAccountEmail(''); setAccountContact('')
    await refresh('Invitation recorded. The contact can now activate their Supabase account.')
  }
  async function uploadDocument(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!documentFile || !documentName.trim() || !organizationId) return
    const path = `${organizationId}/${crypto.randomUUID()}-${documentFile.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`
    const upload = await supabase.storage.from('nha-documents').upload(path, documentFile)
    if (upload.error) return showActionError(upload.error.message)
    const { error } = await supabase.from('documents').insert({ organization_id: organizationId, name: documentName.trim(), storage_path: path, mime_type: documentFile.type || null, size_bytes: documentFile.size, requirement_id: documentRequirementId || null, participant_id: documentParticipantId || null, uploaded_by: userId })
    if (error) {
      await supabase.storage.from('nha-documents').remove([path])
      return showActionError(error.message)
    }
    setDocumentName(''); setDocumentFile(null); setDocumentRequirementId(''); setDocumentParticipantId('')
    await refresh('Document uploaded.')
  }
  async function removeDocument(document: Document) {
    if (!window.confirm(`Delete ${document.name}?`)) return
    const { error } = await supabase.from('documents').delete().eq('id', document.id).eq('organization_id', organizationId)
    if (error) return showActionError(error.message)
    const { error: storageError } = await supabase.storage.from('nha-documents').remove([document.storage_path])
    if (storageError) {
      await refresh('Document record deleted.')
      return showActionError(`Document record deleted, but its stored file could not be removed: ${storageError.message}`)
    }
    await refresh('Document deleted.')
  }
  async function createSubmission(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!submissionTitle.trim()) return
    const { error } = await supabase.from('submissions').insert({ organization_id: organizationId, title: submissionTitle.trim(), description: submissionDescription.trim() || null, team_id: submissionTeamId || null, submitted_by: userId })
    if (error) return showActionError(error.message)
    setSubmissionTitle(''); setSubmissionDescription(''); setSubmissionTeamId('')
    await refresh('Submission saved as draft.')
  }
  async function updateSubmission(id: string, status: string) {
    const { error } = await supabase.from('submissions').update({ status, submitted_at: status === 'submitted' ? new Date().toISOString() : null }).eq('id', id).eq('organization_id', organizationId)
    if (error) return showActionError(error.message)
    await refresh(`Submission ${status}.`)
  }
  async function saveConsent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!consentParticipantId) return
    const { error } = await supabase.from('consent_records').upsert({ organization_id: organizationId, participant_id: consentParticipantId, consent_type: consentType, status: consentStatus, created_by: userId }, { onConflict: 'participant_id,consent_type' })
    if (error) return showActionError(error.message)
    setConsentParticipantId('')
    await refresh('Consent record saved.')
  }
  async function saveTravel(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = { organization_id: organizationId, participant_id: travelParticipantId || null, status: travelStatus, visa_required: travelVisaRequired, visa_support_requested: travelVisaSupport, notes: travelNotes.trim() || null, created_by: userId }
    const query = editingTravelId
      ? supabase.from('travel_records').update(values).eq('id', editingTravelId).eq('organization_id', organizationId)
      : supabase.from('travel_records').insert(values)
    const { error } = await query
    if (error) return showActionError(error.message)
    setEditingTravelId('')
    setTravelParticipantId(''); setTravelNotes('')
    await refresh('Travel record saved.')
  }
  async function saveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    let parsed: Settings
    try { parsed = JSON.parse(settingsText) as Settings } catch { return showActionError('Settings must be valid JSON.') }
    const { error } = await supabase.from('organization_settings').upsert({ organization_id: organizationId, ...parsed, updated_by: userId })
    if (error) return showActionError(error.message)
    setSettings(parsed)
    await refresh('Organization settings saved.')
  }
  async function setNotificationRead(id: string, isRead: boolean) {
    const readAt = isRead ? new Date().toISOString() : null
    const { error } = await supabase.from('notifications').update({ read_at: readAt }).eq('id', id).eq('user_id', userId)
    if (error) return showActionError(error.message)
    setNotifications((current) => current.map((item) => item.id === id ? { ...item, read_at: readAt } : item))
  }
  async function markAllNotificationsRead() {
    const unreadIds = notifications.filter((item) => !item.read_at).map((item) => item.id)
    const results = await Promise.all(unreadIds.map((id) => supabase.from('notifications').update({ read_at: new Date().toISOString() }).eq('id', id).eq('user_id', userId)))
    const error = results.find((result) => result.error)?.error
    if (error) return showActionError(error.message)
    const readAt = new Date().toISOString()
    setNotifications((current) => current.map((item) => ({ ...item, read_at: item.read_at ?? readAt })))
  }
  function exportCsv(filename: string, rows: string[][]) {
    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(',')).join('\n')
    const anchor = document.createElement('a')
    anchor.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    anchor.download = filename
    anchor.click()
  }
  function participantLabel(id: string | null) { return participants.find((item) => item.id === id)?.name ?? 'Unassigned' }
  function teamLabel(id: string | null) { return teams.find((item) => item.id === id)?.name ?? 'No team' }
  const filteredMail = useMemo(() => {
    const query = mailSearch.trim().toLowerCase()
    return notifications.filter((item) =>
      (notificationFilter === 'all' || !item.read_at)
      && (!query || `${item.title} ${item.body}`.toLowerCase().includes(query)),
    )
  }, [mailSearch, notificationFilter, notifications])
  const selectedMail = notifications.find((item) => item.id === selectedMailId) ?? null
  function resetCompose() {
    setComposeOpen(false)
    setComposeRecipient('')
    setComposeSubject('')
    setComposeBody('')
  }
  async function submitCompose(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFeedbackIsError(false)
    setSaved('')
    try {
      const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character] ?? character)
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId,
          to: composeRecipient.trim(),
          subject: composeSubject.trim(),
          html: `<p>${escapeHtml(composeBody.trim()).replace(/\n/g, '<br />')}</p>`,
        }),
      })
      const result = await response.json() as { error?: string }
      if (!response.ok) {
        showActionError(result.error ?? 'Unable to send message.')
        return
      }
      setSaved(`Message sent to ${composeRecipient.trim()}.`)
      resetCompose()
    } catch {
      showActionError('Unable to send message. Check your connection and try again.')
    }
  }

  if (authLoading) return <main className="hero-grid min-h-screen text-[#0b192c]"><SiteHeader label="Public website" /><div className="flex min-h-[calc(100vh-72px)] items-center justify-center"><p className="rounded-xl bg-white/90 px-5 py-4 text-sm text-slate-600 shadow-xl">Loading secure portal...</p></div></main>
  if (!loggedIn) return <main className="hero-grid min-h-screen text-[#0b192c]"><SiteHeader label="Public website" /><div className="flex min-h-[calc(100vh-72px)] items-center justify-center px-5"><section className="w-full max-w-md rounded-3xl border border-white/70 bg-white/90 p-8 shadow-2xl sm:p-10"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#34537e]">Secure association access</p><h1 className="mt-3 text-3xl font-semibold">NHA Portal login</h1><form onSubmit={handleLogin} className="mt-8 space-y-5"><label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Email<input type="email" value={loginId} onChange={(event) => setLoginId(event.target.value)} required className={`${inputClass} mt-2 w-full`} /></label><label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Password<input type="password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} required className={`${inputClass} mt-2 w-full`} /></label>{loginError && <p role="alert" className="text-sm text-red-700">{loginError}</p>}<button className={`${buttonClass} w-full`}>Enter portal</button></form><a href="/" className="mt-7 block text-center text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Return to public website</a></section></div></main>

  return <main className="modern-shell min-h-screen text-[#0b192c]"><SiteHeader label="NHA Portal" action={<button onClick={handleLogout} className="shrink-0 rounded-full border border-cyan-200/60 bg-gradient-to-r from-cyan-300/20 to-violet-300/20 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-50">Log out</button>} /><div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[250px_1fr] lg:px-8"><aside><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#34537e]">Association workspace</p><h1 className="mt-4 text-3xl font-semibold">NHA Portal</h1><nav className="mt-8 grid gap-1" aria-label="Portal sections">{sections.map((item) => <button key={item} onClick={() => setActive(item)} className={`rounded-xl px-4 py-3 text-left text-sm ${active === item ? 'bg-[#0b192c] font-semibold text-white' : 'text-slate-600 hover:bg-white'}`}>{item}</button>)}</nav><div className="mt-8 rounded-2xl border border-white/80 bg-white/60 p-4 text-xs leading-5 text-slate-500">Role<br /><strong className="text-[#0b192c]">{userRole || 'member'}</strong><label className="mt-4 block text-[10px] font-bold uppercase tracking-[0.12em]">Working country  <select value={organizationId} onChange={(event) => void changeOrganization(event.target.value)} disabled={workspaceLoading || Boolean(countrySlug)} className={`${inputClass} mt-2 w-full px-2 py-2 text-xs`}>{organizations.map((organization) => <option key={organization.id} value={organization.id}>{organization.country} ({organization.status})</option>)}</select></label></div></aside><section className="min-w-0"><div className="rounded-3xl border border-white/70 bg-white/65 p-7 shadow-xl backdrop-blur-xl sm:p-10"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#34537e]">{selectedOrganization?.country ?? 'No assigned country'} team workspace</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">{active}</h2><p className="mt-4 max-w-2xl text-slate-600">Live records are loaded from Supabase and scoped to your organization.</p>  {saved && <p role={feedbackIsError ? 'alert' : 'status'} className={`mt-5 rounded-xl px-4 py-3 text-sm ${feedbackIsError ? 'bg-red-50 text-red-800' : 'bg-emerald-50 text-emerald-800'}`}>{saved}</p>}{loginError && <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{loginError}</p>}{workspaceLoading && <p className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-800">Loading organization records...</p>}

{active === 'Overview' && <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['Participants', participants.length], ['Teams', teams.length], ['Documents', documents.length], ['Open requests', requests.filter((item) => item.status !== 'resolved').length], ['Submissions', submissions.length], ['Travel records', travel.length], ['Unread notifications', notifications.filter((item) => !item.read_at).length], ['Consent gaps', consents.filter((item) => item.status !== 'received').length]].map(([label, value]) => <div key={String(label)} className="rounded-2xl border border-slate-200 bg-white/80 p-6"><p className="text-xs uppercase tracking-[0.12em] text-slate-500">{label}</p><p className="mt-3 text-3xl font-semibold">{value}</p></div>)}</section>}

{active === 'Participants' && <section className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-xl font-semibold">Participants</h3><p className="mt-1 text-sm text-slate-500">Create, edit, archive, and export the country roster.</p></div><button onClick={() => exportCsv(`${selectedOrganization?.slug ?? 'country'}-participants.csv`, [['Name', 'Category', 'Status', 'Email', 'Nationality', 'Consent'], ...participants.map((item) => [item.name, item.category, item.status, item.email ?? '', item.nationality ?? '', item.consent_status])])} className="rounded-full border border-slate-300 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-600">Export CSV</button></div><form onSubmit={addParticipant} className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4"><input aria-label="Participant name" value={participantName} onChange={(event) => setParticipantName(event.target.value)} placeholder="Participant name" required className={inputClass} /><select aria-label="Participant category" value={participantCategory} onChange={(event) => setParticipantCategory(event.target.value)} className={inputClass}><option>Under-19</option><option>Under-25</option><option>Under-40</option><option>Open</option><option>Coach</option><option>Judge</option></select><input aria-label="Participant email" type="email" value={participantEmail} onChange={(event) => setParticipantEmail(event.target.value)} placeholder="Email (optional)" className={inputClass} /><input aria-label="Participant nationality" value={participantNationality} onChange={(event) => setParticipantNationality(event.target.value)} placeholder="Nationality (optional)" className={inputClass} /><button className={`${buttonClass} lg:col-span-4`}>{editingParticipantId ? 'Save participant' : 'Add participant'}</button></form><ul className="mt-6 grid gap-2">{participants.map((item) => <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm"><span><strong>{item.name}</strong><span className="ml-3 text-slate-500">{item.category} · {item.consent_status}</span></span><span className="flex items-center gap-2"><span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase text-amber-700">{item.status}</span><button type="button" onClick={() => { setEditingParticipantId(item.id); setParticipantName(item.name); setParticipantCategory(item.category); setParticipantEmail(item.email ?? ''); setParticipantNationality(item.nationality ?? '') }} className="text-xs font-semibold text-blue-700">Edit</button><button type="button" onClick={() => void archiveParticipant(item.id)} className="text-xs font-semibold text-red-700">Archive</button></span></li>)}{participants.length === 0 && <li className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500">No participants yet.</li>}</ul></section>}

{active === 'Teams' && <section className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6"><h3 className="text-xl font-semibold">Teams and rosters</h3><form onSubmit={createTeam} className="mt-6 grid gap-3 md:grid-cols-[1fr_150px_1fr_auto]"><input value={teamName} onChange={(event) => setTeamName(event.target.value)} placeholder="Team name" required className={inputClass} /><select value={teamCategory} onChange={(event) => setTeamCategory(event.target.value)} className={inputClass}><option>Open</option><option>Under-19</option><option>Under-25</option><option>Under-40</option></select><select value={teamParticipantId} onChange={(event) => setTeamParticipantId(event.target.value)} className={inputClass}><option value="">Captain (optional)</option>{participants.filter((item) => item.status !== 'archived').map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><button className={buttonClass}>Create team</button></form><ul className="mt-6 grid gap-2">{teams.map((item) => <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm"><span><strong>{item.name}</strong><span className="ml-3 text-slate-500">{item.category} · Captain: {participantLabel(item.captain_id)}</span></span><span className="flex items-center gap-3"><span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase text-blue-700">{item.status}</span>{item.status !== 'locked' && <button type="button" onClick={() => void updateTeam(item.id, { status: 'locked' })} className="text-xs font-semibold text-blue-700">Lock</button>}{item.status === 'locked' && <button type="button" onClick={() => void updateTeam(item.id, { status: 'draft' })} className="text-xs font-semibold text-amber-700">Unlock</button>}</span></li>)}</ul></section>}

{active === 'Country teams' && <section className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6"><h3 className="text-xl font-semibold">Country team access</h3><p className="mt-2 text-sm text-slate-500">Workspace: <strong>{selectedOrganization?.admin_email}</strong>. Invitations are stored in Supabase and scoped to this organization.</p>{isOrganizationAdmin ? <form onSubmit={createInvitation} className="mt-6 grid gap-3 md:grid-cols-[1fr_1fr_auto]"><input value={accountContact} onChange={(event) => setAccountContact(event.target.value)} placeholder="Association contact" required className={inputClass} /><input type="email" value={accountEmail} onChange={(event) => setAccountEmail(event.target.value)} placeholder="Official email" required className={inputClass} /><button className={buttonClass}>Record invite</button></form> : <p className="mt-5 rounded-xl bg-slate-100 p-4 text-sm text-slate-600">Only workspace administrators can manage invitations.</p>}<ul className="mt-6 grid gap-2">{invitations.map((item) => <li key={item.id} className="flex flex-wrap justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm"><span><strong>{item.contact_name ?? item.email}</strong><span className="ml-3 text-slate-500">{item.email} · {item.role}</span></span><span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase text-blue-700">{item.status}</span></li>)}</ul></section>}

{active === 'Documents' && <section className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6"><h3 className="text-xl font-semibold">Documents</h3><form onSubmit={uploadDocument} className="mt-6 grid gap-3 md:grid-cols-2"><input value={documentName} onChange={(event) => setDocumentName(event.target.value)} placeholder="Document name" required className={inputClass} /><input type="file" onChange={(event) => setDocumentFile(event.target.files?.[0] ?? null)} required className={inputClass} /><select value={documentRequirementId} onChange={(event) => setDocumentRequirementId(event.target.value)} className={inputClass}><option value="">Requirement (optional)</option>{requirements.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><select value={documentParticipantId} onChange={(event) => setDocumentParticipantId(event.target.value)} className={inputClass}><option value="">Participant (optional)</option>{participants.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><button className={`${buttonClass} md:col-span-2`}>Upload document</button></form><ul className="mt-6 grid gap-2">{documents.map((item) => <li key={item.id} className="flex flex-wrap justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm"><span><strong>{item.name}</strong><span className="ml-3 text-slate-500">{item.mime_type ?? 'file'} · {item.participant_id ? participantLabel(item.participant_id) : 'Organization'}</span></span><span className="flex items-center gap-3"><span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase text-amber-700">{item.status}</span>{isOrganizationAdmin && <button type="button" onClick={() => void removeDocument(item)} className="text-xs font-semibold text-red-700">Delete</button>}</span></li>)}</ul></section>}

{active === 'Requests' && <section className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6"><h3 className="text-xl font-semibold">Support requests</h3><form onSubmit={createRequest} className="mt-6 grid gap-3"><input value={requestSubject} onChange={(event) => setRequestSubject(event.target.value)} placeholder="Request subject" required className={inputClass} /><textarea value={requestDescription} onChange={(event) => setRequestDescription(event.target.value)} placeholder="Describe the request" required rows={4} className={inputClass} /><button className="w-fit rounded-xl bg-[#0b192c] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white">Submit request</button></form><ul className="mt-6 grid gap-2">{requests.map((item) => <li key={item.id} className="rounded-xl border border-slate-200 px-4 py-3 text-sm"><div className="flex justify-between gap-3"><strong>{item.subject}</strong><span className="text-xs uppercase text-blue-700">{item.status}</span></div><p className="mt-2 text-slate-500">{item.description}</p>{isOrganizationAdmin && item.status !== 'resolved' && <button type="button" onClick={() => void supabase.from('requests').update({ status: 'resolved' }).eq('id', item.id).then(({ error }) => error ? showActionError(error.message) : refresh('Request resolved.'))} className="mt-3 text-xs font-semibold text-blue-700">Mark resolved</button>}</li>)}</ul></section>}

{active === 'Submissions' && <section className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6"><h3 className="text-xl font-semibold">Submissions</h3><form onSubmit={createSubmission} className="mt-6 grid gap-3"><input value={submissionTitle} onChange={(event) => setSubmissionTitle(event.target.value)} placeholder="Submission title" required className={inputClass} /><textarea value={submissionDescription} onChange={(event) => setSubmissionDescription(event.target.value)} placeholder="Describe the submission" rows={3} className={inputClass} /><select value={submissionTeamId} onChange={(event) => setSubmissionTeamId(event.target.value)} className={inputClass}><option value="">Team (optional)</option>{teams.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><button className="w-fit rounded-xl bg-[#0b192c] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white">Save submission</button></form><ul className="mt-6 grid gap-2">{submissions.map((item) => <li key={item.id} className="flex flex-wrap justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm"><span><strong>{item.title}</strong><span className="ml-3 text-slate-500">{teamLabel(item.team_id)} · {item.description ?? 'No description'}</span></span><span className="flex items-center gap-3"><span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase text-blue-700">{item.status}</span>{item.status === 'draft' && <button type="button" onClick={() => void updateSubmission(item.id, 'submitted')} className="text-xs font-semibold text-blue-700">Submit</button>}{item.status === 'submitted' && isOrganizationAdmin && <button type="button" onClick={() => void updateSubmission(item.id, 'approved')} className="text-xs font-semibold text-emerald-700">Approve</button>}</span></li>)}</ul></section>}

{active === 'Compliance' && <section className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6"><h3 className="text-xl font-semibold">Compliance and consent</h3><form onSubmit={saveConsent} className="mt-6 grid gap-3 md:grid-cols-4"><select value={consentParticipantId} onChange={(event) => setConsentParticipantId(event.target.value)} className={inputClass}><option value="">Participant</option>{participants.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><select value={consentType} onChange={(event) => setConsentType(event.target.value)} className={inputClass}><option value="guardian">Guardian</option><option value="media">Media</option><option value="photography">Photography</option><option value="safeguarding">Safeguarding</option></select><select value={consentStatus} onChange={(event) => setConsentStatus(event.target.value)} className={inputClass}><option value="pending">Pending</option><option value="received">Received</option><option value="rejected">Rejected</option><option value="expired">Expired</option></select><button className={buttonClass}>Save consent</button></form><ul className="mt-6 grid gap-2">{consents.map((item) => <li key={item.id} className="flex justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm"><span><strong>{participantLabel(item.participant_id)}</strong><span className="ml-3 text-slate-500">{item.consent_type}</span></span><span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase text-amber-700">{item.status}</span></li>)}</ul></section>}

{active === 'Travel' && <section className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-xl font-semibold">Travel readiness</h3><a href="https://ceac.state.gov/GenNIV/Default.aspx" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#0b192c] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white hover:bg-[#163c78]">U.S. Visa Portal <ExternalLink size={13} aria-hidden="true" /></a></div><p className="mt-2 text-sm text-slate-500">Visit the official U.S. Department of State CEAC portal to start or continue a visa application.</p><form onSubmit={saveTravel} className="mt-6 grid gap-3 md:grid-cols-2"><select value={travelParticipantId} onChange={(event) => setTravelParticipantId(event.target.value)} className={inputClass}><option value="">Participant (optional)</option>{participants.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><select value={travelStatus} onChange={(event) => setTravelStatus(event.target.value)} className={inputClass}><option value="not_started">Not started</option><option value="in_progress">In progress</option><option value="ready">Ready</option><option value="submitted">Submitted</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={travelVisaRequired} onChange={(event) => setTravelVisaRequired(event.target.checked)} /> Visa required</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={travelVisaSupport} onChange={(event) => setTravelVisaSupport(event.target.checked)} /> Request visa support</label><textarea value={travelNotes} onChange={(event) => setTravelNotes(event.target.value)} placeholder="Travel notes" rows={3} className={`${inputClass} md:col-span-2`} /><button className={`${buttonClass} md:col-span-2`}>{editingTravelId ? 'Update travel record' : 'Save travel record'}</button></form><ul className="mt-6 grid gap-2">{travel.map((item) => <li key={item.id} className="flex flex-wrap justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm"><span><strong>{participantLabel(item.participant_id)}</strong><span className="ml-3 text-slate-500">{item.visa_required ? 'Visa required' : 'Visa not required'}{item.visa_support_requested ? ' · Support requested' : ''}</span></span><span className="flex items-center gap-3"><span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase text-blue-700">{item.status}</span><button type="button" onClick={() => { setEditingTravelId(item.id); setTravelParticipantId(item.participant_id ?? ''); setTravelStatus(item.status); setTravelVisaRequired(item.visa_required); setTravelVisaSupport(item.visa_support_requested); setTravelNotes(item.notes ?? '') }} className="text-xs font-semibold text-blue-700">Edit</button></span></li>)}</ul></section>}

{active === 'Notifications' && <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm"><div className="flex flex-wrap items-center gap-3 border-b border-slate-200 p-4"><div className="flex min-w-[220px] flex-1 items-center gap-3 rounded-full bg-slate-100 px-4 py-3"><Search size={17} className="text-slate-500" /><input value={mailSearch} onChange={(event) => setMailSearch(event.target.value)} placeholder="Search notifications" className="w-full bg-transparent text-sm outline-none" /></div><button type="button" onClick={() => setComposeOpen(true)} className={`${buttonClass} flex items-center gap-2`}><PenLine size={16} />Compose email</button></div><div className="grid min-h-[480px] lg:grid-cols-[190px_1fr]"><nav className="border-b border-slate-200 p-3 lg:border-b-0 lg:border-r" aria-label="Notification filters"><button type="button" onClick={() => { setNotificationFilter('all'); setSelectedMailId(null) }} className={`w-full rounded-xl px-3 py-2.5 text-left text-sm ${notificationFilter === 'all' ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}>All notifications</button><button type="button" onClick={() => { setNotificationFilter('unread'); setSelectedMailId(null) }} className={`mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm ${notificationFilter === 'unread' ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}>Unread<span className="text-xs text-slate-500">{notifications.filter((item) => !item.read_at).length || ''}</span></button></nav><div className="min-w-0">{selectedMail ? <article className="p-5 sm:p-7"><button type="button" onClick={() => setSelectedMailId(null)} className="mb-6 flex items-center gap-2 text-sm font-semibold text-blue-700"><ChevronLeft size={16} />Back to notifications</button><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.12em] text-slate-500">NHA Portal · Notification</p><h3 className="mt-2 text-2xl font-semibold">{selectedMail.title}</h3></div><button type="button" onClick={() => void setNotificationRead(selectedMail.id, !selectedMail.read_at)} className="rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label={selectedMail.read_at ? 'Mark notification unread' : 'Mark notification read'} title={selectedMail.read_at ? 'Mark unread' : 'Mark read'}>{selectedMail.read_at ? <Mail size={18} /> : <MailOpen size={18} />}</button></div><div className="mt-8 rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">{selectedMail.body}</div></article> : <><div className="flex items-center justify-between border-b border-slate-200 px-5 py-4"><div><h3 className="text-xl font-semibold">Notifications</h3><p className="mt-1 text-xs text-slate-500">{filteredMail.length} notifications · {notifications.filter((item) => !item.read_at).length} unread</p></div><button type="button" onClick={() => void markAllNotificationsRead()} disabled={!notifications.some((item) => !item.read_at)} className="text-xs font-semibold text-blue-700 disabled:cursor-not-allowed disabled:text-slate-400">Mark all read</button></div><ul>{filteredMail.map((item) => <li key={item.id} className={`border-b border-slate-200 ${item.read_at ? 'bg-white' : 'bg-blue-50/40'}`}><button type="button" onClick={() => { setSelectedMailId(item.id); if (!item.read_at) void setNotificationRead(item.id, true) }} className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-slate-50"><span className={`min-w-0 flex-1 truncate text-sm ${item.read_at ? 'text-slate-600' : 'font-semibold text-slate-900'}`}>{item.title}<span className="ml-2 font-normal text-slate-500">— {item.body}</span></span>{item.read_at ? <MailOpen size={16} className="shrink-0 text-slate-300" /> : <Mail size={16} className="shrink-0 text-blue-500" />}</button></li>)}{filteredMail.length === 0 && <li className="p-10 text-center text-sm text-slate-500">No notifications match this search.</li>}</ul></>}</div></div>{composeOpen && <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/30 p-4 sm:items-center"><form onSubmit={submitCompose} className="w-full max-w-xl rounded-2xl bg-white shadow-2xl"><div className="flex items-center justify-between rounded-t-2xl bg-[#0b192c] px-5 py-4 text-white"><strong>New email</strong><button type="button" onClick={resetCompose} aria-label="Close compose">×</button></div><div className="space-y-3 p-5"><input type="email" required value={composeRecipient} onChange={(event) => setComposeRecipient(event.target.value)} placeholder="To" className={`${inputClass} w-full`} /><input required value={composeSubject} onChange={(event) => setComposeSubject(event.target.value)} placeholder="Subject" className={`${inputClass} w-full`} /><textarea required rows={8} value={composeBody} onChange={(event) => setComposeBody(event.target.value)} placeholder="Write a message..." className={`${inputClass} w-full resize-y`} /><div className="flex justify-end gap-3"><button type="button" onClick={resetCompose} className="rounded-xl px-4 py-3 text-sm text-slate-600">Discard</button><button className={`${buttonClass} flex items-center gap-2`}><Send size={15} />Send</button></div></div></form></div>}</section>}

{active === 'Reports' && <section className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6"><h3 className="text-xl font-semibold">Reports</h3><p className="mt-2 text-sm text-slate-500">Download current organization data for federation reporting.</p><div className="mt-6 flex flex-wrap gap-3"><button onClick={() => exportCsv(`${selectedOrganization?.slug ?? 'country'}-summary.csv`, [['Metric', 'Value'], ['Participants', String(participants.length)], ['Teams', String(teams.length)], ['Documents', String(documents.length)], ['Submissions', String(submissions.length)], ['Travel records', String(travel.length)], ['Consent records', String(consents.length)]])} className={buttonClass}>Export summary</button><button onClick={() => exportCsv(`${selectedOrganization?.slug ?? 'country'}-travel.csv`, [['Participant', 'Status', 'Visa required', 'Support requested'], ...travel.map((item) => [participantLabel(item.participant_id), item.status, String(item.visa_required), String(item.visa_support_requested)])])} className={buttonClass}>Export travel</button><button onClick={() => exportCsv(`${selectedOrganization?.slug ?? 'country'}-submissions.csv`, [['Title', 'Team', 'Status'], ...submissions.map((item) => [item.title, teamLabel(item.team_id), item.status])])} className={buttonClass}>Export submissions</button></div></section>}

{active === 'Settings' && <section className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6"><h3 className="text-xl font-semibold">Organization settings</h3><p className="mt-2 text-sm text-slate-500">Edit structured workspace settings. JSON is validated before saving.</p>{isOrganizationAdmin ? <form onSubmit={saveSettings} className="mt-6 grid gap-3"><textarea value={settingsText} onChange={(event) => setSettingsText(event.target.value)} rows={14} className={`${inputClass} font-mono text-xs`} /><button className="w-fit rounded-xl bg-[#0b192c] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white">Save settings</button></form> : <p className="mt-5 rounded-xl bg-slate-100 p-4 text-sm text-slate-600">Only workspace administrators can change these settings.</p>}<div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-900"><strong>{selectedOrganization?.name}</strong><br />Workspace administrator: {selectedOrganization?.admin_email}</div></section>}

</div></section></div></main>
}
