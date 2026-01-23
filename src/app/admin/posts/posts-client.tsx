"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PostTable } from "@/components/admin/post-table"
import { Search } from "lucide-react"
import type { Post } from "@/lib/types/post"

interface PostsPageClientProps {
  initialPosts: Post[]
}

export function PostsPageClient({ initialPosts }: PostsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")

  // 필터링 및 검색
  const filteredPosts = useMemo(() => {
    let filtered = [...initialPosts]

    // 상태 필터
    if (statusFilter !== "all") {
      filtered = filtered.filter((post) => post.status === statusFilter)
    }

    // 검색
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.summary.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    // 정렬
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case "date-asc":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case "title-asc":
          return a.title.localeCompare(b.title, "ko")
        default:
          return 0
      }
    })

    return filtered
  }, [initialPosts, statusFilter, searchQuery, sortBy])

  return (
    <>
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
    </>
  )
}
