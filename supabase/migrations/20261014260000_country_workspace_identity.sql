alter table public.organizations
  add column if not exists admin_email text,
  add column if not exists workspace_label text;

update public.organizations
set
  admin_email = case
    when slug = 'global' then 'team@worldhackathonfederation.tech'
    else slug || '@email.worldhackathonfederation.tech'
  end,
  workspace_label = name
where admin_email is null;

alter table public.organizations
  alter column admin_email set not null;

create unique index if not exists organizations_admin_email_idx
  on public.organizations (lower(admin_email));

alter table public.invitations
  add column if not exists contact_name text,
  add column if not exists accepted_at timestamptz;

create index if not exists invitations_email_status_idx
  on public.invitations (lower(email), status);
