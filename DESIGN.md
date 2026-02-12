# DESIGN.md — Kraftly 디자인 시스템

> UI/UX 디자인, 컴포넌트, 테마, 레퍼런스를 정리하는 문서입니다.
> 새로운 디자인 요소가 추가되거나 변경될 때마다 업데이트합니다.

---

## 1. 디자인 방향성

- **전체 무드**: 럭셔리 + 클린 + 따뜻한 톤 (하이엔드 주얼리 브랜드 느낌)
- **모바일 퍼스트**: 해외 소비자 모바일 비율 70%+ 대응
- **영문 UI 우선**: 1차 타겟이 해외 소비자
- **몰입형 AI Studio**: Google Stitch 스타일의 다크 캔버스 기반 AI 생성 워크스페이스
- **이중 테마**: 일반 페이지(라이트) + AI Studio(다크) — `.dark` CSS 클래스 + Tailwind v4 `@custom-variant`
- **표면 계층 구조**: 그림자 대신 미묘한 배경색 차이로 depth 표현 (M3 Surface Container 패턴)
- **최소 크롬**: AI Studio에서는 네비게이션을 최소화하고 콘텐츠에 집중

---

## 2. 컬러 시스템

### 라이트 테마 (일반 페이지)

| 토큰 | 색상 코드 | 용도 |
|------|----------|------|
| primary | `#C9A96E` | 골드 — CTA 버튼, 강조, 브랜드 포인트 |
| secondary | `#1B3A5C` | 딥 네이비 — 헤더, Hero 배경 |
| background | `#FAFAF8` | 웜 화이트 — 페이지 배경 |
| surface | `#FFFFFF` | 카드, 모달, 패널 배경 |
| surface-muted | `#F5F0E8` | 섹션 구분 배경, subtle 영역 |
| text | `#1A1A1A` | 본문 텍스트 |
| text-muted | `#6B7280` | 보조 텍스트, 설명, placeholder |
| border | `#E5E2DC` | 구분선, 카드 테두리 |
| success | `#059669` | 성공 상태 |
| error | `#DC2626` | 오류 상태 |
| warning | `#D97706` | 경고 상태 |

### 다크 테마 (AI Studio) — Google Stitch 영감

Google Stitch 인터페이스 분석 결과를 기반으로 한 다크 테마 팔레트:

| 토큰 | 색상 코드 | 용도 | Stitch 대응 |
|------|----------|------|------------|
| dark-bg | `#121214` | 최하위 배경, 캔버스 | Stitch `#191a1f` 기반 조정 |
| dark-surface | `#1C1C1F` | 기본 표면 (사이드바, 패널) | M3 Surface |
| dark-surface-low | `#18181B` | 낮은 강조 표면 | M3 Surface Container Low |
| dark-surface-mid | `#232326` | 중간 강조 표면 (카드) | M3 Surface Container |
| dark-surface-high | `#2A2A2E` | 높은 강조 표면 (호버, 활성) | M3 Surface Container High |
| dark-surface-highest | `#333338` | 최고 강조 표면 (선택된 항목) | M3 Surface Container Highest |
| dark-text | `#F0EDE8` | 기본 텍스트 (웜 화이트) | On Surface |
| dark-text-muted | `#9CA3AF` | 보조 텍스트 | On Surface Variant |
| dark-border | `#3A3A3F` | 미묘한 테두리 | Outline Variant |
| dark-accent | `#D4B87A` | 골드 (다크 모드용 밝기 조정) | Primary 적용 |
| dark-accent-muted | `#C9A96E20` | 골드 글로우/배경 (20% 투명도) | Primary Container |

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
| Primary (sans) | Pretendard Variable | CDN 웹폰트, `--font-sans` 최우선. 한글+영문 겸용 |
| Heading | Playfair Display (serif) | 럭셔리 느낌, Google Fonts. `--font-serif` |
| Body fallback | Inter (sans-serif) | Pretendard 미로드 시 폴백 |
| Mono | JetBrains Mono | 코드/기술 정보 표시용 (필요 시) |

> **변경 이력**: 기존 Body=Inter → Pretendard를 `--font-sans` 최우선으로 변경 (2026-02-12).
> 로고 폰트도 `font-serif` → `font-sans tracking-tighter`로 변경하여 Pretendard 기반 모던 로고로 전환.

### 크기 스케일
- Tailwind 기본 스케일 사용 (`text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl` 등)
- Hero 타이틀: `text-4xl md:text-6xl`, Playfair Display
- 섹션 타이틀: `text-2xl md:text-3xl`
- 본문: `text-base` (16px)
- Caption/보조: `text-sm` (14px)
- Small: `text-xs` (12px)
- 자간: Heading `-0.02em`, Body `0`
- 행간: Heading `1.2`, Body `1.6`
- 안티앨리어싱: `-webkit-font-smoothing: antialiased` (Stitch 동일)

---

## 4. 컴포넌트 스타일 가이드

### 카드

**라이트 테마**:
- `rounded-2xl border border-border bg-card shadow-sm`
- 호버: `hover:shadow-md hover:border-gold/30 transition-all duration-300`
- 카테고리 카드: `aspect-[3/4]`, 하단 그라데이션 오버레이 + 텍스트

**다크 테마 (AI Studio)**:
- `rounded-2xl bg-dark-surface-mid border border-dark-border`
- 호버: `hover:bg-dark-surface-high hover:border-dark-accent/30 transition-all duration-200`
- 그림자 대신 배경색 변화로 elevation 표현 (Stitch 패턴)

### 버튼

**Primary** (골드 CTA):
```
bg-primary text-primary-foreground rounded-xl px-8 py-3 font-semibold
hover:bg-primary/90 active:scale-[0.98] transition-all duration-150
```

**Secondary** (아웃라인):
```
border border-primary text-primary bg-transparent rounded-xl
hover:bg-primary/10 transition-colors
```

**Ghost** (텍스트만):
```
text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg
```

**Dark Mode Primary** (AI Studio):
```
bg-dark-accent text-dark-bg rounded-xl px-8 py-3 font-semibold
hover:bg-dark-accent/90 shadow-[0_0_20px_rgba(212,184,122,0.15)]
```

**Icon Button** (Stitch 스타일):
```
p-2 rounded-lg bg-transparent hover:bg-dark-surface-high text-dark-text-muted
hover:text-dark-text transition-colors
```

### 입력 필드

**라이트**:
- shadcn/ui Input 기본 + `rounded-xl`, 포커스 시 `ring-2 ring-primary/20 border-primary`

**다크 (AI Studio 프롬프트 바)** — Stitch 플로팅 프롬프트 영감:
```
bg-dark-surface-mid border border-dark-border rounded-2xl px-6 py-4
placeholder:text-dark-text-muted focus:border-dark-accent/50 focus:ring-1 focus:ring-dark-accent/20
text-dark-text text-base
```

### 뱃지
- 카테고리 뱃지: 해당 카테고리 color_palette 첫 번째 색상 배경 (20% 투명도) + 동일 색상 텍스트
- 상태 뱃지: `rounded-full px-2.5 py-0.5 text-xs font-medium`

### 프로그레스 바 (AI 생성)
- 다크 모드: `bg-dark-surface-high` 트랙 + `bg-dark-accent` 인디케이터
- 골드 글로우 효과: `shadow-[0_0_10px_rgba(212,184,122,0.3)]`
- 라이트 모드: `bg-muted` 트랙 + `bg-primary` 인디케이터

### 스켈레톤 (AI 생성 로딩)
- 다크 모드: `bg-dark-surface-mid` 배경에 `bg-dark-surface-high` 펄스
- 라이트 모드: shadcn 기본 스켈레톤

---

## 5. shadcn/ui 컴포넌트 활용 전략

### Phase 1 사용 컴포넌트 (14개 설치 완료)

| 컴포넌트 | 용도 | 다크 모드 | 커스텀 variant |
|----------|------|-----------|---------------|
| Button | CTA, 액션, 아이콘 버튼 | ✅ | `gold`, `dark-ghost`, `dark-outline` |
| Card | 카테고리·디자인·갤러리 카드 | ✅ | `dark-elevated`, `dark-interactive` |
| Input | 사용자 프롬프트, 검색 | ✅ | `dark-prompt` (플로팅 스타일) |
| Select | Jewelry Type, Material | ✅ | 다크 모드 팝오버 스타일 |
| Dialog | 이미지 확대, 확인 모달 | ✅ | `dark-overlay` (blur 배경) |
| Skeleton | AI 생성 로딩 UI | ✅ | `dark-pulse` |
| Avatar | 사용자 프로필 | ✅ | — |
| Badge | 카테고리 라벨, 상태 | ✅ | `category` (동적 색상) |
| Tabs | 갤러리 필터, 정렬 | ✅ | `dark-underline` |
| DropdownMenu | 언어 선택, 사용자 메뉴 | ✅ | — |
| ScrollArea | 카테고리 가로 스크롤 | ✅ | — |
| Progress | AI 생성 프로그레스 바 | ✅ | `gold-glow` |
| Sonner | 토스트 알림 | ✅ | — |
| Separator | 섹션 구분 | ✅ | — |

### Phase 1 추가 설치 예정 (Stitch 패턴 적용)

| 컴포넌트 | 용도 | 근거 |
|----------|------|------|
| Tooltip | 아이콘 버튼 설명, 기능 힌트 | Stitch 툴바 패턴 |
| Toggle | 라이트/다크 테마 전환 | Stitch 테마 토글 |
| ToggleGroup | Step 네비게이션, 뷰 모드 전환 | Stitch 모드 선택기 |
| Popover | 컬러 피커, 필터 패널 | Stitch 사이드바 패널 |
| Slider | 이미지 생성 파라미터 조정 (guidance_scale 등) | Stitch 커스터마이즈 |
| Switch | 갤러리 공개 전환, 설정 토글 | — |
| Collapsible | Studio 고급 옵션 펼침/접기 | Stitch 사이드바 섹션 |
| Command | 빠른 검색/명령 팔레트 (⌘K) | Stitch 프롬프트 패턴 |
| Drawer | 모바일 하단 시트 (필터, 옵션) | 모바일 UX |
| AspectRatio | 이미지 비율 고정 (1:1, 3:4) | — |
| HoverCard | 갤러리 디자인 미리보기 | — |
| Carousel | 생성 이미지 모바일 슬라이드 | — |

### Phase 2 추가 컴포넌트

| 컴포넌트 | 용도 |
|----------|------|
| Form + Label | 주문 생성, 장인 프로필 편집 |
| Table | 장인 대시보드 주문 목록 |
| Sheet | 모바일 사이드 메뉴 |
| Textarea | 채팅, 리뷰 작성, 장문 프롬프트 |
| RadioGroup | 장인 선택 |
| Stepper (커스텀) | 주문 진행 상태 표시 |
| NavigationMenu | 장인 대시보드 메인 네비게이션 |
| Accordion | FAQ, 장인 프로필 섹션 |

---

## 6. 레이아웃

### 글로벌 레이아웃 (라이트)
- **Header**: 로고 (좌) + 네비게이션 (중) + 로그인/언어 (우), 높이 `64px`, `sticky top-0`
- **Footer**: 링크 그룹 + 언어 선택 + 저작권
- **Content**: max-width `1280px`, 좌우 패딩 `px-4 md:px-8`

### AI Studio 레이아웃 (다크) — Stitch 영감 적용

```
┌────────────────────────────────────────────────────────────┐
│  Header (축소형: 로고 + 뒤로가기만)  h-12  bg-dark-bg      │
├────────────────────────────────────────────────────────────┤
│                                                            │
│                    Canvas Area                             │
│              (생성 이미지 2×2 그리드                         │
│               또는 Step 1~3 콘텐츠)                         │
│                bg-dark-bg                                   │
│                flex-1                                       │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Floating Prompt Bar (하단 고정)                       │  │
│  │  bg-dark-surface-mid rounded-2xl border              │  │
│  │  max-w-2xl mx-auto px-6 py-4                         │  │
│  │  [카테고리] [타입] [소재] [프롬프트 입력...] [Generate] │  │
│  └──────────────────────────────────────────────────────┘  │
│  mb-6  (하단 여백)                                         │
└────────────────────────────────────────────────────────────┘
```

**핵심 원칙**:
- 전체 화면 몰입형 (Header 최소화, Footer 숨김)
- 하단 플로팅 프롬프트 바 (Stitch의 프롬프트 입력 패턴)
- 캔버스 영역은 `flex-1`로 가용 공간 최대 활용
- 모바일: 프롬프트 바가 하단에 고정, 캔버스 영역 스크롤

### 갤러리 레이아웃
- Masonry 그리드 (컬럼 수: 모바일 2, 태블릿 3, 데스크톱 4)
- Infinite scroll
- 상단 필터 바: 카테고리 탭 + 정렬 드롭다운

---

## 7. 반응형 브레이크포인트

Tailwind 기본 브레이크포인트 사용:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px (대형 모니터 대응)

---

## 8. 이미지 처리

- Next.js `<Image>` 컴포넌트 사용 (자동 WebP 변환, lazy loading)
- AI 생성 이미지: Supabase Storage에 저장
- **플레이스홀더 이미지**: Unsplash 무료 주얼리 사진 사용 (`src/data/images.ts`에서 중앙 관리)
  - `HERO_IMAGES`: Hero 배경용 (1장)
  - `CATEGORY_IMAGES`: 카테고리별 대표 이미지 (6장)
  - `GALLERY_IMAGES`: 갤러리/상세 페이지용 (카테고리당 3장, 총 18장)
- 이미지 비율: AI 생성 이미지 1:1, 카테고리 카드 3:4
- 다크 테마 이미지 카드: `rounded-xl overflow-hidden` + 미묘한 `ring-1 ring-dark-border`
- `next.config.ts`에 `images.unsplash.com` 도메인 등록

---

## 9. 애니메이션 & 트랜지션

Stitch 인터페이스 분석 기반 — 미니멀하고 부드러운 모션:

| 대상 | 속성 | 값 | 설명 |
|------|------|-----|------|
| 버튼 호버 | `transition-colors` | `duration-150` | 빠른 색상 전환 |
| 카드 호버 | `transition-all` | `duration-300` | 그림자 + 테두리 전환 |
| 페이지 전환 | `transition-opacity` | `duration-200` | 부드러운 등장 |
| 프로그레스 바 | `transition-[width]` | `duration-500 ease-out` | 부드러운 진행 |
| 스켈레톤 | `animate-pulse` | Tailwind 기본 | 로딩 펄스 |
| 이미지 등장 | `animate-in fade-in` | `duration-300` | tw-animate-css |
| 모달 오버레이 | backdrop-blur | `backdrop-blur-sm` | Stitch 스타일 배경 흐림 |
| 카테고리 선택 | `transition-all` | `duration-300` | 배경 그라데이션 전환 |

---

## 10. 다크 모드 구현 전략

### 다크 모드 적용 방식 (Phase 1 구현)
- AI Studio: `.dark` CSS 클래스를 페이지 wrapper에 직접 적용 (`<div className="dark">`)
- `@custom-variant dark (&:is(.dark *))` — Tailwind v4 다크 변형으로 자동 적용
- Header/Footer: `usePathname()`으로 `/studio` 경로 감지 시 렌더링 제외
- `next-themes`는 Phase 2 이후 전역 테마 전환 시 도입 예정

### CSS 변수 구조 (globals.css)
```css
:root {
  /* 라이트 테마 — 현재 구현 */
  --background: #FAFAF8;
  --foreground: #1A1A1A;
  --primary: #C9A96E;
  --secondary: #1B3A5C;
  /* ... */
}

.dark {
  /* 다크 테마 — Stitch 기반 */
  --background: #121214;
  --foreground: #F0EDE8;
  --primary: #D4B87A;          /* 다크 모드용 밝은 골드 */
  --secondary: #4A7AAF;        /* 다크 모드용 밝은 네이비 */
  --card: #1C1C1F;
  --muted: #232326;
  --border: #3A3A3F;
  --accent: #D4B87A;
  /* ... */
}
```

### 다크 모드 적용 페이지
- **AI Studio** (`/studio`): 항상 다크
- **나머지**: 사용자 선택 (기본값 라이트)

---

## 11. 실제 구현 CSS 토큰 매핑

Tailwind CSS v4 + shadcn/ui 테마 커스터마이징 (`globals.css`):

### 라이트 테마 (현재 구현)

| shadcn 토큰 | Kraftly 매핑 | 설명 |
|-------------|-------------|------|
| `--primary` | `#C9A96E` (골드) | CTA 버튼, 강조 |
| `--secondary` | `#1B3A5C` (네이비) | 헤더, 주요 텍스트 배경 |
| `--background` | `#FAFAF8` (웜 화이트) | 페이지 배경 |
| `--card` | `#FFFFFF` | 카드 배경 |
| `--muted` | `#F5F0E8` | 보조 배경 |
| `--border` | `#E5E2DC` | 테두리 |

### 다크 테마 (구현 완료 — Stitch 기반)

| shadcn 토큰 | Kraftly 다크 매핑 | 설명 |
|-------------|------------------|------|
| `--background` | `#121214` | 캔버스 배경 |
| `--foreground` | `#F0EDE8` | 기본 텍스트 (웜 화이트) |
| `--primary` | `#D4B87A` | 밝은 골드 |
| `--card` | `#1C1C1F` | 카드/패널 배경 |
| `--muted` | `#232326` | 보조 배경 |
| `--border` | `#3A3A3F` | 미묘한 테두리 |
| `--accent` | `#D4B87A` | 골드 강조 |
| `--destructive` | `#F87171` | 다크 모드 에러 (밝기 조정) |
| `--ring` | `#D4B87A` | 포커스 링 색상 |

커스텀 Tailwind 토큰: `--color-navy`, `--color-gold`, `--color-warm-white`, `--color-warm-border`, `--color-warm-muted`, `--color-dark-surface`, `--color-dark-surface-high`

---

## 12. 레퍼런스

### 디자인 레퍼런스

| 서비스 | 참고 요소 |
|--------|----------|
| **Google Stitch** (stitch.withgoogle.com) | 다크 캔버스 AI 워크스페이스, 플로팅 프롬프트 바, M3 Surface Container 계층, 최소 크롬 몰입형 UI, 테마 전환 |
| Mejuri (mejuri.com) | 클린한 주얼리 e-커머스 레이아웃, 미니멀 UI |
| Midjourney (midjourney.com) | AI 이미지 생성 UX, 프롬프트 입력 플로우, 다크 테마 |
| Etsy (etsy.com) | 핸드메이드 마켓플레이스 구조, 장인 프로필, 리뷰 시스템 |
| Pinterest | Masonry 그리드 갤러리 레이아웃 |
| Tiffany & Co | 럭셔리 주얼리 브랜드 무드, 골드 + 네이비 컬러 조합 |

### 기술 레퍼런스

| 기술 | 참고 |
|------|------|
| shadcn/ui | ui.shadcn.com — 컴포넌트 카탈로그 |
| Tailwind CSS v4 | tailwindcss.com — 유틸리티 클래스 |
| Next.js App Router | nextjs.org/docs — 라우팅, SSR/SSG |
| Supabase | supabase.com/docs — Auth, Storage, Realtime |
| Material Design 3 | m3.material.io — Color Roles, Surface Container, 다크 테마 가이드 |
| next-themes | next-themes — 라이트/다크 테마 전환 |

---

## 13. Google Stitch UI 분석 노트

### 직접 추출된 디자인 토큰 (stitch.withgoogle.com 소스)
- 배경: `#191a1f` (다크 그레이-블랙)
- 텍스트: `#fff`
- 폰트: `"Google Sans"`, sans-serif, `13px`, `line-height: 1.35`
- 아이콘: Google Material Icons (`24px`)
- 뷰포트: `100svh / 100vh / 100dvh` (풀스크린)
- CSS 변수: `--ogb-height: 48px` (Google One Bar)
- 폰트 렌더링: `-webkit-font-smoothing: antialiased`
- 스크롤: `overscroll-behavior: none`
- 프레임워크: Angular 기반

### Kraftly에 적용한 Stitch 패턴
1. **다크 캔버스 워크스페이스**: AI Studio를 다크 테마 전용으로 전환
2. **표면 계층 구조**: 그림자 대신 `surface-low → surface-mid → surface-high` 배경색 차이로 depth 표현
3. **플로팅 프롬프트 바**: 하단 고정 입력 영역 (`max-w-2xl mx-auto rounded-2xl`)
4. **최소 크롬**: Studio에서 Header 축소, Footer 제거
5. **안티앨리어싱**: 모든 텍스트에 `-webkit-font-smoothing: antialiased` 적용
6. **미묘한 골드 글로우**: 다크 배경에서 골드 액센트에 미묘한 그림자 효과

---

## 14. 디자인 변경 이력

| 날짜 | 변경 내용 |
|------|----------|
| 2026-02-10 | 초기 디자인 시스템 문서 작성 |
| 2026-02-11 | Phase 1 초안 구현 완료 — shadcn/ui 14개 컴포넌트 설치, Toast→Sonner 대체, globals.css에 Kraftly 테마 적용, Tailwind CSS v4 + tw-animate-css 적용 |
| 2026-02-11 | Google Stitch UI 분석 적용 — 다크 테마 팔레트 추가, AI Studio 레이아웃 재설계 (플로팅 프롬프트 바), 표면 계층 시스템 도입, shadcn/ui 확장 계획 (12개 컴포넌트 추가 예정), 애니메이션/트랜지션 가이드 추가, 다크 모드 CSS 토큰 정의 |
| 2026-02-12 | Stitch 스타일 UI/UX 구현 완료 — globals.css `.dark` 클래스 + M3 Surface Container 토큰 구현, AI Studio 다크 몰입형 워크스페이스 (플로팅 프롬프트 바, 카테고리 그리드, 칩 선택기), Header/Footer Studio 조건부 숨김, 랜딩·갤러리·상세·Auth 페이지 전체 UI 개선, gold-glow 유틸리티 클래스 |
| 2026-02-12 | Pretendard 폰트 + 실사 이미지 전면 적용 — `--font-sans`를 Pretendard 최우선으로 변경, Unsplash 실사 이미지 전면 도입 (`src/data/images.ts` 중앙 관리), Hero 섹션 실사 배경 이미지 + 오버레이, Gallery/Category/Detail/Studio 모든 카드에 `next/image` 실사 이미지, 로고 폰트 `font-serif` → `tracking-tighter` (Pretendard 기반) |
