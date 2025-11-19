import LoginForm from '@/features/LoginForm';
import { useSession } from '@/stores/useSession';
import { signOut } from '@/lib/auth';

export default function AccountPage() {
  const { session } = useSession();
  if (!session) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-3">Ingresá</h1>
        <LoginForm />
      </div>
    );
  }
  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-bold">Tu cuenta</h1>
      <p className="opacity-70">{session.user.email}</p>
      <button onClick={() => signOut()} className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20">
        Cerrar sesión
      </button>
    </div>
  );
}
