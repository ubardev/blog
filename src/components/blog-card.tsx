import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const blogCardVariants = cva("", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export interface BlogCardProps extends VariantProps<typeof blogCardVariants> {
  thumbnail: string
  title: string
  summary: string
  tags: string[]
  publishedDate: string
  readTime: number
  href?: string
  className?: string
}

export function BlogCard({
  thumbnail,
  title,
  summary,
  tags,
  publishedDate,
  readTime,
  href = "#",
  size = "md",
  className,
}: BlogCardProps) {
  return (
    <Card className={cn("overflow-hidden flex h-full pt-0", blogCardVariants({ size }), className)}>
      {/* 썸네일 이미지 */}
      <div className={cn(
        "relative w-full overflow-hidden",
        size === "sm" && "h-32",
        size === "md" && "h-48",
        size === "lg" && "h-64"
      )}>
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <CardHeader>
        {/* 제목 */}
        <h3 className={cn(
          "font-semibold text-card-foreground line-clamp-2",
          size === "sm" && "text-lg",
          size === "md" && "text-xl",
          size === "lg" && "text-2xl"
        )}>
          {title}
        </h3>

        {/* 3줄 요약 */}
        <p className={cn(
          "text-muted-foreground line-clamp-3 mt-2",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          size === "lg" && "text-base"
        )}>
          {summary}
        </p>
      </CardHeader>

      <CardContent className="space-y-4 flex-1">
        {/* 태그 */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className={cn(
              size === "sm" && "text-[10px] px-1.5 py-0",
              size === "md" && "text-xs",
              size === "lg" && "text-sm"
            )}>
              {tag}
            </Badge>
          ))}
        </div>

        {/* 출판 날짜 및 읽는 시간 */}
        <div className={cn(
          "flex items-center gap-4 text-muted-foreground",
          size === "sm" && "text-[10px] gap-2",
          size === "md" && "text-xs gap-4",
          size === "lg" && "text-sm gap-4"
        )}>
          <div className="flex items-center gap-1.5">
            <Calendar className={cn(
              size === "sm" && "size-3",
              size === "md" && "size-3.5",
              size === "lg" && "size-4"
            )} />
            <span>{publishedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className={cn(
              size === "sm" && "size-3",
              size === "md" && "size-3.5",
              size === "lg" && "size-4"
            )} />
            <span>{readTime}분</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-auto">
        {/* CTA 버튼 */}
        <Link href={href} className="w-full">
          <Button 
            className="w-full"
            size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
          >
            읽으러 가기
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
