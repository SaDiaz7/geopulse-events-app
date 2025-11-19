export type ID = string;

export type SuggestionStatus = "PENDING" | "APPROVED" | "REJECTED" | "NEEDS_INFO";
export type SuggestionType = "ADD" | "EDIT";

// Usamos un tipo liviano para no acoplarnos a tu src/venues.ts
export type VenueLite = {
  id: ID;
  name: string;
  category?: string;
  address?: string;
  lat?: number;
  lng?: number;
  description?: string;
  iconUrl?: string;
};

export type Suggestion = {
  id: ID;
  type: SuggestionType;
  status: SuggestionStatus;
  createdAt: string; // ISO
  targetVenueId?: ID; // para EDIT
  payload: {
    addData?: Partial<VenueLite> & { evidenceUrls?: string[] };
    editData?: {
      before: Partial<VenueLite>;
      after: Partial<VenueLite> & { evidenceUrls?: string[] };
      comment?: string;
    };
  };
};
