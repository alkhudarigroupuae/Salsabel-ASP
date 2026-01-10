import { HeroSection } from "@/components/hero-section"
import { FeaturedCategories } from "@/components/featured-categories"
import { FeaturedProducts } from "@/components/featured-products"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <FeaturedCategories />
        <FeaturedProducts />
      </main>
      <WhatsAppButton />
    </>
  )
}
