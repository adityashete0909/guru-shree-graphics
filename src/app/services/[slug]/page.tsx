'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { initialServices, initialCategories } from '@/data/initialData';
import {
  Printer,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Layers,
  Sparkles,
  MapPin,
  MessageCircle,
} from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language, t } = useLanguage();
  const router = useRouter();

  const service = initialServices.find((s) => s.slug === slug || s.id === slug);
  const category = initialCategories.find((c) => c.id === service?.categoryId);

  if (!service) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-navy-900">Service Not Found</h2>
        <p className="text-sm text-slate-500">The requested printing service could not be found.</p>
        <Link
          href="/services"
          className="inline-block px-5 py-2.5 bg-brand-orange text-white text-xs font-bold rounded-xl"
        >
          Back to All Services
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-navy-900">Home</Link>
        <span>/</span>
        <Link href="/services" className="hover:text-navy-900">Services</Link>
        <span>/</span>
        <span className="font-semibold text-navy-900">{language === 'mr' ? service.nameMr : service.nameEn}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Image & Badges */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 h-80 sm:h-96 w-full bg-slate-100">
            <img
              src={service.image}
              alt={language === 'mr' ? service.nameMr : service.nameEn}
              className="w-full h-full object-cover"
            />
            {service.startingPrice && (
              <div className="absolute top-4 right-4 px-4 py-1.5 bg-navy-900/90 text-white text-sm font-bold rounded-full backdrop-blur-sm shadow-md">
                Starting ₹{service.startingPrice} {language === 'mr' ? service.priceUnitMr : service.priceUnitEn}
              </div>
            )}
          </div>

          {/* Transparent Policy Callout */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 space-y-1">
              <strong className="block font-bold">
                {language === 'mr' ? 'कोणतेही ऑनलाइन पेमेंट आवश्यक नाही' : 'No Online Payment Required'}
              </strong>
              <p>
                {t('noOnlinePaymentText')}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Service Information & Specifications */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
              {category ? (language === 'mr' ? category.nameMr : category.nameEn) : 'Printing Service'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-navy-900 leading-tight">
              {language === 'mr' ? service.nameMr : service.nameEn}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'mr' ? service.descriptionMr : service.descriptionEn}
            </p>
          </div>

          {/* Pricing Highlight */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 block">
                {language === 'mr' ? 'अंदाजे सुरुवातीचा दर:' : 'Starting Reference Price:'}
              </span>
              <span className="text-2xl font-black text-brand-orange">
                {service.startingPrice ? `₹${service.startingPrice}` : 'Quotation Based'}
              </span>
              <span className="text-xs text-slate-500 ml-1.5">
                {language === 'mr' ? service.priceUnitMr : service.priceUnitEn}
              </span>
            </div>
            <span className="text-[11px] font-bold text-slate-400 bg-white px-3 py-1 rounded-full border">
              GST / Taxes Applicable
            </span>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider">
              {language === 'mr' ? 'उपलब्ध पर्याय व तपशील' : 'Configurable Options & Specs'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="font-bold text-slate-500 block">Sizes & Dimensions:</span>
                <p className="text-navy-900 font-medium">{service.options.sizes.join(', ')}</p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="font-bold text-slate-500 block">Media / Paper Grades:</span>
                <p className="text-navy-900 font-medium">{service.options.paperTypes.join(', ')}</p>
              </div>

              {service.options.gsmOptions.length > 0 && (
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <span className="font-bold text-slate-500 block">GSM / Thickness:</span>
                  <p className="text-navy-900 font-medium">{service.options.gsmOptions.join(', ')}</p>
                </div>
              )}

              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="font-bold text-slate-500 block">Finishing & Coating:</span>
                <p className="text-navy-900 font-medium">{service.options.finishingOptions.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/book?service=${service.slug}`}
              className="flex-1 py-3.5 px-6 bg-gradient-to-r from-brand-orange to-brand-red text-white text-center font-bold text-sm rounded-xl shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>{t('btnBookNow')}</span>
            </Link>

            <Link
              href={`/book?service=${service.slug}&type=quote`}
              className="flex-1 py-3.5 px-6 border-2 border-navy-900 text-navy-900 text-center font-bold text-sm rounded-xl hover:bg-navy-900 hover:text-white transition flex items-center justify-center gap-2"
            >
              <span>{t('btnRequestQuote')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Shop Pickup / Visit details */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-navy-900 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-orange" />
              <span>Available for Shop Pickup in Akola:</span>
            </p>
            <p>
              Guru Shree Graphics, Kunal Complex, Opp. Boys Zone, Jawahar Nagar Road, Shastri Nagar, Akola – 444001.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
