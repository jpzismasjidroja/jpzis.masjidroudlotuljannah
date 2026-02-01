-- 1. DROP POLICY yang menyebabkan Infinite Loop
drop policy if exists "Enable read access for all users" on public.admin_roles;
drop policy if exists "Allow public read access" on public.admin_roles;
drop policy if exists "Allow superadmin to manage roles" on public.admin_roles;
drop policy if exists "Allow everyone to read" on public.admin_roles;
drop policy if exists "Superadmin Write Access" on public.admin_roles;

-- 2. CREATE SIMPLE NON-RECURSIVE POLICIES

-- Policy 1: allow ALL authenticated users to READ admin_roles
-- This is necessary so they can check "Am I a superadmin?" without triggering a loop.
create policy "Allow read for authenticated"
on public.admin_roles for select
to authenticated
using (true);

-- Policy 2: Allow ONLY currently logged in Superadmin to Write
-- We hardcode the email logic OR use a simplified check that breaks recursion locally.
-- Instead of querying the table again (which loops), we check if the user's email is IN the list of superadmins (conceptually).
-- BUT since we can't hardcode emails in SQL easily, let's use a SECURITY DEFINER function to break the loop.
-- APPROACH: Use a function to check role.

CREATE OR REPLACE FUNCTION public.is_superadmin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.admin_roles
    WHERE email = auth.jwt() ->> 'email'
    AND role = 'superadmin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- SECURITY DEFINER means this function runs with the privileges of the creator (postgres/admin), bypassing RLS on the table itself during the check inside the function!

-- Policy 3: Allow Write if is_superadmin() is true
create policy "Allow write for superadmin"
on public.admin_roles for all
to authenticated
using (  is_superadmin()  )
with check (  is_superadmin()  );
