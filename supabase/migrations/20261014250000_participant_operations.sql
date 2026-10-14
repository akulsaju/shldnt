alter table public.participants
  add column if not exists date_of_birth date,
  add column if not exists nationality text,
  add column if not exists email text,
  add column if not exists consent_status text not null default 'pending'
    check (consent_status in ('pending', 'received', 'rejected', 'expired'));

create index if not exists participants_organization_status_idx
  on public.participants (organization_id, status);

create index if not exists documents_organization_status_idx
  on public.documents (organization_id, status);

create index if not exists teams_organization_status_idx
  on public.teams (organization_id, status);
