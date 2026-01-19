import Image from "next/image"
import { Calendar, Clock, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface PostHeaderProps {
  thumbnail?: string
  title: string
  author?: string
  publishedDate: string
  readTime: number
  tags: string[]
  className?: string
}

export function PostHeader({
  thumbnail,
  title,
  author,
  publishedDate,
  readTime,
  tags,
  className,
}: PostHeaderProps) {
  return (
    <header className={cn("space-y-6 md:space-y-8", className)}>
      {/* 썸네일 이미지 */}
      {thumbnail && (
        <div className="relative w-full overflow-hidden rounded-lg">
          <div className="relative h-[250px] md:h-[400px] lg:h-[500px]">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 768px"
              priority
            />
          </div>
        </div>
      )}

      {/* 제목 */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
          {title}
        </h1>

        {/* 메타 정보 */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4 flex-wrap">
            {author && (
              <div className="flex items-center gap-1.5">
                <User className="size-4" />
                <span>{author}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              <span>{publishedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="size-4" />
              <span>{readTime}분 읽기</span>
            </div>
          </div>
        </div>

        {/* 태그 */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
