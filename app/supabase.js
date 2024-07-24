// supabaseClient.js
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    'https://imyvybtnpcbilsvgelve.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlteXZ5YnRucGNiaWxzdmdlbHZlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDY0MjkzNiwiZXhwIjoyMDM2MjE4OTM2fQ.9i8lh1ajWsqeWLF1QtqsrGC-cj2RhETeoGwEl3_RNcA',
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignore if called from a Server Component.
          }
        },
      },
    }
  )
}
