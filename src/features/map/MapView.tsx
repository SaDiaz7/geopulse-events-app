// src/features/map/MapView.tsx
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import marker1x from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useMap as useMapStore } from '@/stores/useMap';

// Componente que sincroniza center/zoom cuando el usuario mueve el mapa
function MapEventBinder() {
  const setCenter = useMapStore((s) => s.setCenter);
  const setZoom = useMapStore((s) => s.setZoom);

  useMapEvents({
    moveend(e) {
      const m = e.target as L.Map;
      const c = m.getCenter();
      setCenter([c.lat, c.lng]);
      setZoom(m.getZoom());
    },
  });

  return null;
}

const DefaultIcon = L.icon({
  iconRetinaUrl: marker2x,
  iconUrl: marker1x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// 1) Opción global (recomendada):
L.Marker.prototype.options.icon = DefaultIcon;

// Componente que registra la instancia del mapa en el store (v5 no tiene whenCreated)
function MapRegister() {
  const map = useMap();
  const setMap = useMapStore((s) => s.setMap);
  useEffect(() => setMap(map), [map, setMap]);
  return null;
}

type Point = { id: string; name: string; lat: number; lng: number; address?: string };

export default function MapView({ points }: { points: Point[] }) {
  const center = useMapStore((s) => s.center);
  const zoom = useMapStore((s) => s.zoom);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full rounded-2xl overflow-hidden"
      scrollWheelZoom
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapRegister />
      <MapEventBinder />

      {points.map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          eventHandlers={{
            click: () => {
              useMapStore.getState().setSelectedVenueId(p.id);
              useMapStore.getState().flyTo(p.lat, p.lng, 17);
            },
          }}
        >
          <Popup>
            <div className="text-sm">
              <b className="block">{p.name}</b>
              <span className="opacity-70">{p.address}</span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
