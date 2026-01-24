import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PaymentWidget } from "@/components/payment-widget"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentPageClient } from "./payment-client"

interface PaymentPageProps {
  searchParams: Promise<{
    post_id?: string
  }>
}

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const params = await searchParams
  const postId = params.post_id

  // 블로그 글 결제는 1만원 고정
  const amount = 10000
  const orderName = postId ? "블로그 글 구매" : "결제"

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>결제하기</CardTitle>
              <CardDescription>
                안전하고 편리한 토스페이먼츠 결제를 진행해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentPageClient
                amount={amount}
                orderName={orderName}
                postId={postId}
              />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
