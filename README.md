# Ubar 블로그

모던한 웹 기술을 활용한 풀스택 블로그 플랫폼입니다. Next.js 16, React 19, Supabase, Toss Payments를 기반으로 구축되었습니다.

## 📋 목차

- [기술 스택](#기술-스택)
- [주요 기능](#주요-기능)
- [프로젝트 구조](#프로젝트-구조)
- [시작하기](#시작하기)
- [환경 변수 설정](#환경-변수-설정)
- [데이터베이스 설정](#데이터베이스-설정)
- [결제 시스템 설정](#결제-시스템-설정)
- [주요 페이지](#주요-페이지)
- [컴포넌트 구조](#컴포넌트-구조)
- [개발 가이드](#개발-가이드)
- [배포](#배포)

## 🛠 기술 스택

### 프론트엔드
- **Next.js 16.1.1** - App Router 기반 React 프레임워크
- **React 19.2.3** - 최신 React 기능 활용
- **TypeScript 5** - 타입 안정성
- **Tailwind CSS 4** - 유틸리티 우선 CSS 프레임워크
- **shadcn/ui** - 재사용 가능한 UI 컴포넌트
- **Lucide React** - 아이콘 라이브러리

### 백엔드 & 인프라
- **Supabase** - 인증, 데이터베이스, RLS (Row Level Security)
- **Toss Payments** - 결제 시스템
- **PostgreSQL** - 관계형 데이터베이스 (Supabase)

### 개발 도구
- **ESLint** - 코드 품질 검사
- **PostCSS** - CSS 처리
- **Geist Font** - 최적화된 폰트

## ✨ 주요 기능

### 1. 블로그 기능
- ✅ 포스트 목록 조회 (공개된 포스트만)
- ✅ 포스트 상세 페이지
- ✅ 포스트 검색 및 필터링
- ✅ 태그 시스템
- ✅ 이전/다음 포스트 네비게이션
- ✅ 반응형 디자인

### 2. 사용자 인증
- ✅ 이메일/비밀번호 회원가입
- ✅ 로그인/로그아웃
- ✅ 세션 관리 (Supabase SSR)
- ✅ 이메일 인증 (옵션)
- ✅ 미들웨어 기반 라우트 보호

### 3. 관리자 대시보드
- ✅ 포스트 CRUD (생성, 읽기, 수정, 삭제)
- ✅ 포스트 상태 관리 (draft/published)
- ✅ 대시보드 통계
- ✅ 결제 내역 관리
- ✅ 권한 기반 접근 제어 (admin/user)

### 4. 결제 시스템
- ✅ Toss Payments 연동
- ✅ 결제위젯 통합
- ✅ 결제 내역 관리
- ✅ 결제 상태 추적

### 5. 보안
- ✅ Row Level Security (RLS) 정책
- ✅ 서버 사이드 인증 검증
- ✅ 환경 변수를 통한 시크릿 키 관리
- ✅ CSRF 보호

## 📁 프로젝트 구조

```
blog/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/              # 관리자 페이지
│   │   │   ├── layout.tsx     # 관리자 레이아웃
│   │   │   ├── page.tsx       # 대시보드
│   │   │   ├── posts/         # 포스트 관리
│   │   │   └── payments/      # 결제 내역
│   │   ├── auth/              # 인증 관련
│   │   │   └── callback/      # OAuth 콜백
│   │   ├── blog/              # 블로그 페이지
│   │   │   ├── [slug]/        # 포스트 상세
│   │   │   └── actions.ts     # 블로그 Server Actions
│   │   ├── login/             # 로그인 페이지
│   │   ├── signup/            # 회원가입 페이지
│   │   ├── payment/           # 결제 페이지
│   │   ├── components-demo/   # 컴포넌트 데모
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── page.tsx           # 홈 페이지
│   │   └── globals.css        # 전역 스타일
│   ├── components/            # 공통 컴포넌트
│   │   ├── ui/                # shadcn/ui 컴포넌트
│   │   ├── admin/             # 관리자 전용 컴포넌트
│   │   └── *.tsx              # 프로젝트 컴포넌트
│   ├── lib/
│   │   ├── supabase/          # Supabase 클라이언트
│   │   │   ├── client.ts     # 브라우저 클라이언트
│   │   │   ├── server.ts     # 서버 클라이언트
│   │   │   └── middleware.ts # 미들웨어 클라이언트
│   │   ├── types/             # TypeScript 타입
│   │   └── utils.ts          # 유틸리티 함수
│   └── middleware.ts         # Next.js 미들웨어
├── supabase/
│   └── migrations/         # 데이터베이스 마이그레이션
├── public/                   # 정적 파일
├── components.json           # shadcn/ui 설정
├── next.config.ts            # Next.js 설정
├── tsconfig.json             # TypeScript 설정
└── package.json              # 의존성 관리
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+ 
- npm 또는 yarn
- Supabase 프로젝트
- Toss Payments 계정 (결제 기능 사용 시)

### 설치

1. **저장소 클론**
```bash
git clone <repository-url>
cd blog
```

2. **의존성 설치**
```bash
npm install
```

3. **환경 변수 설정**
`.env.local` 파일을 생성하고 필요한 환경 변수를 설정합니다. (아래 [환경 변수 설정](#환경-변수-설정) 참고)

4. **개발 서버 실행**
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 🔧 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Toss Payments 설정 (결제 기능 사용 시)
NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY=test_ck_xxxxxxxxxxxxx
TOSS_PAYMENTS_SECRET_KEY=test_sk_xxxxxxxxxxxxx

# 사이트 URL (OAuth 콜백용)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 환경 변수 설명

| 변수명 | 설명 | 필수 | 위치 |
|--------|------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | ✅ | 클라이언트/서버 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key | ✅ | 클라이언트/서버 |
| `NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY` | Toss Payments 클라이언트 키 | ⚠️ | 클라이언트 |
| `TOSS_PAYMENTS_SECRET_KEY` | Toss Payments 시크릿 키 | ⚠️ | 서버만 |
| `NEXT_PUBLIC_SITE_URL` | 사이트 URL (OAuth 콜백용) | ✅ | 클라이언트/서버 |

⚠️ **보안 주의사항**: `TOSS_PAYMENTS_SECRET_KEY`는 절대 클라이언트에 노출되면 안 됩니다!

## 🗄 데이터베이스 설정

### Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. 프로젝트 URL과 Anon Key를 `.env.local`에 설정

### 마이그레이션 실행

Supabase 대시보드의 SQL Editor에서 다음 마이그레이션 파일을 실행하세요:

- `supabase/migrations/create_posts_table.sql` - 포스트 테이블 및 RLS 정책

### 필요한 테이블

#### 1. `posts` 테이블
- 포스트 정보 저장
- RLS 정책으로 접근 제어
- 자동 타임스탬프 관리

#### 2. `users` 테이블 (Supabase Auth 확장)
- 사용자 정보 및 역할 관리
- `role` 컬럼: `admin` 또는 `user`

#### 3. `payments` 테이블 (결제 기능 사용 시)
- 결제 내역 저장
- Toss Payments 연동 데이터

### RLS (Row Level Security) 정책

프로젝트는 Supabase RLS를 사용하여 데이터 보안을 보장합니다:

- **포스트 조회**: 모든 사용자가 `published` 상태의 포스트 조회 가능
- **포스트 생성**: 인증된 사용자만 자신의 포스트 생성 가능
- **포스트 수정/삭제**: 작성자 또는 admin만 가능
- **관리자 권한**: admin은 모든 포스트에 대한 전체 권한

## 💳 결제 시스템 설정

Toss Payments 연동을 위한 상세 가이드는 [TOSS_PAYMENTS_SETUP.md](./TOSS_PAYMENTS_SETUP.md)를 참고하세요.

### 빠른 설정

1. [토스페이먼츠 개발자센터](https://developers.tosspayments.com)에서 API 키 발급
2. `.env.local`에 키 설정
3. 결제 페이지 (`/payment`)에서 테스트

## 📄 주요 페이지

### 공개 페이지

- **`/`** - 홈 페이지 (Hero, 최신 포스트, 인기 포스트, 추천 포스트)
- **`/blog/[slug]`** - 포스트 상세 페이지
- **`/login`** - 로그인 페이지
- **`/signup`** - 회원가입 페이지
- **`/payment`** - 결제 페이지
- **`/components-demo`** - 컴포넌트 데모 페이지

### 관리자 페이지 (인증 필요)

- **`/admin`** - 관리자 대시보드
- **`/admin/posts`** - 포스트 목록 및 관리
- **`/admin/posts/new`** - 새 포스트 작성
- **`/admin/posts/[id]/edit`** - 포스트 수정
- **`/admin/payments`** - 결제 내역 관리

## 🧩 컴포넌트 구조

### 공통 컴포넌트 (`src/components/`)

- **`blog-card.tsx`** - 블로그 포스트 카드
- **`header.tsx`** - 사이트 헤더/네비게이션
- **`footer.tsx`** - 사이트 푸터
- **`hero.tsx`** - Hero 섹션
- **`email-cta.tsx`** - 이메일 구독 CTA
- **`post-content.tsx`** - 포스트 콘텐츠 렌더링
- **`post-header.tsx`** - 포스트 헤더
- **`post-navigation.tsx`** - 이전/다음 포스트 네비게이션
- **`theme-toggle.tsx`** - 다크모드 토글
- **`payment-widget.tsx`** - Toss Payments 결제위젯
- **`payment-gate.tsx`** - 결제 게이트 컴포넌트

### 관리자 컴포넌트 (`src/components/admin/`)

- **`admin-layout.tsx`** - 관리자 레이아웃
- **`admin-header.tsx`** - 관리자 헤더
- **`admin-sidebar.tsx`** - 관리자 사이드바
- **`post-form.tsx`** - 포스트 작성/수정 폼
- **`post-table.tsx`** - 포스트 목록 테이블
- **`post-status-badge.tsx`** - 포스트 상태 배지
- **`payment-table.tsx`** - 결제 내역 테이블
- **`dashboard-stats.tsx`** - 대시보드 통계
- **`dashboard-recent-posts.tsx`** - 최근 포스트 목록

### UI 컴포넌트 (`src/components/ui/`)

shadcn/ui 기반 재사용 가능한 UI 컴포넌트:
- Button, Card, Badge
- Input, Textarea, Label
- Dialog, Select, Tabs
- Table, Carousel
- Checkbox, Switch, Separator

## 💻 개발 가이드

### Server Actions

프로젝트는 Next.js Server Actions를 사용하여 서버 로직을 처리합니다:

- **`src/app/blog/actions.ts`** - 블로그 관련 액션
- **`src/app/admin/posts/actions.ts`** - 포스트 관리 액션
- **`src/app/admin/payments/actions.ts`** - 결제 내역 액션
- **`src/app/payment/actions.ts`** - 결제 처리 액션
- **`src/app/auth/actions.ts`** - 인증 액션

### Supabase 클라이언트

환경에 따라 적절한 클라이언트를 사용합니다:

- **`lib/supabase/client.ts`** - 브라우저 (클라이언트 컴포넌트)
- **`lib/supabase/server.ts`** - 서버 (Server Actions, Server Components)
- **`lib/supabase/middleware.ts`** - 미들웨어

### 스타일링

- **Tailwind CSS 4** - 유틸리티 우선 CSS
- **OKLCH 색상 공간** - 넓은 색상 표현 범위
- **다크모드** - CSS 변수 기반 테마 시스템
- **반응형 디자인** - 모바일 우선 접근

### 타입 정의

- **`src/lib/types/post.ts`** - 포스트 관련 타입
- TypeScript로 전체 프로젝트 타입 안정성 보장

## 🚢 배포

### 빌드

```bash
npm run build
```

### 프로덕션 서버 실행

```bash
npm start
```

### 배포 플랫폼

- **Vercel** (권장) - Next.js 최적화
- **Netlify** - 정적 사이트 호스팅
- **자체 서버** - Node.js 서버 필요

### 배포 시 주의사항

1. **환경 변수 설정**: 배포 플랫폼에 환경 변수 설정
2. **Supabase RLS 정책**: 프로덕션 환경에 맞게 정책 확인
3. **Toss Payments 키**: 라이브 키로 변경
4. **도메인 설정**: `NEXT_PUBLIC_SITE_URL` 업데이트

## 📚 추가 문서

- [Toss Payments 설정 가이드](./TOSS_PAYMENTS_SETUP.md)
- [프로젝트 구조 상세](./.cursor/rules/project-overview.mdc)

## 🤝 기여

이슈 및 풀 리퀘스트를 환영합니다!

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

---

**마지막 업데이트**: 2024년
