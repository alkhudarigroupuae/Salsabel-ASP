import { Suspense } from "react"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { ProductSearch } from "@/components/product-search"
import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "Shop" })

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default function ShopPage() {
  const t = useTranslations("Shop")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
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
