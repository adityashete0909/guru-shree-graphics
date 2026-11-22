'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/components/LanguageContext';
import { initialCategories, initialServices, initialGallery, initialReviews } from '@/data/initialData';
import { initialFAQs } from '@/data/faqs';
import {
  Printer,
  Palette,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  MessageCircle,
  MapPin,
  Phone,
  CheckCircle2,
  ChevronDown,
  Navigation,
  FileCheck,
  Truck,
  IndianRupee,
  Layers,
  Award,
} from 'lucide-react';

export default function HomePage() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  const popularServices = initialServices.filter((s) => s.popular);

  const filteredServices =
    selectedCategory === 'all'
      ? initialServices
      : initialServices.filter((s) => s.categoryId === selectedCategory);

  const googleMapsDirectionsUrl =
    'https://www.google.com/maps/search/?api=1&query=Kunal+Complex+Jawahar+Nagar+Road+Shastri+Nagar+Akola+444001';

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-brand-orange text-xs font-bold tracking-wide shadow-sm">
                <Sparkles className="w-4 h-4 text-brand-orange" />
                <span>
                  {language === 'mr'
                    ? 'अकोल्यातील #१ प्रिंटिंग आणि ग्राफिक डिझायनिंग सेंटर'
                    : '#1 Printing & Graphic Designing Hub in Akola'}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-navy-900 tracking-tight leading-[1.15]">
                {t('heroHeading')}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                {t('heroSubtitle')}
              </p>

              {/* Mandatory No Online Payment Notice */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{t('noOnlinePaymentText')}</span>
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap gap-3.5 justify-center lg:justify-start">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-brand-orange to-brand-red text-white text-sm sm:text-base font-extrabold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200"
                >
                  <Printer className="w-5 h-5" />
                  <span>{t('btnBookService')}</span>
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border-2 border-navy-900 text-navy-900 text-sm sm:text-base font-bold rounded-xl hover:bg-navy-900 hover:text-white transition-all duration-200 shadow-sm"
                >
                  <span>{t('btnExploreServices')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://wa.me/918668816001?text=Hello%20Guru%20Shree%20Graphics,%20I%20want%20to%20enquire%20about%20printing%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-bold rounded-xl shadow-md transition-all duration-200"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>{t('btnWhatsappEnquiry')}</span>
                </a>
              </div>

              {/* Key Trust Stats */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-navy-900">40+</div>
                  <div className="text-xs text-slate-500 font-medium">Printing Services</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-brand-orange">4 Hours</div>
                  <div className="text-xs text-slate-500 font-medium">Fast Flex Delivery</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-brand-red">₹0 Advance</div>
                  <div className="text-xs text-slate-500 font-medium">Pay at Physical Shop</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-600">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Customer Trust</div>
                </div>
              </div>
            </div>

            {/* Right Visual Banner Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative background glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-brand-orange via-brand-red to-navy-900 rounded-3xl blur-xl opacity-30 animate-pulse" />

                <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                  <div className="relative h-64 sm:h-72 w-full">
                    <img
                      src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80"
                      alt="Digital Flex Printing Machine at Guru Shree Graphics Akola"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                        High Speed Printing
                      </span>
                      <h4 className="text-base font-black">Digital Flex, Banners & Vinyl</h4>
                    </div>
                  </div>

                  {/* Highlights Card */}
                  <div className="p-5 space-y-3.5 bg-white">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pb-2 border-b">
                      <span>{language === 'mr' ? 'दुकान स्थान:' : 'Physical Location:'}</span>
                      <span className="text-navy-900 font-bold">Kunal Complex, Akola</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>Star Flex, Blackout & Backlit Boards</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>350 GSM Velvet Visiting Cards with Spot UV</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>Royal Marathi Wedding Invites with Gold Foil</span>
                      </div>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <Link
                        href="/custom-design"
                        className="flex-1 text-center py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-navy-900 transition"
                      >
                        {t('btnCustomDesign')}
                      </Link>
                      <Link
                        href="/track"
                        className="flex-1 text-center py-2 bg-navy-900 hover:bg-slate-800 rounded-xl text-xs font-bold text-white transition"
                      >
                        {t('btnTrackBooking')}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-orange mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{language === 'mr' ? 'सर्वाधिक मागणी असलेल्या सेवा' : 'Top Customer Choices'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-navy-900 tracking-tight">
              {t('popularServicesHeading')}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              {t('popularServicesSub')}
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm font-bold text-brand-orange hover:text-brand-red transition"
          >
            <span>{language === 'mr' ? 'सर्व ४०+ सेवा पहा' : 'View All 40+ Services'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Popular Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularServices.slice(0, 8).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm service-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-100">
                  <img
                    src={service.image}
                    alt={language === 'mr' ? service.nameMr : service.nameEn}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-navy-900/90 text-white text-[11px] font-bold rounded-full backdrop-blur-sm">
                    {service.startingPrice ? `Starting ₹${service.startingPrice}` : 'Quote on Request'}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-navy-900 text-base leading-snug line-clamp-1">
                    {language === 'mr' ? service.nameMr : service.nameEn}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {language === 'mr' ? service.descriptionMr : service.descriptionEn}
                  </p>

                  <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                    <p className="truncate">
                      <strong>Options:</strong> {service.options.paperTypes[0]}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                <Link
                  href={`/book?service=${service.slug}`}
                  className="py-2 px-2 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold rounded-xl text-center shadow-sm hover:brightness-110 transition"
                >
                  {t('btnBookNow')}
                </Link>
                <Link
                  href={`/services/${service.slug}`}
                  className="py-2 px-2 border border-slate-300 text-navy-900 text-xs font-bold rounded-xl text-center hover:bg-slate-50 transition"
                >
                  {language === 'mr' ? 'तपशील' : 'Details'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ALL PRINTING SERVICES BY CATEGORY */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
              {language === 'mr' ? 'संपूर्ण कॅटलॉग' : 'Comprehensive Catalogue'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-navy-900">
              {t('allServicesHeading')}
            </h2>
            <p className="text-sm text-slate-600">
              {t('allServicesSub')}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm ${
                selectedCategory === 'all'
                  ? 'bg-navy-900 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {language === 'mr' ? 'सर्व सेवा (All)' : 'All Categories'}
            </button>
            {initialCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm ${
                  selectedCategory === cat.id
                    ? 'bg-brand-orange text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {language === 'mr' ? cat.nameMr : cat.nameEn}
              </button>
            ))}
          </div>

          {/* Filtered Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-brand-orange/50 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-navy-900 text-base">
                      {language === 'mr' ? service.nameMr : service.nameEn}
                    </h3>
                    <span className="text-xs font-black text-brand-orange flex-shrink-0 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                      {service.startingPrice ? `₹${service.startingPrice}` : 'Quotation'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === 'mr' ? service.descriptionMr : service.descriptionEn}
                  </p>

                  <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg space-y-1">
                    <div>
                      <strong className="text-navy-900">Sizes:</strong> {service.options.sizes.slice(0, 3).join(', ')}
                    </div>
                    <div>
                      <strong className="text-navy-900">Materials:</strong> {service.options.paperTypes.slice(0, 2).join(', ')}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <Link
                    href={`/book?service=${service.slug}`}
                    className="flex-1 py-2 bg-navy-900 hover:bg-brand-orange text-white text-xs font-bold rounded-xl text-center transition"
                  >
                    {t('btnBookNow')}
                  </Link>
                  <Link
                    href={`/services/${service.slug}`}
                    className="px-3 py-2 border border-slate-300 hover:bg-slate-100 text-navy-900 text-xs font-bold rounded-xl text-center transition"
                  >
                    {language === 'mr' ? 'तपशील' : 'Specs'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE GURU SHREE GRAPHICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
            {language === 'mr' ? 'आमची वैशिष्ट्ये' : 'Why Guru Shree Graphics'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-navy-900">
            {t('whyChooseHeading')}
          </h2>
          <p className="text-sm text-slate-600">
            {t('whyChooseSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center">
              <Printer className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-navy-900 text-base">
              {language === 'mr' ? 'अद्ययावत मशीनरी आणि हाय रिझोल्यूशन' : 'Advanced Japanese & HD Print Tech'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'mr'
                ? 'उष्णता आणि पावसाला तोंड देणारे अस्सल वॉटरप्रूफ रंग व दर्जेदार मीडिया.'
                : 'Ultra-vibrant, outdoor weather-resistant CMYK inks ensuring banners remain bright and vivid for years.'}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-brand-red flex items-center justify-center">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-navy-900 text-base">
              {language === 'mr' ? 'अनुभवी इन-हाउस ग्राफिक डिझायनर्स' : 'Skilled In-House Graphic Designers'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'mr'
                ? 'लोगो, लग्नपत्रिका आणि जाहिरात बॅनरसाठी आकर्षक मराठी व इंग्रजी फॉन्ट्ससह क्रिएटिव्ह डिझाइन.'
                : 'Need custom creative artwork? We craft eye-catching designs with client proofing rounds.'}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-navy-900 text-base">
              {language === 'mr' ? 'तातडीची ४ ते ६ तासांत डिलिव्हरी' : 'Emergency 4-Hour Express Flex'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'mr'
                ? 'उद्घाटन किंवा कार्यक्रमासाठी तातडीने हवे असल्यास अकोल्यात जलद मुद्रण उपलब्ध.'
                : 'Have an urgent event or shop launch today? Our high-speed digital flex lines produce output within hours.'}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-navy-900 text-base">
              {language === 'mr' ? '१००% पारदर्शक कोटेशन प्रणाली' : '100% Transparent Quotations'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'mr'
                ? 'कोणतेही छुपे शुल्क नाही. काम सुरू होण्यापूर्वी प्रत्येक वस्तूचा दर निश्चित केला जातो.'
                : 'Itemized material, printing, design, and delivery breakdown before any printing commitment.'}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-navy-900 text-base">
              {language === 'mr' ? 'दुकान पिकअप किंवा घरपोच डिलिव्हरी' : 'Shop Pickup or Doorstep Delivery'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'mr'
                ? 'कुणाल कॉम्प्लेक्समधून थेट विनामूल्य घेऊन जा किंवा अकोल्यात घरपोच मागवा.'
                : 'Zero-cost pickup right at Kunal Complex, Jawahar Nagar Road, or door delivery in Akola.'}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-navy-900 text-base">
              {language === 'mr' ? 'घाऊक आणि बल्क प्रिंटिंग सवलत' : 'Wholesale Rates for Bulk Jobs'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'mr'
                ? '१०,००० हून अधिक पॅम्पलेट्स, लग्नपत्रिका संच आणि व्यापारी दुकानांसाठी विशेष दर.'
                : 'Special discounts on bulk pamphlets, bill books, and annual corporate printing packages.'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. HOW BOOKING WORKS (ZERO ONLINE PAYMENT) */}
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
              {language === 'mr' ? 'सोपी प्रक्रिया' : 'Simple 4-Step Flow'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              {t('howBookingWorksHeading')}
            </h2>
            <p className="text-sm text-slate-300">
              {t('howBookingWorksSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-navy-800 p-6 rounded-2xl border border-navy-700 relative">
              <span className="text-3xl font-black text-brand-orange opacity-50 absolute top-4 right-4">01</span>
              <h3 className="font-bold text-white text-base mb-2">
                {language === 'mr' ? '१. सेवा व साईज निवडा' : '1. Configure Job Specs'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'mr'
                  ? 'सेवा निवडा, साईज, कागदाची प्रत, रंग आणि आवश्यक प्रत संख्या नमूद करा.'
                  : 'Select service, dimensions, paper quality, GSM, finishing, and required completion date.'}
              </p>
            </div>

            <div className="bg-navy-800 p-6 rounded-2xl border border-navy-700 relative">
              <span className="text-3xl font-black text-brand-orange opacity-50 absolute top-4 right-4">02</span>
              <h3 className="font-bold text-white text-base mb-2">
                {language === 'mr' ? '२. डिझाइन द्या किंवा सांगा' : '2. Provide Artwork / Brief'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'mr'
                  ? 'आपली तयार डिझाइन फाईल अपलोड करा किंवा आमच्या डिझायनरला सूचना द्या.'
                  : 'Upload your own CDR/PDF/JPG design file or request our in-house team to design.'}
              </p>
            </div>

            <div className="bg-navy-800 p-6 rounded-2xl border border-navy-700 relative">
              <span className="text-3xl font-black text-brand-orange opacity-50 absolute top-4 right-4">03</span>
              <h3 className="font-bold text-white text-base mb-2">
                {language === 'mr' ? '३. कोटेशन मंजूर करा' : '3. Review & Approve Quote'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'mr'
                  ? 'आम्ही पाठवलेले सविस्तर दर तपासा. मंजुरी द्या. कोणतेही ऑनलाइन पेमेंट आवश्यक नाही!'
                  : 'Review itemized pricing in your dashboard. Zero payment upfront required on website.'}
              </p>
            </div>

            <div className="bg-navy-800 p-6 rounded-2xl border border-navy-700 relative">
              <span className="text-3xl font-black text-brand-orange opacity-50 absolute top-4 right-4">04</span>
              <h3 className="font-bold text-white text-base mb-2">
                {language === 'mr' ? '४. काम तपासा व गोळा करा' : '4. Pick Up & Pay at Shop'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'mr'
                  ? 'प्रिंट तयार झाल्यावर कुणाल कॉम्प्लेक्स दुकानातून घेऊन जा किंवा घरपोच मिळवा.'
                  : 'Track real-time status, collect finished prints from shop counter or via home delivery, and settle directly.'}
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-brand-orange to-brand-red text-white text-base font-extrabold rounded-xl shadow-lg hover:brightness-110 transition"
            >
              <span>{t('btnBookNow')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. PREVIOUS WORK GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
              {language === 'mr' ? 'कामाचे नमुने' : 'Portfolio Showcase'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-navy-900">
              {t('galleryHeading')}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              {t('gallerySub')}
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1 text-sm font-bold text-brand-orange hover:text-brand-red transition"
          >
            <span>{language === 'mr' ? 'संपूर्ण गॅलरी पहा' : 'View Full Portfolio'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialGallery.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={language === 'mr' ? item.titleMr : item.titleEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-sm">
                    {language === 'mr' ? item.titleMr : item.titleEn}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1">
                    {language === 'mr' ? item.descriptionMr : item.descriptionEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
              {language === 'mr' ? 'ग्राहकांचे अभिप्राय' : 'Verified Reviews'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-navy-900">
              {t('reviewsHeading')}
            </h2>
            <p className="text-sm text-slate-600">
              {t('reviewsSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initialReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    "{language === 'mr' ? rev.commentMr : rev.commentEn}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-navy-900">{rev.name}</h4>
                    <p className="text-slate-500">{rev.city}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-medium text-slate-600">
                    {language === 'mr' ? rev.serviceMr : rev.serviceEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SPECIAL OFFERS & PACKAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white rounded-3xl p-6 sm:p-10 border border-navy-700 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-3">
              <span className="px-3 py-1 bg-brand-orange text-white text-xs font-extrabold uppercase rounded-full">
                {language === 'mr' ? 'विशेष कॉम्बो ऑफर' : 'Special Combo Package'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                {language === 'mr'
                  ? 'नवीन दुकानासाठी संपूर्ण ब्रँडिंग किट फक्त ₹१,४९९ पासून!'
                  : 'Complete New Business Launch Kit Starting at Just ₹1,499!'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {language === 'mr'
                  ? 'यात समाविष्ट: १ आकर्षक लोगो डिझाइन, १००० दोन्ही बाजूंचे व्हिजिटिंग कार्ड्स, १ बिल बुक आणि दुकानासाठी १०x४ चा मुख्य बॅनर लेआउट.'
                  : 'Includes: 1 Bespoke Logo Concept, 1000 Double-Sided Visiting Cards, 1 Duplicate Bill Book, and 1 Shop Main Board Banner Layout.'}
              </p>
            </div>
            <div className="text-center lg:text-right">
              <Link
                href="/book?service=srv-business-branding"
                className="inline-block px-8 py-4 bg-brand-orange hover:bg-brand-orange-dark text-white text-sm sm:text-base font-extrabold rounded-2xl shadow-xl transition transform hover:scale-105"
              >
                {language === 'mr' ? 'ऑफर बुक करा' : 'Claim Package Now'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-navy-900">
            {t('faqHeading')}
          </h2>
        </div>

        <div className="space-y-3">
          {initialFAQs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition"
                >
                  <span className="font-bold text-sm sm:text-base text-navy-900">
                    {language === 'mr' ? faq.questionMr : faq.questionEn}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-orange flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {language === 'mr' ? faq.answerMr : faq.answerEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. CONTACT INFORMATION & GOOGLE MAPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Contact Details */}
            <div className="lg:col-span-5 p-6 sm:p-10 space-y-6 bg-slate-50">
              <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
                {language === 'mr' ? 'थेट भेटा' : 'Visit Us Directly'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-navy-900">
                {language === 'mr' ? 'आमच्या दुकानाचा पत्ता' : 'Shop Location in Akola'}
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-brand-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-navy-900 font-bold block text-sm">
                      Guru Shree Graphics
                    </strong>
                    <p className="mt-0.5">
                      Kunal Complex, Opp. Boys Zone, Jawahar Nagar Road, Shastri Nagar, Akola – 444001, Maharashtra, India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-brand-red flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-navy-900 font-bold block">
                      {language === 'mr' ? 'फोन व व्हॉट्सॲप' : 'Phone & WhatsApp'}
                    </strong>
                    <p className="mt-0.5">+91 86688 16001</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-navy-900 font-bold block">
                      {t('openingHoursTitle')}
                    </strong>
                    <p className="mt-0.5">{t('openingHoursText')}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-navy-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition"
                >
                  <Navigation className="w-4 h-4 text-brand-orange" />
                  <span>{t('btnGetDirections')}</span>
                </a>

                <a
                  href="https://wa.me/918668816001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{t('btnWhatsappEnquiry')}</span>
                </a>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="lg:col-span-7 h-72 sm:h-96 lg:h-auto min-h-[300px] w-full bg-slate-200">
              <iframe
                title="Guru Shree Graphics Akola Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14930.292376916843!2d77.0012!3d20.7002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd7299a9a01f563%3A0x6b77ad5a2c42c!2sJawahar%20Nagar%2C%20Akola%2C%20Maharashtra%20444001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
