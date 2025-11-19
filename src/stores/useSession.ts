import { create } from 'zustand';
import { onAuthChanged } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';

type SessionState = {
  session: any | null;
  ready: boolean;
};

export const useSession = create<SessionState>(() => ({ session: null, ready: false }));

// bootstrap una vez (ej: en main o App)
export async function initAuthStore() {
  const { data } = await supabase.auth.getSession();
  useSession.setState({ session: data.session, ready: true });
  onAuthChanged((s) => useSession.setState({ session: s, ready: true }));
}
