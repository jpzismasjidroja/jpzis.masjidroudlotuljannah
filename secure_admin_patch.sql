-- SECURITY PATCH: Secure admin_roles table
-- Prevents Information Disclosure (public listing of admins)
-- Fixes Infinite Recursion in Policy Definitions

-- 1. Reset Policies on admin_roles
ALTER TABLE public.admin_roles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON public.admin_roles;
DROP POLICY IF EXISTS "Allow everyone to read" ON public.admin_roles;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.admin_roles;
DROP POLICY IF EXISTS "Allow superadmin to manage roles" ON public.admin_roles;
DROP POLICY IF EXISTS "Superadmin Write Access" ON public.admin_roles;
DROP POLICY IF EXISTS "Allow write for superadmin" ON public.admin_roles;
DROP POLICY IF EXISTS "Allow read for authenticated" ON public.admin_roles;

-- 2. Create Secure Helper Function (to avoid recursion)
-- This function runs as the definer (admin) so it can check roles without hitting RLS loops
CREATE OR REPLACE FUNCTION public.check_is_superadmin()
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

-- 3. Policy: READ Access
-- Option A: Only authenticated users can see who is admin (Better than public)
-- Option B: Only admins can see who is admin (Best, but requires non-recursive check)
-- Let's go with Option A for simplicity and functionality (Dashboard needs to know if user is admin)
CREATE POLICY "Allow authenticated to read admin_roles"
ON public.admin_roles FOR SELECT
TO authenticated
USING (true);

-- 4. Policy: WRITE Access (Insert, Update, Delete)
-- STRICTLY RESTRICTED to Superadmins via the secure function
CREATE POLICY "Allow superadmin to modify admin_roles"
ON public.admin_roles FOR ALL
TO authenticated
USING ( public.check_is_superadmin() )
WITH CHECK ( public.check_is_superadmin() );
