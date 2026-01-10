"use client"

import { Link } from "@/lib/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslations } from "next-intl"

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
]

export function LatestBlogPosts() {
  const t = useTranslations("Navigation") // Using Navigation namespace for "Blog" title as fallback or add new keys
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Latest News</h2>
            <p className="text-muted-foreground">Updates and tips from Salsabel Auto Spare Parts</p>
          </div>
          <Link href="/blog" className="text-primary hover:underline hidden sm:block">
            View All Posts
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="bg-card border-blue-500 transition-all h-full overflow-hidden group hover:shadow-lg hover:shadow-blue-500/10 border">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-2">{post.date}</p>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link href="/blog" className="text-primary hover:underline">
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}
