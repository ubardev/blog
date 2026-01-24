import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SignupForm } from "@/components/signup-form"

function SignupFormWrapper() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-md p-6 text-center text-muted-foreground">
        로딩 중...
      </div>
    }>
      <SignupForm />
    </Suspense>
  )
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <SignupFormWrapper />
      </main>
      <Footer />
    </div>
  )
}
