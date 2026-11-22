'use client';

import React, { useState } from 'react';
import { Quotation } from '@/types';
import { useLanguage } from './LanguageContext';
import { Check, X, MessageSquare, AlertCircle, ShieldCheck } from 'lucide-react';

interface QuotationCardProps {
  quotation: Quotation;
  onApprove?: (quotationId: string) => void;
  onReject?: (quotationId: string) => void;
  onRequestChanges?: (quotationId: string, remarks: string) => void;
  readOnly?: boolean;
}

export const QuotationCard: React.FC<QuotationCardProps> = ({
  quotation,
  onApprove,
  onReject,
  onRequestChanges,
  readOnly = false,
}) => {
  const { language } = useLanguage();
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [remarks, setRemarks] = useState('');

  const statusColors = {
    draft: 'bg-slate-100 text-slate-700 border-slate-300',
    sent: 'bg-amber-100 text-amber-800 border-amber-300',
    approved: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    rejected: 'bg-red-100 text-red-800 border-red-300',
    changes_requested: 'bg-purple-100 text-purple-800 border-purple-300',
  };

  const statusLabels = {
    draft: { en: 'Draft', mr: 'मसुदा' },
    sent: { en: 'Awaiting Your Approval', mr: 'आपल्या मंजुरीची प्रतीक्षा' },
    approved: { en: 'Quotation Approved', mr: 'कोटेशन मंजूर झाले' },
    rejected: { en: 'Quotation Rejected', mr: 'कोटेशन नाकारले' },
    changes_requested: { en: 'Changes Requested', mr: 'बदलांची विनंती पाठवली' },
  };

  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-navy-900 text-white p-4 sm:p-5 flex flex-wrap justify-between items-center gap-3">
        <div>
          <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider">
            {language === 'mr' ? 'अधिकृत कोटेशन' : 'Official Quotation'}
          </span>
          <h3 className="text-lg font-bold">#{quotation.id}</h3>
          <p className="text-xs text-slate-300">
            {language === 'mr' ? 'बुकिंग संदर्भ:' : 'Booking Ref:'}{' '}
            <span className="font-semibold text-white">{quotation.bookingId}</span>
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${
            statusColors[quotation.status]
          }`}
        >
          {language === 'mr' ? statusLabels[quotation.status].mr : statusLabels[quotation.status].en}
        </span>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        {/* Important Disclaimer Banner */}
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-3.5 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 space-y-1">
            <p className="font-bold">
              {language === 'mr'
                ? 'महत्त्वाची सूचना: काम सुरू करण्यापूर्वी अंतिम दर गुरु श्री ग्राफिक्सकडून निश्चित केला जाईल.'
                : 'Final pricing will be confirmed by Guru Shree Graphics before starting the work.'}
            </p>
            <p className="text-amber-800">
              {language === 'mr'
                ? 'पेमेंट थेट दुकानात किंवा मालकाशी चर्चा करून केले जाईल. (कोणतेही ऑनलाइन पेमेंट आवश्यक नाही).'
                : 'Payment will be arranged directly with the shop. No online payment required.'}
            </p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                <th className="py-2.5 px-3">{language === 'mr' ? 'तपशील' : 'Description'}</th>
                <th className="py-2.5 px-3 text-center">{language === 'mr' ? 'संख्या' : 'Qty'}</th>
                <th className="py-2.5 px-3 text-right">{language === 'mr' ? 'दर (₹)' : 'Rate (₹)'}</th>
                <th className="py-2.5 px-3 text-right">{language === 'mr' ? 'रक्कम (₹)' : 'Amount (₹)'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quotation.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-medium text-navy-900">{item.description}</td>
                  <td className="py-3 px-3 text-center text-slate-600">{item.quantity}</td>
                  <td className="py-3 px-3 text-right text-slate-600">₹{item.rate.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3 text-right font-semibold text-navy-900">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Charge Breakdown */}
        <div className="border-t border-slate-200 pt-4 space-y-2 text-xs sm:text-sm">
          {quotation.designCharges > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>{language === 'mr' ? 'डिझाइन आणि प्री-प्रेस शुल्क' : 'Design & Pre-press Charges'}</span>
              <span>₹{quotation.designCharges.toLocaleString('en-IN')}</span>
            </div>
          )}
          {quotation.materialCharges > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>{language === 'mr' ? 'कागद / मटेरियल शुल्क' : 'Material Charges'}</span>
              <span>₹{quotation.materialCharges.toLocaleString('en-IN')}</span>
            </div>
          )}
          {quotation.printingCharges > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>{language === 'mr' ? 'प्रिंटिंग प्रक्रिया शुल्क' : 'Printing Charges'}</span>
              <span>₹{quotation.printingCharges.toLocaleString('en-IN')}</span>
            </div>
          )}
          {quotation.deliveryCharges > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>{language === 'mr' ? 'डिलिव्हरी शुल्क' : 'Delivery Charges'}</span>
              <span>₹{quotation.deliveryCharges.toLocaleString('en-IN')}</span>
            </div>
          )}
          {quotation.discount > 0 && (
            <div className="flex justify-between text-emerald-600 font-medium">
              <span>{language === 'mr' ? 'सूट (Discount)' : 'Special Discount'}</span>
              <span>-₹{quotation.discount.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className="flex justify-between items-center border-t-2 border-navy-900 pt-3 text-base sm:text-lg font-black text-navy-900">
            <span>{language === 'mr' ? 'एकूण अंदाजे रक्कम' : 'Total Estimated'}</span>
            <span className="text-brand-orange text-xl sm:text-2xl">
              ₹{quotation.total.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Notes */}
        {quotation.notes && (
          <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600">
            <span className="font-semibold text-slate-800">
              {language === 'mr' ? 'दुकानदाराची नोंद:' : 'Owner Note:'}{' '}
            </span>
            {quotation.notes}
          </div>
        )}

        {/* Action Buttons for Customer */}
        {!readOnly && quotation.status === 'sent' && (
          <div className="pt-2 flex flex-wrap gap-2.5 justify-end">
            <button
              onClick={() => setShowRevisionModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <MessageSquare className="w-4 h-4 text-purple-600" />
              {language === 'mr' ? 'बदलांची विनंती करा' : 'Request Changes'}
            </button>
            {onReject && (
              <button
                onClick={() => onReject(quotation.id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-red-200 text-red-600 rounded-xl text-xs sm:text-sm font-semibold hover:bg-red-50 transition"
              >
                <X className="w-4 h-4" />
                {language === 'mr' ? 'नाकारा' : 'Reject'}
              </button>
            )}
            {onApprove && (
              <button
                onClick={() => onApprove(quotation.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-emerald-700 transition shadow-sm"
              >
                <Check className="w-4 h-4" />
                {language === 'mr' ? 'कोटेशन मंजूर करा' : 'Approve Quotation'}
              </button>
            )}
          </div>
        )}

        {/* If already approved */}
        {quotation.status === 'approved' && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>
              {language === 'mr'
                ? 'कोटेशन मंजूर झाले आहे. आपले काम लवकरच सुरू केले जाईल.'
                : 'Quotation approved! Your order has been scheduled for production.'}
            </span>
          </div>
        )}
      </div>

      {/* Revision Modal */}
      {showRevisionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h4 className="text-base font-bold text-navy-900">
              {language === 'mr' ? 'कोटेशनमध्ये काय बदल हवे आहेत?' : 'What changes do you require?'}
            </h4>
            <p className="text-xs text-slate-500">
              {language === 'mr'
                ? 'आपण साईज, कागद, प्रमाण किंवा डिझाइनसंबंधी सूचना लिहू शकता.'
                : 'Explain any adjustments to quantity, size, material, or budget.'}
            </p>
            <textarea
              rows={4}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="e.g. Please reduce quantity to 500 or use 300 GSM art card..."
              className="w-full text-sm p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-orange focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRevisionModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                {language === 'mr' ? 'रद्द करा' : 'Cancel'}
              </button>
              <button
                onClick={() => {
                  if (onRequestChanges && remarks.trim()) {
                    onRequestChanges(quotation.id, remarks.trim());
                    setShowRevisionModal(false);
                  }
                }}
                disabled={!remarks.trim()}
                className="px-4 py-2 bg-brand-orange text-white rounded-xl text-xs font-bold hover:bg-brand-orange-dark disabled:opacity-50"
              >
                {language === 'mr' ? 'विनंती पाठवा' : 'Send Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
