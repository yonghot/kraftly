# CLAUDE.md — Kraftly 프로젝트 기본 지침서

> 이 문서는 모든 개발 작업에서 반드시 따라야 하는 대원칙을 정의합니다.
> 프로젝트가 진행되면서 발견된 교훈, 트러블슈팅 결과를 지속적으로 업데이트합니다.

---

## 1. 기본 원칙

- **반드시 한국어로 대답**한다.
- **사고 과정(thinking)도 항상 한글로 설명**한다.
- 모든 응답은 간결하고 핵심만 전달한다. 불필요한 서문/후기/감탄사를 넣지 않는다.
- 불필요한 `.md` 파일을 생성하지 않는다. 설명이 필요하면 기존 문서에 추가한다.
- `.md` 파일에 불필요한 예시 코드를 남발하지 않는다. 핵심 스니펫만 최소한으로 포함한다.

---

## 2. 코드 작성 원칙

### 2.1 스타일 가이드
- **TypeScript**: 엄격 모드(`strict: true`), `any` 사용 금지
- **ESLint**: Next.js 기본 규칙 + `@typescript-eslint/recommended` 적용
- **Prettier**: 세미콜론 사용, 싱글 쿼트, 2칸 들여쓰기, trailing comma
- **네이밍 규칙**:
  - 컴포넌트: PascalCase (`DesignCard.tsx`)
  - 유틸/훅: camelCase (`useDesigns.ts`, `formatPrice.ts`)
  - 상수: UPPER_SNAKE_CASE (`MAX_GENERATION_COUNT`)
  - DB 컬럼/API 필드: snake_case (`created_at`, `jewelry_type`)
  - URL 경로: kebab-case (`/artisan-dashboard`)
- **파일 구조**: 기능별 폴더 그룹핑, 하나의 파일에 하나의 주요 export

### 2.2 모듈화 원칙
- 모든 기능을 적절한 단위로 분리하고, 각 모듈에 명확한 이름을 부여한다.
- 특정 모듈 수정 시 다른 모듈에 영향이 없도록 **독립성을 확보**한다.
- **RESTful API 설계 원칙**을 절대적으로 따른다:
  - 리소스 중심 URL 설계 (`/api/designs`, `/api/designs/[id]`)
  - HTTP 메서드 의미 준수 (GET=조회, POST=생성, PUT=전체수정, PATCH=부분수정, DELETE=삭제)
  - 적절한 HTTP 상태 코드 반환
- **내부 API 적극 활용**: 프론트엔드에서 DB 직접 접근 대신 API Route를 통해 데이터를 처리한다.
- 모듈 간 의존성은 명확한 인터페이스(타입)를 통해서만 연결한다.

### 2.3 보수적 구현 원칙
- **요청한 내용에 대해서만 최소한으로 구현**한다.
- 임의로 "이것도 필요할 것 같아서" 추가 기능을 구현하지 않는다.
- YAGNI 원칙: 현재 필요하지 않은 기능은 만들지 않는다.
- 하나의 요청에 하나의 관심사만 처리한다.

### 2.4 과도한 일반화 금지
- 특정 필드/케이스용 로직을 만들 때, 다른 필드에 자동 적용하지 않는다.
- "나중에 확장할 수 있게" 미리 추상화하지 않는다.
- 3회 이상 반복될 때만 추상화를 고려한다.

---

## 3. 트러블슈팅 원칙

- 오류 수정 시 **임시 방편이나 우회가 아닌 근본 원인을 파악**하여 수정한다.
- 같은 오류가 재발하지 않도록 원인과 해결책을 이 문서의 [6. 트러블슈팅 기록](#6-트러블슈팅-기록)에 기록한다.
- 디버깅 과정에서 추가한 `console.log`, 임시 코드는 반드시 제거한다.

---

## 4. 프로젝트 기술 스택

```
Frontend:  Next.js 16 (App Router) + TypeScript 5 + Tailwind CSS v4 + shadcn/ui
Backend:   Next.js API Routes
Database:  Supabase (PostgreSQL + Auth + Storage + Realtime)
AI:        Replicate API (Flux 1.1 Pro)
State:     Zustand 5
i18n:      next-intl v4 (en, ko) — Phase 4에서 ja, zh 추가 예정
Deploy:    Vercel
Runtime:   React 19
Testing:   Jest + @testing-library/react (58 tests, 10 suites)
Payment:   Stripe (Phase 2)
```

### 배포 정보
- **GitHub**: https://github.com/yonghot/kraftly
- **Vercel**: https://kraftly-ashen.vercel.app

---

## 5. 프로젝트 구조 규칙

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/           # i18n 라우팅
│   │   ├── layout.tsx
│   │   ├── page.tsx        # 랜딩
│   │   ├── studio/         # AI Studio
│   │   ├── gallery/        # 갤러리
│   │   ├── design/[id]/    # 디자인 상세
│   │   ├── auth/           # 로그인/회원가입
│   │   └── my/             # 사용자 개인 영역
│   └── api/                # API Routes
│       ├── generate/       # AI 이미지 생성
│       └── designs/        # 디자인 CRUD
├── components/             # 공유 UI 컴포넌트
│   ├── ui/                 # shadcn/ui 컴포넌트
│   └── [feature]/          # 기능별 컴포넌트
├── lib/                    # 유틸리티, 설정
│   ├── supabase/           # Supabase 클라이언트
│   └── utils.ts
├── hooks/                  # 커스텀 훅
├── stores/                 # Zustand 스토어
├── types/                  # TypeScript 타입 정의
├── data/                   # 시드 데이터, 상수
└── messages/               # i18n 번역 파일
    ├── en.json
    └── ko.json
```

- 새 폴더/파일 생성 전에 기존 구조에 맞는 위치가 있는지 확인한다.
- 컴포넌트는 `components/` 아래에, 비즈니스 로직은 `lib/` 아래에 위치한다.
- 페이지 컴포넌트는 최소한의 로직만 포함하고, 핵심 로직은 별도 모듈로 분리한다.

---

## 6. 트러블슈팅 기록

> 발견된 문제와 근본 해결책을 기록합니다. 새로운 이슈 해결 시 여기에 추가합니다.

| # | 문제 | 원인 | 해결 |
|---|------|------|------|
| 1 | `create-next-app`이 대문자 폴더명("Kraftly")에서 실패 | Next.js CLI가 프로젝트명에 대문자를 허용하지 않음 | 임시 폴더(`kraftly-temp`)에 생성 후 파일 복사 |
| 2 | `shadcn add toast` 실패 | Toast 컴포넌트가 deprecated됨 | `sonner` 컴포넌트로 대체 |
| 3 | Vercel link 시 대문자 프로젝트명 거부 | Vercel 프로젝트명은 소문자만 허용 | `--project=kraftly` 옵션으로 소문자 지정 |
| 4 | Windows 환경에서 `xcopy` 명령 실패 | bash 환경에서 Windows 전용 명령 호환성 문제 | PowerShell `Copy-Item` 명령으로 대체 |
| 5 | AI Studio 다크 모드에 `next-themes` 불필요 | Studio만 다크 테마가 필요하고 전역 테마 전환은 Phase 1 범위 밖 | `.dark` CSS 클래스를 Studio 페이지 wrapper에 직접 적용 + `@custom-variant dark` 활용 |
| 6 | Studio에서 Header/Footer 숨기기 | 레이아웃 구조 변경 없이 조건부 렌더링 필요 | `usePathname()`으로 `/studio` 경로 감지 시 `null` 반환 |

---

## 7. Phase 관리 원칙

- Phase 순서를 엄격히 준수한다 (Phase 1 완료 → Phase 2 착수).
- 각 Phase의 완료 기준(Definition of Done)을 모두 충족해야 다음 Phase로 진행한다.
- 현재 Phase: **Phase 1 (AI Design Prototype)**
