-- 1. Create Admin Roles table
create table if not exists public.admin_roles (
  email text primary key,
  role text not null check (role in ('superadmin', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable RLS
alter table public.admin_roles enable row level security;

-- 3. Policies
drop policy if exists "Allow public read access" on public.admin_roles;
create policy "Allow public read access"
on public.admin_roles for select
to public
using (true);

drop policy if exists "Allow superadmin to manage roles" on public.admin_roles;
create policy "Allow superadmin to manage roles"
on public.admin_roles for all
to authenticated
using (
  exists (
    select 1 from public.admin_roles
    where email = auth.jwt() ->> 'email'
    and role = 'superadmin'
  )
);

-- 4. INSERT SUPERADMIN
insert into public.admin_roles (email, role)
values ('nnvnxx.10@gmail.com', 'superadmin')
on conflict (email) do update set role = 'superadmin';
