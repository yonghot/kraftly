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

// ============================================
// Artisan Types
// ============================================

export type Technique =
  | "lost_wax"
  | "hand_forging"
  | "filigree"
  | "stone_setting"
  | "engraving"
  | "enamel"
  | "najeon";

export interface ArtisanProfile {
  id: string;
  display_name_en: string;
  display_name_ko: string;
  bio_en: string;
  bio_ko: string;
  specialties: JewelryType[];
  materials: Material[];
  techniques: Technique[];
  portfolio_urls: string[];
  location_en: string;
  location_ko: string;
  avg_rating: number;
  total_reviews: number;
  total_orders: number;
  min_price_krw: number;
  avg_lead_days: number;
  is_verified: boolean;
  is_active: boolean;
  avatar_url: string;
  years_experience: number;
}

export interface ArtisanReview {
  id: string;
  artisan_id: string;
  reviewer_name: string;
  rating: number;
  comment_en: string;
  comment_ko: string;
  created_at: string;
}

export interface MatchedArtisan {
  artisan: ArtisanProfile;
  matchScore: number;
  matchBreakdown: {
    specialty: number;
    material: number;
    rating: number;
    availability: number;
  };
}

export interface QuoteRequest {
  artisanId: string;
  designImageUrl: string | null;
  categoryId: string;
  jewelryType: JewelryType;
  material: Material;
  budget: string;
  deadline: string;
  notes: string;
}
