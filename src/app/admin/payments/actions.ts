'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

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
 * 결제 내역 타입
 */
export interface Payment {
  id: string
  user_id: string
  post_id: string
  amount: number
  paid_at: string
  payment_key: string
  order_id: string
  status: 'pending' | 'completed' | 'cancelled' | 'failed'
  currency: string
  created_at: string
  updated_at: string
  // 조인된 데이터
  user?: {
    id: string
    name: string | null
    email: string | null
  }
  post?: {
    id: string
    title: string
    slug: string
  }
}

/**
 * 결제 내역 목록 가져오기
 */
export async function getPayments() {
  try {
    const { user, userData } = await checkAuth()

    const supabase = await createClient()

    // admin은 모든 결제 내역, 일반 사용자는 자신의 결제 내역만
    let query = supabase
      .from('payments')
      .select(`
        *,
        user:users!payments_user_id_fkey(id, name, email),
        post:posts!payments_post_id_fkey(id, title, slug)
      `)
      .order('paid_at', { ascending: false })

    if (userData.role !== 'admin') {
      query = query.eq('user_id', user.id)
    }

    const { data: payments, error } = await query

    if (error) {
      console.error('결제 내역 조회 오류:', error)
      return {
        success: false,
        error: '결제 내역을 불러오는데 실패했습니다: ' + error.message,
        data: [],
      }
    }

    return {
      success: true,
      data: (payments || []) as Payment[],
    }
  } catch (error) {
    console.error('결제 내역 조회 중 오류:', error)
    return {
      success: false,
      error: '예상치 못한 오류가 발생했습니다.',
      data: [],
    }
  }
}
