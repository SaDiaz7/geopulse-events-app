import { supabase } from './lib/supabaseClient';

async function testConnection() {
  const { data, error } = await supabase.from('venues').select('*').limit(1);
  console.log('✅ data:', data);
  console.log('⚠️ error:', error);
}

testConnection();
