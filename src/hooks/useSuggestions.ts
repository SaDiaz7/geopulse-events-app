import { useEffect, useState } from "react";
import type { Suggestion, SuggestionStatus, ID } from "@/types/suggestions";
import { suggestionAPI } from "@/lib/suggestions";

export function useSuggestions() {
  const [list, setList] = useState<Suggestion[]>([]);
  const refresh = async () => setList(await suggestionAPI.list());
  const setStatus = async (id: ID, status: SuggestionStatus) => {
    await suggestionAPI.updateStatus(id, status);
    refresh();
  };
  useEffect(() => { refresh(); }, []);
  return { list, refresh, setStatus };
}
