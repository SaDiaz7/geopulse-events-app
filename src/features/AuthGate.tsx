import type { ReactNode } from 'react';
import { useSession } from '@/stores/useSession';

export default function AuthGate({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  const { session, ready } = useSession();
  if (!ready) return <div className="p-4 text-zinc-400">Cargando sesión…</div>;
  if (!session) return <>{fallback ?? <div className="p-4">Inicia sesión para continuar.</div>}</>;
  return <>{children}</>;
}
