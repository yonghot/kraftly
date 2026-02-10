# DESIGN.md — Kraftly 디자인 시스템

> UI/UX 디자인, 컴포넌트, 테마, 레퍼런스를 정리하는 문서입니다.
> 새로운 디자인 요소가 추가되거나 변경될 때마다 업데이트합니다.

---

## 1. 디자인 방향성

- **전체 무드**: 럭셔리 + 클린 + 따뜻한 톤 (하이엔드 주얼리 브랜드 느낌)
- **모바일 퍼스트**: 해외 소비자 모바일 비율 70%+ 대응
- **영문 UI 우선**: 1차 타겟이 해외 소비자
- **몰입형 경험**: AI Studio는 사이드바 없는 전체 화면 레이아웃

---

## 2. 컬러 시스템

### 기본 팔레트

| 토큰 | 색상 코드 | 용도 |
|------|----------|------|
| primary | `#1B3A5C` | 딥 네이비 — 주요 텍스트, 헤더 |
| accent | `#C9A96E` | 골드 — CTA 버튼, 강조, 브랜드 포인트 |
| background | `#FAFAF8` | 웜 화이트 — 페이지 배경 |
| surface | `#FFFFFF` | 카드, 모달 배경 |
| text | `#1A1A1A` | 본문 텍스트 |
| text-muted | `#6B7280` | 보조 텍스트, 설명 |
| border | `#E5E2DC` | 구분선, 카드 테두리 |
| success | `#059669` | 성공 상태 |
| error | `#DC2626` | 오류 상태 |

### K-Design 카테고리별 팔레트
- **한복 Heritage**: `#8B1A1A` `#1B3A6B` `#F5F0E8` `#C9A96E`
- **미니멀 Seoul**: `#C0C0C0` `#B8860B` `#808080` `#191970`
- **K-팝 Glitter**: `#FF69B4` `#8B00FF` `#E8E8E8` `#39FF14`
- **청자·백자**: `#ACE1AF` `#FFFFF0` `#B0E0E6` `#00A86B`
- **자개·나전**: `#E6E6FA` `#1A1A1A` `#50C878` `#E0115F`
- **현대 한옥**: `#8B6914` `#36454F` `#808080` `#CD7F32`

카테고리 선택 시 해당 팔레트를 배경 그라데이션으로 반영한다.

---

## 3. 타이포그래피

| 용도 | 폰트 | 비고 |
|------|------|------|
| Heading | Playfair Display (serif) | 럭셔리 느낌, Google Fonts |
| Body | Inter (sans-serif) | 가독성, Google Fonts |
| Korean | Pretendard | 한글 전용, 웹폰트 |

### 크기 스케일
- Tailwind 기본 스케일 사용 (`text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl` 등)
- Hero 타이틀: `text-4xl md:text-6xl`, Playfair Display
- 섹션 타이틀: `text-2xl md:text-3xl`
- 본문: `text-base` (16px)

---

## 4. 컴포넌트 스타일

### 카드
- `rounded-2xl`, `shadow-sm`, `hover:shadow-md`, `transition`
- 카테고리 카드: `aspect-[3/4]`, 하단 그라데이션 오버레이 + 텍스트

### 버튼
- **Primary**: `bg-[#C9A96E] text-white rounded-xl px-8 py-3 font-semibold`
- **Secondary**: `border border-[#C9A96E] text-[#C9A96E] rounded-xl`
- **Ghost**: 배경 없음, 텍스트만

### 입력 필드
- shadcn/ui Input 기본 스타일 사용
- `rounded-xl`, 포커스 시 accent 색상 border

### 뱃지
- 카테고리 뱃지: 해당 카테고리 color_palette 첫 번째 색상 배경 + 흰 텍스트

---

## 5. shadcn/ui 활용 계획

### Phase 1 사용 컴포넌트
| 컴포넌트 | 용도 |
|----------|------|
| Button | CTA, 액션 버튼 |
| Card | 카테고리 카드, 디자인 카드, 갤러리 카드 |
| Input | 사용자 프롬프트 입력 |
| Select | Jewelry Type, Material 선택 |
| Dialog | 이미지 확대 뷰 |
| Skeleton | AI 생성 중 로딩 UI |
| Avatar | 사용자 프로필 |
| Badge | 카테고리 라벨 |
| Tabs | 갤러리 필터 |
| DropdownMenu | 언어 선택, 사용자 메뉴 |
| ScrollArea | 카테고리 가로 스크롤 |
| Progress | AI 생성 프로그레스 바 |
| Toast | 알림 메시지 |

### Phase 2 추가 컴포넌트
| 컴포넌트 | 용도 |
|----------|------|
| Form | 주문 생성, 장인 프로필 편집 |
| Table | 장인 대시보드 주문 목록 |
| Sheet | 모바일 사이드 메뉴 |
| Separator | 섹션 구분 |
| Textarea | 채팅, 리뷰 작성 |
| RadioGroup | 장인 선택 |
| Label | 폼 라벨 |

---

## 6. 레이아웃

### 글로벌 레이아웃
- **Header**: 로고 (좌) + 네비게이션 (중) + 로그인/언어 (우)
- **Footer**: 링크 그룹 + 언어 선택 + 저작권
- **Content**: max-width `1280px`, 좌우 패딩 `px-4 md:px-8`

### AI Studio 레이아웃
- 사이드바 없는 전체 화면 몰입형
- 세로 스텝 진행 (Step 1 → 2 → 3)
- 모바일: 카테고리 가로 스크롤, 이미지 세로 나열

### 갤러리 레이아웃
- Masonry 그리드 (컬럼 수: 모바일 2, 태블릿 3, 데스크톱 4)
- Infinite scroll

---

## 7. 반응형 브레이크포인트

Tailwind 기본 브레이크포인트 사용:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## 8. 이미지 처리

- Next.js `<Image>` 컴포넌트 사용 (자동 WebP 변환, lazy loading)
- AI 생성 이미지: Supabase Storage에 저장
- 카테고리 썸네일: 정적 에셋 또는 Supabase Storage
- 이미지 비율: AI 생성 이미지 1:1, 카테고리 카드 3:4

---

## 9. 레퍼런스

### 디자인 레퍼런스
| 서비스 | 참고 요소 |
|--------|----------|
| Mejuri (mejuri.com) | 클린한 주얼리 e-커머스 레이아웃, 미니멀 UI |
| Midjourney (midjourney.com) | AI 이미지 생성 UX, 프롬프트 입력 플로우 |
| Etsy (etsy.com) | 핸드메이드 마켓플레이스 구조, 장인 프로필, 리뷰 시스템 |
| Pinterest | Masonry 그리드 갤러리 레이아웃 |
| Tiffany & Co | 럭셔리 주얼리 브랜드 무드, 골드 + 네이비 컬러 조합 |

### 기술 레퍼런스
| 기술 | 참고 |
|------|------|
| shadcn/ui | ui.shadcn.com — 컴포넌트 카탈로그 |
| Tailwind CSS | tailwindcss.com — 유틸리티 클래스 |
| Next.js App Router | nextjs.org/docs — 라우팅, SSR/SSG |
| Supabase | supabase.com/docs — Auth, Storage, Realtime |

---

## 10. 디자인 변경 이력

| 날짜 | 변경 내용 |
|------|----------|
| 2026-02-10 | 초기 디자인 시스템 문서 작성 |
