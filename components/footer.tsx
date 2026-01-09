import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="w-full h-[300px] md:h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.8456!2d55.4695!3d25.3084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f5f5f5f5f5f%3A0x5f5f5f5f5f5f5f5f!2sSalsabel%20Auto%20Spare%20Parts!5e0!3m2!1sen!2sae!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Salsabel Auto Spare Parts Location - Industrial Area 6, Sharjah"
          className="grayscale hover:grayscale-0 transition-all duration-300"
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/logos/logo-light.png"
                alt="Salsabel Auto Spare Parts"
                width={750}
                height={159}
                className="h-12 md:h-[60px] w-auto dark:hidden object-contain"
              />
              <Image
                src="/logos/logo-dark.png"
                alt="Salsabel Auto Spare Parts"
                width={750}
                height={159}
                className="h-12 md:h-[60px] w-auto hidden dark:block object-contain"
              />
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Your premier destination for top-quality auto parts supplier in Sharjah & Dubai. Road-Tested Reliability:
              Your Trusted Hub for Used Spare Parts and Genuine Auto Spares since 2009.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.facebook.com/salsabel.auto.parts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/salsabel.auto/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/971503161689"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#25D366] transition-colors"
                aria-label="Contact us on WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              {/* Pinterest */}
              <a
                href="https://www.pinterest.com/alsalsabel/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#E60023] transition-colors"
                aria-label="Follow us on Pinterest"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.43l1.4-5.96s-.35-.72-.35-1.78c0-1.67.97-2.92 2.18-2.92 1.03 0 1.52.77 1.52 1.7 0 1.03-.66 2.58-1 4.01-.28 1.2.6 2.17 1.78 2.17 2.13 0 3.77-2.25 3.77-5.5 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.2 0 1.03.4 2.13.89 2.73.1.12.11.22.08.34l-.33 1.36c-.05.22-.18.27-.4.16-1.49-.7-2.42-2.87-2.42-4.62 0-3.76 2.73-7.22 7.88-7.22 4.14 0 7.36 2.95 7.36 6.89 0 4.11-2.6 7.43-6.2 7.43-1.21 0-2.35-.63-2.74-1.37l-.75 2.84c-.27 1.04-1 2.35-1.49 3.15A12 12 0 1 0 12 0z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://www.youtube.com/channel/UCvo-IRTWgjjAbApeL77JC_w"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#FF0000] transition-colors"
                aria-label="Subscribe on YouTube"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.68 31.68 0 0 0 0 12a31.68 31.68 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.68 31.68 0 0 0 24 12a31.68 31.68 0 0 0-.5-5.81zM9.55 15.5V8.5l6.27 3.5-6.27 3.5z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Car Brands</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/mercedes-spare-parts/" className="text-muted-foreground hover:text-primary text-sm">
                  Mercedes
                </Link>
              </li>
              <li>
                <Link href="/bmw-spare-parts/" className="text-muted-foreground hover:text-primary text-sm">
                  BMW
                </Link>
              </li>
              <li>
                <Link href="/range-rover-spare-parts/" className="text-muted-foreground hover:text-primary text-sm">
                  Range Rover
                </Link>
              </li>
              <li>
                <Link href="/porsche-spare-parts/" className="text-muted-foreground hover:text-primary text-sm">
                  Porsche
                </Link>
              </li>
              <li>
                <Link href="/audi-spare-parts/" className="text-muted-foreground hover:text-primary text-sm">
                  Audi
                </Link>
              </li>
              <li>
                <Link href="/volkswagen-spare-parts/" className="text-muted-foreground hover:text-primary text-sm">
                  Volkswagen
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop/" className="text-muted-foreground hover:text-primary text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/my-account/" className="text-muted-foreground hover:text-primary text-sm">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/cart/" className="text-muted-foreground hover:text-primary text-sm">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/blog/" className="text-muted-foreground hover:text-primary text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about-us/" className="text-muted-foreground hover:text-primary text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us/" className="text-muted-foreground hover:text-primary text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+971503161689" className="hover:text-primary">
                  +971 50 316 1689
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+971557209552" className="hover:text-primary">
                  +971 55 720 9552
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@salparts.com" className="hover:text-primary">
                  info@salparts.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>
                  Industrial Area #6
                  <br />
                  Sharjah, UAE
                </span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm font-medium text-foreground">Call Us for Urgent Support</p>
              <a href="tel:+971557209552" className="text-primary font-bold">
                +971 55 720 9552
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2009 - 2025 Salsabel Auto Spare Parts. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy/" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions/" className="text-sm text-muted-foreground hover:text-primary">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
