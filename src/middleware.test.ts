/**
 * @jest-environment node
 */
/**
 * Next.js 미들웨어 설정 테스트
 * 우선순위: P3 (설정 무결성)
 */

// next-intl ESM 모킹
jest.mock("next-intl/routing", () => ({
  defineRouting: (config: Record<string, unknown>) => config,
}));
jest.mock("next-intl/middleware", () => ({
  __esModule: true,
  default: (config: Record<string, unknown>) => config,
}));

import { config } from "./middleware";

describe("middleware config", () => {
  it("matcher가 루트와 로케일 경로를 포함한다", () => {
    expect(config.matcher).toContain("/");
    expect(config.matcher).toContain("/(en|ko)/:path*");
  });

  it("matcher에 정확히 2개 패턴이 있다", () => {
    expect(config.matcher).toHaveLength(2);
  });
});
