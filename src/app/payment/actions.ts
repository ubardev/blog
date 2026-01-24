"use server"

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

interface ConfirmPaymentParams {
  paymentKey: string
  orderId: string
  amount: number
  postId?: string
}

interface ConfirmPaymentResult {
  success: boolean
  orderName?: string
  error?: string
}

export async function confirmPayment({
  paymentKey,
  orderId,
  amount,
  postId,
}: ConfirmPaymentParams): Promise<ConfirmPaymentResult> {
  const secretKey = process.env.TOSS_PAYMENTS_SECRET_KEY

  if (!secretKey) {
    return {
      success: false,
      error: "Toss Payments 시크릿 키가 설정되지 않았습니다.",
    }
  }

  try {
    // 결제 승인 API 호출
    const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "결제 승인에 실패했습니다.",
      }
    }

    // 결제 성공 시 데이터베이스에 저장
    if (postId) {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        return {
          success: false,
          error: "로그인이 필요합니다.",
        }
      }

      // payments 테이블에 결제 정보 저장
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          post_id: postId,
          amount: amount,
          payment_key: paymentKey,
          order_id: orderId,
          status: 'completed',
          currency: 'KRW',
        })

      if (paymentError) {
        console.error('결제 정보 저장 오류:', paymentError)
        // 결제는 성공했지만 DB 저장 실패 - 로그만 남기고 성공으로 처리
      } else {
        // 결제 성공 후 블로그 페이지 재검증
        revalidatePath('/blog', 'layout')
      }
    }

    // 결제 성공
    return {
      success: true,
      orderName: data.orderName,
    }
  } catch (error: any) {
    console.error("결제 승인 오류:", error)
    return {
      success: false,
      error: error.message || "결제 승인 중 오류가 발생했습니다.",
    }
  }
}

/**
 * 사용자가 특정 포스트에 대해 결제했는지 확인
 */
export async function checkPaymentStatus(postId: string): Promise<boolean> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return false
    }

    const { data, error } = await supabase
      .from('payments')
      .select('id')
      .eq('user_id', user.id)
      .eq('post_id', postId)
      .eq('status', 'completed')
      .single()

    if (error || !data) {
      return false
    }

    return true
  } catch (error) {
    console.error('결제 상태 확인 오류:', error)
    return false
  }
}
