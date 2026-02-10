-- CRITICAL FIXES FOR REALTIME AND PUBLIC ACCESS
-- Run this in Supabase SQL Editor

begin;

  -- 1. Enable Realtime for donations table
  -- This ensures the website updates automatically when new donations come in
  alter publication supabase_realtime add table donations;

  -- 2. Allow Public Access to Donations (for Homepage Total)
  -- Previously, only admins could see donations, so the homepage showed 0 (RP 0)
  -- We now allow public to read donations to show the total amount
  drop policy if exists "Donors can view own donations" on public.donations;
  drop policy if exists "Public can view donations" on public.donations;
  
  create policy "Public can view donations" 
  on public.donations 
  for select 
  to public 
  using (true);

commit;
