import { supabase } from './supabaseClient';

export function onAuthChanged(cb: (session: any) => void) {
  const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => cb(session));
  return () => sub.subscription.unsubscribe();
}

export async function signInWithEmail(email: string) {
  // Magic link
  const { error } = await supabase.auth.signInWithOtp({ email });
  if (error) throw error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
