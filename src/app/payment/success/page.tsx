"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { confirmPayment } from "@/app/payment/actions"
import { createClient } from "@/lib/supabase/client"

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [paymentInfo, setPaymentInfo] = useState<{
    orderId: string
    amount: number
    orderName: string
    postSlug?: string
  } | null>(null)

  const paymentKey = searchParams.get("paymentKey")
  const orderId = searchParams.get("orderId")
  const amount = searchParams.get("amount")
  const postId = searchParams.get("post_id")

  useEffect(() => {
    async function processPayment() {
      if (!paymentKey || !orderId || !amount) {
        setError("결제 정보가 올바르지 않습니다.")
        setIsProcessing(false)
        return
      }

      try {
        // 서버에서 결제 승인 API 호출 및 DB 저장
        const result = await confirmPayment({
          paymentKey,
          orderId,
          amount: parseInt(amount),
          postId: postId || undefined,
        })

        if (result.success) {
          // postId가 있으면 해당 포스트의 slug를 가져옴
          let postSlug: string | undefined
          if (postId) {
            try {
              // postId로 포스트 정보 가져오기 (slug 필요)
              const supabase = createClient()
              const { data: post } = await supabase
                .from('posts')
                .select('slug')
                .eq('id', postId)
                .single()
              
              if (post) {
                postSlug = post.slug
              }
            } catch (err) {
              console.error("포스트 정보 조회 오류:", err)
            }
          }

          setPaymentInfo({
            orderId,
            amount: parseInt(amount),
            orderName: result.orderName || "주문 상품",
            postSlug,
          })

          // 블로그 글 결제인 경우 3초 후 블로그로 리다이렉트
          if (postSlug) {
            setTimeout(() => {
              router.push(`/blog/${postSlug}`)
            }, 3000)
          }
        } else {
          setError(result.error || "결제 승인에 실패했습니다.")
        }
      } catch (err: any) {
        console.error("결제 승인 오류:", err)
        setError(err.message || "결제 승인 중 오류가 발생했습니다.")
      } finally {
        setIsProcessing(false)
      }
    }

    processPayment()
  }, [paymentKey, orderId, amount, postId, router])

  if (isProcessing) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
                <p className="text-muted-foreground">결제를 처리하고 있습니다...</p>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-destructive">결제 실패</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={() => router.push("/payment")} className="w-full">
                다시 시도
              </Button>
              <Button onClick={() => router.push("/")} variant="outline" className="w-full">
                홈으로 이동
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle>결제가 완료되었습니다</CardTitle>
            <CardDescription>주문이 성공적으로 처리되었습니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentInfo && (
              <div className="space-y-2 rounded-lg border p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">주문번호</span>
                  <span className="font-medium">{paymentInfo.orderId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">상품명</span>
                  <span className="font-medium">{paymentInfo.orderName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">결제 금액</span>
                  <span className="font-bold">{paymentInfo.amount.toLocaleString()}원</span>
                </div>
              </div>
            )}
            {paymentInfo?.postSlug && (
              <div className="rounded-lg bg-primary/10 p-4 text-center">
                <p className="text-sm text-primary">
                  결제가 완료되었습니다. 잠시 후 블로그 글로 이동합니다...
                </p>
              </div>
            )}
            <div className="flex gap-2">
              {paymentInfo?.postSlug ? (
                <Button 
                  onClick={() => router.push(`/blog/${paymentInfo.postSlug}`)} 
                  className="flex-1"
                >
                  블로그 글 보기
                </Button>
              ) : (
                <Button onClick={() => router.push("/")} className="flex-1">
                  홈으로 이동
                </Button>
              )}
              {!paymentInfo?.postSlug && (
                <Button onClick={() => router.push("/payment")} variant="outline" className="flex-1">
                  다시 결제
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
                <p className="text-muted-foreground">로딩 중...</p>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}
