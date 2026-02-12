/**
 * DesignCard 컴포넌트 테스트
 * 우선순위: P4 (UI 컴포넌트)
 */
import { render, screen } from "@testing-library/react";
import { DesignCard } from "./design-card";
import type { Design } from "@/types";

// next-intl 모킹
jest.mock("next-intl", () => ({
  useLocale: () => "en",
}));

// i18n navigation 모킹
jest.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockDesign: Design = {
  id: "design-001",
  user_id: "user-001",
  category_id: "hanbok",
  jewelry_type: "ring",
  material: "silver",
  user_prompt: null,
  full_prompt: null,
  image_urls: ["https://example.com/img1.webp"],
  selected_image_url: null,
  metadata: null,
  is_public: true,
  likes_count: 42,
  created_at: "2026-02-11T00:00:00Z",
};

describe("DesignCard", () => {
  it("카테고리 이름을 표시한다", () => {
    render(<DesignCard design={mockDesign} />);
    expect(screen.getByText("Hanbok Heritage")).toBeInTheDocument();
  });

  it("좋아요 수를 표시한다", () => {
    render(<DesignCard design={mockDesign} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("디자인 상세 페이지 링크를 생성한다", () => {
    render(<DesignCard design={mockDesign} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/design/design-001");
  });

  it("이미지가 있으면 img를 렌더링한다", () => {
    render(<DesignCard design={mockDesign} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/img1.webp");
  });

  it("이미지가 없으면 'No Image'를 표시한다", () => {
    const noImageDesign = { ...mockDesign, image_urls: [], selected_image_url: null };
    render(<DesignCard design={noImageDesign} />);
    expect(screen.getByText("No Image")).toBeInTheDocument();
  });

  it("존재하지 않는 카테고리면 category_id를 표시한다", () => {
    const unknownCategory = { ...mockDesign, category_id: "unknown_style" };
    render(<DesignCard design={unknownCategory} />);
    expect(screen.getByText("unknown_style")).toBeInTheDocument();
  });
});
