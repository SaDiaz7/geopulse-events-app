import { create } from 'zustand';
import type L from 'leaflet';

type State = {
  center: [number, number];
  zoom: number;
  selectedVenueId: string | null;
  map: L.Map | null;
  setCenter: (c: [number, number]) => void;
  setZoom: (z: number) => void;
  setSelectedVenueId: (id: string | null) => void;
  setMap: (m: L.Map) => void;
  flyTo: (lat: number, lng: number, z?: number) => void;
};

export const useMap = create<State>((set, get) => ({
  center: [-38.9516, -68.065],
  zoom: 13,
  selectedVenueId: null,
  map: null,
  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
  setSelectedVenueId: (selectedVenueId) => set({ selectedVenueId }),
  setMap: (m) => set({ map: m }),
  flyTo: (lat, lng, z = 16) => { get().map?.flyTo([lat, lng], z, { duration: 0.6 }); },
}));
