import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export type Review = {
  id: string;
  user_id: string;
  venue_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
};

export function useReviews(venueId: string) {
  return useQuery<Review[]>({
    queryKey: ['reviews', venueId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('venue_id', venueId)
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data ?? [];
    },
    enabled: !!venueId,
  });
}

export function useAddReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { venue_id: string; rating: number; comment?: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Necesitas iniciar sesión.');
      const { error } = await supabase.from('reviews').insert({
        user_id: user.id, venue_id: payload.venue_id, rating: payload.rating, comment: payload.comment ?? null
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: (_,_vars) => {
      qc.invalidateQueries({ queryKey: ['reviews', _vars.venue_id] });
    }
  });
}
