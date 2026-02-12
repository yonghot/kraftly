/**
 * @jest-environment node
 */
/**
 * GET/POST /api/designs — 디자인 CRUD API 테스트
 * 우선순위: P1 (핵심 비즈니스 로직)
 */
import { GET, POST } from "./route";
import { NextRequest } from "next/server";

describe("GET /api/designs", () => {
  it("기본 요청 시 빈 배열과 기본값을 반환한다", async () => {
    const req = new NextRequest("http://localhost:3000/api/designs");
    const res = await GET(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.designs).toEqual([]);
    expect(data.total).toBe(0);
    expect(data.limit).toBe(20);
    expect(data.category).toBe("all");
    expect(data.sort).toBe("latest");
  });

  it("category 파라미터를 반영한다", async () => {
    const req = new NextRequest(
      "http://localhost:3000/api/designs?category=hanbok"
    );
    const res = await GET(req);
    const data = await res.json();
    expect(data.category).toBe("hanbok");
  });

  it("sort 파라미터를 반영한다", async () => {
    const req = new NextRequest(
      "http://localhost:3000/api/designs?sort=popular"
    );
    const res = await GET(req);
    const data = await res.json();
    expect(data.sort).toBe("popular");
  });

  it("limit 파라미터를 반영한다", async () => {
    const req = new NextRequest("http://localhost:3000/api/designs?limit=10");
    const res = await GET(req);
    const data = await res.json();
    expect(data.limit).toBe(10);
  });
});

describe("POST /api/designs", () => {
  it("디자인을 저장하고 ID와 타임스탬프를 반환한다", async () => {
    const body = {
      category_id: "hanbok",
      jewelry_type: "ring",
      material: "silver",
      image_urls: ["https://example.com/img1.webp"],
    };
    const req = new NextRequest("http://localhost:3000/api/designs", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.id).toMatch(/^design-/);
    expect(data.category_id).toBe("hanbok");
    expect(data.created_at).toBeDefined();
  });

  it("잘못된 JSON body 시 500을 반환한다", async () => {
    const req = new NextRequest("http://localhost:3000/api/designs", {
      method: "POST",
      body: "invalid json",
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBeDefined();
  });
});
