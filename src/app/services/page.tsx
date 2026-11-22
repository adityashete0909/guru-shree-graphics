'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { initialCategories, initialServices } from '@/data/initialData';
import { Search, Sparkles, ArrowRight, Printer, CheckCircle, HelpCircle } from 'lucide-react';

export default function ServicesPage() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = initialServices.filter((s) => {
    const matchesCategory = selectedCategory === 'all' || s.categoryId === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      s.nameEn.toLowerCase().includes(query) ||
      s.nameMr.toLowerCase().includes(query) ||
      s.descriptionEn.toLowerCase().includes(query) ||
      s.descriptionMr.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Title & Search Bar */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-brand-orange text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          <span>{language === 'mr' ? 'सर्व प्रिंटिंग सोल्यूशन्स' : '40+ Commercial & Digital Services'}</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-navy-900 tracking-tight">
          {t('allServicesHeading')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          {t('allServicesSub')}
        </p>

        {/* Live Search Input */}
        <div className="relative max-w-md mx-auto pt-2">
          <Search className="absolute left-3.5 top-5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'mr'
                ? 'सेवा शोधा (उदा. Flex, Visiting Card, लग्नपत्रिका)...'
                : 'Search services (e.g. Flex, Visiting Card, Bill Book)...'
            }
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-brand-orange focus:outline-none text-sm text-navy-900"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 pb-2">
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

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
          <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-navy-900">
            {language === 'mr' ? 'कोणतीही सेवा आढळली नाही' : 'No printing services found'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'mr'
              ? 'कृपया दुसरा शब्द टाईप करून शोधा किंवा कस्टम प्रोजेक्टची विनंती करा.'
              : 'Try a different search keyword or submit a custom project enquiry.'}
          </p>
          <Link
            href="/custom-design"
            className="mt-4 inline-block px-4 py-2 bg-brand-orange text-white text-xs font-bold rounded-xl"
          >
            {t('btnCustomDesign')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm service-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-100">
                  <img
                    src={service.image}
                    alt={language === 'mr' ? service.nameMr : service.nameEn}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-navy-900/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                    {service.startingPrice
                      ? `Starting ₹${service.startingPrice}`
                      : 'Quotation on Request'}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-navy-900">
                    {language === 'mr' ? service.nameMr : service.nameEn}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {language === 'mr' ? service.descriptionMr : service.descriptionEn}
                  </p>

                  {/* Specifications Snapshot */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div>
                      <strong className="text-navy-900">
                        {language === 'mr' ? 'आकार (Sizes):' : 'Available Sizes:'}
                      </strong>{' '}
                      {service.options.sizes.slice(0, 2).join(', ')}
                    </div>
                    <div>
                      <strong className="text-navy-900">
                        {language === 'mr' ? 'मटेरियल:' : 'Paper / Media:'}
                      </strong>{' '}
                      {service.options.paperTypes.slice(0, 2).join(', ')}
                    </div>
                    {service.options.gsmOptions.length > 0 && (
                      <div>
                        <strong className="text-navy-900">GSM / Grade:</strong>{' '}
                        {service.options.gsmOptions.slice(0, 2).join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/book?service=${service.slug}`}
                    className="py-2.5 px-3 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold rounded-xl text-center shadow-md hover:brightness-110 transition"
                  >
                    {t('btnBookNow')}
                  </Link>
                  <Link
                    href={`/services/${service.slug}`}
                    className="py-2.5 px-3 border border-slate-300 text-navy-900 text-xs font-bold rounded-xl text-center hover:bg-slate-50 transition"
                  >
                    {language === 'mr' ? 'तपशील पहा' : 'Full Details'}
                  </Link>
                </div>

                <Link
                  href={`/book?service=${service.slug}&type=quote`}
                  className="block text-center text-xs font-semibold text-slate-500 hover:text-brand-orange transition py-1"
                >
                  {t('btnRequestQuote')} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
