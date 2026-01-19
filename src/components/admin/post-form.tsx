"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import type { BlogPost } from "@/lib/blog-data"

interface PostFormProps {
  initialData?: BlogPost
  onSubmit?: (data: Partial<BlogPost>) => void
  onCancel?: () => void
}

export function PostForm({ initialData, onSubmit, onCancel }: PostFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    thumbnail: "",
    summary: "",
    content: "",
    tags: [] as string[],
    publishedDate: new Date().toISOString().split("T")[0],
    readTime: 5,
    author: "",
    status: "draft" as "published" | "draft",
  })

  const [tagInput, setTagInput] = useState("")

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        slug: initialData.slug,
        thumbnail: initialData.thumbnail,
        summary: initialData.summary,
        content: initialData.content,
        tags: initialData.tags,
        publishedDate: initialData.publishedDate,
        readTime: initialData.readTime,
        author: initialData.author || "",
        status: "published",
      })
    }
  }, [initialData])

  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, title: value }))
    // Slug 자동 생성 (간단한 버전)
    if (!initialData) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9가-힣]+/g, "-")
        .replace(/^-+|-+$/g, "")
      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("폼 데이터:", formData)
    if (onSubmit) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="포스트 제목을 입력하세요"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, slug: e.target.value }))
              }
              placeholder="url-slug"
              required
            />
            <p className="text-xs text-muted-foreground">
              URL에 사용될 고유한 식별자입니다.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail">썸네일 URL</Label>
            <Input
              id="thumbnail"
              value={formData.thumbnail}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, thumbnail: e.target.value }))
              }
              placeholder="https://example.com/image.jpg"
            />
            {formData.thumbnail && (
              <div className="relative w-full h-48 rounded-md overflow-hidden border border-border mt-2">
                <Image
                  src={formData.thumbnail}
                  alt="썸네일 미리보기"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">요약 *</Label>
            <Textarea
              id="summary"
              value={formData.summary}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, summary: e.target.value }))
              }
              placeholder="포스트 요약을 입력하세요"
              rows={3}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>본문</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="content">내용 *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              placeholder="포스트 내용을 입력하세요 (Markdown 지원)"
              rows={20}
              className="font-mono text-sm"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>메타 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tags">태그</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
                placeholder="태그를 입력하고 Enter를 누르세요"
              />
              <Button type="button" onClick={handleAddTag}>
                추가
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="gap-1 pr-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="publishedDate">발행일</Label>
              <Input
                id="publishedDate"
                type="date"
                value={formData.publishedDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    publishedDate: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="readTime">읽는 시간 (분)</Label>
              <Input
                id="readTime"
                type="number"
                min="1"
                value={formData.readTime}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    readTime: parseInt(e.target.value) || 0,
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">작성자</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, author: e.target.value }))
              }
              placeholder="작성자 이름"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div className="space-y-0.5">
              <Label htmlFor="status">발행 상태</Label>
              <p className="text-sm text-muted-foreground">
                발행하면 포스트가 공개됩니다.
              </p>
            </div>
            <Switch
              id="status"
              checked={formData.status === "published"}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  status: checked ? "published" : "draft",
                }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            취소
          </Button>
        )}
        <Button type="submit" variant="outline">
          {formData.status === "published" ? "발행하기" : "임시저장"}
        </Button>
        {formData.status === "draft" && (
          <Button
            type="button"
            onClick={() => {
              setFormData((prev) => ({ ...prev, status: "published" }))
            }}
          >
            발행하기
          </Button>
        )}
      </div>
    </form>
  )
}
