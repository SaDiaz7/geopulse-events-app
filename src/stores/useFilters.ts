import { create } from "zustand";

export type Tag = "techno" | "house" | "rock" | "cerveceria" | "cocktails" | "boliche" | "after" | "terraza";
export type When = "hoy" | "manana" | "finde" | "todos";

interface FiltersState {
  when: When;
  maxKm: number;
  tags: Tag[];
  setWhen: (w: When) => void;
  setMaxKm: (km: number) => void;
  toggleTag: (t: Tag) => void;
  clear: () => void;
}

export const useFilters = create<FiltersState>((set, get) => ({
  when: "todos",
  maxKm: 5,
  tags: [],
  setWhen: (w) => set({ when: w }),
  setMaxKm: (km) => set({ maxKm: km }),
  toggleTag: (t) => {
    const { tags } = get();
    set({ tags: tags.includes(t) ? tags.filter(x => x !== t) : [...tags, t] });
  },
  clear: () => set({ when: "todos", maxKm: 5, tags: [] }),
}));
