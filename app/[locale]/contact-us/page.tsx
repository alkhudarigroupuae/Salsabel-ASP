import { WhatsAppButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "Contact" })

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default function ContactUsPage() {
  const t = useTranslations("Contact")

  return (
    <div className="min-h-screen bg-background">
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">{t("title")}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">{t("getInTouch")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t("urgentSupport")}</p>
                      <a href="tel:+971557209552" className="text-primary hover:underline">
                        +971 55 720 9552
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t("salesInquiries")}</p>
                      <a href="tel:+971503161689" className="text-primary hover:underline">
                        +971 50 316 1689
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-[#25D366]/10 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-[#25D366]" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t("whatsapp")}</p>
                      <a
                        href="https://wa.me/971503161689"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#25D366] hover:underline"
                      >
                        {t("sendMessage")}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t("email")}</p>
                      <a href="mailto:info@salparts.com" className="text-primary hover:underline">
                        info@salparts.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t("location")}</p>
                      <p className="text-muted-foreground">Industrial Area #6, Sharjah, UAE</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t("workingHours")}</p>
                      <p className="text-muted-foreground">{t("hours")}</p>
                      <p className="text-muted-foreground">{t("closed")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">{t("formTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("formName")}</Label>
                      <Input id="name" placeholder={t("formNamePlaceholder")} className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("formEmail")}</Label>
                      <Input id="email" type="email" placeholder={t("formEmailPlaceholder")} className="bg-background" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("formPhone")}</Label>
                    <Input id="phone" type="tel" placeholder={t("formPhonePlaceholder")} className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">{t("formSubject")}</Label>
                    <Input id="subject" placeholder={t("formSubjectPlaceholder")} className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">{t("formMessage")}</Label>
                    <Textarea
                      id="message"
                      placeholder={t("formMessagePlaceholder")}
                      rows={5}
                      className="bg-background"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    {t("submit")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <WhatsAppButton />
    </div>
  )
}
