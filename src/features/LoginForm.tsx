import { useState } from 'react';
import { signInWithEmail } from '@/lib/auth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmail(email);
      setMsg('Te enviamos un link a tu correo ✉️');
    } catch (e: any) {
      setMsg(e.message);
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 w-full"
        placeholder="tu@correo.com"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <button disabled={loading} className="rounded-xl px-3 py-2 bg-white/10 hover:bg-white/20">
        {loading ? 'Enviando…' : 'Ingresar con Magic Link'}
      </button>
      {msg && <p className="text-sm opacity-70">{msg}</p>}
    </form>
  );
}
