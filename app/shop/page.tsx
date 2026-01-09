import { Suspense } from "react"
import type { Metadata } from "next"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { ProductSearch } from "@/components/product-search"

export const metadata: Metadata = {
  title: "Shop - Salsabel Auto Spare Parts",
  description:
    "Browse our extensive collection of genuine auto spare parts for BMW, Mercedes, Audi, Porsche, and more.",
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Shop All Parts</h1>
          <p className="text-muted-foreground">Browse our extensive inventory of genuine auto spare parts</p>
        </div>

        {/* Search Bar - wrapped in Suspense */}
        <Suspense fallback={<div className="h-10 bg-secondary animate-pulse rounded" />}>
          <ProductSearch />
        </Suspense>

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Filters Sidebar - wrapped in Suspense */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <Suspense fallback={<div className="h-96 bg-secondary animate-pulse rounded" />}>
              <ProductFilters />
            </Suspense>
          </aside>

          {/* Products Grid - wrapped in Suspense */}
          <main className="flex-1">
            <Suspense fallback={<div className="h-96 bg-secondary animate-pulse rounded" />}>
              <ProductGrid />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
