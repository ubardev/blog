import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PostHeader } from "@/components/post-header"
import { PostContent } from "@/components/post-content"
import { PostNavigation } from "@/components/post-navigation"
import { getAllPosts, getPostBySlug, getAdjacentPosts } from "@/app/blog/actions"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "포스트를 찾을 수 없습니다",
    }
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [post.thumbnail],
      type: "article",
      publishedTime: post.publishedDate,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [post.thumbnail],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  const { previous, next } = await getAdjacentPosts(slug)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <article className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <PostHeader
              thumbnail={post.thumbnail}
              title={post.title}
              author={post.author}
              publishedDate={post.publishedDate}
              readTime={post.readTime}
              tags={post.tags}
            />

            <div className="mt-8 md:mt-12">
              <PostContent content={post.content} />
            </div>

            <PostNavigation
              previousPost={
                previous
                  ? {
                      title: previous.title,
                      href: `/blog/${previous.slug}`,
                      thumbnail: previous.thumbnail,
                    }
                  : undefined
              }
              nextPost={
                next
                  ? {
                      title: next.title,
                      href: `/blog/${next.slug}`,
                      thumbnail: next.thumbnail,
                    }
                  : undefined
              }
            />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
