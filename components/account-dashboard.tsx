"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Package, Heart, MapPin, CreditCard, LogOut, Car } from "lucide-react"
import Link from "next/link"

// Mock order data
const mockOrders = [
  {
    id: "ORD-ABC123",
    date: "Jan 5, 2025",
    total: 189.97,
    status: "Delivered",
    items: 3,
  },
  {
    id: "ORD-DEF456",
    date: "Dec 28, 2024",
    total: 89.99,
    status: "Shipped",
    items: 1,
  },
  {
    id: "ORD-GHI789",
    date: "Dec 15, 2024",
    total: 245.5,
    status: "Delivered",
    items: 4,
  },
]

// Mock saved vehicles
const mockVehicles = [
  { id: 1, year: "2022", make: "Toyota", model: "Camry", primary: true },
  { id: 2, year: "2019", make: "Honda", model: "Civic", primary: false },
]

export function AccountDashboard() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome, {user.firstName}!</h1>
          <p className="text-muted-foreground">Manage your account and view your orders</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="border-border bg-transparent">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="orders" className="data-[state=active]:bg-card">
            <Package className="mr-2 h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="vehicles" className="data-[state=active]:bg-card">
            <Car className="mr-2 h-4 w-4" />
            My Vehicles
          </TabsTrigger>
          <TabsTrigger value="profile" className="data-[state=active]:bg-card">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="data-[state=active]:bg-card">
            <Heart className="mr-2 h-4 w-4" />
            Wishlist
          </TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Order History</CardTitle>
              <CardDescription>View and track your orders</CardDescription>
            </CardHeader>
            <CardContent>
              {mockOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No orders yet</p>
                  <Link href="/products">
                    <Button className="bg-primary text-primary-foreground">Start Shopping</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-foreground">{order.id}</span>
                          <Badge
                            variant={order.status === "Delivered" ? "default" : "secondary"}
                            className={
                              order.status === "Delivered"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-primary/10 text-primary"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.date} • {order.items} items
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">${order.total.toFixed(2)}</p>
                        <Button variant="link" className="text-primary p-0 h-auto">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vehicles Tab */}
        <TabsContent value="vehicles">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">My Vehicles</CardTitle>
                  <CardDescription>Save vehicles for quick part lookups</CardDescription>
                </div>
                <Button className="bg-primary text-primary-foreground">Add Vehicle</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-secondary rounded-lg flex items-center justify-center">
                        <Car className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </span>
                          {vehicle.primary && <Badge className="bg-primary/10 text-primary">Primary</Badge>}
                        </div>
                        <Link
                          href={`/products?year=${vehicle.year}&make=${vehicle.make}&model=${vehicle.model}`}
                          className="text-sm text-primary hover:underline"
                        >
                          Shop parts for this vehicle
                        </Link>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-border bg-transparent">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="text-foreground">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground">{user.email}</p>
                </div>
                <Button variant="outline" className="border-border bg-transparent">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Addresses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  <p className="font-medium text-foreground">Default Shipping</p>
                  <p>123 Main Street</p>
                  <p>Detroit, MI 48201</p>
                </div>
                <Button variant="outline" className="border-border bg-transparent">
                  Manage Addresses
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-12 bg-secondary rounded flex items-center justify-center text-xs font-bold text-muted-foreground">
                    VISA
                  </div>
                  <div>
                    <p className="text-foreground">•••• •••• •••• 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/26</p>
                  </div>
                </div>
                <Button variant="outline" className="border-border bg-transparent">
                  Manage Payment Methods
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Wishlist Tab */}
        <TabsContent value="wishlist">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Wishlist</CardTitle>
              <CardDescription>Items you&apos;ve saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
                <Link href="/products">
                  <Button className="bg-primary text-primary-foreground">Browse Parts</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
