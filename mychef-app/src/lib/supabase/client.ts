'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fhoubciqyenbimpizjmd.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZob3ViY2lxeWVuYmltcGl6am1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzg1MTMsImV4cCI6MjA5MzY1NDUxM30.aoTZvXXac17qov1EVfaj44ydVlshUOMhyeEXWQ3vis8'

export function createClient() {
  return createBrowserClient<Database>(supabaseUrl, supabaseKey)
}
