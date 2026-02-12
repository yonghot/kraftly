import type {
  ArtisanProfile,
  JewelryType,
  Material,
  MatchedArtisan,
} from "@/types";

interface MatchCriteria {
  jewelryType: JewelryType;
  material: Material;
}

/**
 * 매칭 점수 계산 (PRD 가중치)
 * specialty_match(40%) + material_match(25%) + rating_score(20%) + availability_score(15%)
 */
export function calculateMatchScore(
  artisan: ArtisanProfile,
  criteria: MatchCriteria,
): MatchedArtisan {
  const specialtyScore = artisan.specialties.includes(criteria.jewelryType)
    ? 1.0
    : 0.0;

  const materialScore = artisan.materials.includes(criteria.material)
    ? 1.0
    : 0.0;

  const ratingScore = artisan.avg_rating / 5.0;

  const availabilityScore = Math.max(
    0.3,
    1.0 - (artisan.avg_lead_days - 7) / 30,
  );

  const totalScore =
    specialtyScore * 0.4 +
    materialScore * 0.25 +
    ratingScore * 0.2 +
    availabilityScore * 0.15;

  return {
    artisan,
    matchScore: Math.round(totalScore * 100) / 100,
    matchBreakdown: {
      specialty: specialtyScore,
      material: materialScore,
      rating: ratingScore,
      availability: availabilityScore,
    },
  };
}

/** 활성 장인을 매칭 점수 내림차순으로 정렬하여 반환 */
export function findMatchingArtisans(
  artisans: ArtisanProfile[],
  criteria: MatchCriteria,
): MatchedArtisan[] {
  return artisans
    .filter((a) => a.is_active)
    .map((a) => calculateMatchScore(a, criteria))
    .sort((a, b) => b.matchScore - a.matchScore);
}
