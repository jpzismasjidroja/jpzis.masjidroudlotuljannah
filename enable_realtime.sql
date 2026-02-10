-- Enable Realtime for Donations and Articles tables
-- Run this in Supabase SQL Editor

begin;

  -- 1. Check if publication exists, if not create it (usually 'supabase_realtime' exists by default)
  -- We assume 'supabase_realtime' exists as it is default.

  -- 2. Add tables to the publication
  -- This allows INSERT/UPDATE/DELETE events to be broadcasted
  alter publication supabase_realtime add table donations;
  alter publication supabase_realtime add table articles;

commit;
