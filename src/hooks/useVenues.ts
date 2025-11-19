import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

import { getVenueIcon } from "@/lib/venueIcons";

type VenueRow = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address?: string | null;
  city?: string | null;
  description?: string | null;
  category?: string | null;
  tags?: any | null; // si lo usás después
};

export function useVenues() {
  return useQuery({
    queryKey: ['venues'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('venues_with_coords')
        .select(`
          id,
          name,
          lat,
          lng,
          address,
          city,
          description,
          category,
          tags
        `)
        .order('name', { ascending: true });

      if (error) throw error;

      const rows = (data ?? []) as VenueRow[];

      return rows
        .filter(v => typeof v.lat === 'number' && typeof v.lng === 'number')
        .map(v => ({
          id: v.id,
          name: v.name,
          lat: v.lat,
          lng: v.lng,
          address: v.address ?? (v.city ? `(${v.city})` : undefined),
          description: v.description ?? undefined,
          category: v.category ?? undefined,
          iconUrl: getVenueIcon(v.category), // siempre string
          tags: v.tags ?? undefined,
        }));
    },
  });
}
