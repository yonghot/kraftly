import { calculateMatchScore, findMatchingArtisans } from "./matching";
import type { ArtisanProfile } from "@/types";

const makeArtisan = (
  overrides: Partial<ArtisanProfile> = {}
): ArtisanProfile => ({
  id: "test-1",
  display_name_en: "Test Artisan",
  display_name_ko: "테스트 장인",
  bio_en: "Bio",
  bio_ko: "소개",
  specialties: ["ring"],
  materials: ["gold_18k"],
  techniques: ["lost_wax"],
  portfolio_urls: [],
  location_en: "Seoul",
  location_ko: "서울",
  avg_rating: 4.5,
  total_reviews: 10,
  total_orders: 50,
  min_price_krw: 300000,
  avg_lead_days: 14,
  is_verified: true,
  is_active: true,
  avatar_url: "",
  years_experience: 10,
  ...overrides,
});

describe("calculateMatchScore", () => {
  it("specialty+material 모두 일치 시 높은 점수", () => {
    const artisan = makeArtisan({
      specialties: ["ring"],
      materials: ["gold_18k"],
      avg_rating: 5.0,
      avg_lead_days: 7,
    });

    const result = calculateMatchScore(artisan, {
      jewelryType: "ring",
      material: "gold_18k",
    });

    // specialty(0.4) + material(0.25) + rating(1.0*0.2) + availability(1.0*0.15) = 1.0
    expect(result.matchScore).toBe(1.0);
    expect(result.matchBreakdown.specialty).toBe(1.0);
    expect(result.matchBreakdown.material).toBe(1.0);
  });

  it("specialty 불일치 시 specialty 점수 0", () => {
    const artisan = makeArtisan({ specialties: ["necklace"] });

    const result = calculateMatchScore(artisan, {
      jewelryType: "ring",
      material: "gold_18k",
    });

    expect(result.matchBreakdown.specialty).toBe(0.0);
    expect(result.matchScore).toBeLessThan(0.7);
  });

  it("material 불일치 시 material 점수 0", () => {
    const artisan = makeArtisan({ materials: ["silver"] });

    const result = calculateMatchScore(artisan, {
      jewelryType: "ring",
      material: "gold_18k",
    });

    expect(result.matchBreakdown.material).toBe(0.0);
  });

  it("availability 점수는 최소 0.3", () => {
    const artisan = makeArtisan({ avg_lead_days: 100 });

    const result = calculateMatchScore(artisan, {
      jewelryType: "ring",
      material: "gold_18k",
    });

    expect(result.matchBreakdown.availability).toBeGreaterThanOrEqual(0.3);
  });
});

describe("findMatchingArtisans", () => {
  it("점수 내림차순 정렬", () => {
    const artisans = [
      makeArtisan({ id: "a", specialties: ["necklace"], materials: ["silver"] }),
      makeArtisan({ id: "b", specialties: ["ring"], materials: ["gold_18k"] }),
    ];

    const results = findMatchingArtisans(artisans, {
      jewelryType: "ring",
      material: "gold_18k",
    });

    expect(results[0].artisan.id).toBe("b");
    expect(results[1].artisan.id).toBe("a");
    expect(results[0].matchScore).toBeGreaterThan(results[1].matchScore);
  });

  it("is_active=false 장인 제외", () => {
    const artisans = [
      makeArtisan({ id: "active", is_active: true }),
      makeArtisan({ id: "inactive", is_active: false }),
    ];

    const results = findMatchingArtisans(artisans, {
      jewelryType: "ring",
      material: "gold_18k",
    });

    expect(results).toHaveLength(1);
    expect(results[0].artisan.id).toBe("active");
  });
});
