'use server'

import { createClient } from '@/lib/supabase/server'
import type { Post } from '@/lib/types/post'

/**
 * BlogPost 인터페이스 (기존 인터페이스와 호환)
 */
export interface BlogPost {
  id: string
  slug: string
  thumbnail: string
  title: string
  summary: string
  content: string
  tags: string[]
  publishedDate: string
  readTime: number
  author?: string
}

/**
 * 데이터베이스 Post 타입을 BlogPost 인터페이스로 변환
 */
function transformPost(post: Post): BlogPost {
  return {
    id: post.id,
    slug: post.slug,
    thumbnail: post.thumbnail || '',
    title: post.title,
    summary: post.summary,
    content: post.content,
    tags: post.tags || [],
    publishedDate: post.published_date,
    readTime: post.read_time,
    author: post.author_name || undefined,
  }
}

/**
 * 모든 공개된 포스트 가져오기 (published 상태만)
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const supabase = await createClient()
    
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('published_date', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('포스트 목록 조회 오류:', error)
      return []
    }

    return (posts || []).map(transformPost)
  } catch (error) {
    console.error('포스트 목록 조회 중 오류:', error)
    return []
  }
}

/**
 * slug로 포스트 가져오기
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = await createClient()
    
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !post) {
      return null
    }

    return transformPost(post)
  } catch (error) {
    console.error('포스트 조회 오류:', error)
    return null
  }
}

/**
 * 이전/다음 포스트 가져오기
 */
export async function getAdjacentPosts(slug: string): Promise<{
  previous: BlogPost | null
  next: BlogPost | null
}> {
  try {
    // 모든 포스트를 가져와서 JavaScript에서 필터링 (더 안정적)
    const allPosts = await getAllPosts()
    
    const currentIndex = allPosts.findIndex((post) => post.slug === slug)
    
    if (currentIndex === -1) {
      return { previous: null, next: null }
    }

    return {
      previous: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
      next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
    }
  } catch (error) {
    console.error('인접 포스트 조회 오류:', error)
    return { previous: null, next: null }
  }
}
