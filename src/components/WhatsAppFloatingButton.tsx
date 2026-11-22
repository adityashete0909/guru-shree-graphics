'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { MessageCircle } from 'lucide-react';

interface WhatsAppFloatingButtonProps {
  phone?: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  phone = '918668816001',
}) => {
  const { language } = useLanguage();

  const prefilledMessage =
    language === 'mr'
      ? 'नमस्कार गुरु श्री ग्राफिक्स (अकोला), मला प्रिंटिंग आणि डिझायनिंग सेवेबद्दल चौकशी करायची आहे.'
      : 'Hello Guru Shree Graphics (Akola), I would like to enquire about your printing and graphic designing services.';

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(prefilledMessage)}`;

  return (
    <aside aria-label="Quick WhatsApp Contact" className="fixed bottom-6 right-6 z-40 flex items-center group">
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 bg-navy-900 text-white text-xs font-semibold rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {language === 'mr' ? 'व्हॉट्सॲपवर संपर्क करा' : 'Chat on WhatsApp'}
      </span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Enquiry"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ring-4 ring-emerald-200"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </aside>
  );
};
