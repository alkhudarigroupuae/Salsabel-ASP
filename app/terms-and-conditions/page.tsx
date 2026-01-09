import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for Salsabel Auto Spare Parts - Rules and regulations for using our services.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms & Conditions</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>Last updated: January 2025</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Salsabel Auto Spare Parts website, you accept and agree to be bound by these
            Terms and Conditions. If you do not agree to these terms, please do not use our website.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">2. Products and Pricing</h2>
          <p>
            All products are subject to availability. We reserve the right to modify prices at any time without prior
            notice. Prices are in AED (UAE Dirhams) unless otherwise specified.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">3. Orders and Payment</h2>
          <p>
            By placing an order, you warrant that you are legally capable of entering into binding contracts. We accept
            various payment methods including credit cards, debit cards, and cash on delivery within the UAE.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">4. Shipping and Delivery</h2>
          <p>
            We offer delivery services across the UAE. Delivery times may vary based on location and product
            availability. Same-day delivery is available in Sharjah and Dubai for orders placed before 2 PM.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">5. Returns and Refunds</h2>
          <p>
            We accept returns within 7 days of delivery for unused items in original packaging. Electrical parts are
            non-returnable once installed. Refunds will be processed within 5-7 business days after receiving the
            returned item.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">6. Warranty</h2>
          <p>
            All genuine OEM parts come with manufacturer warranty. Aftermarket parts carry a minimum 6-month warranty
            against manufacturing defects. Warranty does not cover wear and tear or improper installation.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">7. Limitation of Liability</h2>
          <p>
            Salsabel Auto Spare Parts shall not be liable for any indirect, incidental, or consequential damages arising
            from the use of our products or services.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">8. Contact Information</h2>
          <p>
            For any questions regarding these Terms & Conditions, please contact us:
            <br />
            Email: info@salparts.com
            <br />
            Phone: +971 50 316 1689
            <br />
            Address: Industrial Area #6, Sharjah, UAE
          </p>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
