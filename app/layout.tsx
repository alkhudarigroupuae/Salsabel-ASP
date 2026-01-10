import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context"
import { CurrencyProvider } from "@/lib/currency-context"
import { ThemeProvider } from "@/lib/theme-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://salparts.com"),
  title: {
    default: "Salsabel Auto Spare Parts | Auto Spare Parts in Sharjah UAE",
    template: "%s | Salsabel Auto Spare Parts",
  },
  description:
    "Premium auto spare parts supplier in Sharjah, UAE. Genuine OEM and aftermarket parts for BMW, Mercedes, Audi, Porsche, Range Rover, and luxury European cars. Fast delivery across UAE.",
  keywords: [
    "auto spare parts sharjah",
    "car parts uae",
    "bmw spare parts",
    "mercedes parts dubai",
    "audi parts uae",
    "porsche parts",
    "range rover parts",
    "european car parts",
    "oem parts uae",
    "aftermarket parts sharjah",
    "salsabel auto parts",
  ],
  authors: [{ name: "Salsabel Auto Spare Parts" }],
  creator: "Salsabel Auto Spare Parts",
  publisher: "Salsabel Auto Spare Parts",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://salparts.com",
    siteName: "Salsabel Auto Spare Parts",
    title: "Salsabel Auto Spare Parts | Auto Spare Parts in Sharjah UAE",
    description:
      "Premium auto spare parts supplier in Sharjah, UAE. Genuine OEM and aftermarket parts for luxury European cars.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Salsabel Auto Spare Parts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salsabel Auto Spare Parts | Auto Spare Parts in Sharjah UAE",
    description:
      "Premium auto spare parts supplier in Sharjah, UAE. Genuine OEM and aftermarket parts for luxury European cars.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
    // yandex: "YOUR_YANDEX_CODE",
    // bing: "YOUR_BING_CODE",
  },
  alternates: {
    canonical: "https://salparts.com",
  },
  icons: {
    icon: [{ url: "/logos/fav.icon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#004aad",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `}
        </Script>

        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX" strategy="afterInteractive" />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-XXXXXXXXX');
          `}
        </Script>

        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_FACEBOOK_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>

        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoPartsStore",
              name: "Salsabel Auto Spare Parts",
              image: "https://salparts.com/salsabel-logo.svg",
              "@id": "https://salparts.com",
              url: "https://salparts.com",
              telephone: "+971503161689",
              email: "info@salparts.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Industrial Area",
                addressLocality: "Sharjah",
                addressCountry: "AE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 25.3463,
                longitude: 55.4209,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
                  opens: "09:00",
                  closes: "21:00",
                },
              ],
              sameAs: [
                "https://www.facebook.com/salsabelautoparts",
                "https://www.instagram.com/salsabelautoparts",
                "https://wa.me/971503161689",
              ],
              priceRange: "$$",
              currenciesAccepted: "AED",
              paymentAccepted: "Cash, Credit Card",
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased p-5`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <ThemeProvider>
          <AuthProvider>
            <CurrencyProvider>
              <CartProvider>
                <Header />
                {children}
                <Footer />
              </CartProvider>
            </CurrencyProvider>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
