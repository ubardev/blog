import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PaymentWidget } from "@/components/payment-widget"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentPage() {
  // 실제로는 URL 파라미터나 서버에서 주문 정보를 가져와야 합니다
  const orderName = "토스 티셔츠 외 2건"
  const amount = 50000
  const customerEmail = "customer@example.com"
  const customerName = "홍길동"
  const customerMobilePhone = "01012345678"

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
              <PaymentWidget
                amount={amount}
                orderName={orderName}
                customerEmail={customerEmail}
                customerName={customerName}
                customerMobilePhone={customerMobilePhone}
              />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
