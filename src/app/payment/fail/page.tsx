"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle } from "lucide-react"

function PaymentFailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const code = searchParams.get("code")
  const message = searchParams.get("message")
  const orderId = searchParams.get("orderId")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle>결제에 실패했습니다</CardTitle>
            <CardDescription>
              {message || "결제 처리 중 오류가 발생했습니다."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {orderId && (
              <div className="rounded-lg border p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">주문번호</span>
                  <span className="font-medium">{orderId}</span>
                </div>
                {code && (
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-muted-foreground">에러 코드</span>
                    <span className="font-medium">{code}</span>
                  </div>
                )}
              </div>
            )}
            <div className="space-y-2">
              <Button onClick={() => router.push("/payment")} className="w-full">
                다시 시도
              </Button>
              <Button onClick={() => router.push("/")} variant="outline" className="w-full">
                홈으로 이동
              </Button>
            </div>
            {code && (
              <p className="text-xs text-muted-foreground text-center">
                에러 코드: {code}
                <br />
                자세한 내용은 <a href="https://docs.tosspayments.com/reference/error-codes" target="_blank" rel="noopener noreferrer" className="text-primary underline">토스페이먼츠 에러 코드 문서</a>를 참고하세요.
              </p>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

export default function PaymentFailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>로딩 중...</CardTitle>
            </CardHeader>
          </Card>
        </main>
        <Footer />
      </div>
    }>
      <PaymentFailContent />
    </Suspense>
  )
}
