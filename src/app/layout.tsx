import type { ReactNode } from "react";

// next-intl이 [locale] 하위에서 HTML 구조를 관리하므로
// 루트 레이아웃은 children만 전달
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
