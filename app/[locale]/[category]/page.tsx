import { Suspense } from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { ProductSearch } from "@/components/product-search"
import { wooCategories } from "@/lib/woocommerce"

// Valid category slugs matching salparts.com
const validCategories = [
  "bmw-spare-parts",
  "mercedes-spare-parts",
  "audi-spare-parts",
  "porsche-spare-parts",
  "range-rover-spare-parts",
  "volkswagen-spare-parts",
  "bentley-spare-parts",
  "rolls-royce-spare-parts",
  "ferrari-spare-parts",
  "lamborghini-spare-parts",
  "mini-cooper-spare-parts",
  "maserati-spare-parts",
]

const categoryTitles: Record<string, string> = {
  "bmw-spare-parts": "BMW Spare Parts",
  "mercedes-spare-parts": "Mercedes Spare Parts",
  "audi-spare-parts": "Audi Spare Parts",
  "porsche-spare-parts": "Porsche Spare Parts",
  "range-rover-spare-parts": "Range Rover Spare Parts",
  "volkswagen-spare-parts": "Volkswagen Spare Parts",
  "bentley-spare-parts": "Bentley Spare Parts",
  "rolls-royce-spare-parts": "Rolls Royce Spare Parts",
  "ferrari-spare-parts": "Ferrari Spare Parts",
  "lamborghini-spare-parts": "Lamborghini Spare Parts",
  "mini-cooper-spare-parts": "Mini Cooper Spare Parts",
  "maserati-spare-parts": "Maserati Spare Parts",
}

const categoryBanners: Record<string, string> = {
  "bmw-spare-parts": "/bmw-spare-parts-banner.jpg",
  "mercedes-spare-parts": "/mercedes-spare-parts-banner.jpg",
  "audi-spare-parts": "/audi-spare-parts-banner.jpg",
  "porsche-spare-parts": "/porsche-spare-parts-banner.jpg",
  "range-rover-spare-parts": "/range-rover-spare-parts-banner.jpg",
  "volkswagen-spare-parts": "/volkswagen-spare-parts-banner.jpg",
  "bentley-spare-parts": "/bentley-spare-parts-banner.jpg",
  "rolls-royce-spare-parts": "/rolls-royce-spare-parts-banner.jpg",
  "ferrari-spare-parts": "/ferrari-spare-parts-banner.jpg",
  "lamborghini-spare-parts": "/lamborghini-spare-parts-banner.jpg",
  "mini-cooper-spare-parts": "/mini-cooper-spare-parts-banner.jpg",
  "maserati-spare-parts": "/maserati-spare-parts-banner.jpg",
}

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const title = categoryTitles[category] || "Spare Parts"

  return {
    title: `${title} - Salsabel Auto Spare Parts`,
    description: `Shop genuine ${title} in Sharjah, UAE. Quality OEM replacement parts with fast delivery.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params

  // Check if this is a valid category page
  if (!validCategories.includes(category)) {
    notFound()
  }

  // Fetch real category data from WooCommerce
  let wooCategory
  try {
    wooCategory = await wooCategories.getBySlug(category)
  } catch (error) {
    console.error("Error fetching category:", error)
  }

  const title = wooCategory?.name || categoryTitles[category] || "Spare Parts"
  // Prioritize local high-quality banners, fallback to WooCommerce image
  const bannerImage = categoryBanners[category] || wooCategory?.image?.src || "/placeholder.svg"

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full h-64 md:h-96 overflow-hidden bg-secondary">
        <img
          src={bannerImage}
          alt={title}
          className="w-full h-full object-cover object-center"
          style={category === "mercedes-spare-parts" ? { objectPosition: "center" } : undefined}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">{title}</h1>
          <p className="text-muted-foreground">
            Find the right parts faster with our extensive inventory of genuine {title.toLowerCase()}.
          </p>
        </div>

        <Suspense fallback={<div className="h-10 bg-secondary rounded" />}>
          <ProductSearch />
        </Suspense>

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <aside className="w-full lg:w-64 flex-shrink-0">
            <Suspense fallback={<div className="h-96 bg-secondary rounded" />}>
              <ProductFilters />
            </Suspense>
          </aside>

          <main className="flex-1">
            <Suspense fallback={<div className="h-96 bg-secondary rounded" />}>
              <ProductGrid category={category} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
