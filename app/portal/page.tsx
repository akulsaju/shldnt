'use client'

import { useEffect, useMemo, useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { createClient } from '@/lib/supabase/browser'

type Organization = {
  id: string
  name: string
  country: string
  slug: string
  status: string
}

type Participant = {
  id: string
  name: string
  category: string
  status: string
  email: string | null
  nationality: string | null
  consent_status: string
}

type Invitation = {
  id: string
  email: string
  role: string
  status: string
  created_at: string
}

type Team = { id: string; name: string; category: string; status: string; coach_name: string | null }
type Request = { id: string; subject: string; description: string; status: string; created_at: string }
type Notification = { id: string; title: string; body: string; read_at: string | null }

const sections = ['Overview', 'Participants', 'Teams', 'Country teams', 'Documents', 'Requests', 'Submissions', 'Compliance', 'Travel', 'Notifications', 'Reports', 'Settings']

export default function PortalPage() {
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
  const [participantName, setParticipantName] = useState('')
  const [participantCategory, setParticipantCategory] = useState('Under-19')
  const [participantEmail, setParticipantEmail] = useState('')
  const [participantNationality, setParticipantNationality] = useState('')
  const [editingParticipantId, setEditingParticipantId] = useState('')
  const [teamName, setTeamName] = useState('')
  const [teamCategory, setTeamCategory] = useState('Open')
  const [requestSubject, setRequestSubject] = useState('')
  const [requestDescription, setRequestDescription] = useState('')
  const [accountEmail, setAccountEmail] = useState('')
  const [accountContact, setAccountContact] = useState('')
  const [saved, setSaved] = useState('')

  const selectedOrganization = useMemo(
    () => organizations.find((organization) => organization.id === organizationId),
    [organizations, organizationId],
  )

  async function loadWorkspace(nextUserId: string, preferredOrganizationId?: string) {
    setWorkspaceLoading(true)
    const supabase = createClient()
    const [{ data: memberships, error: membershipError }, { data: organizationRows, error: organizationError }] = await Promise.all([
      supabase.from('organization_members').select('organization_id, role').eq('user_id', nextUserId),
      supabase.from('organizations').select('id, name, country, slug, status').order('country'),
    ])

    if (membershipError || organizationError) {
      setLoginError(membershipError?.message ?? organizationError?.message ?? 'Unable to load the portal workspace.')
      setWorkspaceLoading(false)
      return
    }

    const nextOrganizations = (organizationRows ?? []) as Organization[]
    const firstMembership = memberships?.[0]
    const nextOrganizationId =
      preferredOrganizationId ??
      organizationId ??
      firstMembership?.organization_id ??
      nextOrganizations.find((organization) => organization.country === 'United Arab Emirates')?.id ??
      nextOrganizations[0]?.id ??
      ''

    setUserRole(firstMembership?.role ?? '')
    setOrganizations(nextOrganizations)
    setOrganizationId(nextOrganizationId)

    if (nextOrganizationId) {
      const [{ data: participantRows, error: participantError }, { data: invitationRows, error: invitationError }, { data: teamRows, error: teamError }, { data: requestRows, error: requestError }] = await Promise.all([
        supabase.from('participants').select('id, name, category, status, email, nationality, consent_status').eq('organization_id', nextOrganizationId).order('created_at'),
        supabase.from('invitations').select('id, email, role, status, created_at').eq('organization_id', nextOrganizationId).order('created_at', { ascending: false }),
        supabase.from('teams').select('id, name, category, status, coach_name').eq('organization_id', nextOrganizationId).order('created_at'),
        supabase.from('requests').select('id, subject, description, status, created_at').eq('organization_id', nextOrganizationId).order('created_at', { ascending: false }),
      ])
      const { data: notificationRows, error: notificationError } = await supabase.from('notifications').select('id, title, body, read_at').eq('user_id', nextUserId).order('created_at', { ascending: false }).limit(20)
      if (participantError || invitationError || teamError || requestError || notificationError) {
        setLoginError(participantError?.message ?? invitationError?.message ?? teamError?.message ?? requestError?.message ?? notificationError?.message ?? 'Unable to load country records.')
      }
      setParticipants((participantRows ?? []) as Participant[])
      setInvitations((invitationRows ?? []) as Invitation[])
      setTeams((teamRows ?? []) as Team[])
      setRequests((requestRows ?? []) as Request[])
      setNotifications((notificationRows ?? []) as Notification[])
    } else {
      setParticipants([])
      setInvitations([])
      setTeams([])
      setRequests([])
      setNotifications([])
    }
    setWorkspaceLoading(false)
  }

  useEffect(() => {
    let supabase: ReturnType<typeof createClient>
    try {
      supabase = createClient()
    } catch {
      setLoginError('Supabase is not configured. Add the public Supabase URL and publishable key to the environment.')
      setAuthLoading(false)
      return
    }

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setLoggedIn(true)
        setUserId(user.id)
        void loadWorkspace(user.id)
      }
      setAuthLoading(false)
    }).catch(() => setAuthLoading(false))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(Boolean(session?.user))
      if (session?.user) {
        setUserId(session.user.id)
        void loadWorkspace(session.user.id)
      }
      setAuthLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoginError('')
    const { error } = await createClient().auth.signInWithPassword({
      email: loginId.trim(),
      password: loginPassword,
    })
    if (error) setLoginError(error.message)
  }

  async function handleLogout() {
    await createClient().auth.signOut()
    setLoggedIn(false)
    setUserId('')
    setOrganizations([])
    setOrganizationId('')
  }

  async function changeOrganization(nextOrganizationId: string) {
    setOrganizationId(nextOrganizationId)
    if (userId) await loadWorkspace(userId, nextOrganizationId)
  }

  async function addParticipant(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!participantName.trim() || !organizationId || !userId) return
    const values = {
      name: participantName.trim(),
      category: participantCategory,
      email: participantEmail.trim() || null,
      nationality: participantNationality.trim() || null,
    }
    const query = editingParticipantId
      ? createClient().from('participants').update(values).eq('id', editingParticipantId).eq('organization_id', organizationId)
      : createClient().from('participants').insert({ ...values, organization_id: organizationId, status: 'draft', created_by: userId })
    const { error } = await query
    if (error) {
      setSaved(error.message)
      return
    }
    setParticipantName('')
    setParticipantEmail('')
    setParticipantNationality('')
    setEditingParticipantId('')
    setSaved('Participant saved to Supabase.')
    await loadWorkspace(userId, organizationId)
  }

  async function removeParticipant(participantId: string) {
    if (!organizationId || !window.confirm('Archive this participant?')) return
    const { error } = await createClient().from('participants').update({ status: 'archived' }).eq('id', participantId).eq('organization_id', organizationId)
    if (error) {
      setSaved(error.message)
      return
    }
    setSaved('Participant archived.')
    await loadWorkspace(userId, organizationId)
  }

  async function updateTeamStatus(teamId: string, status: string) {
    const { error } = await createClient().from('teams').update({ status }).eq('id', teamId).eq('organization_id', organizationId)
    if (error) {
      setSaved(error.message)
      return
    }
    setSaved(status === 'locked' ? 'Roster locked.' : 'Team status updated.')
    await loadWorkspace(userId, organizationId)
  }

  function exportParticipants() {
    const header = ['Name', 'Category', 'Status', 'Email', 'Nationality', 'Consent status']
    const rows = participants.map((participant) => [participant.name, participant.category, participant.status, participant.email ?? '', participant.nationality ?? '', participant.consent_status])
    const csv = [header, ...rows].map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${selectedOrganization?.slug ?? 'participants'}-participants.csv`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  async function createInvitation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!accountEmail.trim() || !accountContact.trim() || !organizationId || !userId) return
    const { error } = await createClient().from('invitations').insert({
      organization_id: organizationId,
      email: accountEmail.trim(),
      role: 'nha_admin',
      invited_by: userId,
    })
    if (error) {
      setSaved(error.message)
      return
    }
    setAccountEmail('')
    setAccountContact('')
    setSaved(`NHA admin invitation recorded for ${selectedOrganization?.country}.`)
    await loadWorkspace(userId, organizationId)
  }

  async function createTeam(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!teamName.trim() || !organizationId || !userId) return
    const { error } = await createClient().from('teams').insert({
      organization_id: organizationId,
      name: teamName.trim(),
      category: teamCategory,
      created_by: userId,
    })
    if (error) {
      setSaved(error.message)
      return
    }
    setTeamName('')
    setSaved('Team saved to Supabase.')
    await loadWorkspace(userId, organizationId)
  }

  async function createRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!requestSubject.trim() || !requestDescription.trim() || !organizationId || !userId) return
    const { error } = await createClient().from('requests').insert({
      organization_id: organizationId,
      subject: requestSubject.trim(),
      description: requestDescription.trim(),
      created_by: userId,
    })
    if (error) {
      setSaved(error.message)
      return
    }
    setRequestSubject('')
    setRequestDescription('')
    setSaved('Support request submitted to Supabase.')
    await loadWorkspace(userId, organizationId)
  }

  async function markNotificationRead(notificationId: string) {
    const { error } = await createClient().from('notifications').update({ read_at: new Date().toISOString() }).eq('id', notificationId).eq('user_id', userId)
    if (error) {
      setSaved(error.message)
      return
    }
    setNotifications((current) => current.map((notification) => notification.id === notificationId ? { ...notification, read_at: new Date().toISOString() } : notification))
  }

  if (authLoading) {
    return <main className="hero-grid min-h-screen text-[#0b192c]"><SiteHeader label="Public website" /><div className="flex min-h-[calc(100vh-72px)] items-center justify-center px-5"><p className="rounded-xl bg-white/90 px-5 py-4 text-sm text-slate-600 shadow-xl">Loading secure portal...</p></div></main>
  }

  if (!loggedIn) {
    return <main className="hero-grid min-h-screen text-[#0b192c]"><SiteHeader label="Public website" /><div className="flex min-h-[calc(100vh-72px)] items-center justify-center px-5"><section className="w-full max-w-md rounded-3xl border border-white/70 bg-white/90 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-10"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#34537e]">Secure association access</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">NHA Portal login</h1><p className="mt-4 text-sm leading-6 text-slate-500">Use the Supabase account assigned to your NHA organization.</p><form onSubmit={handleLogin} className="mt-8 space-y-5"><label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Email<input type="email" value={loginId} onChange={(event) => setLoginId(event.target.value)} autoComplete="username" required className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none focus:border-[#34537e]" /></label><label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Password<input type="password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} autoComplete="current-password" required className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none focus:border-[#34537e]" /></label>{loginError && <p role="alert" className="text-sm text-red-700">{loginError}</p>}<button type="submit" className="glow-button w-full rounded-xl bg-[#0b192c] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white">Enter portal</button></form><a href="/" className="mt-7 block text-center text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 hover:text-[#0b192c]">Return to public website</a></section></div></main>
  }

  return <main className="modern-shell min-h-screen text-[#0b192c]"><SiteHeader label="NHA Portal" action={<button onClick={handleLogout} className="shrink-0 rounded-full border border-cyan-200/60 bg-gradient-to-r from-cyan-300/20 to-violet-300/20 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-50 transition hover:from-cyan-300/35 hover:to-violet-300/35">Log out</button>} /><div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[250px_1fr] lg:px-8 lg:py-14"><aside className="animate-rise"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#34537e]">Association workspace</p><h1 className="mt-4 text-3xl font-semibold tracking-tight">NHA Portal</h1><nav className="mt-8 grid gap-1" aria-label="Portal sections">{sections.map((item) => <button key={item} onClick={() => setActive(item)} className={`rounded-xl px-4 py-3 text-left text-sm transition-all ${active === item ? 'bg-[#0b192c] font-semibold text-white shadow-lg shadow-blue-950/20' : 'text-slate-600 hover:bg-white hover:text-[#0b192c]'}`}>{item}</button>)}</nav><div className="mt-8 rounded-2xl border border-white/80 bg-white/60 p-4 text-xs leading-5 text-slate-500">Role<br /><strong className="text-[#0b192c]">{userRole || 'member'}</strong><label className="mt-4 block text-[10px] font-bold uppercase tracking-[0.12em]">Working country<select value={organizationId} onChange={(event) => void changeOrganization(event.target.value)} disabled={workspaceLoading || organizations.length === 0} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-2 py-2 text-xs text-[#0b192c]">{organizations.map((organization) => <option key={organization.id} value={organization.id}>{organization.country} ({organization.status})</option>)}</select></label></div></aside><section className="min-w-0"><div className="animate-rise rounded-3xl border border-white/70 bg-white/65 p-7 shadow-xl shadow-blue-950/5 backdrop-blur-xl sm:p-10"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#34537e]">{selectedOrganization?.country ?? 'No assigned country'} team workspace</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">{active}</h2><p className="mt-4 max-w-2xl text-slate-600">All records below are loaded from Supabase and scoped to the selected organization.</p>{saved && <p role="status" className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{saved}</p>}{workspaceLoading && <p className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-800">Loading organization records...</p>}

{active === 'Overview' && <section className="mt-8 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white/80 p-6"><p className="text-xs uppercase tracking-[0.12em] text-slate-500">Countries available</p><p className="mt-3 text-3xl font-semibold">{organizations.length}</p></div><div className="rounded-2xl border border-slate-200 bg-white/80 p-6"><p className="text-xs uppercase tracking-[0.12em] text-slate-500">Participants</p><p className="mt-3 text-3xl font-semibold">{participants.length}</p></div><div className="rounded-2xl border border-slate-200 bg-white/80 p-6"><p className="text-xs uppercase tracking-[0.12em] text-slate-500">Invitations</p><p className="mt-3 text-3xl font-semibold">{invitations.length}</p></div></section>}

{active === 'Participants' && <section className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-xl font-semibold">Participants</h3><p className="mt-1 text-sm text-slate-500">Create and maintain records for {selectedOrganization?.country ?? 'the selected country'}.</p></div><div className="flex items-center gap-2"><button type="button" onClick={exportParticipants} className="rounded-full border border-slate-300 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-600">Export CSV</button><span className="rounded-full bg-[#e7f4ff] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#34537e]">{participants.length} listed</span></div></div><form onSubmit={addParticipant} className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4"><input aria-label="Participant name" value={participantName} onChange={(event) => setParticipantName(event.target.value)} placeholder="Participant name" required className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm" /><select aria-label="Participant category" value={participantCategory} onChange={(event) => setParticipantCategory(event.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm"><option>Under-19</option><option>Under-25</option><option>Under-40</option><option>Open</option><option>Coach</option><option>Judge</option></select><input aria-label="Participant email" type="email" value={participantEmail} onChange={(event) => setParticipantEmail(event.target.value)} placeholder="Email (optional)" className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm" /><input aria-label="Participant nationality" value={participantNationality} onChange={(event) => setParticipantNationality(event.target.value)} placeholder="Nationality (optional)" className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm" /><button className="rounded-xl bg-[#0b192c] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white lg:col-span-4">{editingParticipantId ? 'Save participant' : 'Add participant'}</button></form><ul className="mt-6 grid gap-2">{participants.map((participant) => <li key={participant.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm"><span><strong>{participant.name}</strong><span className="ml-3 text-slate-500">{participant.category}{participant.email ? ` · ${participant.email}` : ''}</span></span><span className="flex items-center gap-2"><span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase text-amber-700">{participant.status}</span><button type="button" onClick={() => { setEditingParticipantId(participant.id); setParticipantName(participant.name); setParticipantCategory(participant.category); setParticipantEmail(participant.email ?? ''); setParticipantNationality(participant.nationality ?? '') }} className="text-xs font-semibold text-blue-700">Edit</button><button type="button" onClick={() => void removeParticipant(participant.id)} className="text-xs font-semibold text-red-700">Archive</button></span></li>)}{participants.length === 0 && <li className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500">No participants have been added for this country yet.</li>}</ul></section>}

{active === 'Country teams' && <section className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6"><h3 className="text-xl font-semibold">Invite an NHA administrator</h3><p className="mt-2 text-sm text-slate-500">The invitation is stored against {selectedOrganization?.country ?? 'the selected country'} with server-enforced organization permissions.</p><form onSubmit={createInvitation} className="mt-6 grid gap-3 md:grid-cols-[1fr_1fr_auto]"><input aria-label="NHA contact name" value={accountContact} onChange={(event) => setAccountContact(event.target.value)} placeholder="Association contact" required className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm" /><input aria-label="NHA email" type="email" value={accountEmail} onChange={(event) => setAccountEmail(event.target.value)} placeholder="official@email.org" required className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm" /><button className="rounded-xl bg-[#0b192c] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white">Record invitation</button></form><ul className="mt-6 grid gap-2">{invitations.map((invitation) => <li key={invitation.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm"><span><strong>{invitation.email}</strong><span className="ml-3 text-slate-500">{invitation.role}</span></span><span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase text-blue-700">{invitation.status}</span></li>)}{invitations.length === 0 && <li className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500">No invitations have been recorded for this country yet.</li>}</ul></section>}

{active === 'Teams' && <section className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6"><h3 className="text-xl font-semibold">Teams</h3><form onSubmit={createTeam} className="mt-6 grid gap-3 md:grid-cols-[1fr_150px_auto]"><input value={teamName} onChange={(event) => setTeamName(event.target.value)} placeholder="Team name" required className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm" /><select value={teamCategory} onChange={(event) => setTeamCategory(event.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm"><option>Open</option><option>Under-19</option><option>Under-25</option><option>Under-40</option></select><button className="rounded-xl bg-[#0b192c] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white">Create team</button></form><ul className="mt-6 grid gap-2">{teams.map((team) => <li key={team.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm"><span><strong>{team.name}</strong><span className="ml-3 text-slate-500">{team.category}{team.coach_name ? ` · Coach ${team.coach_name}` : ''}</span></span><span className="flex items-center gap-3"><span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase text-blue-700">{team.status}</span>{team.status !== 'locked' && <button type="button" onClick={() => void updateTeamStatus(team.id, 'locked')} className="text-xs font-semibold text-blue-700">Lock roster</button>}{team.status === 'locked' && <button type="button" onClick={() => void updateTeamStatus(team.id, 'draft')} className="text-xs font-semibold text-amber-700">Unlock</button>}</span></li>)}{teams.length === 0 && <li className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500">No teams have been created for this country yet.</li>}</ul></section>}

{active === 'Requests' && <section className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6"><h3 className="text-xl font-semibold">Support requests</h3><form onSubmit={createRequest} className="mt-6 grid gap-3"><input value={requestSubject} onChange={(event) => setRequestSubject(event.target.value)} placeholder="Request subject" required className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm" /><textarea value={requestDescription} onChange={(event) => setRequestDescription(event.target.value)} placeholder="Describe the request" required rows={4} className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm" /><button className="w-fit rounded-xl bg-[#0b192c] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white">Submit request</button></form><ul className="mt-6 grid gap-2">{requests.map((request) => <li key={request.id} className="rounded-xl border border-slate-200 px-4 py-3 text-sm"><div className="flex justify-between gap-3"><strong>{request.subject}</strong><span className="text-xs uppercase text-blue-700">{request.status}</span></div><p className="mt-2 text-slate-500">{request.description}</p></li>)}{requests.length === 0 && <li className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500">No requests have been submitted.</li>}</ul></section>}

{active === 'Notifications' && <section className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-6"><h3 className="text-xl font-semibold">Notifications</h3><ul className="mt-6 grid gap-2">{notifications.map((notification) => <li key={notification.id} className={`rounded-xl border px-4 py-3 text-sm ${notification.read_at ? 'border-slate-200' : 'border-blue-300 bg-blue-50/50'}`}><div className="flex items-start justify-between gap-3"><div><strong>{notification.title}</strong><p className="mt-1 text-slate-500">{notification.body}</p></div>{!notification.read_at && <button onClick={() => void markNotificationRead(notification.id)} className="text-xs font-semibold text-blue-700">Mark read</button>}</div></li>)}{notifications.length === 0 && <li className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500">You have no notifications.</li>}</ul></section>}

{['Documents', 'Submissions', 'Compliance', 'Travel', 'Reports', 'Settings'].includes(active) && <section className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8"><h3 className="text-xl font-semibold">{active}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">This section is reserved for the next connected data screen. No fake save controls are shown here; records remain protected by the organization policies until the corresponding form is available.</p></section>}</div></section></div></main>
}
