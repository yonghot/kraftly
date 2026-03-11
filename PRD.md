# PRD.md — Kraftly (크래프리) 요구사항 정의서

## 2-1. 프로젝트 개요

**Kraftly(크래프리)**는 K-Design AI 주얼리 플랫폼이다.

- 해외 소비자가 한국적 미학(K-Design)이 반영된 주얼리를 AI로 직접 디자인
- 플랫폼이 최적의 한국 핸드메이드 장인을 매칭하여 제작·배송
- 핵심 가치: "AI가 K-디자인 주얼리를 그려주고, 한국 장인이 만들어주는 글로벌 플랫폼"

## 2-2. 타겟 사용자

- **1차**: 해외 소비자 (영문 UI 우선, 모바일 70%+)
- **2차**: 국내 소비자
- **공급자**: 한국 핸드메이드 주얼리 장인

## 2-3. 수익 모델

| 수익원 | 금액 | Phase |
|--------|------|-------|
| 주문 수수료 | 거래액의 12% | Phase 2 |
| 프리미엄 구독 | $4.99/월 (무제한 AI 생성) | Phase 3 |
| 장인 부스팅 광고 | ₩30,000~100,000/월 | Phase 3 |

## 2-4. 기술 스택

| 영역 | 기술 | 버전/비고 |
|------|------|-----------|
| Framework | Next.js (App Router) | 16.1.6 |
| Language | TypeScript | 5.x, strict 모드 |
| Runtime | React | 19.2.3 |
| Styling | Tailwind CSS | v4 (@tailwindcss/postcss) |
| UI 컴포넌트 | shadcn/ui | 최신 (Sonner 사용, Toast deprecated) |
| Database | Supabase (PostgreSQL) | Auth + Storage + Realtime 포함 |
| AI 이미지 생성 | Google Gemini API (단독) | gemini-2.5-flash-image (GA) |
| 상태 관리 | Zustand | 5.0.11 |
| 국제화 | next-intl | 4.8.2 (Phase 1: en, ko) |
| 결제 | Stripe | Phase 2 |
| AR | GlamAR 또는 Banuba WebAR | Phase 3 |
| 배포 | Vercel | kraftly-ashen.vercel.app |
| 테스팅 | Jest + Testing Library | 62 tests, 11 suites |

## 2-5. 데이터베이스 스키마

### Phase 1 테이블

**users**: id(UUID PK), email(UNIQUE), name, role('consumer'|'artisan'|'admin'), avatar_url, locale('en'), created_at, updated_at

**design_categories**: id(TEXT PK: 'hanbok'|'minimal_seoul'|'kpop'|'celadon'|'najeon'|'modern_hanok'), name_en, name_ko, description_en/ko, prompt_template, color_palette(JSONB), thumbnail_url, sort_order, is_active

**designs**: id(UUID PK), user_id(FK→users), category_id(FK→categories), jewelry_type, material, user_prompt, full_prompt, image_urls(TEXT[]), selected_image_url, metadata(JSONB), is_public, likes_count, created_at

### Phase 2 테이블

- **artisan_profiles**: display_name, bio, specialties[], materials[], techniques[], portfolio_urls[], location, avg_rating, min_price_krw, avg_lead_days, is_verified
- **orders**: order_number('KR-YYYYMMDD-NNNN'), consumer_id, artisan_id, design_id, status(pending→accepted→in_production→shipped→delivered→completed), price_usd, commission_usd(12%)
- **reviews**: order_id, consumer_id, artisan_id, rating(1~5), comment, photo_urls[]
- **messages**: order_id, sender_id, content_original, content_translated, source_lang, target_lang

## 2-6. K-Design 카테고리 (6종)

| ID | 영문명 | 한글명 | 컬러 팔레트 |
|----|--------|--------|------------|
| hanbok | Hanbok Heritage | 한복 모티프 | #8B1A1A, #1B3A6B, #F5F0E8, #C9A96E |
| minimal_seoul | Minimal Seoul | 미니멀 서울 | #C0C0C0, #B8860B, #808080, #191970 |
| kpop | K-Pop Glitter | K-팝 글리터 | #FF69B4, #8B00FF, #E8E8E8, #39FF14 |
| celadon | Celadon & Porcelain | 청자·백자 | #ACE1AF, #FFFFF0, #B0E0E6, #00A86B |
| najeon | Najeon Mother-of-Pearl | 자개·나전 | #E6E6FA, #1A1A1A, #50C878, #E0115F |
| modern_hanok | Modern Hanok | 현대 한옥 | #8B6914, #36454F, #808080, #CD7F32 |

각 카테고리에는 AI 프롬프트 템플릿이 포함되며, `{jewelry_type}`과 `{material}` 플레이스홀더를 치환하여 사용한다.

## 2-7. 페이지 구조 및 기능 명세

### Phase 1 페이지

| 라우트 | 기능 |
|--------|------|
| `/[locale]/` | 랜딩 — Hero, How It Works 3단계, 카테고리 6개 그리드, 갤러리 프리뷰, 장인 모집 |
| `/[locale]/studio` | AI Studio — 다크 몰입형, 카테고리→타입→소재 선택→AI 이미지 1장 생성, 플로팅 프롬프트 바 |
| `/[locale]/gallery` | 갤러리 — Masonry 그리드, 카테고리/타입 필터, 인기순/최신순, Infinite scroll |
| `/[locale]/design/[id]` | 디자인 상세 — 이미지 + 메타데이터 |
| `/[locale]/auth/login` | 로그인 — Supabase Auth 이메일 |
| `/[locale]/auth/signup` | 회원가입 |
| `/[locale]/my/designs` | 내 디자인 목록 |

### Phase 2 추가 페이지

| 라우트 | 기능 |
|--------|------|
| `/artisans/` | 장인 목록 + 상세 프로필 |
| `/artisans/match` | 매칭 결과 (점수 breakdown) |
| `/artisans/quote` | 견적 요청 폼 |
| `/order/` | 주문 생성, 상태 추적, 채팅 |
| `/artisan-dashboard/` | 장인 전용 대시보드 |

## 2-8. API 명세

### POST /api/generate — AI 이미지 생성

- **Request**: `{ category_id, jewelry_type, material, user_prompt? }`
- **로직**: 카테고리 prompt_template 조회 → 플레이스홀더 치환 → JEWELRY_TYPE_DETAILS/MATERIAL_DETAILS 보강 → CRITICAL 지시문 → Gemini API 호출 (1장)
- **Response**: `{ images: string[], design_id: string, prompt_used: string }`
- **에러**: 400(파라미터 누락), 503(API 키 미설정), 502(생성 실패)

### GET/POST /api/designs — 디자인 CRUD

- **GET**: 공개 디자인 목록 (category, sort, limit 쿼리)
- **POST**: 디자인 저장 (Supabase 연동 대기)

### Rate Limiting (미구현)

- 비로그인: 하루 2회
- 로그인 무료: 하루 5회
- 프리미엄: 무제한

## 2-9. Phase별 개발 범위

### Phase 1: AI Design Prototype ← 현재

- ✅ 랜딩 페이지 (반응형, 영문 UI)
- ✅ K-Design AI Studio (다크 몰입형 워크스페이스)
- ✅ 갤러리 UI (골드 필터, Masonry)
- ✅ 디자인 상세 / Auth 페이지 UI
- ✅ 테스트 인프라 (62 tests, 11 suites)
- ✅ Vercel 배포
- ✅ 모바일 반응형 + 다국어 (en/ko)
- ⬜ Supabase Auth 연동
- ⬜ 디자인 DB 저장 + 갤러리 공개
- ⬜ Rate Limiting
- ⬜ 커스텀 도메인

### Phase 2: Artisan Matching & Order System

- ✅ 장인 매칭 Mock 프로토타입 (8명, 알고리즘, 4페이지)
- ⬜ 장인 프로필 Supabase 연동
- ⬜ 주문 Flow + Stripe 결제
- ⬜ 자동 번역 채팅
- ⬜ 장인 대시보드

### Phase 3: Growth Features

- AR 가상 착용, K-Design 트렌드 피드, 프리미엄 구독, 장인 부스팅

### Phase 4: Advanced

- LoRA 파인튜닝, 3D 모델, 블록체인 인증, 커뮤니티, 다국어 확장, B2B API

## 2-10. 환경변수

```
# Phase 1 (필수)
GEMINI_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=https://kraftly.co
NEXT_PUBLIC_DEFAULT_LOCALE=en

# Phase 2
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
GOOGLE_TRANSLATE_API_KEY=

# Phase 3
GLAMAR_API_KEY=
```

## 2-11. 개발 원칙

1. **Phase 순서 엄수**: Phase 1 완전 작동 후 Phase 2 착수
2. **영문 UI 우선**: 모든 UI 텍스트는 영어 먼저
3. **모바일 퍼스트**: 해외 소비자 모바일 비율 70%+
4. **이미지 최적화**: Next.js Image + WebP
5. **에러 핸들링**: 사용자 친화적 메시지
6. **성능**: AI 생성 시 스켈레톤 + 프로그레스 바
7. **SEO**: 랜딩, 갤러리 SSR/SSG
8. **접근성**: WCAG 2.1 AA 준수
