import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { BlogCard } from "@/components/blog-card"
import { EmailCta } from "@/components/email-cta"
import { Footer } from "@/components/footer"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// 샘플 블로그 데이터
const blogPosts = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    title: "Next.js 16의 새로운 기능들",
    summary: "Next.js 16에서 추가된 서버 컴포넌트, 캐싱 개선, 그리고 성능 최적화 기능들을 살펴봅니다.",
    tags: ["Next.js", "React", "웹 개발"],
    publishedDate: "2024-01-15",
    readTime: 5,
    href: "/blog/nextjs-16",
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    title: "TypeScript로 타입 안전한 API 클라이언트 만들기",
    summary: "TypeScript의 제네릭과 타입 추론을 활용하여 완전히 타입 안전한 API 클라이언트를 구현하는 방법을 알아봅니다.",
    tags: ["TypeScript", "API", "프론트엔드"],
    publishedDate: "2024-01-12",
    readTime: 8,
    href: "/blog/typescript-api-client",
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    title: "Tailwind CSS 4의 OKLCH 색상 시스템",
    summary: "Tailwind CSS 4에서 도입된 OKLCH 색상 공간의 장점과 활용 방법을 설명합니다.",
    tags: ["Tailwind CSS", "디자인", "CSS"],
    publishedDate: "2024-01-10",
    readTime: 6,
    href: "/blog/tailwind-oklch",
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    title: "React Server Components 완전 정복",
    summary: "React Server Components의 개념부터 실제 프로젝트에 적용하는 방법까지 단계별로 설명합니다.",
    tags: ["React", "서버 컴포넌트", "성능 최적화"],
    publishedDate: "2024-01-08",
    readTime: 10,
    href: "/blog/react-server-components",
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    title: "모던 웹 개발을 위한 최적화 전략",
    summary: "웹 성능 최적화를 위한 다양한 기법과 도구들을 소개하고 실제 적용 사례를 공유합니다.",
    tags: ["성능 최적화", "웹 개발", "Best Practices"],
    publishedDate: "2024-01-05",
    readTime: 12,
    href: "/blog/web-optimization",
  },
  {
    id: 6,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    title: "shadcn/ui로 빠르게 UI 구축하기",
    summary: "shadcn/ui를 활용하여 아름답고 접근성이 좋은 UI 컴포넌트를 빠르게 구축하는 방법을 알아봅니다.",
    tags: ["shadcn/ui", "UI 컴포넌트", "디자인 시스템"],
    publishedDate: "2024-01-03",
    readTime: 7,
    href: "/blog/shadcn-ui",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. 헤더 / 네비게이션 */}
      <Header />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          backgroundImage="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop"
          title="Ubar 블로그"
          subtitle="모던한 웹 개발과 기술 트렌드를 공유하는 블로그입니다"
          ctaText="포스트 보기"
          ctaHref="/blog"
          size="lg"
        />

        {/* 3. 4 Column Blog Cards */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">최신 포스트</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.slice(0, 4).map((post) => (
              <BlogCard
                key={post.id}
                thumbnail={post.thumbnail}
                title={post.title}
                summary={post.summary}
                tags={post.tags}
                publishedDate={post.publishedDate}
                readTime={post.readTime}
                href={post.href}
                size="md"
              />
            ))}
          </div>
        </section>

        {/* 4. CTA */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-16 bg-muted/50">
          <div className="max-w-2xl mx-auto">
            <EmailCta
              title="최신 포스트를 이메일로 받아보세요"
              placeholder="이메일을 입력하세요"
              buttonText="구독하기"
              size="lg"
            />
          </div>
        </section>

        {/* 5. 2 Column Blog Cards */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">인기 포스트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.slice(0, 2).map((post) => (
              <BlogCard
                key={post.id}
                thumbnail={post.thumbnail}
                title={post.title}
                summary={post.summary}
                tags={post.tags}
                publishedDate={post.publishedDate}
                readTime={post.readTime}
                href={post.href}
                size="lg"
              />
            ))}
          </div>
        </section>

        {/* 6. Blog Carousel */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">추천 포스트</h2>
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {blogPosts.map((post) => (
                  <CarouselItem key={post.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <BlogCard
                      thumbnail={post.thumbnail}
                      title={post.title}
                      summary={post.summary}
                      tags={post.tags}
                      publishedDate={post.publishedDate}
                      readTime={post.readTime}
                      href={post.href}
                      size="md"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-12" />
              <CarouselNext className="-right-12" />
            </Carousel>
          </div>
        </section>

        {/* 7. CTA */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-16 bg-muted/50">
          <div className="max-w-2xl mx-auto">
            <EmailCta
              title="더 많은 기술 콘텐츠를 받아보세요"
              placeholder="이메일을 입력하세요"
              buttonText="구독하기"
              size="lg"
            />
          </div>
        </section>
      </main>

      {/* 8. Footer */}
      <Footer />
    </div>
  )
}
