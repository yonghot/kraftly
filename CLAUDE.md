# CLAUDE.md — Kraftly 프로젝트 코딩 규칙

## 1-1. 언어

- 모든 응답은 **한국어**로 작성한다.
- 사고 과정(thinking)도 한글로 설명한다.
- UI 텍스트는 영문 우선, next-intl로 번역 추가.

## 1-2. 코드 작성

- **TypeScript**: `strict: true`, `any` 사용 금지
- **ESLint**: `eslint-config-next` + `@typescript-eslint/recommended`
- **포맷**: 세미콜론, 싱글 쿼트, 2칸 들여쓰기, trailing comma
- **네이밍**:
  - 컴포넌트: PascalCase (`DesignCard.tsx`)
  - 유틸/훅: camelCase (`useDesigns.ts`)
  - 상수: UPPER_SNAKE_CASE (`MAX_GENERATION_COUNT`)
  - DB 컬럼/API 필드: snake_case (`created_at`)
  - URL 경로: kebab-case (`/artisan-dashboard`)
- **파일**: 기능별 폴더 그룹핑, 하나의 파일에 하나의 주요 export
- **테스트**: 같은 디렉토리에 `*.test.ts(x)` 파일 배치

## 1-3. 아키텍처

```
src/
├── app/                    # Next.js App Router (페이지 + API)
│   ├── [locale]/           # i18n 동적 라우팅 (en, ko)
│   └── api/                # API Routes (RESTful)
├── components/             # UI 컴포넌트
│   ├── ui/                 # shadcn/ui 기본 컴포넌트
│   ├── design/             # 디자인 관련 컴포넌트
│   ├── artisan/            # 장인 관련 컴포넌트
│   ├── layout/             # 헤더, 푸터
│   └── motion/             # framer-motion 재사용 컴포넌트
├── lib/                    # 유틸리티, 외부 서비스 클라이언트
│   └── supabase/           # Supabase 클라이언트 (client, server)
├── stores/                 # Zustand 상태 관리
├── types/                  # TypeScript 타입 정의
├── data/                   # 시드 데이터, 상수
├── messages/               # i18n 번역 파일 (en.json, ko.json)
└── i18n/                   # next-intl 설정
```

- **Server Components** 기본, 인터랙션 필요 시 `"use client"` 선언
- **API Routes**: RESTful 설계, 리소스 중심 URL
- **상태 관리**: Zustand store → 컴포넌트 연결, 서버 상태는 API Route 경유
- **스타일링**: Tailwind CSS v4 + shadcn/ui + `cn()` 유틸리티

## 1-4. 최소 구현

- 요청한 내용에 대해서만 최소한으로 구현한다.
- "이것도 필요할 것 같아서" 추가 기능을 임의 구현하지 않는다.
- 하나의 요청에 하나의 관심사만 처리한다.

## 1-5. 트러블슈팅

- 오류 수정 시 근본 원인을 파악하여 수정한다. 임시 방편 금지.
- 원인과 해결책을 아래 기록에 추가한다.
- 디버깅용 `console.log`, 임시 코드는 반드시 제거한다.

### 트러블슈팅 기록

| # | 문제 | 원인 | 해결 |
|---|------|------|------|
| 1 | `create-next-app` 대문자 폴더명 실패 | Next.js CLI 소문자만 허용 | 임시 폴더에 생성 후 파일 복사 |
| 2 | `shadcn add toast` 실패 | Toast deprecated | `sonner`로 대체 |
| 3 | Vercel link 대문자 거부 | Vercel 소문자만 허용 | `--project=kraftly` 지정 |
| 4 | Studio 다크 모드 | Studio만 다크 필요 | `.dark` CSS 클래스 직접 적용 |
| 5 | Pollinations.ai 광고 이미지 | 폴백 체인에서 Pollinations 서비스 이전 | Gemini API 단독 사용으로 전환 |
| 6 | AI 생성 502 | `gemini-2.0-flash-exp` 종료 | `gemini-2.5-flash-image`로 변경 |

## 1-6. 토큰 효율

- 응답은 간결하고 핵심만 전달한다. 불필요한 서문/후기/감탄사 금지.
- 불필요한 `.md` 파일을 생성하지 않는다.
- `.md` 파일에 예시 코드를 남발하지 않는다. 핵심 스니펫만 최소한으로 포함.

## 1-7. YAGNI

- 현재 필요하지 않은 기능은 만들지 않는다.
- 특정 케이스용 로직을 다른 필드에 자동 적용하지 않는다.
- "나중에 확장할 수 있게" 미리 추상화하지 않는다.
- 3회 이상 반복될 때만 추상화를 고려한다.

## 1-8. 버전 관리

- **현재 Phase**: Phase 1 (AI Design Prototype)
- Phase 순서를 엄격히 준수한다 (Phase 1 완료 → Phase 2 착수).
- 각 Phase의 완료 기준을 모두 충족해야 다음 Phase로 진행한다.

### 기술 스택

```
Framework:  Next.js 16.1.6 (App Router) + React 19 + TypeScript 5
Styling:    Tailwind CSS v4 + shadcn/ui (14개)
Database:   Supabase (PostgreSQL + Auth + Storage)
AI:         Google Gemini API (gemini-2.5-flash-image)
State:      Zustand 5
i18n:       next-intl v4 (en, ko)
Testing:    Jest 30 + Testing Library (62 tests, 11 suites)
Deploy:     Vercel (kraftly-ashen.vercel.app)
```

### 배포 정보

- **GitHub**: https://github.com/yonghot/kraftly
- **Vercel**: https://kraftly-ashen.vercel.app

## 1-9. 추가 원칙

> 프로젝트 진행 중 발견되는 추가 원칙을 여기에 기록한다.
