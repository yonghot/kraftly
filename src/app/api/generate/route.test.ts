/**
 * @jest-environment node
 */
/**
 * POST /api/generate — AI 이미지 생성 API 테스트
 * 우선순위: P1 (핵심 비즈니스 로직)
 */
import { POST } from "./route";
import { NextRequest } from "next/server";

// 환경변수 초기화
const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv };
  delete process.env.REPLICATE_API_TOKEN;
});

afterAll(() => {
  process.env = originalEnv;
});

function createRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest("http://localhost:3000/api/generate", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("POST /api/generate", () => {
  describe("입력 검증", () => {
    it("category_id가 없으면 400을 반환한다", async () => {
      const req = createRequest({
        jewelry_type: "ring",
        material: "silver",
      });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toContain("필수");
    });

    it("jewelry_type이 없으면 400을 반환한다", async () => {
      const req = createRequest({
        category_id: "hanbok",
        material: "silver",
      });
      const res = await POST(req);
      expect(res.status).toBe(400);
    });

    it("material이 없으면 400을 반환한다", async () => {
      const req = createRequest({
        category_id: "hanbok",
        jewelry_type: "ring",
      });
      const res = await POST(req);
      expect(res.status).toBe(400);
    });
  });

  describe("카테고리 조회", () => {
    it("존재하지 않는 카테고리면 400을 반환한다", async () => {
      const req = createRequest({
        category_id: "nonexistent",
        jewelry_type: "ring",
        material: "silver",
      });
      const res = await POST(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toContain("카테고리");
    });
  });

  describe("플레이스홀더 폴백 (API 토큰 없음)", () => {
    it("유효한 요청 시 플레이스홀더 이미지 4장을 반환한다", async () => {
      const req = createRequest({
        category_id: "hanbok",
        jewelry_type: "ring",
        material: "silver",
      });
      const res = await POST(req);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.images).toHaveLength(4);
      expect(data.design_id).toMatch(/^dev-/);
      expect(data.prompt_used).toBeDefined();
    });

    it("프롬프트에 jewelry_type과 material이 치환된다", async () => {
      const req = createRequest({
        category_id: "hanbok",
        jewelry_type: "necklace",
        material: "gold_18k",
      });
      const res = await POST(req);
      const data = await res.json();

      expect(data.prompt_used).toContain("necklace");
      expect(data.prompt_used).toContain("gold 18k");
    });

    it("user_prompt가 있으면 프롬프트에 추가된다", async () => {
      const req = createRequest({
        category_id: "minimal_seoul",
        jewelry_type: "earring",
        material: "rose_gold",
        user_prompt: "with cherry blossom motif",
      });
      const res = await POST(req);
      const data = await res.json();

      expect(data.prompt_used).toContain("cherry blossom motif");
    });

    it("모든 6개 카테고리에 대해 정상 응답한다", async () => {
      const categories = [
        "hanbok",
        "minimal_seoul",
        "kpop",
        "celadon",
        "najeon",
        "modern_hanok",
      ];

      for (const categoryId of categories) {
        const req = createRequest({
          category_id: categoryId,
          jewelry_type: "ring",
          material: "silver",
        });
        const res = await POST(req);
        expect(res.status).toBe(200);
      }
    });
  });
});
