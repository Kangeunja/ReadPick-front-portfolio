import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rzzwtstbwfdzuadaixay.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_4CGQUcaj2fcdOLbOXw0Niw_KEBBRm9Y';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
