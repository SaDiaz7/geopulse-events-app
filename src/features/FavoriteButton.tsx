import { useFavorites, useToggleFavorite } from '@/hooks/useFavorites';

export default function FavoriteButton({ venueId }: { venueId: string }) {
  const { data: favs } = useFavorites();
  const toggle = useToggleFavorite();
  const isFav = !!favs?.includes(venueId);

  return (
    <button
      onClick={() => toggle.mutate(venueId)}
      className={`px-2 py-1 rounded-xl text-sm ${isFav?'bg-pink-600/20':'bg-white/10 hover:bg-white/20'}`}
      title={isFav?'Quitar de favoritos':'Agregar a favoritos'}
    >
      {isFav ? '★ Favorito' : '☆ Favorito'}
    </button>
  );
}