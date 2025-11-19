import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export function useFavorites() {
  return useQuery<string[]>({
    queryKey: ['favorites'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      const { data, error } = await supabase.from('favorites').select('venue_id').eq('user_id', user.id);
      if (error) throw new Error(error.message);
      return (data ?? []).map(r => r.venue_id);
    }
  });
}

export function useToggleFavorite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (venueId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Necesitas iniciar sesión.');
      const { data: exists } = await supabase.from('favorites').select('*')
        .eq('user_id', user.id).eq('venue_id', venueId).maybeSingle();
      if (exists) {
        const { error } = await supabase.from('favorites').delete()
          .eq('user_id', user.id).eq('venue_id', venueId);
        if (error) throw new Error(error.message);
        return { removed: true, venueId };
      } else {
        const { error } = await supabase.from('favorites').insert({ user_id: user.id, venue_id: venueId });
        if (error) throw new Error(error.message);
        return { removed: false, venueId };
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['favorites'] }); }
  });
}
