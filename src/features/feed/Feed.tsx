import { useState } from "react";
import { KebabMenu } from "@/features/feed/KebabMenu";
import { SuggestionModal } from "@/features/feed/SuggestionModal";
import type { VenueLite } from "@/types/suggestions";

import FavoriteButton from '@/features/FavoriteButton';
import ReminderBtn from '@/features/ReminderBtn';
import ReviewsList from '@/features/ReviewsList';
import ReviewForm from '@/features/ReviewForm';
import AuthGate from '@/features/AuthGate';
import { useMap } from '@/stores/useMap';
import SuggestVenueForm from '@/features/SuggestVenueForm';


type Venue = {
  id: string;
  name: string;
  address?: string | null;
  lat: number;
  lng: number;
  description?: string | null;
  category?: string | null;
  iconUrl?: string;
};


type Event = {
  id: string; title: string; starts_at: string;
};

export default function Feed({ venues, events }: { venues: Venue[]; events: Event[] }) {
  const selectedVenueId = useMap(s => s.selectedVenueId);

  const [suggOpen, setSuggOpen] = useState(false);
  const [suggVenue, setSuggVenue] = useState<VenueLite | undefined>(undefined);

  const toVenueLite = (v: any): VenueLite => ({
  id: v.id,
  name: v.name,
  category: v.category,
  address: v.address,
  lat: v.lat,
  lng: v.lng,
  description: v.description,
  iconUrl: v.iconUrl,
  });

  return (
    <div className="space-y-8">
      {/* Lista de venues */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Lugares</h2>
        <ul className="space-y-2">
          {venues.map((v) => (
            <li
              key={v.id}
              onClick={() => {
                useMap.getState().flyTo(v.lat, v.lng, 17);
              }}
              className={`bg-zinc-800 rounded-2xl p-3 flex items-center justify-between cursor-pointer ${
                  useMap.getState().selectedVenueId === v.id
                    ? "ring-2 ring-white/20"
                    : "hover:bg-neutral-800"
              }`}
            >
              {/* IZQUIERDA: info del venue */}
              <div className="flex flex-col">
                <img src={v.iconUrl} alt={v.category ?? "lugar"} className="w-5 h-5 opacity-70" />
                <span className="text-base font-semibold text-white">{v.name}</span>
                <span className="opacity-70 text-sm text-neutral-300">
                  {v.address || v.description || v.category || "Sin descripción"}
                </span>
              </div>

              {/* DERECHA: acciones */}
              <div className="flex items-center gap-2">
                <FavoriteButton venueId={v.id} />
                <KebabMenu
                  onSuggestEdit={() => {
                    setSuggVenue(toVenueLite(v));
                    setSuggOpen(true);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>

        {/* Bloque de reseñas solo si hay venue seleccionado */}
        {selectedVenueId && (
          <div className="space-y-3 mt-4">
            <h3 className="text-lg font-semibold">Reseñas</h3>
            <ReviewsList venueId={selectedVenueId} />
            <AuthGate fallback={<div className="opacity-70">Ingresá para dejar tu reseña.</div>}>
              <ReviewForm venueId={selectedVenueId} />
            </AuthGate>
          </div>
        )}
      </section>

      {/* Lista de eventos */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Eventos</h2>
        <ul className="space-y-2">
          {events.map(e => (
            <li key={e.id} className="bg-zinc-800 rounded-xl p-3 flex items-center justify-between">
              <div>
                <b className="block">{e.title}</b>
                <span className="opacity-70 text-sm">{new Date(e.starts_at).toLocaleString()}</span>
              </div>
              <ReminderBtn eventId={e.id} whenISO={e.starts_at} />
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-6">
        <SuggestVenueForm />
      </section>
    </div>
  );
  <SuggestionModal
    open={suggOpen}
    mode={suggVenue ? "EDIT" : "ADD"}
    venue={suggVenue}
    onClose={() => setSuggOpen(false)}
    onCreated={() => {
      console.log("Sugerencia creada ✅");
    }}
  />
}
