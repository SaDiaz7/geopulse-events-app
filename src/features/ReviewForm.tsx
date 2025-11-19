import { useAddReview } from '@/hooks/useReviews';
import { useState } from 'react';

export default function ReviewForm({ venueId }: { venueId: string }) {
  const add = useAddReview();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); add.mutate({ venue_id: venueId, rating, comment }); setComment(''); }}
      className="space-x-2 flex items-center"
    >
      <input type="number" min={1} max={5} value={rating}
             onChange={e=>setRating(Number(e.target.value))}
             className="w-16 bg-zinc-900 border border-zinc-700 rounded-xl px-2 py-1" />
      <input value={comment} onChange={e=>setComment(e.target.value)}
             placeholder="Tu opinión…" className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-2 py-1" />
      <button className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20">Enviar</button>
    </form>
  );
}
