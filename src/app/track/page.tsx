'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/components/LanguageContext';
import { DataStore } from '@/lib/store';
import { Booking } from '@/types';
import { StatusTrackerStepper } from '@/components/StatusTrackerStepper';
import { OrderStatusBadge } from '@/components/OrderStatusBadge';
import { QuotationCard } from '@/components/QuotationCard';
import { PrintableJobCard } from '@/components/PrintableJobCard';
import { Search, Package, Printer, MapPin, AlertCircle, Calendar, Truck } from 'lucide-react';

function TrackContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');

  const [searchInput, setSearchInput] = useState(queryId || '');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [searched, setSearched] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  useEffect(() => {
    if (queryId) {
      handleSearch(queryId);
    }
  }, [queryId]);

  const handleSearch = (idToSearch?: string) => {
    const q = (idToSearch || searchInput).trim();
    if (!q) return;
    const found = DataStore.getBookingById(q);
    setBooking(found || null);
    setSearched(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Search Header */}
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 bg-red-100 text-brand-red text-xs font-bold uppercase rounded-full">
          Live Production Tracker
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-900">
          {t('trackBookingTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          {language === 'mr'
            ? 'आपला बुकिंग आयडी (उदा. GSG-2026-1001) किंवा नोंदणीकृत मोबाईल नंबर टाकून कामाची सद्यस्थिती तपासा.'
            : 'Enter your Booking ID or registered mobile number to see real-time status across all 14 workflow stages.'}
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto flex gap-2 pt-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="e.g. GSG-2026-1001 or 9822334455"
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
            />
          </div>
          <button
            onClick={() => handleSearch()}
            className="px-6 py-3 bg-navy-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-md"
          >
            {language === 'mr' ? 'शोधा' : 'Track'}
          </button>
        </div>
      </div>

      {/* Result Display */}
      {searched && (
        <>
          {booking ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Order Overview Header Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-wrap justify-between items-start gap-4 border-b pb-4">
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Booking ID</span>
                    <h2 className="text-2xl font-black text-navy-900 font-mono tracking-tight">
                      {booking.id}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Customer: <strong className="text-slate-800">{booking.customerName}</strong> ({booking.customerMobile})
                    </p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1.5">
                    <OrderStatusBadge status={booking.status} size="lg" />
                    <button
                      onClick={() => setShowPrintModal(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'जॉब कार्ड प्रिंट करा' : 'Print Receipt'}</span>
                    </button>
                  </div>
                </div>

                {/* Visual Stepper */}
                <StatusTrackerStepper
                  currentStatus={booking.status}
                  deliveryType={booking.deliveryType}
                />

                {/* Key Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500 block">Service & Quantity:</span>
                    <p className="font-bold text-navy-900 mt-0.5">
                      {booking.serviceName} ({booking.specs.quantity} units)
                    </p>
                    <p className="text-slate-500 mt-1">Specs: {booking.specs.size} | {booking.specs.paperType}</p>
                  </div>

                  <div>
                    <span className="text-slate-500 block">Fulfillment Method:</span>
                    <p className="font-bold text-navy-900 mt-0.5">
                      {booking.deliveryType === 'pickup' ? 'Shop Pickup (Kunal Complex)' : 'Home Delivery'}
                    </p>
                    <p className="text-slate-500 mt-1">
                      {booking.deliveryType === 'pickup'
                        ? 'Collect directly from shop counter'
                        : `Deliver to ${booking.deliveryAddress?.area || 'Akola'}`}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-500 block">Target Completion Date:</span>
                    <p className="font-bold text-brand-orange mt-0.5">
                      {booking.estimatedCompletionDate || 'Under Review by Shop'}
                    </p>
                    <p className="text-slate-500 mt-1">Booked on: {booking.createdAt}</p>
                  </div>
                </div>

                {/* Status Timeline History */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                    {language === 'mr' ? 'ऑर्डर प्रगती इतिहास (Timeline)' : 'Workflow Milestone Log'}
                  </h3>
                  <div className="space-y-2 border-l-2 border-slate-200 pl-4 ml-2">
                    {booking.statusHistory?.map((entry, idx) => (
                      <div key={idx} className="relative text-xs">
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-orange absolute -left-[21px] top-1" />
                        <span className="text-slate-400 font-mono text-[11px] block">{entry.timestamp}</span>
                        <strong className="text-navy-900 font-semibold">{entry.status.replace(/_/g, ' ').toUpperCase()}</strong>
                        {entry.note && <p className="text-slate-600 mt-0.5 italic">{entry.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quotation Details if available */}
                {booking.quotation && (
                  <div className="pt-4 border-t border-slate-200">
                    <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-3">
                      Quotation & Financial Summary
                    </h3>
                    <QuotationCard quotation={booking.quotation} readOnly={true} />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-navy-900">
                {language === 'mr' ? 'बुकिंग सापडले नाही' : 'No Booking Found'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {language === 'mr'
                  ? 'कृपया आपला अचूक बुकिंग आयडी किंवा १०-अंकी मोबाईल नंबर तपासा.'
                  : 'Please check your Booking ID (e.g. GSG-2026-1001) or mobile number.'}
              </p>
            </div>
          )}
        </>
      )}

      {/* Modal Printable Job Card */}
      {showPrintModal && booking && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <PrintableJobCard booking={booking} onClose={() => setShowPrintModal(false)} />
        </div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <React.Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }
    >
      <TrackContent />
    </React.Suspense>
  );
}
