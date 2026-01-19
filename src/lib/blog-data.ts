export interface BlogPost {
  id: number
  slug: string
  thumbnail: string
  title: string
  summary: string
  content: string
  tags: string[]
  publishedDate: string
  readTime: number
  author?: string
}

// 샘플 블로그 데이터
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "nextjs-16",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    title: "Next.js 16의 새로운 기능들",
    summary: "Next.js 16에서 추가된 서버 컴포넌트, 캐싱 개선, 그리고 성능 최적화 기능들을 살펴봅니다.",
    content: `# 소개

Next.js 16이 출시되면서 많은 새로운 기능들이 추가되었습니다. 이번 글에서는 주요 기능들을 살펴보겠습니다.

## 서버 컴포넌트의 성능 개선

서버 컴포넌트는 이제 더욱 빠르게 렌더링됩니다. 이는 전체 애플리케이션의 성능을 크게 향상시킵니다.

### 주요 개선 사항

- 렌더링 속도 향상: 서버 컴포넌트의 렌더링 속도가 평균 30% 향상되었습니다.
- 메모리 사용량 감소: 클라이언트 번들 크기가 줄어들어 초기 로딩 시간이 단축됩니다.
- 더 나은 캐싱 전략: 새로운 캐싱 메커니즘으로 반복 요청 시 성능이 개선됩니다.

## 캐싱 개선

Next.js 16에서는 캐싱 전략이 개선되었습니다. 이제 더 효율적으로 데이터를 캐싱할 수 있습니다.

### 새로운 캐싱 옵션

- **Partial Prerendering**: 페이지의 일부만 사전 렌더링하여 성능과 동적 콘텐츠의 균형을 맞춥니다.
- **Improved ISR**: Incremental Static Regeneration이 더욱 유연해졌습니다.
- **Smart Caching**: 자동으로 최적의 캐싱 전략을 선택합니다.

## 이미지 최적화

Next.js 16에서는 이미지 최적화 기능도 개선되었습니다.

- 자동 WebP 변환
- 더 나은 lazy loading
- 향상된 이미지 품질 설정

## 결론

Next.js 16은 성능과 개발자 경험을 크게 향상시켰습니다. 서버 컴포넌트, 개선된 캐싱, 그리고 향상된 이미지 최적화를 통해 더 빠르고 효율적인 웹 애플리케이션을 구축할 수 있습니다.`,
    tags: ["Next.js", "React", "웹 개발"],
    publishedDate: "2024-01-15",
    readTime: 5,
    author: "Ubar",
  },
  {
    id: 2,
    slug: "typescript-api-client",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    title: "TypeScript로 타입 안전한 API 클라이언트 만들기",
    summary: "TypeScript의 제네릭과 타입 추론을 활용하여 완전히 타입 안전한 API 클라이언트를 구현하는 방법을 알아봅니다.",
    content: `# TypeScript로 타입 안전한 API 클라이언트 만들기

TypeScript의 강력한 타입 시스템을 활용하면 완전히 타입 안전한 API 클라이언트를 만들 수 있습니다.

## 제네릭을 활용한 API 클라이언트

제네릭을 사용하면 API 응답 타입을 동적으로 지정할 수 있습니다.

\`\`\`typescript
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}
\`\`\`

## 타입 추론 활용

TypeScript의 타입 추론 기능을 활용하면 코드를 더 간결하게 작성할 수 있습니다.

## 에러 처리

타입 안전한 에러 처리도 중요합니다. Result 타입을 사용하면 에러를 명시적으로 처리할 수 있습니다.

## 결론

TypeScript를 활용하면 런타임 에러를 줄이고 개발 경험을 향상시킬 수 있습니다.`,
    tags: ["TypeScript", "API", "프론트엔드"],
    publishedDate: "2024-01-12",
    readTime: 8,
    author: "Ubar",
  },
  {
    id: 3,
    slug: "tailwind-oklch",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    title: "Tailwind CSS 4의 OKLCH 색상 시스템",
    summary: "Tailwind CSS 4에서 도입된 OKLCH 색상 공간의 장점과 활용 방법을 설명합니다.",
    content: `# Tailwind CSS 4의 OKLCH 색상 시스템

Tailwind CSS 4에서는 OKLCH 색상 공간을 사용하여 더 넓은 색상 범위를 표현할 수 있습니다.

## OKLCH란?

OKLCH는 인간의 시각에 더 가까운 색상 공간입니다. RGB보다 더 직관적이고 일관된 색상 조정이 가능합니다.

## 장점

- 더 넓은 색상 범위
- 일관된 밝기 조정
- 직관적인 색상 조작

## 활용 방법

Tailwind CSS 4에서는 OKLCH 색상을 직접 사용할 수 있습니다.

\`\`\`css
.text-primary {
  color: oklch(0.7 0.15 250);
}
\`\`\`

## 결론

OKLCH 색상 시스템은 더 나은 디자인 시스템을 구축하는 데 도움이 됩니다.`,
    tags: ["Tailwind CSS", "디자인", "CSS"],
    publishedDate: "2024-01-10",
    readTime: 6,
    author: "Ubar",
  },
  {
    id: 4,
    slug: "react-server-components",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    title: "React Server Components 완전 정복",
    summary: "React Server Components의 개념부터 실제 프로젝트에 적용하는 방법까지 단계별로 설명합니다.",
    content: `# React Server Components 완전 정복

React Server Components는 React의 혁신적인 기능입니다.

## 개념 이해

서버 컴포넌트는 서버에서만 렌더링되며, 클라이언트로 전송되지 않습니다.

## 장점

- 번들 크기 감소
- 데이터베이스 직접 접근
- 보안 향상

## 사용 방법

서버 컴포넌트는 기본적으로 서버에서 실행됩니다.

\`\`\`tsx
// 서버 컴포넌트
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
\`\`\`

## 결론

React Server Components는 현대적인 웹 애플리케이션을 구축하는 데 필수적입니다.`,
    tags: ["React", "서버 컴포넌트", "성능 최적화"],
    publishedDate: "2024-01-08",
    readTime: 10,
    author: "Ubar",
  },
  {
    id: 5,
    slug: "web-optimization",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    title: "모던 웹 개발을 위한 최적화 전략",
    summary: "웹 성능 최적화를 위한 다양한 기법과 도구들을 소개하고 실제 적용 사례를 공유합니다.",
    content: `# 모던 웹 개발을 위한 최적화 전략

웹 성능 최적화는 사용자 경험을 향상시키는 핵심 요소입니다.

## 이미지 최적화

이미지는 웹사이트의 대부분의 용량을 차지합니다. 적절한 최적화가 필요합니다.

- WebP 형식 사용
- Lazy loading 적용
- 적절한 크기 조정

## 코드 스플리팅

코드 스플리팅을 통해 초기 로딩 시간을 단축할 수 있습니다.

## 캐싱 전략

적절한 캐싱 전략은 반복 방문 시 성능을 크게 향상시킵니다.

## 결론

성능 최적화는 지속적인 과정입니다. 정기적인 모니터링과 개선이 필요합니다.`,
    tags: ["성능 최적화", "웹 개발", "Best Practices"],
    publishedDate: "2024-01-05",
    readTime: 12,
    author: "Ubar",
  },
  {
    id: 6,
    slug: "shadcn-ui",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    title: "shadcn/ui로 빠르게 UI 구축하기",
    summary: "shadcn/ui를 활용하여 아름답고 접근성이 좋은 UI 컴포넌트를 빠르게 구축하는 방법을 알아봅니다.",
    content: `# shadcn/ui로 빠르게 UI 구축하기

shadcn/ui는 복사해서 사용할 수 있는 컴포넌트 라이브러리입니다.

## 장점

- 완전한 커스터마이징 가능
- 접근성 우수
- 모던한 디자인

## 설치 방법

\`\`\`bash
npx shadcn@latest init
\`\`\`

## 컴포넌트 추가

\`\`\`bash
npx shadcn@latest add button
\`\`\`

## 결론

shadcn/ui는 빠르고 유연한 UI 개발을 가능하게 합니다.`,
    tags: ["shadcn/ui", "UI 컴포넌트", "디자인 시스템"],
    publishedDate: "2024-01-03",
    readTime: 7,
    author: "Ubar",
  },
]

// slug로 포스트 찾기
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

// 모든 포스트 가져오기
export function getAllPosts(): BlogPost[] {
  return blogPosts
}

// 이전/다음 포스트 가져오기
export function getAdjacentPosts(slug: string): {
  previous: BlogPost | null
  next: BlogPost | null
} {
  const currentIndex = blogPosts.findIndex((post) => post.slug === slug)
  
  if (currentIndex === -1) {
    return { previous: null, next: null }
  }

  return {
    previous: currentIndex > 0 ? blogPosts[currentIndex - 1] : null,
    next: currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null,
  }
}
