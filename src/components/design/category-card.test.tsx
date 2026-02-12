/**
 * CategoryCard 컴포넌트 테스트
 * 우선순위: P4 (UI 컴포넌트)
 */
import { render, screen, fireEvent } from "@testing-library/react";
import { CategoryCard } from "./category-card";
import type { DesignCategory } from "@/types";

// next-intl 모킹
jest.mock("next-intl", () => ({
  useLocale: () => "en",
}));

// next/image 모킹
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props;
    return <img data-fill={fill ? "true" : undefined} data-priority={priority ? "true" : undefined} {...rest} />;
  },
}));

// 이미지 데이터 모킹
jest.mock("@/data/images", () => ({
  CATEGORY_IMAGES: {
    hanbok: "https://images.unsplash.com/test-hanbok",
  },
}));

const mockCategory: DesignCategory = {
  id: "hanbok",
  name_en: "Hanbok Heritage",
  name_ko: "한복 모티프",
  description_en: "Elegant curves inspired by Korean dress",
  description_ko: "한복의 우아한 곡선",
  prompt_template: "test {jewelry_type} {material}",
  color_palette: ["#8B1A1A", "#1B3A6B", "#F5F0E8", "#C9A96E"],
  thumbnail_url: null,
  sort_order: 1,
  is_active: true,
};

describe("CategoryCard", () => {
  it("영문 이름을 렌더링한다", () => {
    render(<CategoryCard category={mockCategory} />);
    expect(screen.getByText("Hanbok Heritage")).toBeInTheDocument();
  });

  it("클릭 핸들러가 호출된다", () => {
    const handleClick = jest.fn();
    render(<CategoryCard category={mockCategory} onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("selected일 때 체크마크가 표시된다", () => {
    render(<CategoryCard category={mockCategory} selected />);
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("selected가 아닐 때 체크마크가 없다", () => {
    render(<CategoryCard category={mockCategory} />);
    expect(screen.queryByText("✓")).not.toBeInTheDocument();
  });

  it("showDescription이 true면 설명이 표시된다", () => {
    render(<CategoryCard category={mockCategory} showDescription />);
    expect(
      screen.getByText("Elegant curves inspired by Korean dress")
    ).toBeInTheDocument();
  });

  it("showDescription이 false(기본값)면 설명이 없다", () => {
    render(<CategoryCard category={mockCategory} />);
    expect(
      screen.queryByText("Elegant curves inspired by Korean dress")
    ).not.toBeInTheDocument();
  });

  it("카테고리 이미지가 배경으로 렌더링된다", () => {
    render(<CategoryCard category={mockCategory} />);
    const img = screen.getByAltText("Hanbok Heritage");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://images.unsplash.com/test-hanbok");
  });
});
