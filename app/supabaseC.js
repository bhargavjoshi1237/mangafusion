// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and anon key
const SUPABASE_URL = 'https://imyvybtnpcbilsvgelve.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlteXZ5YnRucGNiaWxzdmdlbHZlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDY0MjkzNiwiZXhwIjoyMDM2MjE4OTM2fQ.9i8lh1ajWsqeWLF1QtqsrGC-cj2RhETeoGwEl3_RNcA';

// Create and export Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
