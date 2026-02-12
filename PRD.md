# PRD.md — Kraftly (크래프리) 요구사항 정의서

> 이 문서를 그대로 프롬프트로 입력하면 동일한 코드 작업을 수행하여 동일한 결과물을 만들 수 있는 기술 요구사항 정의서입니다.

---

## 1. 프로젝트 개요

**Kraftly(크래프리)**는 K-Design AI 주얼리 플랫폼이다.

- 해외 소비자가 한국적 미학(K-Design)이 반영된 주얼리를 AI로 직접 디자인
- 플랫폼이 최적의 한국 핸드메이드 장인을 매칭하여 제작·배송
- 핵심 가치: "AI가 K-디자인 주얼리를 그려주고, 한국 장인이 만들어주는 글로벌 플랫폼"

### 타겟 사용자
- **1차**: 해외 소비자 (영문 UI 우선, 모바일 70%+)
- **2차**: 국내 소비자
- **공급자**: 한국 핸드메이드 주얼리 장인

### 수익 모델
- 주문 수수료: 거래액의 12%
- 프리미엄 구독: $4.99/월 (무제한 AI 생성)
- 장인 부스팅 광고: ₩30,000~100,000/월

---

## 2. 기술 스택

| 영역 | 기술 | 버전/비고 |
|------|------|-----------|
| Framework | Next.js (App Router) | 16.1.6 |
| Language | TypeScript | 5.x, strict 모드 |
| Runtime | React | 19.2.3 |
| Styling | Tailwind CSS | v4 (@tailwindcss/postcss) |
| UI 컴포넌트 | shadcn/ui | 최신 (Sonner 사용, Toast deprecated) |
| Database | Supabase (PostgreSQL) | Auth + Storage + Realtime 포함 |
| AI 이미지 생성 | Google Gemini API (단독) | gemini-2.5-flash-image (GA), IMAGE+TEXT 모달리티 |
| 상태 관리 | Zustand | 5.0.11 |
| 국제화 | next-intl | 4.8.2 (Phase 1: en, ko) |
| 결제 | Stripe | Phase 2 |
| 번역 채팅 | Google Translate API 또는 DeepL | Phase 2 |
| AR | GlamAR 또는 Banuba WebAR | Phase 3 |
| 배포 | Vercel | 배포 완료 |
| GitHub | github.com/yonghot/kraftly | - |
| 배포 URL | kraftly-ashen.vercel.app | - |
| 도메인 | kraftly.co (가칭) | 미연결 |

---

## 3. 프로젝트 초기화

```bash
# Next.js 16은 대문자 폴더명을 허용하지 않으므로 소문자로 생성 후 파일 복사
npx create-next-app@latest kraftly --typescript --tailwind --app --src-dir
cd kraftly
npx shadcn@latest init
# Toast는 deprecated → Sonner 사용
npx shadcn add button card input select dialog skeleton avatar badge tabs dropdown-menu scroll-area progress sonner separator
npm install @supabase/supabase-js @supabase/ssr @google/genai next-intl zustand
```

---

## 4. 데이터베이스 스키마

### Phase 1 테이블

**users**
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID PK | gen_random_uuid() |
| email | TEXT UNIQUE NOT NULL | |
| name | TEXT | |
| role | TEXT NOT NULL | 'consumer' \| 'artisan' \| 'admin', 기본값 'consumer' |
| avatar_url | TEXT | |
| locale | TEXT | 기본값 'en' |
| created_at | TIMESTAMPTZ | now() |
| updated_at | TIMESTAMPTZ | now() |

**design_categories**
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | TEXT PK | 'hanbok', 'minimal_seoul', 'kpop', 'celadon', 'najeon', 'modern_hanok' |
| name_en | TEXT NOT NULL | 영문 이름 |
| name_ko | TEXT NOT NULL | 한글 이름 |
| description_en | TEXT | |
| description_ko | TEXT | |
| prompt_template | TEXT NOT NULL | AI 프롬프트 템플릿 ({jewelry_type}, {material} 플레이스홀더) |
| color_palette | JSONB | 대표 색상 코드 배열 |
| thumbnail_url | TEXT | |
| sort_order | INT | 기본값 0 |
| is_active | BOOLEAN | 기본값 true |

**designs**
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID PK | gen_random_uuid() |
| user_id | UUID FK → users | |
| category_id | TEXT FK → design_categories | |
| jewelry_type | TEXT NOT NULL | 'ring' \| 'necklace' \| 'earring' \| 'bracelet' \| 'brooch' |
| material | TEXT | 'silver' \| 'gold_14k' \| 'gold_18k' \| 'rose_gold' \| 'platinum' |
| user_prompt | TEXT | 사용자 추가 입력 (선택) |
| full_prompt | TEXT | 최종 AI 프롬프트 |
| image_urls | TEXT[] | 생성된 이미지 URL 배열 (1장) |
| selected_image_url | TEXT | 사용자가 선택한 이미지 |
| metadata | JSONB | 추가 파라미터 |
| is_public | BOOLEAN | 갤러리 공개 여부, 기본값 false |
| likes_count | INT | 기본값 0 |
| created_at | TIMESTAMPTZ | now() |

### Phase 2 테이블

**artisan_profiles** — 장인 프로필 (users.id FK)
- display_name, bio_ko, bio_en, specialties[], materials[], techniques[]
- portfolio_urls[], location, avg_rating, total_reviews, total_orders
- min_price_krw, avg_lead_days, is_verified, is_active

**orders** — 주문
- order_number (형식: 'KR-YYYYMMDD-NNNN')
- consumer_id, artisan_id, design_id
- status: pending → accepted → in_production → quality_check → shipped → delivered → completed (또는 cancelled/refunded)
- price_usd, commission_usd(12%), artisan_payout_krw, shipping_usd, total_usd
- shipping_address(JSONB), tracking_number, stripe_payment_intent_id

**reviews** — 리뷰 (order_id, consumer_id, artisan_id, rating 1~5, comment, photo_urls[])

**messages** — 자동번역 채팅 (order_id, sender_id, content_original, content_translated, source_lang, target_lang)

---

## 5. K-Design 카테고리 (6종)

| ID | 영문명 | 한글명 | 컬러 팔레트 |
|----|--------|--------|------------|
| hanbok | Hanbok Heritage | 한복 모티프 | #8B1A1A, #1B3A6B, #F5F0E8, #C9A96E |
| minimal_seoul | Minimal Seoul | 미니멀 서울 | #C0C0C0, #B8860B, #808080, #191970 |
| kpop | K-Pop Glitter | K-팝 글리터 | #FF69B4, #8B00FF, #E8E8E8, #39FF14 |
| celadon | Celadon & Porcelain | 청자·백자 | #ACE1AF, #FFFFF0, #B0E0E6, #00A86B |
| najeon | Najeon Mother-of-Pearl | 자개·나전 | #E6E6FA, #1A1A1A, #50C878, #E0115F |
| modern_hanok | Modern Hanok | 현대 한옥 | #8B6914, #36454F, #808080, #CD7F32 |

각 카테고리에는 AI 프롬프트 템플릿이 포함되며, `{jewelry_type}`과 `{material}` 플레이스홀더를 실제 값으로 치환하여 사용한다.

---

## 6. 페이지 구조 및 기능 명세

### Phase 1 페이지

#### 6.1 랜딩 페이지 (`/[locale]/page.tsx`)
- **Hero**: 배경 AI 주얼리 이미지 슬라이드 + "Design Korean Jewelry with AI" + CTA → Studio
- **How It Works**: 3단계 카드 (Choose Style → AI Generates → Artisan Crafts)
- **K-Design Categories**: 6개 카테고리 카드 그리드 (2x3)
- **Gallery Preview**: 최근 공개 디자인 12개 Masonry 그리드
- **For Artisans**: 장인 모집 섹션 + waitlist CTA
- **Footer**: About \| For Artisans \| Gallery \| FAQ \| Language Selector \| © OVVN / LILYFE

#### 6.2 K-Design AI Studio (`/[locale]/studio/page.tsx`) — 킬러 기능
- **레이아웃**: Google Stitch 스타일 다크 몰입형 워크스페이스 (전체 화면, Header 최소화, Footer 숨김)
- **미니 헤더**: 뒤로가기 + 로고 + 타이틀 (h-14, 다크 테마)
- **캔버스 영역**: 6개 카테고리 그리드 → Jewelry Type/Material 칩 선택 → AI 이미지 1장 생성 결과
- **플로팅 프롬프트 바**: 하단 고정, 선택된 옵션 칩 표시 + 프롬프트 입력 + Generate 버튼
- 이미지 선택 후: gold-glow 하이라이트 + Regenerate, Share to Gallery, Find Artisan(Phase 2) 버튼
- **로딩 UX**: 스켈레톤 UI + "AI is crafting your K-Design..." + 프로그레스 바 (10~30초)
- **다크 테마**: `.dark` CSS 클래스 + M3 Surface Container 계층 구조
- **Rate Limit**: 비로그인 하루 2회, 로그인 무료 하루 5회

#### 6.3 갤러리 (`/[locale]/gallery/page.tsx`)
- 공개 디자인 Masonry 그리드
- 필터: 카테고리별, 주얼리 타입별, 인기순/최신순
- 카드: 이미지 + 카테고리 뱃지 + 좋아요 수 + 생성자
- Infinite scroll, 비로그인 열람 가능, 좋아요는 로그인 필요

#### 6.4 디자인 상세 (`/[locale]/design/[id]/page.tsx`)
- 선택된 이미지 크게 표시 + 메타데이터

#### 6.5 인증 (`/[locale]/auth/`)
- Supabase Auth 연동 (이메일 로그인)
- login, signup 페이지

#### 6.6 내 디자인 (`/[locale]/my/designs/page.tsx`)
- 로그인 사용자의 디자인 목록

### Phase 2 추가 페이지
- `/artisans/` — 장인 목록 + 상세 프로필
- `/order/` — 주문 생성, 주문 상세(상태 추적, 채팅)
- `/artisan-dashboard/` — 장인 전용 대시보드, 주문 관리, 프로필, 채팅
- `/my/orders/`, `/my/settings/`

---

## 7. API 명세

### Phase 1 API

**POST /api/generate** — AI 이미지 생성
- Request: `{ category_id, jewelry_type, material, user_prompt? }`
- 로직: 카테고리 prompt_template 조회 → 플레이스홀더 치환 → 주얼리 형태/소재 상세 묘사 보강 → user_prompt 추가 → AI API 호출(1장 생성) → 응답
- AI: Google Gemini API 단독 사용 (`GEMINI_API_KEY` 필수, 미설정 시 503)
- 프롬프트 보강: `JEWELRY_TYPE_DETAILS` (5종 형태 묘사) + `MATERIAL_DETAILS` (5종 소재 시각적 묘사) + CRITICAL 강제 지시문
- Response: `{ images: string[], design_id: string, prompt_used: string }`
- 생성 실패 시 502 반환 (폴백 없음)

**GET/POST /api/designs** — 디자인 CRUD

### Rate Limiting
- 비로그인: 하루 2회
- 로그인 무료: 하루 5회
- Supabase에 daily_generation_count 필드로 관리

---

## 8. Phase별 개발 범위

### Phase 1: AI Design Prototype (킬러 기능) — ✅ 초안 + UI/UX 개선 완료 (2026-02-12)
- ✅ 랜딩 페이지 (반응형, 영문 UI) — Hero 그라디언트, 스텝 카드, 갤러리 프리뷰 개선
- ✅ K-Design AI Studio — Google Stitch 스타일 다크 몰입형 워크스페이스 재설계 (플로팅 프롬프트 바, M3 Surface Container)
- ✅ 갤러리 UI — 골드 필터 버튼, 카드 hover 효과, masonry 레이아웃 개선
- ✅ 디자인 상세 / Auth 페이지 — 카드 기반 레이아웃 통일
- ✅ 테스트 인프라 — Jest + Testing Library (62 tests, 11 suites 통과)
- ⬜ 디자인 DB 저장 + 갤러리 공개 (API 스텁 구현, Supabase 연동 대기)
- ⬜ Supabase Auth (이메일 로그인) — UI 구현 완료, Auth 연동 대기
- ⬜ 비로그인 하루 2회 생성 — Rate Limiting 미구현
- ✅ Vercel 배포 (kraftly-ashen.vercel.app)
- ⬜ 커스텀 도메인 연결 — 미완료
- ✅ 모바일 반응형
- ✅ 한국어/영어 전환 (next-intl v4)

### Phase 2: Artisan Matching & Order System
- ✅ 장인 매칭 Mock 프로토타입 구현 완료 (Mock 데이터 8명, 매칭 알고리즘, 4개 페이지, 3개 컴포넌트)
- 장인 프로필 등록/관리 (Supabase 연동 대기)
- 장인 매칭 알고리즘 (규칙 기반: specialty 40% + material 25% + rating 20% + availability 15%) — ✅ 순수 함수 구현 완료
- 주문 Flow: 디자인 → 장인 선택 → 견적 → 결제 → 제작 → 배송 → 리뷰
- Stripe 결제 (수수료 12%, 에스크로 패턴)
- 자동 번역 채팅 (Google Translate 또는 DeepL + Supabase Realtime)
- 장인 대시보드

### Phase 3: Growth Features
- AR 가상 착용 (WebAR — 귀걸이, 목걸이)
- K-Design 트렌드 피드 (CMS)
- 프리미엄 구독 ($4.99/월, Stripe Subscription)
- 장인 부스팅 광고

### Phase 4: Advanced
- K-Design AI 모델 LoRA 파인튜닝
- 3D 모델 변환 (Tripo AI)
- 블록체인 정품 인증 (Polygon NFT)
- 커뮤니티 (투표, 댓글, 디자인 챌린지)
- 다국어 확장 (ja, zh, th, vi)
- B2B API 라이선스

---

## 9. 환경변수

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
NEXT_PUBLIC_APP_URL=https://kraftly.co
NEXT_PUBLIC_DEFAULT_LOCALE=en

# Phase 2
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
GOOGLE_TRANSLATE_API_KEY= (또는 DEEPL_API_KEY=)

# Phase 3
GLAMAR_API_KEY=
```

---

## 10. 개발 원칙 (요약)

1. **Phase 순서 엄수**: Phase 1 완전 작동 후 Phase 2 착수
2. **영문 UI 우선**: 모든 UI 텍스트는 영어 먼저, next-intl로 번역 추가
3. **모바일 퍼스트**: 해외 소비자 모바일 비율 70%+
4. **이미지 최적화**: Next.js Image 컴포넌트 + WebP
5. **에러 핸들링**: 모든 에러에 사용자 친화적 메시지
6. **성능**: AI 생성 시 스켈레톤 + 프로그레스 바
7. **SEO**: 랜딩, 갤러리, 장인 프로필은 SSR/SSG
8. **접근성**: WCAG 2.1 AA 준수
