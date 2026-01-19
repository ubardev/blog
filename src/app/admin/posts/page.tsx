"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PostTable } from "@/components/admin/post-table"
import { Plus, Search } from "lucide-react"
import { getAllPosts } from "@/lib/blog-data"

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")

  const allPosts = getAllPosts()

  // 실제 필터링/검색 로직은 나중에 구현
  // 현재는 UI만 표시
  const filteredPosts = allPosts

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">포스트 관리</h1>
          <p className="text-muted-foreground mt-2">
            블로그 포스트를 관리하고 편집하세요.
          </p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="gap-2">
            <Plus className="size-4" />
            새 포스트 작성
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="포스트 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="상태 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="published">발행됨</SelectItem>
            <SelectItem value="draft">임시저장</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="정렬" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">최신순</SelectItem>
            <SelectItem value="date-asc">오래된순</SelectItem>
            <SelectItem value="title-asc">제목순</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <PostTable posts={filteredPosts} />
    </div>
  )
}
