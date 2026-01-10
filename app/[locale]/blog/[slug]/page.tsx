import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Link } from "@/lib/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

const blogPosts = [
  {
    slug: "car-parts-and-accessories-dubai",
    title: "Car Parts And Accessories Dubai",
    excerpt: "Find the best car parts and accessories in Dubai with our comprehensive guide.",
    content: `
      <p>Dubai is a hub for luxury cars, and maintaining them requires access to high-quality spare parts. Whether you drive a BMW, Mercedes, Audi, or Porsche, finding the right parts is crucial for performance and longevity.</p>
      
      <h2>Why Choose Genuine Parts?</h2>
      <p>Genuine parts are designed specifically for your vehicle, ensuring a perfect fit and optimal performance. They undergo rigorous testing to meet manufacturer standards.</p>
      
      <h2>Where to Find Parts in Dubai</h2>
      <p>Salsabel Auto Spare Parts offers a wide range of genuine and OEM parts for luxury European vehicles. Located in Industrial Area 6, Sharjah, we serve customers across Dubai and the UAE.</p>
      
      <h2>Tips for Buying Auto Parts</h2>
      <ul>
        <li>Check the part number to ensure compatibility.</li>
        <li>Verify the authenticity of the supplier.</li>
        <li>Consider warranty and return policies.</li>
      </ul>
    `,
    image: "/car-parts-accessories.jpg",
    date: "2024-01-15",
    author: "Salsabel Team",
  },
  {
    slug: "how-to-buy-car-spare-parts-online",
    title: "How to Buy Car Spare Parts Online",
    excerpt: "Learn the best practices for purchasing genuine car spare parts online.",
    content: `
      <p>Buying car parts online can be convenient and cost-effective, but it requires caution to avoid counterfeit products or incorrect parts.</p>
      
      <h2>1. Know Your Vehicle Details</h2>
      <p>Always have your VIN (Vehicle Identification Number) ready. It helps in identifying the exact parts that fit your specific model and year.</p>
      
      <h2>2. Research the Seller</h2>
      <p>Look for reviews and ratings. Established sellers like Salsabel Auto Spare Parts provide reliable service and genuine products.</p>
      
      <h2>3. Compare Prices</h2>
      <p>While price is important, extremely low prices can indicate fake parts. Aim for a balance between quality and cost.</p>
    `,
    image: "/online-shopping-car-parts.jpg",
    date: "2024-01-10",
    author: "Salsabel Team",
  },
  {
    slug: "car-spare-parts-near-me",
    title: "Car Spare Parts Near Me",
    excerpt: "Discover how to find reliable car spare parts suppliers in your area.",
    content: `
      <p>Finding a reliable spare parts shop nearby is essential for quick repairs and maintenance.</p>
      
      <h2>Local vs. Online</h2>
      <p>Local shops offer the advantage of immediate availability and personal advice. However, online stores often have a broader inventory.</p>
      
      <h2>Salsabel Auto Spare Parts</h2>
      <p>We combine the best of both worlds with our physical store in Sharjah and online ordering options.</p>
    `,
    image: "/car-spare-parts-store.jpg",
    date: "2024-01-05",
    author: "Salsabel Team",
  },
  {
    slug: "spare-parts-in-sharjah",
    title: "How to Buy Spare Parts in Sharjah?",
    excerpt: "Your complete guide to buying genuine spare parts in Sharjah, UAE.",
    content: `
      <p>Sharjah is known for its vast industrial areas dedicated to automotive services and spare parts.</p>
      
      <h2>Industrial Area 6</h2>
      <p>This area is a hotspot for auto parts. You can find everything from engine components to body parts for all major car brands.</p>
    `,
    image: "/sharjah-auto-parts.jpg",
    date: "2024-01-01",
    author: "Salsabel Team",
  },
]

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: `${post.title} - Salsabel Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <article>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-8 bg-muted">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {post.title}
          </h1>

          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  )
}
