// src/pages/Home.tsx
import MapView from '@/features/map/MapView';
import Feed from '@/features/feed/Feed';
import { useVenues } from '@/hooks/useVenues';
import { useEvents } from '@/hooks/useEvents';

export default function Home() {
  const { data: venues = [] } = useVenues();
  const { data: events = [] } = useEvents();

  return (
    <div className="grid md:grid-cols-2 min-h-screen gap-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">GeoPulse</h1>
        <p className="text-sm opacity-70 mb-3">Descubrí bares y clubes cerca tuyo.</p>

        <div className="h-[60vh] md:h-[70vh]">
          <MapView
            points={venues.map(v => ({
              id: v.id,
              name: v.name,
              lat: v.lat,
              lng: v.lng,
            }))}
          />
        </div>
      </div>

      <aside className="p-4 space-y-6 border-l border-white/10">
        <Feed venues={venues} events={events} />
      </aside>
    </div>
  );
}
