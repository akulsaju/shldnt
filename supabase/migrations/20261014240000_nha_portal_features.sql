create table public.teams (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  category text not null default 'Open',
  status text not null default 'draft' check (status in ('draft', 'submitted', 'locked', 'approved', 'rejected')),
  captain_id uuid references public.participants(id) on delete set null,
  coach_name text,
  judge_name text,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, name)
);

create table public.team_members (
  team_id uuid not null references public.teams(id) on delete cascade,
  participant_id uuid not null references public.participants(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (team_id, participant_id)
);

create table public.document_requirements (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  required_for text not null default 'organization',
  due_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  participant_id uuid references public.participants(id) on delete cascade,
  team_id uuid references public.teams(id) on delete cascade,
  requirement_id uuid references public.document_requirements(id) on delete set null,
  name text not null,
  storage_path text not null,
  mime_type text,
  size_bytes bigint,
  version integer not null default 1,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'expired')),
  expires_at timestamptz,
  rejection_reason text,
  uploaded_by uuid not null references public.profiles(id),
  reviewed_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.request_comments (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  author_id uuid not null references public.profiles(id),
  body text not null,
  internal boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade,
  title text not null,
  body text not null,
  kind text not null default 'info',
  link text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  team_id uuid references public.teams(id) on delete set null,
  title text not null,
  description text,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'submitted', 'in_review', 'approved', 'rejected')),
  deadline_at timestamptz,
  submitted_by uuid references public.profiles(id),
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.submission_reviews (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  reviewer_id uuid not null references public.profiles(id),
  decision text not null check (decision in ('approved', 'rejected', 'needs_changes')),
  reason text,
  created_at timestamptz not null default now()
);

create table public.consent_records (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  participant_id uuid not null references public.participants(id) on delete cascade,
  consent_type text not null check (consent_type in ('guardian', 'media', 'photography', 'safeguarding')),
  status text not null default 'pending' check (status in ('pending', 'received', 'rejected', 'expired')),
  received_at timestamptz,
  expires_at timestamptz,
  document_id uuid references public.documents(id) on delete set null,
  notes text,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  unique (participant_id, consent_type)
);

create table public.emergency_contacts (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  name text not null,
  relationship text not null,
  phone text not null,
  email text,
  notes text,
  created_at timestamptz not null default now()
);

create table public.travel_records (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  participant_id uuid references public.participants(id) on delete cascade,
  team_id uuid references public.teams(id) on delete cascade,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'ready', 'submitted', 'approved', 'rejected')),
  passport_document_id uuid references public.documents(id) on delete set null,
  visa_required boolean not null default false,
  visa_support_requested boolean not null default false,
  arrival_at timestamptz,
  departure_at timestamptz,
  notes text,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organization_settings (
  organization_id uuid primary key references public.organizations(id) on delete cascade,
  profile jsonb not null default '{}'::jsonb,
  contacts jsonb not null default '[]'::jsonb,
  safeguarding jsonb not null default '{}'::jsonb,
  accessibility jsonb not null default '{}'::jsonb,
  dietary jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  title text not null,
  body text not null,
  published boolean not null default false,
  published_at timestamptz,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.help_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  category text not null default 'general',
  published boolean not null default true,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array['teams', 'documents', 'submissions', 'travel_records', 'organization_settings', 'help_articles']
  loop
    execute format('drop trigger if exists %I_updated_at on public.%I', table_name, table_name);
    execute format('create trigger %I_updated_at before update on public.%I for each row execute procedure public.touch_updated_at()', table_name, table_name);
  end loop;
end $$;

alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.document_requirements enable row level security;
alter table public.documents enable row level security;
alter table public.request_comments enable row level security;
alter table public.notifications enable row level security;
alter table public.submissions enable row level security;
alter table public.submission_reviews enable row level security;
alter table public.consent_records enable row level security;
alter table public.emergency_contacts enable row level security;
alter table public.travel_records enable row level security;
alter table public.organization_settings enable row level security;
alter table public.announcements enable row level security;
alter table public.help_articles enable row level security;

create policy "Members view teams" on public.teams for select using (public.is_org_member(organization_id));
create policy "Members create teams" on public.teams for insert with check (public.is_org_member(organization_id) and created_by = auth.uid());
create policy "Members update teams" on public.teams for update using (public.is_org_member(organization_id));
create policy "Admins delete teams" on public.teams for delete using (public.is_org_admin(organization_id));

create policy "Members view team members" on public.team_members for select using (
  exists (select 1 from public.teams t where t.id = team_id and public.is_org_member(t.organization_id))
);
create policy "Members manage team members" on public.team_members for all using (
  exists (select 1 from public.teams t where t.id = team_id and public.is_org_member(t.organization_id))
) with check (
  exists (select 1 from public.teams t where t.id = team_id and public.is_org_member(t.organization_id))
);

create policy "Members view document requirements" on public.document_requirements for select using (
  organization_id is null or public.is_org_member(organization_id)
);
create policy "Admins manage document requirements" on public.document_requirements for all using (
  organization_id is null or public.is_org_admin(organization_id)
) with check (organization_id is null or public.is_org_admin(organization_id));

create policy "Members view documents" on public.documents for select using (public.is_org_member(organization_id));
create policy "Members upload documents" on public.documents for insert with check (public.is_org_member(organization_id) and uploaded_by = auth.uid());
create policy "Members update documents" on public.documents for update using (public.is_org_member(organization_id));
create policy "Admins delete documents" on public.documents for delete using (public.is_org_admin(organization_id));

create policy "Members view request comments" on public.request_comments for select using (
  exists (select 1 from public.requests r where r.id = request_id and public.is_org_member(r.organization_id) and (not internal or public.is_org_admin(r.organization_id)))
);
create policy "Members create request comments" on public.request_comments for insert with check (
  author_id = auth.uid() and exists (select 1 from public.requests r where r.id = request_id and public.is_org_member(r.organization_id) and (not internal or public.is_org_admin(r.organization_id)))
);

create policy "Users view notifications" on public.notifications for select using (user_id = auth.uid());
create policy "Users update notifications" on public.notifications for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Members view submissions" on public.submissions for select using (public.is_org_member(organization_id));
create policy "Members create submissions" on public.submissions for insert with check (public.is_org_member(organization_id) and submitted_by = auth.uid());
create policy "Members update submissions" on public.submissions for update using (public.is_org_member(organization_id));
create policy "Admins manage submission reviews" on public.submission_reviews for all using (
  exists (select 1 from public.submissions s where s.id = submission_id and public.is_org_admin(s.organization_id))
) with check (
  exists (select 1 from public.submissions s where s.id = submission_id and public.is_org_admin(s.organization_id))
);

create policy "Members view consent records" on public.consent_records for select using (public.is_org_member(organization_id));
create policy "Members manage consent records" on public.consent_records for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id) and created_by = auth.uid());

create policy "Members view emergency contacts" on public.emergency_contacts for select using (
  exists (select 1 from public.participants p where p.id = participant_id and public.is_org_member(p.organization_id))
);
create policy "Members manage emergency contacts" on public.emergency_contacts for all using (
  exists (select 1 from public.participants p where p.id = participant_id and public.is_org_member(p.organization_id))
);

create policy "Members view travel records" on public.travel_records for select using (public.is_org_member(organization_id));
create policy "Members manage travel records" on public.travel_records for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id) and created_by = auth.uid());

create policy "Members view settings" on public.organization_settings for select using (public.is_org_member(organization_id));
create policy "Admins manage settings" on public.organization_settings for all using (public.is_org_admin(organization_id)) with check (public.is_org_admin(organization_id));

create policy "Members view announcements" on public.announcements for select using (
  organization_id is null or public.is_org_member(organization_id)
);
create policy "Admins manage announcements" on public.announcements for all using (
  organization_id is null or public.is_org_admin(organization_id)
) with check (organization_id is null or public.is_org_admin(organization_id));

create policy "Authenticated users view help" on public.help_articles for select using (auth.uid() is not null and published);
create policy "Super admins manage help" on public.help_articles for all using (public.is_super_admin()) with check (public.is_super_admin());

insert into public.document_requirements (name, description, required_for)
select seeded.name, seeded.description, seeded.required_for
from (values
  ('Association profile', 'Verified National Hackathon Association profile', 'organization'),
  ('Proof of registration', 'Proof that the association is legally registered', 'organization'),
  ('Safeguarding policy', 'Current safeguarding policy', 'organization'),
  ('Code of conduct', 'Signed code of conduct', 'participant'),
  ('Guardian consent', 'Guardian consent for minors', 'participant'),
  ('Media consent', 'Media and photography consent', 'participant'),
  ('Travel document', 'Passport or travel document', 'participant')
) as seeded(name, description, required_for)
where not exists (select 1 from public.document_requirements r where r.name = seeded.name and r.organization_id is null);
