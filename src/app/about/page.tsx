'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import {
  Printer,
  Palette,
  ShieldCheck,
  MapPin,
  Clock,
  Phone,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-16 py-12">
      {/* Hero Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-orange-100 text-brand-orange text-xs font-bold uppercase tracking-wider">
          {language === 'mr' ? 'आमची ओळख' : 'About Guru Shree Graphics'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-navy-900 tracking-tight">
          {language === 'mr'
            ? 'अकोल्यातील विश्वसनीय प्रिंटिंग आणि ग्राफिक डिझाइनिंग हब'
            : 'Akola’s Trusted Destination for Printing & Creative Design'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {language === 'mr'
            ? 'कुणाल कॉम्प्लेक्स, जवाहर नगर रोड येथे वसलेले गुरु श्री ग्राफिक्स हे आधुनिक तंत्रज्ञान, कुशल डिझायनर्स आणि सर्वोत्तम सेवेचे केंद्र आहे.'
            : 'Situated at Kunal Complex, Opp. Boys Zone, Jawahar Nagar Road, Guru Shree Graphics bridges premium creative imagination with state-of-the-art Japanese and industrial print output.'}
        </p>
      </section>

      {/* Story & Commitment Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-80 sm:h-96">
            <img
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80"
              alt="Guru Shree Graphics Workshop in Akola"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                Craftsmanship & Precision
              </span>
              <h3 className="text-xl font-bold">Serving Akola District with Distinction</h3>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900">
              {language === 'mr' ? 'दर्जेदार काम, पारदर्शक व्यवहार' : 'Precision Printing With Absolute Transparency'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'mr'
                ? 'आम्ही केवळ कागदावर किंवा फ्लेक्सवर छपाई करत नाही, तर तुमच्या व्यवसायाची व समारंभाची खरी प्रतिष्ठा निर्माण करतो. दुकानांचे मोठे होर्डिंग्स असोत किंवा लग्नघरातील मानाची पत्रिका, प्रत्येक कामात आमचे कारागीर सर्वोत्तम दर्जा देतात.'
                : 'At Guru Shree Graphics, our mission is to empower local businesses, retail shop owners, institutions, and families with vivid, eye-catching visual communication. We enforce strict quality control at every stage — from digital proofing to finishing and packaging.'}
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0" />
                <span>Zero Online Payment Upfront — Transparent offline billing at shop</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0" />
                <span>Modern digital flex, eco-solvent vinyl, and high-speed offset lines</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0" />
                <span>Both Shop Pickup at Kunal Complex and Akola city door delivery</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <Link
                href="/book"
                className="px-6 py-3.5 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold rounded-xl shadow-md hover:brightness-110 transition"
              >
                {t('btnBookNow')}
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 border border-navy-900 text-navy-900 text-xs font-bold rounded-xl hover:bg-navy-900 hover:text-white transition"
              >
                {t('navContact')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Official Address Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
              Official Headquarters
            </span>
            <h2 className="text-2xl font-black text-navy-900">
              Guru Shree Graphics
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-700 pt-4 border-t border-slate-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-navy-900 font-bold">
                <MapPin className="w-4 h-4 text-brand-orange" />
                <span>Physical Address</span>
              </div>
              <p className="text-slate-600">
                Kunal Complex, Opp. Boys Zone, Jawahar Nagar Road, Shastri Nagar, Akola – 444001, Maharashtra, India.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-navy-900 font-bold">
                <Clock className="w-4 h-4 text-brand-orange" />
                <span>Operating Hours</span>
              </div>
              <p className="text-slate-600">
                Mon - Sat: 9:30 AM – 9:00 PM<br />Sunday: 10:00 AM – 2:00 PM
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-navy-900 font-bold">
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>Contact Direct</span>
              </div>
              <p className="text-slate-600">
                +91 86688 16001<br />contact@gurushreegraphics.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
