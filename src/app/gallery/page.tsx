'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { initialGallery, initialCategories } from '@/data/initialData';
import { Sparkles, ArrowRight, Printer } from 'lucide-react';

export default function GalleryPage() {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<string>('all');

  const filteredGallery =
    filter === 'all'
      ? initialGallery
      : initialGallery.filter((item) => item.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-brand-orange text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          <span>{language === 'mr' ? 'कामाचे नमुने' : 'Portfolio Showcase'}</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-navy-900 tracking-tight">
          {t('galleryHeading')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          {t('gallerySub')}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm ${
            filter === 'all'
              ? 'bg-navy-900 text-white'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Portfolio
        </button>
        <button
          onClick={() => setFilter('digital-printing')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm ${
            filter === 'digital-printing'
              ? 'bg-brand-orange text-white'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Flex & Vinyl
        </button>
        <button
          onClick={() => setFilter('wedding-and-event-printing')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm ${
            filter === 'wedding-and-event-printing'
              ? 'bg-brand-orange text-white'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Wedding Cards
        </button>
        <button
          onClick={() => setFilter('business-and-office-printing')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm ${
            filter === 'business-and-office-printing'
              ? 'bg-brand-orange text-white'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Visiting Cards & Stationery
        </button>
        <button
          onClick={() => setFilter('commercial-printing')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm ${
            filter === 'commercial-printing'
              ? 'bg-brand-orange text-white'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Commercial Brochures
        </button>
        <button
          onClick={() => setFilter('graphic-designing')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm ${
            filter === 'graphic-designing'
              ? 'bg-brand-orange text-white'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Branding & Logos
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
              <img
                src={item.image}
                alt={language === 'mr' ? item.titleMr : item.titleEn}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-orange bg-navy-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
                  {item.category.replace(/-/g, ' ')}
                </span>
                <h3 className="font-bold text-base mt-1">
                  {language === 'mr' ? item.titleMr : item.titleEn}
                </h3>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'mr' ? item.descriptionMr : item.descriptionEn}
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Akola Production</span>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange hover:text-brand-red transition"
                >
                  <span>Book Similar Job</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
