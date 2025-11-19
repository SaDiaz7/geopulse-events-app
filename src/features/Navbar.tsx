import { NavLink, useNavigate } from 'react-router-dom';
import { useSession } from '@/stores/useSession';
import { signOut } from '@/lib/auth';

export default function Navbar() {
  const { session } = useSession();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        {/* Logo / brand */}
        <button
          onClick={() => navigate('/')}
          className="text-xl font-extrabold tracking-tight"
          aria-label="GeoPulse Home"
        >
          GeoPulse
        </button>

        {/* Links */}
        <div className="flex items-center gap-2 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-xl hover:bg-white/10 ${isActive ? 'bg-white/10' : ''}`
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-xl hover:bg-white/10 ${isActive ? 'bg-white/10' : ''}`
            }
          >
            Favoritos
          </NavLink>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Cuenta */}
        {session ? (
          <div className="flex items-center gap-2">
            <span className="text-xs opacity-70 hidden sm:block">
              {session.user.email}
            </span>
            <button
              onClick={() => signOut()}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <NavLink
            to="/account"
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm"
          >
            Ingresar
          </NavLink>
        )}
      </nav>
    </header>
  );
}
