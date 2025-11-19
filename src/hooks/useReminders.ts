import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export type Reminder = {
  id: string; user_id: string; event_id: string;
  remind_at: string; method: 'in-app'|'email'|'push'; created_at: string;
};

export function useReminders() {
  return useQuery<Reminder[]>({
    queryKey: ['reminders'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      const { data, error } = await supabase.from('reminders').select('*').eq('user_id', user.id)
        .order('remind_at', { ascending: true });
      if (error) throw new Error(error.message);
      return data ?? [];
    }
  });
}

export function useAddReminder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { event_id: string; remind_at: string; method?: 'in-app'|'email'|'push' }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Necesitas iniciar sesión.');
      const { error } = await supabase.from('reminders').insert({
        user_id: user.id, event_id: payload.event_id, remind_at: payload.remind_at, method: payload.method ?? 'in-app'
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['reminders'] })
  });
}

export function useDeleteReminder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('reminders').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['reminders'] })
  });
}
