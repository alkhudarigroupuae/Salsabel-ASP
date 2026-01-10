import { WhatsAppButton } from "@/components/whatsapp-button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Award, Truck, Shield, Headphones } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Salsabel Auto Spare Parts",
  description:
    "Welcome to Al Salsabel Auto Spare Parts, where automotive excellence begins! Your trusted source for premium new and genuine used automotive components since 2009.",
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="bg-card border-b border-border py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">SALSABEL AUTO SPARE PARTS</h1>
              <p className="text-xl text-primary font-medium mb-6">Welcome</p>
              <p className="text-muted-foreground leading-relaxed">
                About Us, Welcome to Al Salsabel Auto Spare Parts, where automotive excellence begins! We are your
                trusted source for premium new and genuine used automotive components. With an unwavering commitment to
                quality and customer satisfaction, Salsabel is dedicated to serving all your auto part needs.
              </p>
            </div>
          </div>
        </section>

        {/* Our Extensive Inventory */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Extensive Inventory</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                At Salsabel Automotive components, we take pride in our extensive inventory of premium new and genuine
                used auto spare parts. Whether you're a car enthusiast, a professional mechanic, or a vehicle owner, we
                have a wide selection of top-notch components to cater to your specific requirements. Our inventory is
                meticulously curated to ensure that you have access to the finest automotive parts on the market.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">Quality and Customer Satisfaction</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                At Al Salsabel Auto Spare Parts, quality is our utmost priority. We understand the importance of
                reliable automotive components for the safety and performance of your vehicle. That's why we partner
                with trusted manufacturers and suppliers to bring you products that meet or exceed industry standards.
                Our team of experts is always available to assist you in finding the right parts for your vehicle.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">Shop with Confidence</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you shop at Al Salsabel, you can do so with confidence, knowing that you are getting high-quality
                auto parts at competitive prices. We take pride in our commitment to excellence, ensuring that your
                journey to vehicle excellence begins here.
              </p>
            </div>
          </div>
        </section>

        {/* Services Features */}
        <section className="py-16 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Services Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-background border-border">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Vast Inventory</h3>
                  <p className="text-muted-foreground text-sm">
                    Explore our extensive range of premium new and genuine used auto spare parts.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border-border">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Competitive Pricing</h3>
                  <p className="text-muted-foreground text-sm">
                    We offer competitive prices to help you stay within your budget.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border-border">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Quality Assurance</h3>
                  <p className="text-muted-foreground text-sm">
                    Rest easy knowing that our spare parts are sourced from reputable manufacturers.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border-border">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Headphones className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Expert Assistance</h3>
                  <p className="text-muted-foreground text-sm">
                    Our knowledgeable staff is here to assist you in finding the right components for your vehicle.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border-border">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Customer Satisfaction</h3>
                  <p className="text-muted-foreground text-sm">
                    We're dedicated to providing you with a seamless shopping experience.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border-border">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Fast Delivery</h3>
                  <p className="text-muted-foreground text-sm">
                    Swift and secure deliveries with FedEx and DHL shipping partners.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Brands We Serve */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">A Vast Selection of OE Equivalent Spare Parts</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our product range caters to a diverse array of vehicles, with a focus on esteemed European brands. We
                boast an extensive inventory of quality car and auto spare parts for renowned makes such as Mercedes
                Benz, BMW, Range Rover, Porsche, Audi, and VW. From front and rear bumpers to complete body kits, you'll
                discover virtually everything at our store.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Furthermore, we proudly serve as the primary distributor of Magneti Marelli and Depo lights in Dubai and
                Sharjah. We also hold the esteemed titles of dealer for Hella Lighting and Behr Hella Cooling Systems,
                as well as dealer for Valeo Lighting and ULO Lighting.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
