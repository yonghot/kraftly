# Kraftly (크래프리) — Development Specification

> **이 문서는 Claude Code에게 직접 전달하여 개발을 진행하기 위한 기술 스펙 문서입니다.**
> **Phase 1부터 순서대로 개발하세요. 각 Phase가 완료되어야 다음 Phase로 넘어갑니다.**

---

## Project Overview

**Kraftly**는 K-Design AI 주얼리 플랫폼입니다.

- 해외 소비자가 한국적 미학(K-Design)이 반영된 주얼리를 AI로 직접 디자인
- 플랫폼이 최적의 한국 핸드메이드 장인을 매칭하여 제작·배송
- 1차 타겟: 해외 소비자 (영문 UI 우선), 2차: 국내 소비자

**핵심 가치**: "AI가 K-디자인 주얼리를 그려주고, 한국 장인이 만들어주는 글로벌 플랫폼"

---

## Tech Stack

```
Frontend:  Next.js 14+ (App Router) + TypeScript + Tailwind CSS + shadcn/ui
Backend:   Next.js API Routes (초기) → 필요시 별도 서버 분리
Database:  Supabase (PostgreSQL + Auth + Storage + Realtime)
AI:        Replicate API (Stable Diffusion XL / Flux) — 자체 모델 아님, API 호출
AR:        Phase 2에서 추가 (GlamAR 또는 Banuba WebAR SDK)
Payment:   Stripe (글로벌) + 토스페이먼츠 (국내 정산)
Deploy:    Vercel
Language:  i18n with next-intl (en, ko, ja, zh)
```

---

## Database Schema (Supabase)

```sql
-- ============================================
-- Phase 1 Tables
-- ============================================

-- 사용자 (소비자 + 장인 공통)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'consumer' CHECK (role IN ('consumer', 'artisan', 'admin')),
  avatar_url TEXT,
  locale TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- K-Design 카테고리
CREATE TABLE design_categories (
  id TEXT PRIMARY KEY, -- 'hanbok', 'minimal_seoul', 'kpop', 'celadon', 'najeon', 'modern_hanok'
  name_en TEXT NOT NULL,
  name_ko TEXT NOT NULL,
  description_en TEXT,
  description_ko TEXT,
  prompt_template TEXT NOT NULL, -- AI 프롬프트 템플릿
  color_palette JSONB, -- 대표 색상 코드 배열
  thumbnail_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- AI 생성 디자인
CREATE TABLE designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  category_id TEXT REFERENCES design_categories(id),
  jewelry_type TEXT NOT NULL, -- 'ring', 'necklace', 'earring', 'bracelet', 'brooch'
  material TEXT, -- 'silver', 'gold_14k', 'gold_18k', 'rose_gold', 'platinum'
  user_prompt TEXT, -- 사용자가 추가 입력한 설명 (선택)
  full_prompt TEXT, -- 최종 AI 프롬프트 (카테고리 템플릿 + 사용자 입력)
  image_urls TEXT[], -- 생성된 이미지 URL 배열 (보통 4장)
  selected_image_url TEXT, -- 사용자가 선택한 이미지
  metadata JSONB, -- 추가 파라미터 (크기, 보석 종류 등)
  is_public BOOLEAN DEFAULT false, -- 갤러리 공개 여부
  likes_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Phase 2 Tables
-- ============================================

-- 장인 프로필 (users 테이블 확장)
CREATE TABLE artisan_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  display_name TEXT NOT NULL,
  bio_ko TEXT,
  bio_en TEXT, -- 자동 번역
  specialties TEXT[], -- ['ring', 'necklace', 'silver_work', 'stone_setting']
  materials TEXT[], -- ['silver', 'gold_14k', 'brass']
  techniques TEXT[], -- ['lost_wax', 'hand_forging', 'wire_wrapping']
  portfolio_urls TEXT[],
  location TEXT, -- 지역
  avg_rating DECIMAL(2,1) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  total_orders INT DEFAULT 0,
  min_price_krw INT, -- 최소 제작비 (원)
  avg_lead_days INT DEFAULT 7, -- 평균 제작 기간 (일)
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 주문
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL, -- 'KR-20250301-0001'
  consumer_id UUID REFERENCES users(id),
  artisan_id UUID REFERENCES users(id),
  design_id UUID REFERENCES designs(id),
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending', 'accepted', 'in_production', 'quality_check',
    'shipped', 'delivered', 'completed', 'cancelled', 'refunded'
  )),
  price_usd DECIMAL(10,2),
  commission_usd DECIMAL(10,2), -- 크래프리 수수료
  artisan_payout_krw INT, -- 장인 정산액 (원)
  shipping_usd DECIMAL(10,2),
  total_usd DECIMAL(10,2),
  shipping_address JSONB,
  tracking_number TEXT,
  stripe_payment_intent_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 리뷰
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  consumer_id UUID REFERENCES users(id),
  artisan_id UUID REFERENCES users(id),
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  photo_urls TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 장인-소비자 채팅
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  sender_id UUID REFERENCES users(id),
  content_original TEXT NOT NULL, -- 원문
  content_translated TEXT, -- 번역본
  source_lang TEXT, -- 'ko', 'en'
  target_lang TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## Phase 1: AI Design Prototype (킬러 기능)

> **목표**: K-Design AI Studio가 작동하는 웹사이트를 만든다.
> **기간**: 2~3주
> **난이도**: ★★☆☆☆ (API 호출 기반, 자체 AI 모델 불필요)
> **이것만 되면 데모 가능**: 사용자가 카테고리 선택 → AI가 주얼리 이미지 생성 → 갤러리에 공개

### 1.1 프로젝트 초기화

```bash
npx create-next-app@latest kraftly --typescript --tailwind --app --src-dir
cd kraftly
npx shadcn@latest init
npm install @supabase/supabase-js @supabase/ssr replicate next-intl zustand
```

### 1.2 페이지 구조

```
src/app/
├── [locale]/
│   ├── layout.tsx          # 글로벌 레이아웃 (네비게이션, 푸터)
│   ├── page.tsx            # 랜딩 페이지 (히어로 + K-Design 카테고리 쇼케이스)
│   ├── studio/
│   │   └── page.tsx        # ★ K-Design AI Studio (메인 기능)
│   ├── gallery/
│   │   └── page.tsx        # 커뮤니티 갤러리 (공개된 AI 디자인 모음)
│   ├── design/
│   │   └── [id]/page.tsx   # 개별 디자인 상세 페이지
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   └── my/
│       └── designs/page.tsx # 내 디자인 목록
├── api/
│   ├── generate/route.ts    # AI 이미지 생성 API
│   └── designs/route.ts     # 디자인 CRUD API
```

### 1.3 K-Design 카테고리 시드 데이터

아래 6개 카테고리를 `design_categories` 테이블에 시드합니다.
각 카테고리의 `prompt_template`은 AI 이미지 생성 시 기본 프롬프트로 사용됩니다.

```typescript
// src/data/categories.ts

export const K_DESIGN_CATEGORIES = [
  {
    id: 'hanbok',
    name_en: 'Hanbok Heritage',
    name_ko: '한복 모티프',
    description_en: 'Elegant curves inspired by traditional Korean dress — silk textures, jeogori lines, norigae knots, phoenix and crane motifs',
    description_ko: '한복의 우아한 곡선, 비단 질감, 저고리 라인, 노리개 매듭, 봉황·학 문양에서 영감을 받은 스타일',
    prompt_template: `Exquisite handmade {jewelry_type} inspired by Korean Hanbok traditional dress.
Features: flowing silk-like curves, jeogori neckline silhouette, norigae knot details, delicate crane or phoenix motifs.
Material: {material}. Color palette: deep burgundy, royal blue, soft ivory, gold accents.
Style: elegant, feminine, traditional Korean aesthetics with modern wearability.
Studio product photography on white background, 4K, photorealistic, soft lighting.`,
    color_palette: ['#8B1A1A', '#1B3A6B', '#F5F0E8', '#C9A96E'],
    sort_order: 1,
  },
  {
    id: 'minimal_seoul',
    name_en: 'Minimal Seoul',
    name_ko: '미니멀 서울',
    description_en: 'Clean geometric lines of modern Seoul — hanok rooflines, Namsan Tower silhouettes, Han River curves',
    description_ko: '서울의 현대적 도시미학, 한옥 처마선, 남산타워 실루엣, 한강 곡선의 깔끔한 기하학 라인',
    prompt_template: `Minimalist modern {jewelry_type} inspired by Seoul cityscape aesthetics.
Features: clean geometric lines, hanok roofline angles, Namsan Tower-inspired vertical elements, gentle Han River curves.
Material: {material}. Color palette: matte silver, brushed gold, concrete gray, midnight navy.
Style: architectural, minimalist, contemporary Korean urban design.
Studio product photography on white background, 4K, photorealistic, soft lighting.`,
    color_palette: ['#C0C0C0', '#B8860B', '#808080', '#191970'],
    sort_order: 2,
  },
  {
    id: 'kpop',
    name_en: 'K-Pop Glitter',
    name_ko: 'K-팝 글리터',
    description_en: 'Bold and dazzling K-Pop style — holographic effects, neon colors, layered chains, statement pieces',
    description_ko: '대담하고 화려한 K-팝 스타일, 홀로그램, 네온 컬러, 체인 레이어링, 스테이트먼트 피스',
    prompt_template: `Bold glamorous {jewelry_type} inspired by K-Pop idol fashion and stage aesthetics.
Features: eye-catching holographic elements, layered chains, crystal embellishments, asymmetric design, statement piece.
Material: {material}. Color palette: hot pink, electric purple, holographic silver, neon green accents.
Style: maximalist, trendy, stage-ready, K-Pop fashion forward.
Studio product photography on white background, 4K, photorealistic, dramatic lighting.`,
    color_palette: ['#FF69B4', '#8B00FF', '#E8E8E8', '#39FF14'],
    sort_order: 3,
  },
  {
    id: 'celadon',
    name_en: 'Celadon & Porcelain',
    name_ko: '청자·백자',
    description_en: 'Serene beauty of Goryeo celadon and Joseon white porcelain — jade-like colors, sanggam inlay, moon jar curves',
    description_ko: '고려청자·조선백자의 담백한 아름다움, 비색, 상감 기법, 매병 곡선, 달항아리 형태',
    prompt_template: `Refined {jewelry_type} inspired by Korean celadon and white porcelain pottery traditions.
Features: soft jade-green celadon color, sanggam (inlay) pattern details, moon jar rounded forms, subtle crackle glaze texture.
Material: {material} with ceramic or enamel accents. Color palette: celadon green, ivory white, pale blue, soft jade.
Style: serene, refined, museum-quality Korean traditional craft aesthetics.
Studio product photography on white background, 4K, photorealistic, soft natural lighting.`,
    color_palette: ['#ACE1AF', '#FFFFF0', '#B0E0E6', '#00A86B'],
    sort_order: 4,
  },
  {
    id: 'najeon',
    name_en: 'Najeon Mother-of-Pearl',
    name_ko: '자개·나전',
    description_en: 'Iridescent beauty of najeon lacquerware — mother-of-pearl shimmer, vine scrollwork, chilbo enamel colors',
    description_ko: '나전칠기의 영롱한 빛의 유희, 자개 오팔레슨스, 덩굴 문양, 칠보 색감',
    prompt_template: `Luxurious {jewelry_type} inspired by Korean najeon chilgi (mother-of-pearl lacquerware) tradition.
Features: iridescent mother-of-pearl inlay effect, arabesque vine scroll patterns, chilbo (cloisonné enamel) color accents.
Material: {material} with mother-of-pearl or abalone shell accents. Color palette: iridescent pearl, deep black lacquer, emerald, ruby red.
Style: luxurious, luminous, traditional Korean decorative arts.
Studio product photography on dark background, 4K, photorealistic, dramatic lighting to show iridescence.`,
    color_palette: ['#E6E6FA', '#1A1A1A', '#50C878', '#E0115F'],
    sort_order: 5,
  },
  {
    id: 'modern_hanok',
    name_en: 'Modern Hanok',
    name_ko: '현대 한옥',
    description_en: 'Where tradition meets modernity — giwa tile patterns, wood-metal fusion, lattice window (changsal) geometry',
    description_ko: '전통과 현대의 절제된 만남, 기와 패턴, 목재+메탈 퓨전, 격자 창살 기하학',
    prompt_template: `Contemporary {jewelry_type} inspired by modern hanok (Korean traditional house) architecture.
Features: giwa (roof tile) curved patterns, wood grain textures mixed with metal, changsal (lattice window) geometric patterns, clean structural lines.
Material: {material} with wood accent elements. Color palette: warm wood brown, matte charcoal, stone gray, antique brass.
Style: wabi-sabi, architectural, restrained elegance, Korean neo-traditional.
Studio product photography on white background, 4K, photorealistic, warm natural lighting.`,
    color_palette: ['#8B6914', '#36454F', '#808080', '#CD7F32'],
    sort_order: 6,
  },
];
```

### 1.4 AI 이미지 생성 API

```typescript
// src/app/api/generate/route.ts
//
// Replicate API를 사용하여 AI 이미지를 생성합니다.
// 환경변수: REPLICATE_API_TOKEN
//
// Request Body:
// {
//   category_id: string,     // K-Design 카테고리 ID
//   jewelry_type: string,    // 'ring' | 'necklace' | 'earring' | 'bracelet' | 'brooch'
//   material: string,        // 'sterling_silver' | 'gold_14k' | 'gold_18k' | 'rose_gold'
//   user_prompt?: string,    // 사용자 추가 설명 (선택, 최대 200자)
// }
//
// Response:
// {
//   images: string[],        // 생성된 이미지 URL 4개
//   design_id: string,       // DB에 저장된 디자인 ID
//   prompt_used: string,     // 사용된 최종 프롬프트
// }
//
// 로직:
// 1. category_id로 design_categories 테이블에서 prompt_template 조회
// 2. prompt_template의 {jewelry_type}, {material} 플레이스홀더를 실제 값으로 치환
// 3. user_prompt가 있으면 프롬프트 끝에 "Additional details: {user_prompt}" 추가
// 4. Replicate API 호출 (모델: stability-ai/sdxl 또는 black-forest-labs/flux-1.1-pro)
//    - num_outputs: 4
//    - guidance_scale: 7.5
//    - num_inference_steps: 30
// 5. 생성된 이미지를 Supabase Storage에 업로드
// 6. designs 테이블에 레코드 생성
// 7. 이미지 URL 배열과 design_id 반환
//
// Rate Limiting:
// - 비로그인: 하루 2회
// - 로그인 무료 사용자: 하루 5회
// - 프리미엄 구독자: 무제한 (Phase 3에서 구현)
// rate limit은 Supabase에 daily_generation_count 필드를 추가하여 관리
```

### 1.5 K-Design AI Studio 페이지 (★ 킬러 기능)

```
// src/app/[locale]/studio/page.tsx
//
// 전체 화면 레이아웃 (사이드바 없음, 몰입형 경험)
//
// ┌────────────────────────────────────────────────────────────┐
// │  HEADER: Kraftly 로고 + "K-Design AI Studio" + 로그인 버튼    │
// ├────────────────────────────────────────────────────────────┤
// │                                                            │
// │  Step 1: Choose Your K-Design Style                       │
// │  ┌─────────┐ ┌─────────┐ ┌─────────┐                     │
// │  │ 한복     │ │ 미니멀   │ │ K-팝    │                     │
// │  │ Heritage │ │  Seoul  │ │ Glitter │  ← 가로 스크롤       │
// │  │ [thumb]  │ │ [thumb] │ │ [thumb] │    카드 선택          │
// │  └─────────┘ └─────────┘ └─────────┘                     │
// │                                                            │
// │  Step 2: Design Details                                   │
// │  ┌─────────────────────────────────────────┐              │
// │  │ Jewelry Type:  (Ring) (Necklace) (Earring) ...        │
// │  │ Material:      (Silver) (14K Gold) (Rose Gold) ...    │
// │  │ Additional:    [________________] (선택, 200자 이내)    │
// │  └─────────────────────────────────────────┘              │
// │                                                            │
// │  [ ✨ Generate K-Design ] ← CTA 버튼 (큰 사이즈, 골드 색상)  │
// │                                                            │
// │  Step 3: Your Designs (생성 후 표시)                        │
// │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐            │
// │  │ img 1  │ │ img 2  │ │ img 3  │ │ img 4  │            │
// │  │        │ │        │ │        │ │        │            │
// │  │[Select]│ │[Select]│ │[Select]│ │[Select]│            │
// │  └────────┘ └────────┘ └────────┘ └────────┘            │
// │                                                            │
// │  (이미지 선택 후)                                           │
// │  ┌──────────────────────────────────────────┐             │
// │  │ 선택된 이미지 크게 표시                      │             │
// │  │                                           │             │
// │  │ [🔄 Regenerate] [📤 Share to Gallery]      │             │
// │  │ [🛒 Find Artisan → ] (Phase 2 연결)       │             │
// │  └──────────────────────────────────────────┘             │
// │                                                            │
// └────────────────────────────────────────────────────────────┘
//
// UX 상세:
// - 카테고리 선택 시 해당 카테고리의 color_palette를 배경 그라데이션으로 반영
// - 이미지 생성 중 로딩 상태: 스켈레톤 UI + "AI is crafting your K-Design..." 메시지
//   로딩 시간 약 10~30초, 프로그레스 바 표시
// - 이미지 4장은 2x2 그리드로 표시, 호버 시 확대
// - 모바일 반응형 필수 (카테고리 카드는 가로 스크롤, 이미지는 세로 나열)
```

### 1.6 랜딩 페이지

```
// src/app/[locale]/page.tsx
//
// 섹션 구성:
//
// 1. Hero Section
//    - 배경: K-Design 주얼리 이미지 슬라이드 (AI 생성 이미지 사용)
//    - 타이틀: "Design Korean Jewelry with AI"
//    - 서브: "Create unique K-Design pieces and connect with master Korean artisans"
//    - CTA: "Start Designing →" (studio 페이지로 이동)
//    - 아래 작은 텍스트: "No account needed. Free to try."
//
// 2. How It Works (3-step 가로 카드)
//    - Step 1: Choose a K-Design Style (카테고리 아이콘)
//    - Step 2: AI Generates Your Design (AI 아이콘)
//    - Step 3: Korean Artisan Crafts It (장인 아이콘)
//
// 3. K-Design Categories Showcase
//    - 6개 카테고리 카드 그리드 (2x3 또는 3x2)
//    - 각 카드: 썸네일 + 이름 + 짧은 설명 + "Try This Style →"
//
// 4. Gallery Preview
//    - "See what others are designing" 헤더
//    - 최근 공개 디자인 12개 Masonry 그리드
//    - "View All Designs →" 링크
//
// 5. For Artisans Section
//    - "Are you a Korean jewelry artisan?"
//    - 장인 혜택 설명 (해외 고객 연결, 합리적 수수료, 자동 번역)
//    - "Join as Artisan →" CTA (Phase 2 waitlist)
//
// 6. Footer
//    - About Kraftly | For Artisans | Gallery | FAQ
//    - Language Selector (EN / KO / JA / ZH)
//    - © OVVN / LILYFE
```

### 1.7 갤러리 페이지

```
// src/app/[locale]/gallery/page.tsx
//
// - 공개 설정된 AI 디자인을 Masonry 그리드로 표시
// - 필터: 카테고리별, 주얼리 타입별, 인기순/최신순
// - 각 카드: 이미지 + 카테고리 뱃지 + ❤️ 좋아요 수 + 생성자 이름
// - 카드 클릭 → /design/[id] 상세 페이지
// - Infinite scroll 페이지네이션
// - 비로그인 사용자도 열람 가능, 좋아요는 로그인 필요
```

### 1.8 디자인 시스템 가이드

```
// 색상
primary:     #1B3A5C (deep navy)
accent:      #C9A96E (gold)
background:  #FAFAF8 (warm white)
surface:     #FFFFFF
text:        #1A1A1A
text-muted:  #6B7280
border:      #E5E2DC
success:     #059669
error:       #DC2626

// 폰트
heading:     "Playfair Display" (serif) — 럭셔리 느낌
body:        "Inter" (sans-serif)
korean:      "Pretendard" — 한글 표시용

// 컴포넌트 스타일
- 카드: rounded-2xl, shadow-sm, hover:shadow-md transition
- 버튼 Primary: bg-[#C9A96E] text-white rounded-xl px-8 py-3 font-semibold
- 버튼 Secondary: border border-[#C9A96E] text-[#C9A96E] rounded-xl
- 카테고리 카드: aspect-[3/4], 하단에 그라데이션 오버레이 + 텍스트
- 전체적 무드: 럭셔리 + 클린 + 따뜻한 톤 (쥬얼리 브랜드 느낌)
```

### 1.9 Phase 1 완료 기준 (Definition of Done)

- [ ] 랜딩 페이지 완성 (반응형, 영문)
- [ ] K-Design AI Studio에서 카테고리 선택 → AI 이미지 4장 생성 작동
- [ ] 생성된 디자인이 DB에 저장됨
- [ ] 갤러리에 공개 디자인 표시
- [ ] Supabase Auth 연동 (이메일 로그인)
- [ ] 비로그인 사용자도 하루 2회 생성 가능
- [ ] Vercel 배포 완료, 커스텀 도메인 연결
- [ ] 모바일 반응형 정상 작동
- [ ] 한국어/영어 전환 작동

---

## Phase 2: Artisan Matching & Order System

> **목표**: 장인이 등록하고, 소비자가 AI 디자인을 장인에게 주문할 수 있게 한다.
> **기간**: 3~4주 (Phase 1 완료 후)
> **난이도**: ★★★☆☆

### 2.1 추가 페이지

```
src/app/[locale]/
├── artisans/
│   ├── page.tsx            # 장인 목록 (카드 그리드, 필터/검색)
│   └── [id]/page.tsx       # 장인 상세 프로필 (포트폴리오, 리뷰, 주문하기)
├── order/
│   ├── new/page.tsx        # 주문 생성 (디자인 선택 → 장인 선택 → 배송정보 → 결제)
│   └── [id]/page.tsx       # 주문 상세 (상태 추적, 채팅)
├── artisan-dashboard/      # 장인 전용 영역
│   ├── page.tsx            # 대시보드 (신규주문, 진행중, 매출요약)
│   ├── orders/page.tsx     # 주문 관리
│   ├── profile/page.tsx    # 프로필 편집
│   └── chat/page.tsx       # 소비자 채팅
└── my/
    ├── orders/page.tsx     # 내 주문 목록
    └── settings/page.tsx   # 계정 설정
```

### 2.2 장인 매칭 로직

```typescript
// src/lib/matching.ts
//
// AI 디자인의 특성을 분석하여 적합한 장인을 추천하는 로직
//
// 매칭 알고리즘 (v1 — 규칙 기반, ML 아님):
//
// Input: design (디자인 레코드)
// Output: artisan[] (추천 장인 목록, 최대 5명, 점수 순)
//
// 점수 계산:
// 1. specialty_match (40%):
//    - design.jewelry_type이 artisan.specialties에 포함되면 +40점
//
// 2. material_match (25%):
//    - design.material이 artisan.materials에 포함되면 +25점
//
// 3. rating_score (20%):
//    - artisan.avg_rating / 5 * 20
//
// 4. availability_score (15%):
//    - 현재 진행 중인 주문이 3건 미만이면 +15점
//    - 3~5건이면 +10점
//    - 5건 초과면 +5점
//
// 정렬: 총점 내림차순
// 필터: is_active = true AND is_verified = true만 포함
```

### 2.3 주문 Flow

```
소비자 주문 프로세스:
1. AI 디자인 완성 → "Find Artisan" 클릭
2. 매칭된 장인 3~5명 카드 표시 (평점, 제작기간, 최소가격, 포트폴리오)
3. 장인 선택
4. 장인이 디자인을 보고 견적(가격 + 제작기간) 제출 (24시간 이내)
5. 소비자가 견적 승인 → 배송지 입력 → Stripe 결제
6. 장인이 제작 시작 → 상태 업데이트 (사진 포함)
7. 제작 완료 → 배송 → 수령 → 리뷰

장인 주문 수신 프로세스:
1. 대시보드에 새 주문 알림
2. 디자인 이미지 + 소비자 요청사항 확인
3. 견적 입력: 제작비(원화), 예상 제작기간
4. 소비자 승인 대기
5. 승인 후 제작 시작 → 진행 상황 사진 업로드
6. 완료 → 크래프리 제공 송장으로 발송
```

### 2.4 결제 (Stripe)

```
// Stripe 연동 사양:
// - 소비자: Stripe Checkout (USD, JPY, EUR 등)
// - 수수료: 거래액의 12% (크래프리 수취)
// - 장인 정산: 월 2회, 한국 계좌로 원화 송금
//   (Phase 2에서는 수동 정산 → Phase 3에서 Stripe Connect 자동 정산)
// - 환불: 제작 시작 전까지 전액 환불, 시작 후 50% 환불
// - Escrow 패턴: 결제 즉시 capture하되, 장인 정산은 소비자 수령 확인 후
```

### 2.5 자동 번역 채팅

```
// src/lib/translate.ts
//
// Google Cloud Translation API 또는 DeepL API 사용
// - 장인이 한국어로 메시지 전송 → 소비자에게 영어로 표시
// - 소비자가 영어로 메시지 전송 → 장인에게 한국어로 표시
// - messages 테이블에 원문(content_original)과 번역(content_translated) 모두 저장
// - Supabase Realtime으로 실시간 채팅 구현
```

### 2.6 Phase 2 완료 기준

- [ ] 장인 회원가입 및 프로필/포트폴리오 등록
- [ ] 장인 매칭 알고리즘 작동
- [ ] 주문 생성 → 견적 → 결제 → 제작 → 배송 전체 Flow
- [ ] Stripe 결제 연동
- [ ] 장인-소비자 자동번역 채팅
- [ ] 장인 대시보드 (주문관리, 매출확인)
- [ ] 리뷰 시스템

---

## Phase 3: Growth Features

> **목표**: 사용자 확보 및 리텐션 강화 기능
> **기간**: 4~6주 (Phase 2 완료 후)
> **난이도**: ★★★★☆

### 3.1 AR 가상 착용

```
// AR SDK 통합 (GlamAR 또는 Banuba)
//
// 구현 방식: WebAR (앱 설치 불필요, 브라우저에서 실행)
//
// 지원 착용 부위:
// - 귀걸이: 얼굴 인식 → 귀 위치에 렌더링
// - 목걸이: 목 인식 → 목 위치에 렌더링
// - 반지: 손 인식 → 손가락에 렌더링 (난이도 높음, 후순위)
//
// 플로우:
// 1. AI 디자인 선택 후 "Try On" 버튼 클릭
// 2. 카메라 권한 요청 → 승인
// 3. 실시간 카메라 피드 위에 주얼리 오버레이
// 4. 캡처 → 사진 저장 / SNS 공유
//
// 기술 노트:
// - GlamAR: 최대 +94% 매출 증대 사례, 무료 플랜 존재
// - 2D 이미지 기반 오버레이로 시작 (3D 모델 변환은 Phase 4)
// - SDK 통합 예상 기간: 2~4주
```

### 3.2 K-Design 트렌드 피드

```
// /trend 페이지
// - K-Design 주얼리 트렌드 기사 (관리자 작성, CMS)
// - 장인 인터뷰 콘텐츠
// - K-드라마/K-팝 주얼리 트렌드 분석
// - 콘텐츠 관리: Supabase에 articles 테이블 + 마크다운 에디터
// - SEO 최적화: 영문 콘텐츠로 구글 유입 유도
```

### 3.3 프리미엄 구독

```
// Stripe Subscription 연동
// 
// Free Plan:
// - AI 디자인 생성: 월 5회
// - 기본 카테고리만
// - 갤러리 열람
//
// Premium ($4.99/월):
// - AI 디자인 생성: 무제한
// - 모든 카테고리 + 시즌 한정 카테고리
// - 고급 커스터마이징 (디테일 조정, 색상 미세조정)
// - 우선 장인 매칭
// - AR 가상 착용 무제한
// - 디자인 비공개 저장 무제한
```

### 3.4 장인 부스팅 (광고)

```
// 장인이 월 구독료를 내면:
// - 매칭 알고리즘에서 가산점 (+10점)
// - 카테고리 페이지 상단 노출
// - "Featured Artisan" 뱃지
// - 가격: ₩30,000 ~ ₩100,000/월 (3단계 티어)
```

### 3.5 Phase 3 완료 기준

- [ ] AR 가상 착용 (귀걸이 + 목걸이)
- [ ] 트렌드 피드 CMS + 콘텐츠 5개 이상
- [ ] 프리미엄 구독 결제
- [ ] 장인 부스팅 결제
- [ ] SNS 공유 기능 (디자인 + AR 착용 사진)

---

## Phase 4: Advanced (Post-MVP)

> **난이도**: ★★★★★
> **Phase 3 이후 순차 개발**

```
4.1 K-Design AI 모델 파인튜닝
    - Stable Diffusion 또는 Flux 모델을 K-Design 데이터셋으로 LoRA 파인튜닝
    - 한국 주얼리 디자인 이미지 1,000장+ 수집 및 학습
    - 현재 Phase 1의 프롬프트 엔지니어링 방식을 자체 모델로 교체
    - 품질 향상 + 스타일 일관성 강화

4.2 3D 모델 변환
    - AI 생성 2D 이미지 → 3D 모델 자동 변환
    - Tripo AI API 활용 (text/image → 3D)
    - 360도 회전 뷰어
    - 3D 모델 기반 AR 착용 (2D 오버레이 대체)

4.3 블록체인 정품 인증 (NFT)
    - Polygon L2 기반 NFT 인증서 발행
    - 장인 정보, 소재, 제작 과정 사진 메타데이터 포함
    - QR코드 → 인증 페이지 연결
    - 발행 비용: 건당 $0.01~0.05

4.4 커뮤니티 기능
    - 디자인 갤러리 투표/댓글
    - "Design Challenge" (주간/월간 테마 디자인 대회)
    - 장인 팔로우 및 알림
    - 사용자 컬렉션 (북마크 폴더)

4.5 다국어 확장
    - 일본어, 중국어(간체/번체), 태국어, 베트남어
    - 지역별 결제 수단 추가 (Alipay, Line Pay 등)
    - 지역별 배송 파트너 확장

4.6 B2B API 라이선스
    - K-Design AI 엔진을 타 브랜드에 API로 제공
    - 엔드포인트: POST /api/v1/generate
    - 과금: 건당 또는 월정액 SaaS
    - 대상: 주얼리 브랜드, 패션 플랫폼, 쇼핑몰
```

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI Image Generation
REPLICATE_API_TOKEN=

# Stripe (Phase 2)
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Translation (Phase 2)
GOOGLE_TRANSLATE_API_KEY=
# 또는
DEEPL_API_KEY=

# AR SDK (Phase 3)
GLAMAR_API_KEY=

# General
NEXT_PUBLIC_APP_URL=https://kraftly.co
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

---

## Deployment

```bash
# Vercel 배포 (권장)
vercel --prod

# 환경변수는 Vercel Dashboard에서 설정
# 도메인: kraftly.co (가칭, 확정 후 변경)
```

---

## Important Notes for Claude Code

1. **Phase 순서 엄수**: Phase 1이 완전히 작동해야 Phase 2로 넘어갑니다.
2. **영문 UI 우선**: 모든 UI 텍스트는 영어 먼저, next-intl로 한국어 번역 추가.
3. **모바일 퍼스트**: 해외 소비자는 모바일 비율이 70%+입니다. 반응형 필수.
4. **이미지 최적화**: AI 생성 이미지는 Next.js Image 컴포넌트 + WebP 변환 사용.
5. **에러 핸들링**: AI 생성 실패, 결제 실패 등 모든 에러에 사용자 친화적 메시지 표시.
6. **성능**: AI 이미지 생성 시 로딩 UX 중요 — 스켈레톤 + 프로그레스 바 + 예상 시간 표시.
7. **SEO**: 랜딩, 갤러리, 장인 프로필 페이지는 SSR/SSG로 구현.
8. **접근성**: WCAG 2.1 AA 기준 준수 (alt text, keyboard navigation, color contrast).
