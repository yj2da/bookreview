import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types' // We'll assume this might be generated or just use any for now

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
