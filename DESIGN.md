# DESIGN.md — Kraftly 디자인 시스템

## 3-1. 디자인 방향성

- **전체 무드**: 럭셔리 + 클린 + 따뜻한 톤 (하이엔드 주얼리 브랜드)
- **모바일 퍼스트**: 해외 소비자 모바일 비율 70%+
- **영문 UI 우선**: 1차 타겟이 해외 소비자
- **이중 테마**: 일반 페이지(라이트) + AI Studio(다크)
- **몰입형 AI Studio**: Google Stitch 스타일 다크 캔버스 워크스페이스
- **표면 계층**: 그림자 대신 배경색 차이로 depth 표현 (M3 Surface Container)
- **프리미엄 인터랙션**: framer-motion 기반 마이크로 애니메이션 + 부드러운 전환

## 3-2. 컬러 시스템

### 라이트 테마

| 토큰 | 코드 | 용도 |
|------|------|------|
| primary | `#C9A96E` | 골드 — CTA, 강조, 브랜드 |
| secondary | `#1B3A5C` | 딥 네이비 — 헤더, Hero |
| background | `#FAFAF8` | 웜 화이트 — 페이지 배경 |
| surface | `#FFFFFF` | 카드, 모달 배경 |
| surface-muted | `#F5F0E8` | 섹션 구분 배경 |
| text | `#1A1A1A` | 본문 |
| text-muted | `#6B7280` | 보조 텍스트 |
| border | `#E5E2DC` | 구분선 |
| success/error/warning | `#059669`/`#DC2626`/`#D97706` | 상태 |

### 다크 테마 (AI Studio — Google Stitch 영감)

| 토큰 | 코드 | 용도 |
|------|------|------|
| dark-bg | `#121214` | 캔버스 배경 |
| dark-surface | `#1C1C1F` | 기본 표면 |
| dark-surface-mid | `#232326` | 카드 (M3 Surface Container) |
| dark-surface-high | `#2A2A2E` | 호버/활성 상태 |
| dark-surface-highest | `#333338` | 선택된 항목 |
| dark-text | `#F0EDE8` | 기본 텍스트 (웜 화이트) |
| dark-text-muted | `#9CA3AF` | 보조 텍스트 |
| dark-border | `#3A3A3F` | 테두리 |
| dark-accent | `#D4B87A` | 골드 (다크 모드 밝기 조정) |

### K-Design 카테고리 팔레트

- 한복: `#8B1A1A` `#1B3A6B` `#F5F0E8` `#C9A96E`
- 미니멀 Seoul: `#C0C0C0` `#B8860B` `#808080` `#191970`
- K-팝: `#FF69B4` `#8B00FF` `#E8E8E8` `#39FF14`
- 청자·백자: `#ACE1AF` `#FFFFF0` `#B0E0E6` `#00A86B`
- 자개·나전: `#E6E6FA` `#1A1A1A` `#50C878` `#E0115F`
- 현대 한옥: `#8B6914` `#36454F` `#808080` `#CD7F32`

## 3-3. 타이포그래피

| 용도 | 폰트 | 변수 |
|------|------|------|
| Primary | Pretendard Variable | `--font-sans` (한글+영문) |
| Display/Heading | Playfair Display | `--font-serif` (럭셔리) |
| Fallback | Inter | sans-serif |

**크기 위계 (적용됨)**:
- **Display (Hero)**: `text-5xl md:text-7xl font-serif font-bold` (Playfair Display)
- **Section Heading**: `text-3xl md:text-5xl font-serif font-bold tracking-tight`
- **Card Heading**: `text-sm font-bold` ~ `text-xl font-bold`
- **Body**: `text-base` (16px) / `text-sm` (14px)
- **Caption**: `text-xs` (12px) / `text-[11px]`
- **Muted Text**: `text-muted-foreground` (라이트) / `text-dark-text-muted` (다크)
- 자간: Heading `-0.02em` (`tracking-tight`), Body `0`
- 행간: Heading `1.2`, Body `1.6` (`leading-relaxed`)
- 안티앨리어싱: `-webkit-font-smoothing: antialiased`

## 3-4. 컴포넌트 스타일 가이드

### 설치된 shadcn/ui (14개)

Button, Card, Input, Select, Dialog, Skeleton, Avatar, Badge, Tabs, DropdownMenu, ScrollArea, Progress, Sonner, Separator

### 카드

- **라이트**: `rounded-2xl border border-warm-border/40 bg-card` / hover: `hover:-translate-y-1 hover:border-gold/20 hover:shadow-xl hover:shadow-gold/5`
- **다크**: `rounded-2xl bg-dark-surface-mid border-dark-border` / hover: `bg-dark-surface-high border-dark-accent/30`
- **카테고리 카드**: `aspect-[3/4] rounded-2xl border-2` + 이미지 배경 + 하단 그라데이션 오버레이 + 텍스트

### 버튼

- **Primary (골드)**: `bg-gold text-white rounded-xl px-8 py-5 font-semibold shadow-md shadow-gold/20 hover:bg-gold/90 hover:shadow-lg hover:shadow-gold/25`
- **Outline**: `border-warm-border rounded-xl hover:border-gold/30 hover:shadow-sm`
- **Dark Primary**: `bg-dark-accent text-dark-bg rounded-xl gold-glow`
- **호버 효과**: `transition-all` + `hover:scale-[1.03]` (CTA 한정)

### 입력 필드

- **라이트**: shadcn Input + `rounded-xl border-warm-border py-5`, 포커스 `ring-2 ring-primary/20`
- **다크 (프롬프트 바)**: `bg-dark-surface-mid rounded-2xl px-6 py-4 focus:border-dark-accent/50`

### 프로그레스 바

- 다크: `bg-dark-surface-high` 트랙 + `bg-dark-accent` 인디케이터 + 골드 글로우

## 3-5. 레이아웃 & 여백

### 글로벌 (라이트)

- Header: 로고(좌) + 네비게이션(중, `layoutId` 애니메이션 인디케이터) + 로그인/언어(우), `h-16 sticky top-0 bg-white/80 backdrop-blur-xl`
- Content: `max-w-7xl px-4 md:px-8`
- Footer: 링크 그룹 + 언어 선택 + 저작권, `py-16`
- **섹션 간 여백**: `py-24` ~ `py-32` (넉넉한 호흡)
- **콘텐츠 간 간격**: `gap-8` ~ `gap-12`

### AI Studio (다크)

```
┌─────────────────────────────────────────────┐
│  Mini Header (로고 + 뒤로가기) h-14         │
├─────────────────────────────────────────────┤
│            Canvas Area (flex-1)              │
│     카테고리 그리드 → 칩 선택 → AI 이미지     │
├─────────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐    │
│  │  Floating Prompt Bar (max-w-2xl)    │    │
│  │  [카테고리][타입][소재][입력][Generate]│    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

### 갤러리

- Masonry 그리드: `columns-2 md:columns-3 lg:columns-4 gap-4`
- 상단 필터 바 (카테고리 + 정렬)
- `py-14 md:py-20`

## 3-6. 반응형 & 접근성

**브레이크포인트**: Tailwind 기본 (`sm:640` `md:768` `lg:1024` `xl:1280` `2xl:1536`)

**접근성**: WCAG 2.1 AA 준수, 시맨틱 마크업, 키보드 네비게이션

## 3-7. 다크 모드 전략

- AI Studio: `.dark` CSS 클래스를 wrapper에 직접 적용
- `@custom-variant dark (&:is(.dark *))` — Tailwind v4
- Header/Footer: `usePathname()`으로 `/studio` 감지 시 숨김
- `next-themes`는 Phase 2 이후 전역 테마 전환 시 도입

### CSS 변수 (globals.css)

```css
:root { --primary: #C9A96E; --secondary: #1B3A5C; --background: #FAFAF8; }
.dark { --primary: #D4B87A; --background: #121214; --card: #1C1C1F; --border: #3A3A3F; }
```

커스텀 토큰: `--color-navy`, `--color-gold`, `--color-warm-white`, `--color-dark-surface`, `--color-dark-surface-high`

## 3-8. 애니메이션 시스템 (framer-motion)

### 재사용 컴포넌트 (`src/components/motion/index.tsx`)

| 컴포넌트 | 용도 | 속성 |
|----------|------|------|
| `FadeInSection` | 스크롤 기반 섹션 등장 | `whileInView`, `viewport.once`, delay 옵션 |
| `StaggerContainer` | 자식 순차 등장 | `staggerChildren: 0.08`, delay 옵션 |
| `StaggerItem` | 순차 등장 아이템 | `fadeInUp` variants |
| `HoverLift` | 호버 시 살짝 올라감 | `whileHover: { y: -4 }` |
| `PageTransition` | 페이지 진입 애니메이션 | `opacity: 0→1, y: 12→0` |

### 인터랙션 패턴

| 대상 | 애니메이션 | 값 |
|------|-----------|-----|
| 히어로 타이틀 | 순차 페이드인 | `delay: 0.2, 0.3, 0.45, 0.6` |
| 섹션 | 스크롤 진입 | `whileInView`, `viewport.amount: 0.15` |
| 카드 호버 | 리프트 + 그림자 | `translateY(-4px)` + `shadow-xl` |
| CTA 버튼 호버 | 스케일 | `scale(1.03)` |
| 네비 인디케이터 | 레이아웃 전환 | `layoutId="nav-indicator"` |
| 모바일 메뉴 | 높이 전환 | `AnimatePresence` + height 애니메이션 |
| 로그인 폼 | 마운트 애니메이션 | `opacity + y + scale` |
| Studio 섹션 | 순차 등장 | `AnimatePresence` + `motion.section` |
| 버튼 전환 | 트랜지션 | `transition-all duration-300` |

## 3-9. 로딩/에러/빈 상태

### 로딩 상태
- **일반 로딩** (`loading.tsx`): Skeleton UI — Hero + 6개 카드 그리드
- **갤러리 로딩** (`gallery/loading.tsx`): Skeleton UI — 필터 바 + Masonry 8개 카드
- **AI Studio**: Skeleton 카드 + 스피너 + 프로그레스 바

### 에러 상태 (`error.tsx`)
- AlertTriangle 아이콘 (h-20 w-20 rounded-3xl bg-red-50)
- 친절한 안내 메시지
- "Try Again" CTA 버튼 (골드)
- framer-motion 페이드인 애니메이션

### Not Found (`not-found.tsx`)
- Search 아이콘 (h-20 w-20 rounded-3xl bg-warm-muted)
- "Page Not Found" 메시지
- "Back to Home" CTA 버튼

### 빈 상태
- **갤러리**: Sparkles 아이콘 + 안내 메시지 + "Start Designing" CTA
- **내 디자인**: Palette 아이콘 (h-20 w-20 rounded-3xl) + 설명 + CTA
- 일관된 패턴: 아이콘 → 제목 → 설명 → CTA 버튼

## 3-10. 레퍼런스

### 디자인

| 서비스 | 참고 요소 |
|--------|----------|
| Google Stitch | 다크 캔버스 AI 워크스페이스, M3 Surface, 플로팅 프롬프트 |
| Mejuri | 클린 주얼리 e-커머스 |
| Midjourney | AI 이미지 생성 UX, 다크 테마 |
| Etsy | 핸드메이드 마켓플레이스 구조 |
| Pinterest | Masonry 그리드 |
| Tiffany & Co | 럭셔리 무드, 골드 + 네이비 |

### 기술

- shadcn/ui (ui.shadcn.com), Tailwind v4, Next.js App Router, Supabase, Material Design 3, framer-motion

### 이미지

- Unsplash 무료 사진 (`src/data/images.ts`에서 중앙 관리)
- HERO_IMAGES(1장), CATEGORY_IMAGES(6장), GALLERY_IMAGES(18장)
- Next.js `<Image>` 컴포넌트 (WebP 자동 변환, lazy loading)
- 이미지 비율: AI 생성 1:1, 카테고리 카드 3:4
