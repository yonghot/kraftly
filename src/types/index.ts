// ============================================
// Database Types
// ============================================

export type UserRole = "consumer" | "artisan" | "admin";

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  avatar_url: string | null;
  locale: string;
  created_at: string;
  updated_at: string;
}

export interface DesignCategory {
  id: string;
  name_en: string;
  name_ko: string;
  description_en: string | null;
  description_ko: string | null;
  prompt_template: string;
  color_palette: string[];
  thumbnail_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export type JewelryType = "ring" | "necklace" | "earring" | "bracelet" | "brooch";

export type Material = "silver" | "gold_14k" | "gold_18k" | "rose_gold" | "platinum";

export interface Design {
  id: string;
  user_id: string | null;
  category_id: string;
  jewelry_type: JewelryType;
  material: Material | null;
  user_prompt: string | null;
  full_prompt: string | null;
  image_urls: string[];
  selected_image_url: string | null;
  metadata: Record<string, unknown> | null;
  is_public: boolean;
  likes_count: number;
  created_at: string;
}

// ============================================
// API Types
// ============================================

export interface GenerateRequest {
  category_id: string;
  jewelry_type: JewelryType;
  material: Material;
  user_prompt?: string;
}

export interface GenerateResponse {
  images: string[];
  design_id: string;
  prompt_used: string;
}

// ============================================
// UI Types
// ============================================

export type SortOption = "latest" | "popular";

export interface GalleryFilters {
  category: string | null;
  jewelryType: JewelryType | null;
  sort: SortOption;
}
