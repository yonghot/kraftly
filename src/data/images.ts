/**
 * 중앙 이미지 URL 관리
 * Unsplash 무료 이미지 — 모든 URL은 Unsplash API(/napi/photos)로 검증 완료
 */

export const HERO_IMAGES = {
  // "a gold and diamond bracelet on a black background" by Hemant Latawa
  main: "https://images.unsplash.com/photo-1638617501607-5dfb8b079ebf?w=1920&q=80",
};

/** 카테고리별 대표 이미지 — Unsplash API 검증 완료 */
export const CATEGORY_IMAGES: Record<string, string> = {
  // "woman wearing red and white hanbok" at Gyeongbokgung Palace
  hanbok:
    "https://images.unsplash.com/photo-1560083372-efb6689e3f23?w=800&q=80",
  // "cityscape under blue sky" — Seoul skyline
  minimal_seoul:
    "https://images.unsplash.com/photo-1579085353237-916e72ecb32d?w=800&q=80",
  // "people watching concert during night time" — stage neon vibes
  kpop:
    "https://images.unsplash.com/photo-1585131201641-2e3a295bf7dd?w=800&q=80",
  // "stack of three green bowls on wooden surface" — green celadon ceramics
  celadon:
    "https://images.unsplash.com/photo-1569349668601-c0e850609049?w=800&q=80",
  // "Iridescent abalone shell with swirling blue and green patterns"
  najeon:
    "https://images.unsplash.com/photo-1759680239559-b15010f8a7a8?w=800&q=80",
  // "three person standing between houses" — Bukchon Hanok Village
  modern_hanok:
    "https://images.unsplash.com/photo-1512059555341-6a121e7d4d86?w=800&q=80",
};

/** 갤러리용 이미지 (카테고리당 3장) — Unsplash API 검증 완료 */
export const GALLERY_IMAGES: Record<string, string[]> = {
  hanbok: [
    // "People in traditional korean hanbok at gyeongbokgung palace"
    "https://images.unsplash.com/photo-1762267616547-6d6cd4adabc3?w=600&q=80",
    // "Women in traditional korean hanbok dresses huddle together"
    "https://images.unsplash.com/photo-1761500996989-30752a7f35ed?w=600&q=80",
    // "Women in traditional korean hanbok dresses"
    "https://images.unsplash.com/photo-1761500997576-81649ecddbec?w=600&q=80",
  ],
  minimal_seoul: [
    // "city with high rise buildings during night time" — Seoul
    "https://images.unsplash.com/photo-1592660453134-1bcec4280e4a?w=600&q=80",
    // "a bridge over a river with a city in the background" — Seoul Han River
    "https://images.unsplash.com/photo-1634719887228-9936cb61cba4?w=600&q=80",
    // "a city skyline at night" — Seoul
    "https://images.unsplash.com/photo-1661365469437-6efd4cb63eb8?w=600&q=80",
  ],
  kpop: [
    // "multicolored LED lights hanging during nighttime"
    "https://images.unsplash.com/photo-1545584683-f787064fb67b?w=600&q=80",
    // "People dancing on a street with colorful lights"
    "https://images.unsplash.com/photo-1769029298826-2fea9d3db9f9?w=600&q=80",
    // "Abstract colorful light trails on dark background"
    "https://images.unsplash.com/photo-1766701533418-703498390222?w=600&q=80",
  ],
  celadon: [
    // "a stack of green bowls sitting on top of a floor"
    "https://images.unsplash.com/photo-1638370714721-c0a6f6ab2234?w=600&q=80",
    // "a green vase sitting on a black surface"
    "https://images.unsplash.com/photo-1632090332149-822c1f7b1952?w=600&q=80",
    // "Two tall, pale green ceramic vases stand together"
    "https://images.unsplash.com/photo-1743844915693-230c6787f94d?w=600&q=80",
  ],
  najeon: [
    // "green and white abstract painting" — abalone iridescent pattern
    "https://images.unsplash.com/photo-1583860379022-2f3c644395a9?w=600&q=80",
    // "A large seashell with pink interior on orange background"
    "https://images.unsplash.com/photo-1759728886965-da7fd4626b48?w=600&q=80",
    // "Two colorful scallop shells on a red background"
    "https://images.unsplash.com/photo-1761547670879-c9d311d8032b?w=600&q=80",
  ],
  modern_hanok: [
    // "a view of a city with a lot of roofs" — Bukchon Hanok Village rooftops
    "https://images.unsplash.com/photo-1704240649486-3729c2d44ae3?w=600&q=80",
    // "An alleyway leads past traditional buildings" — Bukchon
    "https://images.unsplash.com/photo-1751228112868-a0dd33ded0fe?w=600&q=80",
    // "a view of a building with a mountain in the background" — Hanok
    "https://images.unsplash.com/photo-1684221332229-9d17153eb976?w=600&q=80",
  ],
};

/** 갤러리 이미지를 flat 배열로 반환 */
export function getAllGalleryImages(): string[] {
  return Object.values(GALLERY_IMAGES).flat();
}
