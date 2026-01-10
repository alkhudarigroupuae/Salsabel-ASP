import { LoginForm } from "@/components/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login - Salsabel Auto Spare Parts",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <LoginForm />
    </div>
  )
}
