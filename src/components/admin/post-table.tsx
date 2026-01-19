"use client"

import { useState } from "react"
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
import type { BlogPost } from "@/lib/blog-data"

interface PostTableProps {
  posts: BlogPost[]
}

export function PostTable({ posts }: PostTableProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(posts.map((post) => post.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id])
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id))
    }
  }

  // handleEdit는 Link로 처리하므로 제거

  const handleDelete = (id: number) => {
    console.log("삭제할 포스트 ID:", id)
    // 실제 삭제 로직은 나중에 구현
  }

  const handleDeleteSelected = () => {
    console.log("선택된 포스트 삭제:", selectedIds)
    // 실제 삭제 로직은 나중에 구현
    setSelectedIds([])
  }

  const isAllSelected = selectedIds.length === posts.length && posts.length > 0
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < posts.length

  return (
    <div className="space-y-4">
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <span className="text-sm text-foreground">
            {selectedIds.length}개 항목 선택됨
          </span>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDeleteSelected}
          >
            선택된 항목 삭제
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
                    <div className="relative size-16 rounded-md overflow-hidden">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
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
                    {post.publishedDate}
                  </TableCell>
                  <TableCell>
                    <PostStatusBadge status="published" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
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
