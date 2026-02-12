import { create } from "zustand";
import type { JewelryType, Material, MatchedArtisan } from "@/types";
import { MOCK_ARTISANS } from "@/data/artisans";
import { findMatchingArtisans } from "@/lib/matching";

interface MatchRequest {
  categoryId: string | null;
  jewelryType: JewelryType | null;
  material: Material | null;
  designImageUrl: string | null;
  designId: string | null;
}

interface ArtisanFilters {
  specialty: JewelryType | null;
  material: Material | null;
  location: string | null;
}

interface ArtisanStoreState {
  matchRequest: MatchRequest;
  matchedArtisans: MatchedArtisan[];
  selectedArtisanId: string | null;
  quoteSubmitted: boolean;
  filters: ArtisanFilters;

  setMatchRequest: (req: Partial<MatchRequest>) => void;
  runMatching: () => void;
  selectArtisan: (id: string | null) => void;
  submitQuote: () => void;
  setFilter: <K extends keyof ArtisanFilters>(
    key: K,
    value: ArtisanFilters[K],
  ) => void;
  resetFilters: () => void;
  resetArtisanFlow: () => void;
}

const initialMatchRequest: MatchRequest = {
  categoryId: null,
  jewelryType: null,
  material: null,
  designImageUrl: null,
  designId: null,
};

const initialFilters: ArtisanFilters = {
  specialty: null,
  material: null,
  location: null,
};

export const useArtisanStore = create<ArtisanStoreState>((set, get) => ({
  matchRequest: initialMatchRequest,
  matchedArtisans: [],
  selectedArtisanId: null,
  quoteSubmitted: false,
  filters: initialFilters,

  setMatchRequest: (req) =>
    set((state) => ({
      matchRequest: { ...state.matchRequest, ...req },
    })),

  runMatching: () => {
    const { matchRequest } = get();
    if (!matchRequest.jewelryType || !matchRequest.material) return;

    const results = findMatchingArtisans(MOCK_ARTISANS, {
      jewelryType: matchRequest.jewelryType,
      material: matchRequest.material,
    });
    set({ matchedArtisans: results });
  },

  selectArtisan: (id) => set({ selectedArtisanId: id }),

  submitQuote: () => set({ quoteSubmitted: true }),

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  resetFilters: () => set({ filters: initialFilters }),

  resetArtisanFlow: () =>
    set({
      matchRequest: initialMatchRequest,
      matchedArtisans: [],
      selectedArtisanId: null,
      quoteSubmitted: false,
    }),
}));
