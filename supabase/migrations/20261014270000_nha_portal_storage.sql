insert into storage.buckets (id, name, public)
values ('nha-documents', 'nha-documents', false)
on conflict (id) do update set public = excluded.public;

create policy "Organization members upload NHA documents"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'nha-documents'
  and public.is_org_member((storage.foldername(name))[1]::uuid)
);

create policy "Organization members read NHA documents"
on storage.objects for select
to authenticated
using (
  bucket_id = 'nha-documents'
  and public.is_org_member((storage.foldername(name))[1]::uuid)
);

create policy "Organization members delete NHA documents"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'nha-documents'
  and public.is_org_member((storage.foldername(name))[1]::uuid)
);
