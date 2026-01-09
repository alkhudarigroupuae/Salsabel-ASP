import type { Metadata } from "next"
import { AccountDashboard } from "@/components/account-dashboard"

export const metadata: Metadata = {
  title: "My Account - Salsabel Auto Spare Parts",
  description: "Manage your account, orders, and saved vehicles.",
}

export default function MyAccountPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <AccountDashboard />
      </div>
    </div>
  )
}
