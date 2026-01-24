"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"

interface PaymentGateProps {
  postId: string
  postTitle: string
}

export function PaymentGate({ postId, postTitle }: PaymentGateProps) {
  const router = useRouter()

  const handlePayment = () => {
    router.push(`/payment?post_id=${postId}`)
  }

  return (
    <Card className="border-2">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Lock className="h-8 w-8 text-muted-foreground" />
        </div>
        <CardTitle className="text-2xl">이 글을 보려면 결제가 필요합니다</CardTitle>
        <CardDescription className="text-base">
          {postTitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            이 블로그 글을 읽으려면 결제가 필요합니다.
          </p>
          <div className="text-2xl font-bold text-primary">
            10,000원
          </div>
        </div>
        <Button
          onClick={handlePayment}
          size="lg"
          className="w-full"
        >
          결제하기
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          안전하고 편리한 토스페이먼츠 결제를 통해 진행됩니다.
        </p>
      </CardContent>
    </Card>
  )
}
