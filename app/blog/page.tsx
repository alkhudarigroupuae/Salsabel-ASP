import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Salsabel Auto Spare Parts Blog",
  description: "Read our latest articles about auto spare parts, car maintenance tips, and industry news.",
}

// This would come from WooCommerce/WordPress API in production
const blogPosts = [
  {
    slug: "car-parts-and-accessories-dubai",
    title: "Car Parts And Accessories Dubai",
    excerpt: "Find the best car parts and accessories in Dubai with our comprehensive guide.",
    image: "/car-parts-accessories.jpg",
    date: "2024-01-15",
  },
  {
    slug: "how-to-buy-car-spare-parts-online",
    title: "How to Buy Car Spare Parts Online",
    excerpt: "Learn the best practices for purchasing genuine car spare parts online.",
    image: "/online-shopping-car-parts.jpg",
    date: "2024-01-10",
  },
  {
    slug: "car-spare-parts-near-me",
    title: "Car Spare Parts Near Me",
    excerpt: "Discover how to find reliable car spare parts suppliers in your area.",
    image: "/car-spare-parts-store.jpg",
    date: "2024-01-05",
  },
  {
    slug: "spare-parts-in-sharjah",
    title: "How to Buy Spare Parts in Sharjah?",
    excerpt: "Your complete guide to buying genuine spare parts in Sharjah, UAE.",
    image: "/sharjah-auto-parts.jpg",
    date: "2024-01-01",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Salsabel Auto Spare Parts Blog</h1>
          <p className="text-muted-foreground">Tips, guides, and news about auto spare parts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/${post.slug}/`}>
              <Card className="bg-card border-border hover:border-primary/50 transition-all h-full overflow-hidden group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-2">{post.date}</p>
                  <h2 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
