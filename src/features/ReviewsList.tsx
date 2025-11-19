import { useReviews } from '@/hooks/useReviews';

export default function ReviewsList({ venueId }: { venueId: string }) {
  const { data, isLoading } = useReviews(venueId);
  if (isLoading) return <p className="opacity-70">Cargando reseñas…</p>;
  if (!data?.length) return <p className="opacity-70">Sé el primero en opinar.</p>;
  return (
    <ul className="space-y-2">
      {data.map(r => (
        <li key={r.id} className="bg-zinc-800 rounded-xl p-2">
          <b>{'★'.repeat(r.rating)}</b>
          <p className="text-sm opacity-80">{r.comment}</p>
        </li>
      ))}
    </ul>
  );
}
