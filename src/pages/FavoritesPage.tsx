// src/pages/FavoritesPage.tsx
import AuthGate from '@/features/AuthGate';
import { useFavorites } from '@/hooks/useFavorites';
import { useVenues } from '@/hooks/useVenues';

export default function FavoritesPage() {
  const { data: favIds = [] } = useFavorites();
  const { data: venues = [] } = useVenues();

  const favVenues = venues.filter(v => favIds.includes(v.id));

  return (
    <AuthGate fallback={<div className="p-4"><b>Ingresá</b> para ver tus favoritos.</div>}>
      <div className="p-4 space-y-3">
        <h1 className="text-2xl font-bold">Tus favoritos</h1>
        {!favVenues.length ? (
          <p className="opacity-70">Todavía no marcaste favoritos.</p>
        ) : (
          <ul className="space-y-2">
            {favVenues.map(v => (
              <li key={v.id} className="bg-zinc-800 rounded-xl p-3">
                <b className="block">{v.name}</b>
                <span className="opacity-70 text-sm">{v.address ?? ''}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AuthGate>
  );
}
