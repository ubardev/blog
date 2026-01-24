"use client"

import { useEffect, useState, useRef } from "react"
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface PaymentWidgetProps {
  amount: number
  orderName: string
  customerEmail?: string
  customerName?: string
  customerMobilePhone?: string
  postId?: string
  onPaymentSuccess?: (paymentKey: string, orderId: string, amount: number) => void
  onPaymentError?: (error: { code: string; message: string }) => void
}

export function PaymentWidget({
  amount,
  orderName,
  customerEmail,
  customerName,
  customerMobilePhone: initialCustomerMobilePhone,
  postId,
  onPaymentSuccess,
  onPaymentError,
}: PaymentWidgetProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [widgets, setWidgets] = useState<any>(null)
  const [paymentMethodWidget, setPaymentMethodWidget] = useState<any>(null)
  const [agreementWidget, setAgreementWidget] = useState<any>(null)
  const [isAgreed, setIsAgreed] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [customerMobilePhone, setCustomerMobilePhone] = useState<string>(
    initialCustomerMobilePhone || ""
  )
  const paymentMethodWidgetRef = useRef<any>(null)
  const agreementWidgetRef = useRef<any>(null)

  // 전화번호 정규화 함수: 숫자만 추출
  const normalizePhoneNumber = (phone: string): string => {
    return phone.replace(/[^0-9]/g, "")
  }

  // 클라이언트 키는 환경 변수에서 가져옵니다
  const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY || ""
  
  // 고유한 customerKey 생성 (실제로는 서버에서 생성하거나 사용자 ID를 사용해야 합니다)
  useEffect(() => {
    if (typeof window === "undefined" || !clientKey) return

    // localStorage에서 customerKey 가져오기 또는 생성
    let customerKey = localStorage.getItem("customerKey")
    if (!customerKey) {
      customerKey = `customer_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
      localStorage.setItem("customerKey", customerKey)
    }

    async function initializeWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientKey)
        
        // 결제위젯 초기화
        const widgetsInstance = tossPayments.widgets({ 
          customerKey: customerKey || ANONYMOUS
        })

        setWidgets(widgetsInstance)
        setIsInitialized(true)
      } catch (error) {
        console.error("Toss Payments 초기화 실패:", error)
        onPaymentError?.({ 
          code: "INIT_ERROR", 
          message: "결제 시스템 초기화에 실패했습니다." 
        })
      }
    }

    initializeWidgets()
  }, [clientKey, onPaymentError])

  useEffect(() => {
    if (!widgets || !isInitialized) return

    // DOM 요소가 준비될 때까지 대기
    const checkAndRender = () => {
      const paymentMethodElement = document.getElementById("payment-method")
      const agreementElement = document.getElementById("agreement")
      
      if (!paymentMethodElement || !agreementElement) {
        // DOM이 아직 준비되지 않았으면 잠시 후 다시 시도
        setTimeout(checkAndRender, 100)
        return
      }

      async function renderWidgets() {
        try {
          // 결제 금액 설정
          await widgets.setAmount({
            currency: "KRW",
            value: amount,
          })

          // 결제 UI 렌더링
          const paymentMethod = await widgets.renderPaymentMethods({
            selector: "#payment-method",
            variantKey: "DEFAULT",
          })
          setPaymentMethodWidget(paymentMethod)
          paymentMethodWidgetRef.current = paymentMethod

          // 약관 UI 렌더링
          const agreement = await widgets.renderAgreement({
            selector: "#agreement",
            variantKey: "DEFAULT",
          })
          setAgreementWidget(agreement)
          agreementWidgetRef.current = agreement

          // 약관 동의 상태 구독
          agreement.on("agreementStatusChange", (status: { agreedRequiredTerms: boolean }) => {
            setIsAgreed(status.agreedRequiredTerms)
          })
        } catch (error) {
          console.error("위젯 렌더링 실패:", error)
          onPaymentError?.({ 
            code: "RENDER_ERROR", 
            message: "결제 위젯 렌더링에 실패했습니다." 
          })
        }
      }

      renderWidgets()
    }

    checkAndRender()

    return () => {
      // 컴포넌트 언마운트 시 위젯 정리
      if (paymentMethodWidgetRef.current) {
        paymentMethodWidgetRef.current.destroy().catch(console.error)
        paymentMethodWidgetRef.current = null
      }
      if (agreementWidgetRef.current) {
        agreementWidgetRef.current.destroy().catch(console.error)
        agreementWidgetRef.current = null
      }
    }
  }, [widgets, isInitialized, amount, onPaymentError])

  const generateOrderId = () => {
    return `order_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
  }

  const handlePayment = async () => {
    if (!widgets || !isAgreed) {
      alert("약관에 동의해주세요.")
      return
    }

    // 전화번호 검증 및 정규화
    const normalizedPhone = normalizePhoneNumber(customerMobilePhone)
    
    if (!normalizedPhone || normalizedPhone.length < 8 || normalizedPhone.length > 15) {
      alert("전화번호를 올바르게 입력해주세요. (8-15자리 숫자)")
      return
    }

    setIsLoading(true)

    try {
      const orderId = generateOrderId()

      const successUrl = postId
        ? `${window.location.origin}/payment/success?post_id=${postId}`
        : `${window.location.origin}/payment/success`

      await widgets.requestPayment({
        orderId,
        orderName,
        customerEmail,
        customerName,
        customerMobilePhone: normalizedPhone,
        successUrl,
        failUrl: `${window.location.origin}/payment/fail`,
      })

      // Redirect 방식이므로 여기까지 오지 않습니다
    } catch (error: any) {
      console.error("결제 요청 실패:", error)
      setIsLoading(false)
      onPaymentError?.({ 
        code: error.code || "PAYMENT_ERROR", 
        message: error.message || "결제 요청에 실패했습니다." 
      })
    }
  }

  if (!clientKey) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>결제 설정 오류</CardTitle>
          <CardDescription>
            Toss Payments 클라이언트 키가 설정되지 않았습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            환경 변수 <code>NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY</code>를 설정해주세요.
          <br />
            키는 <a href="https://developers.tosspayments.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">토스페이먼츠 개발자센터</a>에서 확인할 수 있습니다.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* 주문 정보 */}
      <Card>
        <CardHeader>
          <CardTitle>주문 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">상품명</span>
            <span className="font-medium">{orderName}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">결제 금액</span>
            <span className="text-lg font-bold">{amount.toLocaleString()}원</span>
          </div>
        </CardContent>
      </Card>

      {/* 결제 수단 선택 */}
      <Card>
        <CardHeader>
          <CardTitle>결제 수단</CardTitle>
        </CardHeader>
        <CardContent>
          <div id="payment-method" />
        </CardContent>
      </Card>

      {/* 구매자 정보 */}
      <Card>
        <CardHeader>
          <CardTitle>구매자 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customer-email">이메일</Label>
            <Input
              id="customer-email"
              type="email"
              value={customerEmail || ""}
              disabled
              className="bg-muted"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer-name">이름</Label>
            <Input
              id="customer-name"
              type="text"
              value={customerName || ""}
              disabled
              className="bg-muted"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer-phone">
              전화번호 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="customer-phone"
              type="tel"
              placeholder="01012345678 (하이픈 없이 숫자만 입력)"
              value={customerMobilePhone}
              onChange={(e) => {
                // 숫자와 하이픈만 허용
                const value = e.target.value.replace(/[^0-9-]/g, "")
                setCustomerMobilePhone(value)
              }}
              maxLength={15}
            />
            <p className="text-xs text-muted-foreground">
              결제 완료 시 안내를 위해 필요합니다. 하이픈(-) 없이 숫자만 입력해주세요.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 약관 동의 */}
      <Card>
        <CardHeader>
          <CardTitle>약관 동의</CardTitle>
        </CardHeader>
        <CardContent>
          <div id="agreement" />
        </CardContent>
      </Card>

      {/* 결제 버튼 */}
      <Button
        onClick={handlePayment}
        disabled={!isAgreed || isLoading || !isInitialized || !customerMobilePhone}
        className="w-full"
        size="lg"
      >
        {isLoading ? "처리 중..." : `${amount.toLocaleString()}원 결제하기`}
      </Button>
    </div>
  )
}
