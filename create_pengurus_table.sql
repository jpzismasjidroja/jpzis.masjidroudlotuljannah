-- Create table for Structure Members (Pengurus)
create table if not exists pengurus (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text not null,
  image_url text,
  "order" integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table pengurus enable row level security;

-- Create policies
create policy "Public can view pengurus"
  on pengurus for select
  using ( true );

create policy "Admins can insert pengurus"
  on pengurus for insert
  with check ( auth.role() = 'authenticated' );

create policy "Admins can update pengurus"
  on pengurus for update
  using ( auth.role() = 'authenticated' );

create policy "Admins can delete pengurus"
  on pengurus for delete
  using ( auth.role() = 'authenticated' );

-- Storage bucket for pengurus-images (if not exists)
insert into storage.buckets (id, name, public)
values ('pengurus-images', 'pengurus-images', true)
on conflict (id) do nothing;

-- Storage policies
create policy "Public images are accessible"
  on storage.objects for select
  using ( bucket_id = 'pengurus-images' );

create policy "Admins can upload images"
  on storage.objects for insert
  with check ( bucket_id = 'pengurus-images' and auth.role() = 'authenticated' );

create policy "Admins can update images"
  on storage.objects for update
  using ( bucket_id = 'pengurus-images' and auth.role() = 'authenticated' );

create policy "Admins can delete images"
  on storage.objects for delete
  using ( bucket_id = 'pengurus-images' and auth.role() = 'authenticated' );
