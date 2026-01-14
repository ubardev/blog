import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const heroVariants = cva("relative w-full overflow-hidden", {
  variants: {
    size: {
      sm: "min-h-[400px]",
      md: "min-h-[500px]",
      lg: "min-h-[600px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export interface HeroProps extends VariantProps<typeof heroVariants> {
  backgroundImage: string
  title: string
  subtitle: string
  ctaText?: string
  ctaHref?: string
  className?: string
}

export function Hero({
  backgroundImage,
  title,
  subtitle,
  ctaText = "바로 가기",
  ctaHref = "#",
  size = "md",
  className,
}: HeroProps) {
  return (
    <section className={cn(heroVariants({ size }), "flex", className)}>
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* 오버레이 - 가독성을 위한 어두운 레이어 */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-start justify-end w-full px-4 md:px-8 lg:px-12 pb-16 md:pb-24">
        <div className="w-full text-left space-y-6 max-w-3xl">
          {/* 제목 */}
          <h1
            className={cn(
              "font-bold text-white drop-shadow-lg",
              size === "sm" && "text-3xl md:text-4xl",
              size === "md" && "text-4xl md:text-5xl lg:text-6xl",
              size === "lg" && "text-5xl md:text-6xl lg:text-7xl"
            )}
          >
            {title}
          </h1>

          {/* 부제목 */}
          <p
            className={cn(
              "text-white/90 drop-shadow-md",
              size === "sm" && "text-base md:text-lg",
              size === "md" && "text-lg md:text-xl",
              size === "lg" && "text-xl md:text-2xl"
            )}
          >
            {subtitle}
          </p>

          {/* CTA 버튼 */}
          <div className="pt-4">
            <Link href={ctaHref}>
              <Button
                size={size === "sm" ? "default" : size === "lg" ? "lg" : "default"}
                className="shadow-lg hover:shadow-xl transition-shadow"
              >
                {ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
