export type VenuePoint = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  tags: string[];
};

export const VENUES: VenuePoint[] = [
  { id: "v1", name: "Terraza Güemes", address: "Belgrano 750, Güemes", lat: -31.427, lng: -64.189, tags: ["Terraza","Cocktails"] },
  { id: "v2", name: "Club Nueva Córdoba", address: "Hipólito Yrigoyen 300", lat: -31.426, lng: -64.183, tags: ["Boliche","Techno"] },
  { id: "v3", name: "Cervecería General Paz", address: "25 de Mayo 1200", lat: -31.401, lng: -64.171, tags: ["Cerveceria","Rock"] },
];

