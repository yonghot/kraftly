/**
 * i18n 라우팅 설정 테스트
 * 우선순위: P3 (설정 무결성)
 */

// next-intl/routing ESM 모킹
jest.mock("next-intl/routing", () => ({
  defineRouting: (config: Record<string, unknown>) => config,
}));

import { routing } from "./routing";

describe("i18n routing", () => {
  it("en, ko 두 가지 로케일을 지원한다", () => {
    expect(routing.locales).toEqual(["en", "ko"]);
  });

  it("기본 로케일은 en이다", () => {
    expect(routing.defaultLocale).toBe("en");
  });

  it("로케일 배열에 정확히 2개가 있다", () => {
    expect(routing.locales).toHaveLength(2);
  });
});
