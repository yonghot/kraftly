# Architecture — Kraftly

## 시스템 개요

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Browser)                      │
│  Next.js App Router (React 19 + TypeScript)                  │
│  ┌─────────┐ ┌──────────┐ ┌────────┐ ┌──────────┐          │
│  │ Pages   │ │Components│ │ Stores │ │   i18n   │          │
│  │ (SSR/   │ │(shadcn/  │ │(Zustand│ │(next-intl│          │
│  │  CSR)   │ │  ui)     │ │  5)    │ │  v4)     │          │
│  └────┬────┘ └──────────┘ └───┬────┘ └──────────┘          │
│       │                       │                              │
│       ▼                       ▼                              │
│  ┌─────────────────────────────┐                            │
│  │    API Routes (/api/*)      │                            │
│  └──────┬──────────────┬───────┘                            │
└─────────┼──────────────┼────────────────────────────────────┘
          │              │
          ▼              ▼
   ┌──────────┐   ┌──────────────┐
   │  Gemini  │   │   Supabase   │
   │  API     │   │  (PostgreSQL │
   │ (이미지)  │   │  +Auth+Store)│
   └──────────┘   └──────────────┘
```

## 레이어 구조

### 1. Presentation Layer (`src/app/[locale]/`)

- **Server Components** (기본): 레이아웃, 정적 페이지
- **Client Components** (`"use client"`): 인터랙티브 페이지 (Studio, Gallery, Artisans)
- **라우팅**: `[locale]` 동적 세그먼트로 다국어 지원

### 2. Component Layer (`src/components/`)

```
components/
├── ui/              # shadcn/ui 기본 (14개) — 순수 UI, 비즈니스 로직 없음
├── design/          # 디자인 도메인 (DesignCard, CategoryCard, OrderButton)
├── artisan/         # 장인 도메인 (ArtisanCard, ArtisanFilters, QuoteForm)
├── layout/          # 글로벌 레이아웃 (Header, Footer)
└── motion/          # framer-motion 재사용 컴포넌트 (FadeInSection, StaggerContainer, HoverLift, PageTransition)
```

### 3. State Layer (`src/stores/`)

| Store | 역할 | 주요 상태 |
|-------|------|----------|
| `design-store` | AI 디자인 생성 플로우 | category, jewelryType, material, generatedImages, isGenerating |
| `artisan-store` | 장인 매칭 플로우 | matchRequest, matchedArtisans, selectedArtisan, filters |

### 4. Business Logic Layer (`src/lib/`)

| 모듈 | 역할 |
|------|------|
| `matching.ts` | 장인 매칭 알고리즘 (specialty 40% + material 25% + rating 20% + availability 15%) |
| `utils.ts` | `cn()` — clsx + tailwind-merge |
| `supabase/client.ts` | 브라우저 Supabase 클라이언트 (@supabase/ssr) |
| `supabase/server.ts` | 서버 Supabase 클라이언트 (쿠키 관리) |

### 5. API Layer (`src/app/api/`)

| 엔드포인트 | 메서드 | 역할 |
|-----------|--------|------|
| `/api/generate` | POST | Gemini API로 주얼리 이미지 생성 |
| `/api/designs` | GET | 공개 디자인 목록 조회 |
| `/api/designs` | POST | 디자인 저장 (Supabase 대기) |

### 6. Data Layer (`src/data/`)

| 파일 | 내용 |
|------|------|
| `categories.ts` | 6개 K-Design 카테고리 (프롬프트 템플릿 포함) |
| `artisans.ts` | 8명 Mock 장인 데이터 (Phase 2에서 DB 이관) |
| `images.ts` | Unsplash 이미지 URL 중앙 관리 (Hero 1장, Category 6장, Gallery 18장) |

### 7. Type Layer (`src/types/`)

`index.ts` — User, Design, DesignCategory, ArtisanProfile, JewelryType, Material, GenerateRequest/Response 등 전체 타입 정의

## 데이터 흐름

### AI 이미지 생성

```
Studio Page → Zustand (design-store)
  → POST /api/generate { category_id, jewelry_type, material, user_prompt? }
  → 카테고리 prompt_template 조회
  → 플레이스홀더 치환 + JEWELRY_TYPE_DETAILS + MATERIAL_DETAILS 보강
  → Google Gemini API (gemini-2.5-flash-image) 호출
  → Base64 이미지 응답
  → Zustand 상태 업데이트
  → UI 렌더링
```

### 장인 매칭

```
디자인 완료 → Artisan Store (setMatchRequest)
  → runMatching() → matching.ts (calculateMatchScore)
  → 가중치 점수 계산 (specialty 40% + material 25% + rating 20% + availability 15%)
  → 정렬된 매칭 결과 → UI 렌더링
```

## 미들웨어

`src/middleware.ts` — next-intl 미들웨어로 Accept-Language 기반 로케일 감지 및 리다이렉트

## 인프라

| 항목 | 기술 | 상태 |
|------|------|------|
| 호스팅 | Vercel | ✅ 배포 완료 |
| DB | Supabase PostgreSQL | ⬜ 스키마 정의만 완료 |
| 인증 | Supabase Auth | ⬜ UI만 구현 |
| 스토리지 | Supabase Storage | ⬜ 미연동 |
| AI | Google Gemini API | ✅ 연동 완료 |
| CDN | Vercel Edge Network | ✅ 자동 |

## 보안 고려사항

- API 키는 서버 사이드에서만 사용 (`GEMINI_API_KEY`)
- Supabase `NEXT_PUBLIC_*` 키는 클라이언트 안전 (RLS 정책으로 보호)
- Rate Limiting 미구현 — Phase 1 잔여 작업
- CORS: Next.js 기본 설정 (same-origin)
