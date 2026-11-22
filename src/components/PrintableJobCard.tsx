'use client';

import React from 'react';
import { Booking } from '@/types';
import { useLanguage } from './LanguageContext';
import { statusTranslations } from '@/data/translations';
import { Printer, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface PrintableJobCardProps {
  booking: Booking;
  onClose?: () => void;
}

export const PrintableJobCard: React.FC<PrintableJobCardProps> = ({ booking, onClose }) => {
  const { language } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  const statusInfo = statusTranslations[booking.status] || {
    en: booking.status,
    mr: booking.status,
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-3xl w-full mx-auto overflow-hidden print:m-0 print:border-none print:shadow-none">
      {/* Action Bar (hidden when printing) */}
      <div className="bg-slate-100 border-b border-slate-200 p-3.5 flex justify-between items-center print:hidden">
        <span className="text-xs font-bold text-slate-700">
          {language === 'mr' ? 'प्रिंटिंग जॉब कार्ड व पावती' : 'Printable Job Card & Receipt'}
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            {language === 'mr' ? 'प्रिंट करा / PDF सेव्ह करा' : 'Print / Save PDF'}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-200"
            >
              {language === 'mr' ? 'बंद करा' : 'Close'}
            </button>
          )}
        </div>
      </div>

      {/* Main Printable Content */}
      <div className="p-6 sm:p-8 space-y-6 text-navy-900 text-sm">
        {/* Business Header */}
        <div className="border-b-2 border-navy-900 pb-5 flex flex-wrap justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-navy-900">
              Guru Shree <span className="text-brand-orange">Graphics</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Printing, Graphic Designing & Digital Printing
            </p>
            <div className="mt-2 text-xs text-slate-600 space-y-0.5">
              <p className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                <span>Kunal Complex, Opp. Boys Zone, Jawahar Nagar Road, Shastri Nagar, Akola – 444001, Maharashtra, India.</span>
              </p>
              <p className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                <span>+91 86688 16001 (Call & WhatsApp)</span>
              </p>
              <p className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                <span>contact@gurushreegraphics.com</span>
              </p>
            </div>
          </div>

          <div className="text-right sm:border-l sm:pl-6 border-slate-200">
            <span className="inline-block px-2.5 py-0.5 bg-brand-orange/10 text-brand-orange text-xs font-extrabold uppercase rounded">
              Official Booking Receipt
            </span>
            <h2 className="text-xl font-black text-navy-900 mt-1">{booking.id}</h2>
            <p className="text-xs text-slate-500">Date: {booking.createdAt}</p>
            <div className="mt-2">
              <span className="text-xs font-bold uppercase px-2 py-0.5 bg-slate-100 rounded border">
                {language === 'mr' ? statusInfo.mr : statusInfo.en}
              </span>
            </div>
          </div>
        </div>

        {/* Customer & Fulfillment Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Customer Details
            </h3>
            <p className="font-bold text-navy-900">{booking.customerName}</p>
            <p className="text-xs text-slate-600">Mobile: {booking.customerMobile}</p>
            {booking.customerEmail && (
              <p className="text-xs text-slate-600">Email: {booking.customerEmail}</p>
            )}
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Fulfillment Method
            </h3>
            {booking.deliveryType === 'pickup' ? (
              <div>
                <p className="font-bold text-emerald-700">Shop Pickup (Free)</p>
                <p className="text-xs text-slate-600">Guru Shree Graphics Shop Counter</p>
                <p className="text-xs text-slate-500">Kunal Complex, Jawahar Nagar Road, Akola</p>
              </div>
            ) : (
              <div>
                <p className="font-bold text-sky-700">Home / Business Delivery</p>
                <p className="text-xs text-slate-600">
                  {booking.deliveryAddress?.houseNo}, {booking.deliveryAddress?.area},{' '}
                  {booking.deliveryAddress?.city} - {booking.deliveryAddress?.pincode}
                </p>
              </div>
            )}
            {booking.estimatedCompletionDate && (
              <p className="text-xs text-slate-700 font-semibold mt-1">
                Target Date: {booking.estimatedCompletionDate}
              </p>
            )}
          </div>
        </div>

        {/* Technical Job Specifications */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Technical Job Specifications
          </h3>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold text-slate-500 w-1/3">Service Name</td>
                  <td className="py-2 px-3 font-bold text-navy-900">{booking.serviceName}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-slate-500">Dimensions / Size</td>
                  <td className="py-2 px-3 text-navy-900">
                    {booking.specs.size}{' '}
                    {booking.specs.customDimensions ? `(${booking.specs.customDimensions})` : ''}
                  </td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold text-slate-500">Material / Paper</td>
                  <td className="py-2 px-3 text-navy-900">
                    {booking.specs.paperType} {booking.specs.gsm ? `| ${booking.specs.gsm}` : ''}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-slate-500">Color & Sides</td>
                  <td className="py-2 px-3 text-navy-900 capitalize">
                    {booking.specs.printColor === 'color' ? 'Full Color (CMYK)' : 'Black & White'} |{' '}
                    {booking.specs.printSides === 'double' ? 'Double Sided' : 'Single Sided'}
                  </td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold text-slate-500">Quantity</td>
                  <td className="py-2 px-3 font-bold text-navy-900">{booking.specs.quantity}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-slate-500">Finishing Options</td>
                  <td className="py-2 px-3 text-navy-900">{booking.specs.finishing || 'Standard'}</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="py-2 px-3 font-semibold text-slate-500">Artwork Status</td>
                  <td className="py-2 px-3 text-navy-900">
                    {booking.designOption === 'have_design'
                      ? 'Provided by Customer'
                      : 'Design by Guru Shree Graphics Team'}
                  </td>
                </tr>
                {booking.specs.specialInstructions && (
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-500">Customer Instructions</td>
                    <td className="py-2 px-3 text-navy-900 italic">
                      "{booking.specs.specialInstructions}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing / Quotation Section */}
        {booking.quotation && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Payment & Charge Summary
            </h3>
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span>Material & Printing Charges</span>
                <span className="font-semibold">
                  ₹{(booking.quotation.materialCharges + booking.quotation.printingCharges).toLocaleString('en-IN')}
                </span>
              </div>
              {booking.quotation.designCharges > 0 && (
                <div className="flex justify-between">
                  <span>Graphic Design Charges</span>
                  <span className="font-semibold">₹{booking.quotation.designCharges.toLocaleString('en-IN')}</span>
                </div>
              )}
              {booking.quotation.deliveryCharges > 0 && (
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-semibold">₹{booking.quotation.deliveryCharges.toLocaleString('en-IN')}</span>
                </div>
              )}
              {booking.quotation.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount</span>
                  <span>-₹{booking.quotation.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-300 pt-2 text-sm font-bold text-navy-900">
                <span>Total Amount</span>
                <span className="text-brand-orange text-base">₹{booking.quotation.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Mandatory Policy Notice */}
        <div className="border-t border-slate-200 pt-4 text-xs text-slate-500 space-y-1 text-center">
          <p className="font-bold text-navy-900">
            * PAYMENT POLICY: Payment will be arranged directly with the shop (Cash / Shop UPI / Offline).
          </p>
          <p>
            * Final pricing will be confirmed by Guru Shree Graphics before starting the work.
          </p>
          <p className="text-[11px] text-slate-400">
            Thank you for choosing Guru Shree Graphics, Akola! For any inquiry, please quote Booking ID #{booking.id}.
          </p>
        </div>
      </div>
    </div>
  );
};
