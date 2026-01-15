"use client"

import { BlogCard } from "@/components/blog-card"
import { EmailCta } from "@/components/email-cta"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
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

  const heroUsageCode = `import { Hero } from "@/components/hero"

// 기본 사용법
<Hero
  backgroundImage="https://example.com/hero-image.jpg"
  title="환영합니다"
  subtitle="모던한 블로그 플랫폼에 오신 것을 환영합니다"
  ctaText="바로 가기"
  ctaHref="/posts"
/>

// 사이즈 옵션
<Hero
  size="sm"  // 작은 사이즈 (모바일)
  backgroundImage="https://example.com/hero-image.jpg"
  title="제목"
  subtitle="부제목"
/>

<Hero
  size="md"  // 기본 사이즈
  backgroundImage="https://example.com/hero-image.jpg"
  title="제목"
  subtitle="부제목"
/>

<Hero
  size="lg"  // 큰 사이즈 (데스크톱)
  backgroundImage="https://example.com/hero-image.jpg"
  title="제목"
  subtitle="부제목"
/>`

  return (
    <div className="space-y-16">
      {/* Hero 컴포넌트 데모 */}
      <div>
        <div className="container mx-auto py-12 px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Hero 컴포넌트 데모
            </h1>
            <p className="text-muted-foreground">
              히어로 섹션 컴포넌트의 다양한 사이즈와 사용법을 확인하세요.
            </p>
          </div>

          <Tabs defaultValue="hero-demo" className="w-full">
            <TabsList>
              <TabsTrigger value="hero-demo">데모</TabsTrigger>
              <TabsTrigger value="hero-usage">
                <Code2 className="size-4 mr-2" />
                사용법
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hero-demo" className="space-y-12 mt-6">
              {/* Small Size */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="size-5 text-muted-foreground" />
                  <h2 className="text-2xl font-semibold text-foreground">Small (sm) - 모바일</h2>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">추천: 모바일 화면</span>
                </div>
                <div className="w-full rounded-lg overflow-hidden border border-border">
                  <Hero
                    size="sm"
                    backgroundImage="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&h=1080&fit=crop"
                    title="Next.js 16의 새로운 기능들"
                    subtitle="서버 컴포넌트의 성능 개선과 향상된 개발자 경험을 만나보세요"
                    ctaText="더 알아보기"
                    ctaHref="/posts/nextjs-16-features"
                  />
                </div>
              </section>

              {/* Medium Size */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Tablet className="size-5 text-muted-foreground" />
                  <h2 className="text-2xl font-semibold text-foreground">Medium (md) - 태블릿</h2>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">기본값, 태블릿 화면</span>
                </div>
                <div className="w-full rounded-lg overflow-hidden border border-border">
                  <Hero
                    size="md"
                    backgroundImage="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&h=1080&fit=crop"
                    title="TypeScript로 타입 안전한 코드 작성하기"
                    subtitle="더 안전하고 유지보수하기 쉬운 코드를 작성하는 핵심 개념과 실전 팁"
                    ctaText="바로 가기"
                    ctaHref="/posts/typescript-tips"
                  />
                </div>
              </section>

              {/* Large Size */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Monitor className="size-5 text-muted-foreground" />
                  <h2 className="text-2xl font-semibold text-foreground">Large (lg) - 데스크톱</h2>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">추천: 데스크톱 화면</span>
                </div>
                <div className="w-full rounded-lg overflow-hidden border border-border">
                  <Hero
                    size="lg"
                    backgroundImage="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1920&h=1080&fit=crop"
                    title="Tailwind CSS 4와 OKLCH 색상 공간"
                    subtitle="더 넓은 색상 범위를 표현할 수 있는 새로운 색상 시스템의 장점과 사용법"
                    ctaText="더 알아보기"
                    ctaHref="/posts/tailwind-oklch"
                  />
                </div>
              </section>
            </TabsContent>

            <TabsContent value="hero-usage" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    Props
                  </h2>
                  <div className="bg-muted rounded-lg p-6 space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">필수 Props</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><code className="bg-background px-2 py-1 rounded">backgroundImage: string</code> - 배경 이미지 URL</li>
                        <li><code className="bg-background px-2 py-1 rounded">title: string</code> - 히어로 섹션 제목</li>
                        <li><code className="bg-background px-2 py-1 rounded">subtitle: string</code> - 히어로 섹션 부제목</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">선택 Props</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><code className="bg-background px-2 py-1 rounded">size?: "sm" | "md" | "lg"</code> - 히어로 섹션 사이즈 (기본값: "md")</li>
                        <li><code className="bg-background px-2 py-1 rounded">ctaText?: string</code> - CTA 버튼 텍스트 (기본값: "바로 가기")</li>
                        <li><code className="bg-background px-2 py-1 rounded">ctaHref?: string</code> - CTA 버튼 링크 URL (기본값: "#")</li>
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
                      <code>{heroUsageCode}</code>
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
                        <li>• 최소 높이: 400px</li>
                        <li>• 제목: text-3xl ~ text-4xl</li>
                        <li>• 부제목: text-base ~ text-lg</li>
                        <li>• 추천: 모바일 화면</li>
                      </ul>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-2">Medium (md)</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 최소 높이: 500px</li>
                        <li>• 제목: text-4xl ~ text-6xl</li>
                        <li>• 부제목: text-lg ~ text-xl</li>
                        <li>• 추천: 태블릿 화면</li>
                      </ul>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-2">Large (lg)</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 최소 높이: 600px</li>
                        <li>• 제목: text-5xl ~ text-7xl</li>
                        <li>• 부제목: text-xl ~ text-2xl</li>
                        <li>• 추천: 데스크톱 화면</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* BlogCard 컴포넌트 데모 */}
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

      {/* EmailCta 컴포넌트 데모 */}
      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            EmailCta 컴포넌트 데모
          </h1>
          <p className="text-muted-foreground">
            이메일 구독 CTA 컴포넌트의 다양한 사이즈와 사용법을 확인하세요.
          </p>
        </div>

        <Tabs defaultValue="cta-demo" className="w-full">
          <TabsList>
            <TabsTrigger value="cta-demo">데모</TabsTrigger>
            <TabsTrigger value="cta-usage">
              <Code2 className="size-4 mr-2" />
              사용법
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cta-demo" className="space-y-12 mt-6">
            {/* Small Size */}
            <section>
              <div className="container mx-auto px-4 mb-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="size-5 text-muted-foreground" />
                  <h2 className="text-2xl font-semibold text-foreground">Small (sm) - 모바일</h2>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">추천: 모바일 화면</span>
                </div>
              </div>
              <div className="w-full bg-muted py-6">
                <div className="container mx-auto px-4">
                  <EmailCta
                    size="sm"
                    onSubmit={async (email) => {
                      console.log("구독 이메일:", email)
                      await new Promise((resolve) => setTimeout(resolve, 1000))
                      alert(`구독 완료: ${email}`)
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Medium Size */}
            <section>
              <div className="container mx-auto px-4 mb-4">
                <div className="flex items-center gap-2">
                  <Tablet className="size-5 text-muted-foreground" />
                  <h2 className="text-2xl font-semibold text-foreground">Medium (md) - 태블릿</h2>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">기본값, 태블릿 화면</span>
                </div>
              </div>
              <div className="w-full bg-muted py-6">
                <div className="container mx-auto px-4">
                  <EmailCta
                    size="md"
                    onSubmit={async (email) => {
                      console.log("구독 이메일:", email)
                      await new Promise((resolve) => setTimeout(resolve, 1000))
                      alert(`구독 완료: ${email}`)
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Large Size */}
            <section>
              <div className="container mx-auto px-4 mb-4">
                <div className="flex items-center gap-2">
                  <Monitor className="size-5 text-muted-foreground" />
                  <h2 className="text-2xl font-semibold text-foreground">Large (lg) - 데스크톱</h2>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">추천: 데스크톱 화면</span>
                </div>
              </div>
              <div className="w-full bg-muted py-6">
                <div className="container mx-auto px-4">
                  <EmailCta
                    size="lg"
                    onSubmit={async (email) => {
                      console.log("구독 이메일:", email)
                      await new Promise((resolve) => setTimeout(resolve, 1000))
                      alert(`구독 완료: ${email}`)
                    }}
                  />
                </div>
              </div>
            </section>

            {/* 커스텀 예시 */}
            <section>
              <div className="container mx-auto px-4 mb-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  커스텀 예시
                </h2>
              </div>
              <div className="w-full bg-muted py-6">
                <div className="container mx-auto px-4">
                  <EmailCta
                    title="최신 기술 소식을 받아보세요"
                    placeholder="your@email.com"
                    buttonText="신청하기"
                    onSubmit={async (email) => {
                      console.log("구독 이메일:", email)
                      await new Promise((resolve) => setTimeout(resolve, 1000))
                      alert(`구독 완료: ${email}`)
                    }}
                  />
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="cta-usage" className="mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Props
                </h2>
                <div className="bg-muted rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">선택 Props</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><code className="bg-background px-2 py-1 rounded">title?: string</code> - 제목 텍스트 (기본값: "코드팩토리에 구독하세요")</li>
                      <li><code className="bg-background px-2 py-1 rounded">placeholder?: string</code> - 이메일 입력 필드 placeholder (기본값: "이메일을 입력하세요")</li>
                      <li><code className="bg-background px-2 py-1 rounded">buttonText?: string</code> - 버튼 텍스트 (기본값: "구독하기")</li>
                      <li><code className="bg-background px-2 py-1 rounded">size?: "sm" | "md" | "lg"</code> - 컴포넌트 사이즈 (기본값: "md")</li>
                      <li><code className="bg-background px-2 py-1 rounded">onSubmit?: (email: string) =&gt; void | Promise{'<'}{'void'}{'>'}</code> - 구독 제출 핸들러</li>
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
                    <code>{`import { EmailCta } from "@/components/email-cta"

// 기본 사용법
<EmailCta
  onSubmit={async (email) => {
    console.log("구독 이메일:", email)
    // API 호출 등 처리
  }}
/>

// 커스텀 텍스트
<EmailCta
  title="최신 기술 소식을 받아보세요"
  placeholder="your@email.com"
  buttonText="신청하기"
  onSubmit={async (email) => {
    // 구독 처리
  }}
/>

// 사이즈 옵션
<EmailCta
  size="sm"  // 작은 사이즈 (모바일)
  onSubmit={async (email) => {
    // 구독 처리
  }}
/>

<EmailCta
  size="md"  // 기본 사이즈
  onSubmit={async (email) => {
    // 구독 처리
  }}
/>

<EmailCta
  size="lg"  // 큰 사이즈 (데스크톱)
  onSubmit={async (email) => {
    // 구독 처리
  }}
/>`}</code>
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
                      <li>• 제목: text-base</li>
                      <li>• 입력 필드: h-8, text-sm</li>
                      <li>• 버튼: h-8</li>
                      <li>• 추천: 모바일 화면</li>
                    </ul>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Medium (md)</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 제목: text-lg</li>
                      <li>• 입력 필드: h-9</li>
                      <li>• 버튼: h-9</li>
                      <li>• 추천: 태블릿 화면</li>
                    </ul>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Large (lg)</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 제목: text-xl</li>
                      <li>• 입력 필드: h-10, text-base</li>
                      <li>• 버튼: h-10</li>
                      <li>• 추천: 데스크톱 화면</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Header 컴포넌트 데모 */}
      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Header 컴포넌트 데모
          </h1>
          <p className="text-muted-foreground">
            네비게이션 헤더 컴포넌트의 사용법을 확인하세요.
          </p>
        </div>

        <Tabs defaultValue="header-demo" className="w-full">
          <TabsList>
            <TabsTrigger value="header-demo">데모</TabsTrigger>
            <TabsTrigger value="header-usage">
              <Code2 className="size-4 mr-2" />
              사용법
            </TabsTrigger>
          </TabsList>

          <TabsContent value="header-demo" className="space-y-12 mt-6">
            {/* 기본 헤더 데모 */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                기본 헤더
              </h2>
              <div className="w-full rounded-lg overflow-hidden border border-border">
                <div className="relative">
                  <Header />
                  <div className="h-96 bg-muted/30 flex items-center justify-center">
                    <p className="text-muted-foreground">페이지 콘텐츠 영역</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 반응형 데모 */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                반응형 동작
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Smartphone className="size-5 text-muted-foreground" />
                    <h3 className="text-lg font-medium text-foreground">모바일 화면</h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">네비게이션 메뉴 숨김</span>
                  </div>
                  <div className="w-full max-w-sm mx-auto rounded-lg overflow-hidden border border-border">
                    <div className="relative">
                      <Header />
                      <div className="h-64 bg-muted/30 flex items-center justify-center">
                        <p className="text-muted-foreground text-sm">모바일 뷰</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Monitor className="size-5 text-muted-foreground" />
                    <h3 className="text-lg font-medium text-foreground">데스크톱 화면</h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">전체 메뉴 표시</span>
                  </div>
                  <div className="w-full rounded-lg overflow-hidden border border-border">
                    <div className="relative">
                      <Header />
                      <div className="h-64 bg-muted/30 flex items-center justify-center">
                        <p className="text-muted-foreground">데스크톱 뷰</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="header-usage" className="mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Props
                </h2>
                <div className="bg-muted rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">선택 Props</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
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
                    <code>{`import { Header } from "@/components/header"

// 기본 사용법
<Header />

// 커스텀 클래스 추가
<Header className="shadow-lg" />

// 레이아웃에 포함 예시
export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  레이아웃 구조
                </h2>
                <div className="bg-muted rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">레이아웃 구성</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>제목</strong>: 왼쪽 정렬 - "코드패토리" 로고/제목</li>
                      <li>• <strong>네비게이션</strong>: 가운데 정렬 - "홈", "블로그" 링크 (데스크톱에서만 표시)</li>
                      <li>• <strong>로그인 버튼</strong>: 오른쪽 정렬 - 로그인 페이지 링크</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">반응형 동작</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>모바일</strong>: 네비게이션 메뉴 숨김 (md 미만)</li>
                      <li>• <strong>태블릿/데스크톱</strong>: 전체 메뉴 표시 (md 이상)</li>
                      <li>• <strong>Sticky 헤더</strong>: 스크롤 시 상단에 고정</li>
                      <li>• <strong>백드롭 블러</strong>: 반투명 배경과 블러 효과</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer 컴포넌트 데모 */}
      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Footer 컴포넌트 데모
          </h1>
          <p className="text-muted-foreground">
            풋터 컴포넌트의 사용법을 확인하세요.
          </p>
        </div>

        <Tabs defaultValue="footer-demo" className="w-full">
          <TabsList>
            <TabsTrigger value="footer-demo">데모</TabsTrigger>
            <TabsTrigger value="footer-usage">
              <Code2 className="size-4 mr-2" />
              사용법
            </TabsTrigger>
          </TabsList>

          <TabsContent value="footer-demo" className="space-y-12 mt-6">
            {/* 기본 풋터 데모 */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                기본 풋터
              </h2>
              <div className="w-full rounded-lg overflow-hidden border border-border">
                <Footer />
              </div>
            </section>

            {/* 반응형 데모 */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                반응형 동작
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Smartphone className="size-5 text-muted-foreground" />
                    <h3 className="text-lg font-medium text-foreground">모바일 화면</h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">1열 레이아웃</span>
                  </div>
                  <div className="w-full max-w-sm mx-auto rounded-lg overflow-hidden border border-border">
                    <Footer />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Tablet className="size-5 text-muted-foreground" />
                    <h3 className="text-lg font-medium text-foreground">태블릿 화면</h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">2열 레이아웃</span>
                  </div>
                  <div className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden border border-border">
                    <Footer />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Monitor className="size-5 text-muted-foreground" />
                    <h3 className="text-lg font-medium text-foreground">데스크톱 화면</h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">4열 레이아웃</span>
                  </div>
                  <div className="w-full rounded-lg overflow-hidden border border-border">
                    <Footer />
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="footer-usage" className="mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Props
                </h2>
                <div className="bg-muted rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">선택 Props</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
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
                    <code>{`import { Footer } from "@/components/footer"

// 기본 사용법
<Footer />

// 커스텀 클래스 추가
<Footer className="mt-16" />

// 레이아웃에 포함 예시
export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  주요 기능
                </h2>
                <div className="bg-muted rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">포함된 기능</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>다크모드 토글</strong>: 라이트/다크 모드 전환 버튼</li>
                      <li>• <strong>빠른 네비게이션</strong>: 홈, 블로그, 소개, 문의 링크</li>
                      <li>• <strong>연락처 정보</strong>: 이메일(bellin83@gmail.com), 전화번호(010-1234-1234)</li>
                      <li>• <strong>소셜 미디어 링크</strong>: Instagram, Facebook, Youtube, GitHub (lucide-react 아이콘)</li>
                      <li>• <strong>이메일 구독</strong>: EmailCta 컴포넌트를 통한 구독 기능</li>
                      <li>• <strong>저작권 정보</strong>: 현재 연도 자동 표시</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">반응형 레이아웃</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>모바일</strong>: 1열 그리드 (grid-cols-1)</li>
                      <li>• <strong>태블릿</strong>: 2열 그리드 (md:grid-cols-2)</li>
                      <li>• <strong>데스크톱</strong>: 4열 그리드 (lg:grid-cols-4)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
