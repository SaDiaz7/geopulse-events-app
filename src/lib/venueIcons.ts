export const venueIcons: Record<string, string> = {
  cervecería: "/icons/beer.svg",
  bar: "/icons/bar.svg",
  boliche: "/icons/club.svg",
  terraza: "/icons/terrace.svg",
  lounge: "/icons/lounge.svg",
  default: "/icons/default.svg",
};


export function getVenueIcon(category?: string | null): string {
  const key = (category ?? "").trim().toLowerCase();
  if (!key) return venueIcons.default;
  return venueIcons[key]
    ?? Object.entries(venueIcons).find(([name]) => key.includes(name))?.[1]
    ?? venueIcons.default;
}
