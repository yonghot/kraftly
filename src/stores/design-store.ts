import { create } from "zustand";
import type { JewelryType, Material } from "@/types";

interface DesignStoreState {
  // Studio 상태
  selectedCategory: string | null;
  jewelryType: JewelryType | null;
  material: Material | null;
  userPrompt: string;
  generatedImages: string[];
  selectedImageIndex: number | null;
  isGenerating: boolean;
  generationProgress: number;

  // 액션
  setCategory: (id: string | null) => void;
  setJewelryType: (type: JewelryType | null) => void;
  setMaterial: (material: Material | null) => void;
  setUserPrompt: (prompt: string) => void;
  setGeneratedImages: (images: string[]) => void;
  selectImage: (index: number | null) => void;
  setGenerating: (isGenerating: boolean) => void;
  setProgress: (progress: number) => void;
  resetStudio: () => void;
}

const initialState = {
  selectedCategory: null,
  jewelryType: null,
  material: null,
  userPrompt: "",
  generatedImages: [],
  selectedImageIndex: null,
  isGenerating: false,
  generationProgress: 0,
};

export const useDesignStore = create<DesignStoreState>((set) => ({
  ...initialState,

  setCategory: (id) => set({ selectedCategory: id }),
  setJewelryType: (type) => set({ jewelryType: type }),
  setMaterial: (material) => set({ material }),
  setUserPrompt: (prompt) => set({ userPrompt: prompt }),
  setGeneratedImages: (images) =>
    set({ generatedImages: images, selectedImageIndex: null }),
  selectImage: (index) => set({ selectedImageIndex: index }),
  setGenerating: (isGenerating) => set({ isGenerating }),
  setProgress: (progress) => set({ generationProgress: progress }),
  resetStudio: () => set(initialState),
}));
