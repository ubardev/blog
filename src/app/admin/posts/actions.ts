'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { PostInsert, PostUpdate } from '@/lib/types/post'

/**
 * 인증 및 권한 확인 헬퍼
 */
async function checkAuth() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login?error=' + encodeURIComponent('로그인이 필요합니다'))
  }

  // 사용자 정보 가져오기
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id, role, name')
    .eq('id', user.id)
    .single()

  if (userError || !userData) {
    redirect('/login?error=' + encodeURIComponent('사용자 정보를 찾을 수 없습니다'))
  }

  return { user, userData }
}

/**
 * 새 포스트 생성
 */
export async function createPost(formData: FormData) {
  try {
    const { user, userData } = await checkAuth()

    // 폼 데이터 파싱
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const thumbnail = formData.get('thumbnail') as string || null
    const summary = formData.get('summary') as string
    const content = formData.get('content') as string
    const tags = formData.get('tags') ? JSON.parse(formData.get('tags') as string) : []
    const publishedDate = formData.get('publishedDate') as string || new Date().toISOString().split('T')[0]
    const readTime = parseInt(formData.get('readTime') as string) || 5
    const authorName = formData.get('authorName') as string || userData.name || null
    const status = (formData.get('status') as string) || 'draft'

    // 유효성 검사
    if (!title || !slug || !summary || !content) {
      return {
        success: false,
        error: '필수 필드를 모두 입력해주세요.',
      }
    }

    // slug 중복 확인
    const supabase = await createClient()
    const { data: existingPost } = await supabase
      .from('posts')
      .select('id')
      .eq('slug', slug)
      .single()

    if (existingPost) {
      return {
        success: false,
        error: '이미 사용 중인 slug입니다.',
      }
    }

    // 포스트 생성
    const postData: PostInsert = {
      title,
      slug,
      thumbnail,
      summary,
      content,
      tags,
      published_date: publishedDate,
      read_time: readTime,
      author_name: authorName,
      status: status as 'draft' | 'published',
    }

    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        ...postData,
        author_id: user.id,
      })
      .select()
      .single()

    if (error) {
      console.error('포스트 생성 오류:', error)
      return {
        success: false,
        error: '포스트 생성에 실패했습니다: ' + error.message,
      }
    }

    // 캐시 무효화
    revalidatePath('/admin/posts')
    revalidatePath('/blog')
    revalidatePath(`/blog/${slug}`)

    return {
      success: true,
      data: post,
    }
  } catch (error) {
    console.error('포스트 생성 중 오류:', error)
    return {
      success: false,
      error: '예상치 못한 오류가 발생했습니다.',
    }
  }
}

/**
 * 포스트 수정
 */
export async function updatePost(formData: FormData) {
  try {
    const { user, userData } = await checkAuth()
    const postId = formData.get('id') as string

    if (!postId) {
      return {
        success: false,
        error: '포스트 ID가 필요합니다.',
      }
    }

    const supabase = await createClient()

    // 권한 확인: 작성자이거나 admin인지 확인
    const { data: existingPost, error: fetchError } = await supabase
      .from('posts')
      .select('author_id')
      .eq('id', postId)
      .single()

    if (fetchError || !existingPost) {
      return {
        success: false,
        error: '포스트를 찾을 수 없습니다.',
      }
    }

    const isAuthor = existingPost.author_id === user.id
    const isAdmin = userData.role === 'admin'

    if (!isAuthor && !isAdmin) {
      return {
        success: false,
        error: '수정 권한이 없습니다.',
      }
    }

    // 폼 데이터 파싱
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const thumbnail = formData.get('thumbnail') as string || null
    const summary = formData.get('summary') as string
    const content = formData.get('content') as string
    const tags = formData.get('tags') ? JSON.parse(formData.get('tags') as string) : []
    const publishedDate = formData.get('publishedDate') as string
    const readTime = parseInt(formData.get('readTime') as string) || 5
    const authorName = formData.get('authorName') as string || null
    const status = formData.get('status') as string

    // slug 중복 확인 (자신의 포스트 제외)
    if (slug) {
      const { data: existingSlug } = await supabase
        .from('posts')
        .select('id')
        .eq('slug', slug)
        .neq('id', postId)
        .single()

      if (existingSlug) {
        return {
          success: false,
          error: '이미 사용 중인 slug입니다.',
        }
      }
    }

    // 업데이트 데이터 구성
    const updateData: Partial<PostUpdate> = {}
    if (title) updateData.title = title
    if (slug) updateData.slug = slug
    if (thumbnail !== undefined) updateData.thumbnail = thumbnail
    if (summary) updateData.summary = summary
    if (content) updateData.content = content
    if (tags) updateData.tags = tags
    if (publishedDate) updateData.published_date = publishedDate
    if (readTime) updateData.read_time = readTime
    if (authorName !== undefined) updateData.author_name = authorName
    if (status) updateData.status = status as 'draft' | 'published'

    const { data: post, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', postId)
      .select()
      .single()

    if (error) {
      console.error('포스트 수정 오류:', error)
      return {
        success: false,
        error: '포스트 수정에 실패했습니다: ' + error.message,
      }
    }

    // 캐시 무효화
    revalidatePath('/admin/posts')
    revalidatePath('/blog')
    revalidatePath(`/blog/${post.slug}`)

    return {
      success: true,
      data: post,
    }
  } catch (error) {
    console.error('포스트 수정 중 오류:', error)
    return {
      success: false,
      error: '예상치 못한 오류가 발생했습니다.',
    }
  }
}

/**
 * 포스트 목록 가져오기
 */
export async function getPosts() {
  try {
    const { user, userData } = await checkAuth()

    const supabase = await createClient()

    // admin은 모든 포스트, 일반 사용자는 자신의 포스트만
    let query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (userData.role !== 'admin') {
      query = query.eq('author_id', user.id)
    }

    const { data: posts, error } = await query

    if (error) {
      console.error('포스트 목록 조회 오류:', error)
      return {
        success: false,
        error: '포스트 목록을 불러오는데 실패했습니다: ' + error.message,
        data: [],
      }
    }

    return {
      success: true,
      data: posts || [],
    }
  } catch (error) {
    console.error('포스트 목록 조회 중 오류:', error)
    return {
      success: false,
      error: '예상치 못한 오류가 발생했습니다.',
      data: [],
    }
  }
}

/**
 * ID로 포스트 가져오기
 */
export async function getPostById(postId: string) {
  try {
    const { user, userData } = await checkAuth()

    const supabase = await createClient()

    // 포스트 조회
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single()

    if (error || !post) {
      return {
        success: false,
        error: '포스트를 찾을 수 없습니다.',
        data: null,
      }
    }

    // 권한 확인: 작성자이거나 admin인지 확인
    const isAuthor = post.author_id === user.id
    const isAdmin = userData.role === 'admin'

    if (!isAuthor && !isAdmin) {
      return {
        success: false,
        error: '조회 권한이 없습니다.',
        data: null,
      }
    }

    return {
      success: true,
      data: post,
    }
  } catch (error) {
    console.error('포스트 조회 중 오류:', error)
    return {
      success: false,
      error: '예상치 못한 오류가 발생했습니다.',
      data: null,
    }
  }
}

/**
 * 포스트 삭제
 */
export async function deletePost(postId: string) {
  try {
    const { user, userData } = await checkAuth()

    const supabase = await createClient()

    // 권한 확인
    const { data: existingPost, error: fetchError } = await supabase
      .from('posts')
      .select('author_id, slug')
      .eq('id', postId)
      .single()

    if (fetchError || !existingPost) {
      return {
        success: false,
        error: '포스트를 찾을 수 없습니다.',
      }
    }

    const isAuthor = existingPost.author_id === user.id
    const isAdmin = userData.role === 'admin'

    if (!isAuthor && !isAdmin) {
      return {
        success: false,
        error: '삭제 권한이 없습니다.',
      }
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)

    if (error) {
      console.error('포스트 삭제 오류:', error)
      return {
        success: false,
        error: '포스트 삭제에 실패했습니다: ' + error.message,
      }
    }

    // 캐시 무효화
    revalidatePath('/admin/posts')
    revalidatePath('/blog')

    return {
      success: true,
    }
  } catch (error) {
    console.error('포스트 삭제 중 오류:', error)
    return {
      success: false,
      error: '예상치 못한 오류가 발생했습니다.',
    }
  }
}
