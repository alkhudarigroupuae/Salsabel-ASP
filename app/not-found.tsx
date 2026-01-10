import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { PackageX } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center space-y-6">
          <PackageX className="h-24 w-24 mx-auto text-muted-foreground" />
          <h1 className="text-4xl font-bold text-foreground">Page Not Found</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or may have been removed. Please check the URL or return home.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/shop">Browse Products</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
