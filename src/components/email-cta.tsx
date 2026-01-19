"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const emailCtaVariants = cva("w-full", {
  variants: {
    size: {
      sm: "space-y-3",
      md: "space-y-4",
      lg: "space-y-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export interface EmailCtaProps extends VariantProps<typeof emailCtaVariants> {
  title?: string
  placeholder?: string
  buttonText?: string
  onSubmit?: (email: string) => void | Promise<void>
  className?: string
}

export function EmailCta({
  title = "Ubar Blog에 구독하세요",
  placeholder = "이메일을 입력하세요",
  buttonText = "구독하기",
  onSubmit,
  size = "md",
  className,
}: EmailCtaProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!email.trim()) {
      return
    }

    setIsSubmitting(true)
    try {
      if (onSubmit) {
        await onSubmit(email)
      } else {
        // 기본 동작: 구독 처리 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log("구독 이메일:", email)
        alert(`구독 완료: ${email}`)
      }
      setEmail("")
    } catch (error) {
      console.error("구독 실패:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(emailCtaVariants({ size }), className)}
    >
      {title && (
        <h3
          className={cn(
            "font-semibold text-foreground",
            size === "sm" && "text-base",
            size === "md" && "text-lg",
            size === "lg" && "text-xl"
          )}
        >
          {title}
        </h3>
      )}

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          required
          className={cn(
            "flex-1",
            size === "sm" && "h-8 text-sm",
            size === "md" && "h-9",
            size === "lg" && "h-10 text-base"
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting || !email.trim()}
          size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
          className={cn(
            "whitespace-nowrap",
            size === "sm" && "h-8",
            size === "md" && "h-9",
            size === "lg" && "h-10"
          )}
        >
          {isSubmitting ? "구독 중..." : buttonText}
        </Button>
      </div>
    </form>
  )
}
