# PROGRESS.md — Kraftly 개발 진행 상태

## 방법론 마이그레이션 (2026-03-10)

### 현재 상태

**Phase 1 (AI Design Prototype)** — 진행 중 (약 70% 완료)

#### 구현 완료

| 기능 | 상태 | 비고 |
|------|------|------|
| 랜딩 페이지 | ✅ | 반응형, Hero/카테고리/갤러리 프리뷰 |
| K-Design AI Studio | ✅ | 다크 몰입형, Gemini API 연동, 플로팅 프롬프트 바 |
| 갤러리 UI | ✅ | Masonry, 필터/정렬, Mock 데이터 |
| 디자인 상세 페이지 | ✅ | 이미지 + 메타데이터 |
| Auth UI | ✅ | 로그인/회원가입 폼 (Auth 연동 대기) |
| 내 디자인 페이지 | ✅ | UI 구현 완료 |
| 테스트 인프라 | ✅ | 62 tests, 11 suites |
| 다국어 (en/ko) | ✅ | next-intl v4 |
| 모바일 반응형 | ✅ | 모든 페이지 |
| Vercel 배포 | ✅ | kraftly-ashen.vercel.app |
| 장인 매칭 Mock | ✅ | 8명 데이터, 매칭 알고리즘, 4페이지 |

#### 미완료

| 기능 | 우선순위 | 차단 요인 |
|------|---------|----------|
| Supabase Auth 연동 | P0 | 환경변수 설정 필요 |
| 디자인 DB 저장 | P0 | Auth 연동 선행 |
| Rate Limiting | P0 | Auth 연동 선행 |
| 커스텀 도메인 | P0 | 도메인 구매/연결 |

#### 배포

- **프로덕션**: https://kraftly-ashen.vercel.app
- **GitHub**: https://github.com/yonghot/kraftly

### 기술 결정

| 결정 | 선택 | 이유 |
|------|------|------|
| AI 엔진 | Gemini 단독 | Pollinations/Replicate 폴백 제거, 안정성 |
| AI 모델 | gemini-2.5-flash-image | gemini-2.0-flash-exp 종료로 변경 |
| 이미지 수 | 1장/요청 | 비용 최적화 (2→1) |
| 다크 모드 | `.dark` CSS 클래스 | next-themes 불필요 (Studio만 다크) |
| UI 프레임워크 | shadcn/ui | Toast deprecated → Sonner 대체 |
| 폰트 | Pretendard (sans) + Playfair (serif) | 한글+영문 겸용 + 럭셔리 |
| 이미지 소스 | Unsplash | 무료, 검증된 URL (images.ts 중앙 관리) |
| 장인 데이터 | Mock (Phase 1) | Supabase 연동은 Phase 2 |

### 알려진 이슈 / TODO

- [ ] Supabase 프로젝트 생성 및 환경변수 설정
- [ ] Auth 연동 (이메일 로그인/회원가입)
- [ ] 디자인 저장 API → Supabase 연동
- [ ] 갤러리 좋아요 기능 (Auth 필요)
- [ ] Rate Limiting 구현
- [ ] npm audit: 6 vulnerabilities (1 low, 1 moderate, 4 high)
- [ ] Vercel Git Integration 미설정 (수동 `npx vercel --prod` 필요)
- [ ] 커스텀 도메인 (kraftly.co) 연결

---

## UI/UX 프리미엄 업그레이드 (2026-03-10)

### 개요
DESIGN.md 기준으로 전체 UI/UX를 프리미엄 수준으로 대폭 개선. framer-motion 도입, 타이포그래피 위계 강화, 여백 확대, 카드/버튼 인터랙션 개선, 로딩/에러/빈 상태 추가.

### 변경 파일 목록

#### 신규 생성
| 파일 | 설명 |
|------|------|
| `src/components/motion/index.tsx` | 재사용 모션 컴포넌트 (FadeInSection, StaggerContainer, StaggerItem, HoverLift, PageTransition) |
| `src/app/[locale]/landing-animations.tsx` | 랜딩 페이지 클라이언트 애니메이션 컴포넌트 |
| `src/app/[locale]/error.tsx` | 에러 페이지 (아이콘 + 안내 + CTA) |
| `src/app/[locale]/not-found.tsx` | 404 페이지 (아이콘 + 안내 + CTA) |
| `src/app/[locale]/loading.tsx` | 일반 로딩 Skeleton UI |
| `src/app/[locale]/gallery/loading.tsx` | 갤러리 전용 로딩 Skeleton UI |

#### 수정
| 파일 | 주요 변경 |
|------|----------|
| `src/app/[locale]/page.tsx` | Server/Client 분리, 소셜 프루프 stats 추가 |
| `src/app/[locale]/gallery/page.tsx` | PageTransition, StaggerContainer, hover lift, font-serif |
| `src/app/[locale]/design/[id]/page.tsx` | 여백 확대, shadow-lg, font-serif, rounded-xl 버튼 |
| `src/app/[locale]/auth/login/page.tsx` | motion 애니메이션, 로고 확대, shadow, font-serif |
| `src/app/[locale]/my/designs/page.tsx` | PageTransition, 빈 상태 개선 (아이콘+설명+CTA) |
| `src/app/[locale]/studio/page.tsx` | framer-motion AnimatePresence 섹션 전환 |
| `src/components/layout/header.tsx` | layoutId nav indicator, AnimatePresence 모바일 메뉴, glass morphism |
| `src/components/layout/footer.tsx` | 여백 확대 (py-16), 호버 gold, 로고 통일 |
| `src/components/design/design-card.tsx` | hover lift (-translate-y-1), shadow-xl, border-gold/20 |
| `src/components/design/category-card.tsx` | hover lift, shadow-md→shadow-xl, 여백 강화 |
| `src/messages/en.json` | statUsers, statDesigns, statRating 추가 |
| `src/messages/ko.json` | statUsers, statDesigns, statRating 추가 |
| `DESIGN.md` | 애니메이션 시스템, 여백, 로딩/에러/빈 상태 섹션 추가 |

### 개선 영역별 상세

#### 1. 히어로/랜딩 섹션
- 대형 타이틀: `text-5xl md:text-7xl font-serif font-bold`
- 감성적 서브카피 + 명확한 CTA (hover:scale-[1.03])
- Unsplash 실사 Hero 이미지 (Next/Image)
- 히어로 아래 소셜 프루프 (Users 2,400+ / Designs 12,000+ / Rating 4.9)
- 순차 페이드인 (delay 0.2~0.6)

#### 2. 여백과 레이아웃
- 섹션 간 py-24 ~ py-32
- max-w-7xl 컨테이너 + px-4 md:px-8
- 카드 간 gap-8 ~ gap-12
- Footer py-16 (기존 py-12)

#### 3. 카드와 컴포넌트
- `rounded-2xl border-warm-border/40` 기본
- hover: `-translate-y-1 shadow-xl shadow-gold/5 border-gold/20`
- 카테고리 카드: `shadow-md → hover:shadow-xl`
- 버튼: `rounded-xl shadow-md shadow-gold/20`

#### 4. 이미지와 비주얼
- Unsplash 실사 이미지 유지 (images.ts 중앙 관리)
- next/image fill + sizes + object-cover
- 일관된 aspect-ratio (1:1, 3:4)

#### 5. 마이크로 인터랙션 (framer-motion)
- 페이지 진입: PageTransition (opacity+y)
- 섹션 등장: FadeInSection (whileInView)
- 카드 순차 등장: StaggerContainer + StaggerItem
- 카드 호버: HoverLift (y: -4px)
- CTA 호버: scale(1.03)
- 네비 인디케이터: layoutId 레이아웃 전환
- 모바일 메뉴: AnimatePresence height 전환
- Studio 섹션: AnimatePresence 전환

#### 6. 타이포그래피
- Playfair Display (font-serif) 모든 주요 Heading에 적용
- Display/Heading/Body/Caption 4단계 위계 확립
- text-muted-foreground 보조 텍스트 일관 적용

#### 7. 로딩/에러/빈 상태
- Skeleton UI: 일반 + 갤러리 전용
- 에러 페이지: AlertTriangle + "Try Again" + motion
- 404: Search 아이콘 + "Back to Home"
- 빈 상태: 아이콘(h-20 w-20 rounded-3xl) + 설명 + CTA 패턴

### 빌드 및 배포
- `npm run build` ✅ 성공 (TypeScript 에러 없음)
- 정적 페이지 5개, 동적 페이지 11개
- **배포** (2026-03-11): Vercel 프로덕션 배포 완료
  - 커밋: `65f92bd` — `feat: UI/UX 프리미엄 업그레이드`
  - 빌드 시간: 55초
  - 프로덕션 URL: https://kraftly-ashen.vercel.app

---

### 다음 작업 후보

1. **Supabase Auth 연동** — Phase 1 크리티컬 패스의 첫 단계
2. **디자인 DB 저장** — Auth 완료 후 즉시 착수
3. **Rate Limiting** — Auth + DB 완료 후
4. **npm audit fix** — 보안 취약점 해소
5. **Vercel Git Integration** — 자동 배포 설정
