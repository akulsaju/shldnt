create extension if not exists "pgcrypto";

create type public.app_role as enum ('super_admin', 'nha_admin', 'team_member');
create type public.invitation_status as enum ('pending', 'accepted', 'revoked', 'expired');
create type public.request_status as enum ('open', 'in_progress', 'waiting', 'resolved', 'rejected');

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text not null unique,
  slug text not null unique,
  status text not null default 'pending' check (status in ('pending', 'active', 'suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.app_role not null default 'team_member',
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.invitations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  email text not null,
  role public.app_role not null default 'team_member',
  token uuid not null default gen_random_uuid() unique,
  status public.invitation_status not null default 'pending',
  invited_by uuid not null references public.profiles(id),
  expires_at timestamptz not null default (now() + interval '7 days'),
  created_at timestamptz not null default now()
);

create table public.participants (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  category text not null,
  status text not null default 'draft',
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.requests (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  subject text not null,
  description text not null,
  status public.request_status not null default 'open',
  created_by uuid not null references public.profiles(id),
  assigned_to uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  actor_id uuid not null references public.profiles(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', new.email), new.email)
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.organization_members
    where user_id = auth.uid() and role = 'super_admin'
  );
$$;

create or replace function public.is_org_member(target_org uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_super_admin() or exists (
    select 1 from public.organization_members
    where organization_id = target_org and user_id = auth.uid()
  );
$$;

create or replace function public.is_org_admin(target_org uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_super_admin() or exists (
    select 1 from public.organization_members
    where organization_id = target_org
      and user_id = auth.uid()
      and role = 'nha_admin'
  );
$$;

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.organization_members enable row level security;
alter table public.invitations enable row level security;
alter table public.participants enable row level security;
alter table public.requests enable row level security;
alter table public.audit_logs enable row level security;

create policy "Members can view their organizations" on public.organizations
  for select using (public.is_org_member(id));
create policy "Super admins manage organizations" on public.organizations
  for all using (public.is_super_admin()) with check (public.is_super_admin());

create policy "Users can view their profile" on public.profiles
  for select using (id = auth.uid() or public.is_super_admin());
create policy "Users can update their profile" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

create policy "Members can view organization membership" on public.organization_members
  for select using (user_id = auth.uid() or public.is_org_member(organization_id));
create policy "Admins manage organization membership" on public.organization_members
  for all using (public.is_org_admin(organization_id)) with check (public.is_org_admin(organization_id));

create policy "Admins manage invitations" on public.invitations
  for all using (public.is_org_admin(organization_id)) with check (public.is_org_admin(organization_id));

create policy "Members view participants" on public.participants
  for select using (public.is_org_member(organization_id));
create policy "Members create participants" on public.participants
  for insert with check (public.is_org_member(organization_id) and created_by = auth.uid());
create policy "Members update participants" on public.participants
  for update using (public.is_org_member(organization_id));

create policy "Members view requests" on public.requests
  for select using (public.is_org_member(organization_id));
create policy "Members create requests" on public.requests
  for insert with check (public.is_org_member(organization_id) and created_by = auth.uid());
create policy "Admins manage requests" on public.requests
  for update using (public.is_org_admin(organization_id));

create policy "Admins view audit logs" on public.audit_logs
  for select using (public.is_org_admin(organization_id));
