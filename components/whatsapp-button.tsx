"use client"

import { MessageCircle } from "lucide-react"
import { useTranslations } from "next-intl"

export function WhatsAppButton() {
  const t = useTranslations("WhatsApp")
  const phoneNumber = "971503161689"
  const message = encodeURIComponent(t("message"))

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-lg transition-all hover:scale-110"
      aria-label={t("ariaLabel")}
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
