"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PostStatusBadge } from "./post-status-badge"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import type { BlogPost } from "@/lib/blog-data"

interface DashboardRecentPostsProps {
  posts: BlogPost[]
}

export function DashboardRecentPosts({ posts }: DashboardRecentPostsProps) {
  const recentPosts = posts.slice(0, 5)

  // handleEdit는 Link로 처리하므로 제거

  const handleDelete = (id: number) => {
    console.log("삭제할 포스트 ID:", id)
    // 실제 삭제 로직은 나중에 구현
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 포스트</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="relative size-16 shrink-0 rounded-md overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground line-clamp-1">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <PostStatusBadge status="published" />
                  <span className="text-xs text-muted-foreground">
                    {post.publishedDate}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link href={`/admin/posts/${post.id}/edit`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                  >
                    <Edit className="size-3.5" />
                    수정
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(post.id)}
                  className="gap-1 text-destructive hover:text-destructive"
                >
                  <Trash2 className="size-3.5" />
                  삭제
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
