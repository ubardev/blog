"use client"

import { BlogCard } from "@/components/blog-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code2, Smartphone, Tablet, Monitor } from "lucide-react"

export default function ComponentsDemoPage() {
  const samplePosts = [
    {
      thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop",
      title: "Next.js 16의 새로운 기능들",
      summary: "Next.js 16이 출시되면서 많은 새로운 기능들이 추가되었습니다. 서버 컴포넌트의 성능 개선, 향상된 이미지 최적화, 그리고 더 나은 개발자 경험을 제공하는 다양한 기능들을 살펴보겠습니다.",
      tags: ["Next.js", "React", "웹 개발"],
      publishedDate: "2024-01-15",
      readTime: 5,
      href: "/posts/nextjs-16-features",
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
      title: "TypeScript로 타입 안전한 코드 작성하기",
      summary: "TypeScript는 JavaScript에 타입 시스템을 추가하여 더 안전하고 유지보수하기 쉬운 코드를 작성할 수 있게 해줍니다. 이 글에서는 TypeScript의 핵심 개념과 실전 팁을 공유합니다.",
      tags: ["TypeScript", "프로그래밍", "개발 팁"],
      publishedDate: "2024-01-12",
      readTime: 8,
      href: "/posts/typescript-tips",
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
      title: "Tailwind CSS 4와 OKLCH 색상 공간",
      summary: "Tailwind CSS 4에서는 OKLCH 색상 공간을 사용하여 더 넓은 색상 범위를 표현할 수 있습니다. 이 새로운 색상 시스템의 장점과 사용법을 알아봅시다.",
      tags: ["Tailwind CSS", "디자인", "CSS"],
      publishedDate: "2024-01-10",
      readTime: 6,
      href: "/posts/tailwind-oklch",
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      title: "shadcn/ui로 빠르게 UI 구축하기",
      summary: "shadcn/ui는 복사해서 사용할 수 있는 컴포넌트 라이브러리입니다. 설치 없이 코드를 복사하여 프로젝트에 맞게 커스터마이징할 수 있어 많은 개발자들에게 사랑받고 있습니다.",
      tags: ["shadcn/ui", "UI", "컴포넌트"],
      publishedDate: "2024-01-08",
      readTime: 7,
      href: "/posts/shadcn-ui",
    },
  ]

  const usageCode = `import { BlogCard } from "@/components/blog-card"

// 기본 사용법
<BlogCard
  thumbnail="https://example.com/image.jpg"
  title="블로그 포스트 제목"
  summary="블로그 포스트의 요약 내용입니다. 최대 3줄까지 표시됩니다."
  tags={["태그1", "태그2", "태그3"]}
  publishedDate="2024-01-15"
  readTime={5}
  href="/posts/example"
/>

// 사이즈 옵션
<BlogCard
  size="sm"  // 작은 사이즈 (모바일)
  // ... 기타 props
/>

<BlogCard
  size="md"  // 기본 사이즈 (태블릿)
  // ... 기타 props
/>

<BlogCard
  size="lg"  // 큰 사이즈 (데스크톱)
  // ... 기타 props
/>

// 반응형 그리드 레이아웃 예시
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
  {posts.map((post) => (
    <BlogCard
      key={post.id}
      thumbnail={post.thumbnail}
      title={post.title}
      summary={post.summary}
      tags={post.tags}
      publishedDate={post.publishedDate}
      readTime={post.readTime}
      href={post.href}
    />
  ))}
</div>`

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          BlogCard 컴포넌트 데모
        </h1>
        <p className="text-muted-foreground">
          반응형 블로그 카드 컴포넌트의 다양한 사이즈와 사용법을 확인하세요.
        </p>
      </div>

      <Tabs defaultValue="demo" className="w-full">
        <TabsList>
          <TabsTrigger value="demo">데모</TabsTrigger>
          <TabsTrigger value="usage">
            <Code2 className="size-4 mr-2" />
            사용법
          </TabsTrigger>
        </TabsList>

        <TabsContent value="demo" className="space-y-12 mt-6">
          {/* 반응형 사이즈 데모 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              사이즈별 데모
            </h2>
            
            {/* Small Size */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Smartphone className="size-5 text-muted-foreground" />
                <h3 className="text-lg font-medium text-foreground">Small (sm) - 모바일</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">추천: 모바일 화면</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch max-w-5xl">
                {samplePosts.slice(0, 3).map((post, index) => (
                  <BlogCard
                    key={`sm-${index}`}
                    size="sm"
                    thumbnail={post.thumbnail}
                    title={post.title}
                    summary={post.summary}
                    tags={post.tags}
                    publishedDate={post.publishedDate}
                    readTime={post.readTime}
                    href={post.href}
                  />
                ))}
              </div>
            </div>

            {/* Medium Size */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Tablet className="size-5 text-muted-foreground" />
                <h3 className="text-lg font-medium text-foreground">Medium (md) - 태블릿</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">기본값, 태블릿 화면</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch max-w-5xl">
                {samplePosts.slice(0, 3).map((post, index) => (
                  <BlogCard
                    key={`md-${index}`}
                    size="md"
                    thumbnail={post.thumbnail}
                    title={post.title}
                    summary={post.summary}
                    tags={post.tags}
                    publishedDate={post.publishedDate}
                    readTime={post.readTime}
                    href={post.href}
                  />
                ))}
              </div>
            </div>

            {/* Large Size */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Monitor className="size-5 text-muted-foreground" />
                <h3 className="text-lg font-medium text-foreground">Large (lg) - 데스크톱</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">추천: 데스크톱 화면</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl">
                {samplePosts.slice(0, 2).map((post, index) => (
                  <BlogCard
                    key={`lg-${index}`}
                    size="lg"
                    thumbnail={post.thumbnail}
                    title={post.title}
                    summary={post.summary}
                    tags={post.tags}
                    publishedDate={post.publishedDate}
                    readTime={post.readTime}
                    href={post.href}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* 반응형 그리드 레이아웃 데모 */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              반응형 그리드 레이아웃
            </h2>
            <p className="text-muted-foreground mb-6">
              화면 크기에 따라 자동으로 열 개수가 조정됩니다. (모바일: 1열, 태블릿: 2열, 데스크톱: 3열)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {samplePosts.map((post, index) => (
                <BlogCard
                  key={index}
                  thumbnail={post.thumbnail}
                  title={post.title}
                  summary={post.summary}
                  tags={post.tags}
                  publishedDate={post.publishedDate}
                  readTime={post.readTime}
                  href={post.href}
                />
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="usage" className="mt-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Props
              </h2>
              <div className="bg-muted rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">필수 Props</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><code className="bg-background px-2 py-1 rounded">thumbnail: string</code> - 썸네일 이미지 URL</li>
                    <li><code className="bg-background px-2 py-1 rounded">title: string</code> - 포스트 제목</li>
                    <li><code className="bg-background px-2 py-1 rounded">summary: string</code> - 포스트 요약 (최대 3줄)</li>
                    <li><code className="bg-background px-2 py-1 rounded">tags: string[]</code> - 태그 배열</li>
                    <li><code className="bg-background px-2 py-1 rounded">publishedDate: string</code> - 출판 날짜</li>
                    <li><code className="bg-background px-2 py-1 rounded">readTime: number</code> - 읽는 시간 (분)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">선택 Props</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><code className="bg-background px-2 py-1 rounded">size?: "sm" | "md" | "lg"</code> - 카드 사이즈 (기본값: "md")</li>
                    <li><code className="bg-background px-2 py-1 rounded">href?: string</code> - 링크 URL (기본값: "#")</li>
                    <li><code className="bg-background px-2 py-1 rounded">className?: string</code> - 추가 CSS 클래스</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                사용 예시
              </h2>
              <div className="bg-muted rounded-lg p-6">
                <pre className="text-sm text-foreground overflow-x-auto">
                  <code>{usageCode}</code>
                </pre>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                사이즈별 특징
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Small (sm)</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 썸네일 높이: 128px</li>
                    <li>• 제목: text-lg</li>
                    <li>• 요약: text-xs</li>
                    <li>• 추천: 모바일 화면</li>
                  </ul>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Medium (md)</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 썸네일 높이: 192px</li>
                    <li>• 제목: text-xl</li>
                    <li>• 요약: text-sm</li>
                    <li>• 추천: 태블릿 화면</li>
                  </ul>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Large (lg)</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 썸네일 높이: 256px</li>
                    <li>• 제목: text-2xl</li>
                    <li>• 요약: text-base</li>
                    <li>• 추천: 데스크톱 화면</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
