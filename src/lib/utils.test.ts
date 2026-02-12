/**
 * utils.ts — cn 유틸리티 함수 테스트
 * 우선순위: P3 (유틸리티)
 */
import { cn } from "./utils";

describe("cn()", () => {
  it("단일 클래스를 반환한다", () => {
    expect(cn("text-red-500")).toBe("text-red-500");
  });

  it("여러 클래스를 병합한다", () => {
    const result = cn("px-4", "py-2", "rounded-lg");
    expect(result).toContain("px-4");
    expect(result).toContain("py-2");
    expect(result).toContain("rounded-lg");
  });

  it("조건부 클래스를 처리한다", () => {
    const isActive = true;
    const result = cn("base", isActive && "active");
    expect(result).toContain("active");

    const result2 = cn("base", false && "hidden");
    expect(result2).not.toContain("hidden");
  });

  it("Tailwind 충돌을 해결한다 (tailwind-merge)", () => {
    const result = cn("px-4", "px-8");
    expect(result).toBe("px-8");
  });

  it("빈 입력을 처리한다", () => {
    expect(cn()).toBe("");
    expect(cn("")).toBe("");
    expect(cn(undefined)).toBe("");
    expect(cn(null)).toBe("");
  });
});
