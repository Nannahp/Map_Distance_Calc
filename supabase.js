import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'url';
const SUPABASE_ANON_KEY = 'api'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
