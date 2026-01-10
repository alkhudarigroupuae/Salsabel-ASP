import type { Metadata } from "next"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Salsabel Auto Spare Parts - How we collect, use, and protect your information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>Last updated: January 2025</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, make a purchase,
            contact us, or subscribe to our newsletter. This may include your name, email address, phone number,
            shipping address, and payment information.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Send you order confirmations and updates</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send promotional communications (with your consent)</li>
            <li>Improve our website and services</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8">3. Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your information
            with trusted service providers who assist us in operating our website, conducting our business, or servicing
            you.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">5. Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and
            personalize content. You can control cookie preferences through your browser settings.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            Email: info@salparts.com
            <br />
            Phone: +971 50 316 1689
          </p>
        </div>
      </main>
      <WhatsAppButton />
    </div>
  )
}
