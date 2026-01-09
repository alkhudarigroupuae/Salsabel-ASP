"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminSyncPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [syncSecret, setSyncSecret] = useState("")

  async function handleSync(type: "products" | "categories") {
    if (!syncSecret) {
      setMessage("Please enter SYNC_SECRET_KEY")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const response = await fetch(`/api/admin/sync-${type}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${syncSecret}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(`Error: ${data.error}`)
      } else {
        setMessage(`✓ Synced ${data.count || 0} ${type} successfully`)
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Admin Sync Dashboard</CardTitle>
            <CardDescription>Sync WooCommerce data to Supabase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">SYNC_SECRET_KEY</label>
              <input
                type="password"
                value={syncSecret}
                onChange={(e) => setSyncSecret(e.target.value)}
                placeholder="Enter SYNC_SECRET_KEY"
                className="w-full mt-2 px-3 py-2 border border-border rounded-md"
              />
            </div>

            <div className="flex gap-4">
              <Button onClick={() => handleSync("products")} disabled={loading} className="flex-1">
                {loading ? "Syncing..." : "Sync Products"}
              </Button>
              <Button onClick={() => handleSync("categories")} disabled={loading} className="flex-1">
                {loading ? "Syncing..." : "Sync Categories"}
              </Button>
            </div>

            {message && <div className="p-3 bg-muted rounded-md text-sm">{message}</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
