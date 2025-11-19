import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export type Event = {
  id: string;
  venue_id: string;
  title: string;
  description?: string | null;
  starts_at: string;
  ends_at?: string | null;
  price?: number | null;
  category?: string | null;
  created_at: string;
};

async function fetchEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*, venues(name, city)')
    .order('starts_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export function useEvents() {
  return useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });
}
