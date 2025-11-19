import type { ID, Suggestion, SuggestionStatus } from "@/types/suggestions";

const LS_KEY = "geopulse.suggestions.v1";
const genId = () => crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);

const localStore = {
  read(): Suggestion[] {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? (JSON.parse(raw) as Suggestion[]) : [];
    } catch {
      return [];
    }
  },
  write(list: Suggestion[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  },
};

export const suggestionAPI = {
  async create(s: Omit<Suggestion, "id" | "createdAt" | "status">): Promise<Suggestion> {
    const list = localStore.read();
    const next: Suggestion = { id: genId(), status: "PENDING", createdAt: new Date().toISOString(), ...s };
    list.unshift(next);
    localStore.write(list);
    return next;
  },
  async list(): Promise<Suggestion[]> {
    return localStore.read();
  },
  async updateStatus(id: ID, status: SuggestionStatus): Promise<Suggestion | undefined> {
    const list = localStore.read();
    const idx = list.findIndex((x) => x.id === id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], status };
      localStore.write(list);
      return list[idx];
    }
    return undefined;
  },
};
