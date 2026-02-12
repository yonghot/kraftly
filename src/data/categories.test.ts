/**
 * K-Design 카테고리 데이터 무결성 테스트
 * 우선순위: P3 (데이터 무결성)
 */
import { K_DESIGN_CATEGORIES } from "./categories";

describe("K_DESIGN_CATEGORIES", () => {
  it("정확히 6개 카테고리가 존재한다", () => {
    expect(K_DESIGN_CATEGORIES).toHaveLength(6);
  });

  it("예상된 6개 카테고리 ID가 모두 존재한다", () => {
    const ids = K_DESIGN_CATEGORIES.map((c) => c.id);
    expect(ids).toContain("hanbok");
    expect(ids).toContain("minimal_seoul");
    expect(ids).toContain("kpop");
    expect(ids).toContain("celadon");
    expect(ids).toContain("najeon");
    expect(ids).toContain("modern_hanok");
  });

  it("모든 카테고리가 필수 필드를 포함한다", () => {
    for (const category of K_DESIGN_CATEGORIES) {
      expect(category.id).toBeTruthy();
      expect(category.name_en).toBeTruthy();
      expect(category.name_ko).toBeTruthy();
      expect(category.prompt_template).toBeTruthy();
      expect(category.color_palette).toHaveLength(4);
      expect(typeof category.sort_order).toBe("number");
      expect(category.is_active).toBe(true);
    }
  });

  it("모든 프롬프트 템플릿에 {jewelry_type}과 {material} 플레이스홀더가 존재한다", () => {
    for (const category of K_DESIGN_CATEGORIES) {
      expect(category.prompt_template).toContain("{jewelry_type}");
      expect(category.prompt_template).toContain("{material}");
    }
  });

  it("color_palette의 모든 값이 유효한 HEX 색상 코드이다", () => {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    for (const category of K_DESIGN_CATEGORIES) {
      for (const color of category.color_palette) {
        expect(color).toMatch(hexRegex);
      }
    }
  });

  it("sort_order가 1부터 6까지 고유하게 설정되어 있다", () => {
    const sortOrders = K_DESIGN_CATEGORIES.map((c) => c.sort_order).sort();
    expect(sortOrders).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("카테고리 ID에 중복이 없다", () => {
    const ids = K_DESIGN_CATEGORIES.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
