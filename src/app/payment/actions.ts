"use server"

interface ConfirmPaymentParams {
  paymentKey: string
  orderId: string
  amount: number
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
