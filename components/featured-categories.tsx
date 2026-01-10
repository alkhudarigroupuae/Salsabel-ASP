import { Link } from "@/lib/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslations } from "next-intl"

const categories = [
  {
    name: "BMW",
    slug: "bmw-spare-parts",
    image: "/salparts-bmw-category-image.png",
  },
  {
    name: "Mercedes",
    slug: "mercedes-spare-parts",
    image: "/salparts-mercedes-category-image.png",
  },
  {
    name: "Audi",
    slug: "audi-spare-parts",
    image: "/salparts-audi-category-image.png",
  },
  {
    name: "Porsche",
    slug: "porsche-spare-parts",
    image: "/salparts-porsche-category-image.png",
  },
  {
    name: "Range Rover",
    slug: "range-rover-spare-parts",
    image: "/salparts-range-rover-category-image.png",
  },
  {
    name: "Volkswagen",
    slug: "volkswagen-spare-parts",
    image: "/salparts-volkswagen-category-image.png",
  },
  {
    name: "Bentley",
    slug: "bentley-spare-parts",
    image: "/salparts-bentley-category-image.png",
  },
  {
    name: "Rolls Royce",
    slug: "rolls-royce-spare-parts",
    image: "/salparts-rolls-royce-category-image.png",
  },
  {
    name: "Ferrari",
    slug: "ferrari-spare-parts",
    image: "/salparts-ferrari-category-image.png",
  },
  {
    name: "Lamborghini",
    slug: "lamborghini-spare-parts",
    image: "/salparts-lamborghini-category-image.png",
  },
  {
    name: "Mini Cooper",
    slug: "mini-cooper-spare-parts",
    image: "/salparts-mini-cooper-category-image.png",
  },
  {
    name: "Maserati",
    slug: "maserati-spare-parts",
    image: "/salparts-maserati-category-image.png",
  },
]

export function FeaturedCategories() {
  const t = useTranslations("FeaturedCategories")
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              {t("title")}
            </h2>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>
          <Link href="/shop" className="text-primary hover:underline hidden sm:block">
            {t("viewAll")}
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.slug} href={`/${category.slug}`}>
              <Card className="bg-card border-border transition-all group cursor-pointer h-full hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-500 hover:ring-1 hover:ring-blue-500 relative overflow-hidden">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-lg bg-white">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-foreground text-sm leading-tight">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
