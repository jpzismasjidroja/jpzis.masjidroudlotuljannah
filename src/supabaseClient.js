import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wphiberzrkkcqibwmamo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwaGliZXJ6cmtrY3FpYndtYW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMzY1OTEsImV4cCI6MjA4MzgxMjU5MX0.dxWI4wBPCsASOYzvLczgvMwn95BcB9cqSH0fbup_4d0'

export const supabase = createClient(supabaseUrl, supabaseKey)