import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gyzrifujxztrhypzbxam.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5enJpZnVqeHp0cmh5cHpieGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMzE4MjIsImV4cCI6MjA1NzYwNzgyMn0.2snJvIs9RCYodysb78eTkooYo5kHJsMCncNSAaxaIcM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
