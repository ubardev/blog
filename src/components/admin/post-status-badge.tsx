import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type PostStatus = "published" | "draft"

interface PostStatusBadgeProps {
  status: PostStatus
  className?: string
}

export function PostStatusBadge({ status, className }: PostStatusBadgeProps) {
  return (
    <Badge
      variant={status === "published" ? "default" : "secondary"}
      className={cn(className)}
    >
      {status === "published" ? "발행" : "임시저장"}
    </Badge>
  )
}
