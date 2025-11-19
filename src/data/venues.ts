import { supabase } from '../lib/supabaseClient';

export type Venue = {
  id: string; name: string; description: string | null;
  address: string | null; city: string | null;
  lat: number; lng: number; tags: any; created_at: string;
};

export async function listVenues() {
  const { data, error } = await supabase
    .from('venues')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Venue[];
}

export async function nearbyVenues(lat: number, lng: number, meters = 5000) {
  const { data, error } = await supabase.rpc('venues_nearby', { p_lat: lat, p_lng: lng, p_meters: meters });
  if (error) throw error;
  return data as Venue[];
}
