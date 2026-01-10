import { WhatsAppButton } from "@/components/whatsapp-button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Award, Shield } from "lucide-react"
import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "About" })

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default function AboutUsPage() {
  const t = useTranslations("About")

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="bg-card border-b border-border py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">{t("title")}</h1>
              <p className="text-xl text-primary font-medium mb-6">{t("welcome")}</p>
              <p className="text-muted-foreground leading-relaxed">
                {t("intro")}
              </p>
            </div>
          </div>
        </section>

        {/* Our Extensive Inventory */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t("inventoryTitle")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t("inventoryText")}
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">{t("qualityTitle")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t("qualityText")}
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">{t("shopTitle")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("shopText")}
              </p>
            </div>
          </div>
        </section>

        {/* Services Features */}
        <section className="py-16 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">{t("servicesTitle")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-background border-border">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{t("features.inventory")}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t("features.inventoryDesc")}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border-border">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{t("features.pricing")}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t("features.pricingDesc")}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border-border">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{t("features.quality")}</h3>
                  <p className="text-muted-foreground text-sm">
                    {t("features.qualityDesc")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <WhatsAppButton />
    </div>
  )
}
