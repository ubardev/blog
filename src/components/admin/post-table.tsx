"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PostStatusBadge } from "./post-status-badge"
import { Edit, Trash2 } from "lucide-react"
import { deletePost } from "@/app/admin/posts/actions"
import { useRouter } from "next/navigation"
import type { Post } from "@/lib/types/post"

interface PostTableProps {
  posts: Post[]
}

export function PostTable({ posts }: PostTableProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(posts.map((post) => post.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id])
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말 이 포스트를 삭제하시겠습니까?')) {
      return
    }

    setError(null)
    startTransition(async () => {
      const result = await deletePost(id)
      if (result.success) {
        router.refresh()
      } else {
        setError(result.error || '삭제에 실패했습니다.')
      }
    })
  }

  const handleDeleteSelected = async () => {
    if (!confirm(`정말 선택한 ${selectedIds.length}개의 포스트를 삭제하시겠습니까?`)) {
      return
    }

    setError(null)
    startTransition(async () => {
      const results = await Promise.all(
        selectedIds.map((id) => deletePost(id))
      )
      
      const failed = results.filter((r) => !r.success)
      if (failed.length > 0) {
        setError(`${failed.length}개의 포스트 삭제에 실패했습니다.`)
      } else {
        setSelectedIds([])
        router.refresh()
      }
    })
  }

  const isAllSelected = selectedIds.length === posts.length && posts.length > 0
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < posts.length

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <span className="text-sm text-foreground">
            {selectedIds.length}개 항목 선택됨
          </span>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteSelected}
            disabled={isPending}
          >
            {isPending ? "삭제 중..." : "선택된 항목 삭제"}
          </Button>
        </div>
      )}

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="전체 선택"
                />
              </TableHead>
              <TableHead className="w-24">썸네일</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>태그</TableHead>
              <TableHead className="w-32">발행일</TableHead>
              <TableHead className="w-24">상태</TableHead>
              <TableHead className="w-32">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  포스트가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(post.id)}
                      onCheckedChange={(checked) =>
                        handleSelectOne(post.id, checked as boolean)
                      }
                      aria-label={`${post.title} 선택`}
                    />
                  </TableCell>
                  <TableCell>
                    {post.thumbnail ? (
                      <div className="relative size-16 rounded-md overflow-hidden">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    ) : (
                      <div className="size-16 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
                        이미지 없음
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-md">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                      >
                        {post.title}
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                        {post.summary}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{post.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {post.published_date}
                  </TableCell>
                  <TableCell>
                    <PostStatusBadge status={post.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/posts/${post.id}/edit`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          disabled={isPending}
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
                        disabled={isPending}
                      >
                        <Trash2 className="size-3.5" />
                        삭제
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
