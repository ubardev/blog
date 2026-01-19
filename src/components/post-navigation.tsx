import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface PostNavigationPost {
  title: string
  href: string
  thumbnail?: string
}

export interface PostNavigationProps {
  previousPost?: PostNavigationPost
  nextPost?: PostNavigationPost
  className?: string
}

export function PostNavigation({
  previousPost,
  nextPost,
  className,
}: PostNavigationProps) {
  // 둘 다 없으면 렌더링하지 않음
  if (!previousPost && !nextPost) {
    return null
  }

  return (
    <nav
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 md:mt-16",
        className
      )}
    >
      {/* 이전 포스트 */}
      {previousPost ? (
        <Link href={previousPost.href}>
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <ChevronLeft className="size-4" />
                <span>이전 포스트</span>
              </div>
              {previousPost.thumbnail && (
                <div className="relative w-full h-32 md:h-40 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={previousPost.thumbnail}
                    alt={previousPost.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              <h3 className="font-semibold text-foreground line-clamp-2">
                {previousPost.title}
              </h3>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <div /> // 빈 공간 (다음 포스트가 있을 때 레이아웃 유지)
      )}

      {/* 다음 포스트 */}
      {nextPost ? (
        <Link href={nextPost.href}>
          <Card className="h-full hover:shadow-md transition-shadow md:text-right">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3 md:justify-end">
                <span>다음 포스트</span>
                <ChevronRight className="size-4" />
              </div>
              {nextPost.thumbnail && (
                <div className="relative w-full h-32 md:h-40 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={nextPost.thumbnail}
                    alt={nextPost.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              <h3 className="font-semibold text-foreground line-clamp-2">
                {nextPost.title}
              </h3>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <div /> // 빈 공간 (이전 포스트가 있을 때 레이아웃 유지)
      )}
    </nav>
  )
}
