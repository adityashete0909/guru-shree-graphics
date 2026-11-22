'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { useLanguage } from './LanguageContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  ShieldAlert,
  ArrowRight,
  Printer,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  const googleMapsDirectionsUrl =
    'https://www.google.com/maps/search/?api=1&query=Kunal+Complex+Jawahar+Nagar+Road+Shastri+Nagar+Akola+444001';

  return (
    <footer className="bg-navy-900 text-white pt-16 pb-12 border-t-4 border-brand-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-navy-700">
          {/* Col 1: Brand & Official Address */}
          <div className="space-y-4">
            <Logo size="md" variant="light" />
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'mr'
                ? 'अकोल्यातील सर्वोत्कृष्ट डिजिटल फ्लेक्स प्रिंटिंग, व्हिजिटिंग कार्ड्स, लग्नपत्रिका आणि व्यावसायिक ब्रँडिंग सोल्यूशन्स.'
                : 'Premier digital flex printing, visiting cards, royal wedding invites, and commercial offset solutions in Akola.'}
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong className="text-white block font-semibold">Guru Shree Graphics</strong>
                  Kunal Complex, Opp. Boys Zone, Jawahar Nagar Road, Shastri Nagar, Akola – 444001, Maharashtra, India.
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <span>+91 86688 16001 / Call & WhatsApp</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <span>contact@gurushreegraphics.com</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span>{t('openingHoursText')}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold rounded-xl shadow-md hover:brightness-110 transition"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{t('btnGetDirections')}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Printing Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-brand-orange pl-2.5">
              {language === 'mr' ? 'प्रिंटिंग सेवा' : 'Our Specializations'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/services#cat-digital-printing" className="hover:text-brand-orange transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  <span>Flex Banners & Hoardings (फ्लेक्स बॅनर)</span>
                </Link>
              </li>
              <li>
                <Link href="/services#cat-business-office" className="hover:text-brand-orange transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  <span>Visiting Cards & Letterheads (व्हिजिटिंग कार्ड्स)</span>
                </Link>
              </li>
              <li>
                <Link href="/services#cat-wedding-event" className="hover:text-brand-orange transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  <span>Wedding & Invitation Cards (लग्नपत्रिका)</span>
                </Link>
              </li>
              <li>
                <Link href="/services#cat-business-office" className="hover:text-brand-orange transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  <span>Bill Books & Invoice Books (बिल बुक्स)</span>
                </Link>
              </li>
              <li>
                <Link href="/services#cat-digital-printing" className="hover:text-brand-orange transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  <span>Vinyl & Sticker Labels (विनाइल स्टिकर्स)</span>
                </Link>
              </li>
              <li>
                <Link href="/services#cat-commercial-printing" className="hover:text-brand-orange transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  <span>Pamphlets & Brochures (माहितीपत्रके)</span>
                </Link>
              </li>
              <li>
                <Link href="/services#cat-graphic-designing" className="hover:text-brand-orange transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  <span>Logo & Graphic Design (लोगो डिझाइन)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Transparency */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-brand-orange pl-2.5">
              {language === 'mr' ? 'जलद दुवे' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/book" className="hover:text-brand-orange transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  <span>{t('btnBookService')}</span>
                </Link>
              </li>
              <li>
                <Link href="/custom-design" className="hover:text-brand-orange transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  <span>{t('btnCustomDesign')}</span>
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-brand-orange transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  <span>{t('navTrack')}</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-brand-orange transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  <span>{t('navGallery')}</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-orange transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  <span>{t('navAbout')}</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-orange transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  <span>{t('navContact')}</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-brand-orange transition flex items-center gap-1.5 text-slate-400">
                  <ArrowRight className="w-3 h-3 text-brand-orange" />
                  <span>{language === 'mr' ? 'दुकान मालक लॉगिन (Admin)' : 'Owner / Admin Portal'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Mandatory No Online Payment Notice & Map Snapshot */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-brand-orange pl-2.5">
              {language === 'mr' ? 'पेमेंट धोरण' : 'Shop Payment Policy'}
            </h4>

            <div className="bg-navy-800 border border-brand-orange/40 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-brand-orange font-bold text-xs">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>NO ONLINE PAYMENT GATEWAYS</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {t('noOnlinePaymentText')}
              </p>
              <div className="text-[10px] text-amber-300 bg-navy-900/60 p-2 rounded border border-amber-500/30">
                {t('quotationNotice')}
              </div>
            </div>

            {/* Embedded Mini Directions */}
            <div className="bg-navy-800 rounded-xl p-3 border border-navy-700">
              <p className="text-xs font-semibold text-slate-200">
                {language === 'mr' ? 'अकोला पत्ता:' : 'Akola Landmark:'}
              </p>
              <p className="text-[11px] text-slate-400">
                Opposite Boys Zone, Jawahar Nagar Road, Shastri Nagar
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} <strong className="text-white">Guru Shree Graphics</strong>, Akola. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Designed for high precision printing & modern creative visual identity.
          </p>
        </div>
      </div>
    </footer>
  );
};
