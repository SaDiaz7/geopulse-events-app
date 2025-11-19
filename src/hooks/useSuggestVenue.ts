import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export function useSuggestVenue() {
  return useMutation({
    mutationFn: async (payload: {
      name: string; address?: string; city?: string;
      lat: number; lng: number; tags?: string[]; notes?: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Necesitás iniciar sesión.');
      const { error } = await supabase.from('venue_suggestions').insert({
        user_id: user.id,
        name: payload.name,
        address: payload.address ?? null,
        city: payload.city ?? null,
        lat: payload.lat,
        lng: payload.lng,
        tags: (payload.tags ?? []),
        notes: payload.notes ?? null,
      });
      if (error) throw new Error(error.message);
    }
  });
}
