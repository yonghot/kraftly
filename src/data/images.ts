/**
 * 중앙 이미지 URL 관리
 * Unsplash 무료 이미지를 사용하여 주얼리/한국 공예 테마 표현
 */

export const HERO_IMAGES = {
  main: "https://images.unsplash.com/photo-1515562141589-67f0d569b87e?w=1920&q=80",
};

/** 카테고리별 대표 이미지 */
export const CATEGORY_IMAGES: Record<string, string> = {
  hanbok:
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
  minimal_seoul:
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
  kpop:
    "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
  celadon:
    "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=80",
  najeon:
    "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
  modern_hanok:
    "https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?w=800&q=80",
};

/** 갤러리용 이미지 (카테고리당 3장) */
export const GALLERY_IMAGES: Record<string, string[]> = {
  hanbok: [
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
  ],
  minimal_seoul: [
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
    "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80",
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80",
  ],
  kpop: [
    "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80",
    "https://images.unsplash.com/photo-1515562141589-67f0d569b87e?w=600&q=80",
    "https://images.unsplash.com/photo-1576022162028-0af103e58ff4?w=600&q=80",
  ],
  celadon: [
    "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80",
  ],
  najeon: [
    "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80",
    "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&q=80",
    "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=600&q=80",
  ],
  modern_hanok: [
    "https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?w=600&q=80",
    "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80",
    "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=600&q=80",
  ],
};

/** 갤러리 이미지를 flat 배열로 반환 */
export function getAllGalleryImages(): string[] {
  return Object.values(GALLERY_IMAGES).flat();
}
