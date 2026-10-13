/**
 * VSPIAS WhatsApp URL Builder Helper
 * Standardizes wa.me URL creation with verified country code (+91) and number
 */

export const VSPIAS_WHATSAPP_PHONE = '919783133333';

export function buildWhatsAppUrl(message?: string, phone: string = VSPIAS_WHATSAPP_PHONE): string {
  const cleanPhone = phone.replace(/\D/g, '');
  if (!message || !message.trim()) {
    return `https://wa.me/${cleanPhone}`;
  }
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
