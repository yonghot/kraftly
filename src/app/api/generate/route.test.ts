/**
 * @jest-environment node
 */
/**
 * POST /api/generate — AI 이미지 생성 API 테스트
 * 우선순위: P1 (핵심 비즈니스 로직)
 */
jest.mock("@google/genai", () => ({
  GoogleGenAI: jest.fn(),
}));

import { POST } from "./route";
import { NextRequest } from "next/server";

// 환경변수 초기화
const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv };
  delete process.env.GEMINI_API_KEY;
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

  describe("GEMINI_API_KEY 미설정", () => {
    it("API 키가 없으면 503을 반환한다", async () => {
      const req = createRequest({
        category_id: "hanbok",
        jewelry_type: "ring",
        material: "silver",
      });
      const res = await POST(req);
      expect(res.status).toBe(503);
      const data = await res.json();
      expect(data.error).toContain("GEMINI_API_KEY");
    });

    it("모든 6개 카테고리에 대해 503을 반환한다 (키 없음)", async () => {
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
        expect(res.status).toBe(503);
      }
    });
  });
});
