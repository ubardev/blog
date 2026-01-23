// src/lib/types/post.ts

export type PostStatus = 'draft' | 'published'

export interface Post {
  id: string
  title: string
  slug: string
  thumbnail: string | null
  summary: string
  content: string
  tags: string[]
  published_date: string
  read_time: number
  author_id: string
  author_name: string | null
  status: PostStatus
  created_at: string
  updated_at: string
  published_at: string | null
}

export interface PostInsert {
  title: string
  slug: string
  thumbnail?: string | null
  summary: string
  content: string
  tags?: string[]
  published_date?: string
  read_time?: number
  author_name?: string | null
  status?: PostStatus
}

export interface PostUpdate extends Partial<PostInsert> {
  id: string
}
