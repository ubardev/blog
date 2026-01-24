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
import { getAllPosts } from "@/app/blog/actions"

// 빌드 시 정적 생성 방지 (cookies() 호출 에러 방지)
export const dynamic = 'force-dynamic'

export default async function Home() {
  // Server Action으로 실제 데이터 가져오기
  const blogPosts = (await getAllPosts()).map((post) => ({
    id: post.id,
    thumbnail: post.thumbnail,
    title: post.title,
    summary: post.summary,
    tags: post.tags,
    publishedDate: post.publishedDate,
    readTime: post.readTime,
    href: `/blog/${post.slug}`,
  }))
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
