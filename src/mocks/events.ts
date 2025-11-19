export type EventItem = {
  id: string;
  venueId: string;
  title: string;
  startAt: string;
  tags: string[];
  priceMin?: number;
  priceMax?: number;
};

export const EVENTS: EventItem[] = [
  { id: "e1", venueId: "v2", title: "Techno Night w/ Local DJs", startAt: new Date(Date.now()+86400000).toISOString(), tags: ["Techno"] },
  { id: "e2", venueId: "v1", title: "Sunset Cocktails", startAt: new Date(Date.now()+2*86400000).toISOString(), tags: ["Cocktails","Terraza"] },
];
