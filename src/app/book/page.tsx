'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { useAuth } from '@/components/AuthContext';
import { initialServices, initialCategories } from '@/data/initialData';
import { DataStore } from '@/lib/store';
import { Booking, BookingSpecs, HomeDeliveryAddress, UploadedFileInfo } from '@/types';
import {
  Printer,
  ShieldCheck,
  Upload,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Truck,
  Package,
  AlertCircle,
  FileText,
  Palette,
  ArrowRight,
  ArrowLeft,
  X,
} from 'lucide-react';

function BookingContent() {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedServiceSlug = searchParams.get('service');

  // Step Tracker
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submittedBooking, setSubmittedBooking] = useState<Booking | null>(null);

  // Form State
  const defaultService = initialServices.find((s) => s.slug === preSelectedServiceSlug) || initialServices[0];
  const [selectedServiceId, setSelectedServiceId] = useState<string>(defaultService.id);
  const activeService = initialServices.find((s) => s.id === selectedServiceId) || initialServices[0];

  // Technical Specs
  const [size, setSize] = useState<string>(activeService.options.sizes[0] || 'Standard');
  const [customDimensions, setCustomDimensions] = useState<string>('');
  const [paperType, setPaperType] = useState<string>(activeService.options.paperTypes[0] || 'Standard');
  const [gsm, setGsm] = useState<string>(activeService.options.gsmOptions[0] || '');
  const [printColor, setPrintColor] = useState<'color' | 'bw'>('color');
  const [printSides, setPrintSides] = useState<'single' | 'double'>('single');
  const [quantity, setQuantity] = useState<number>(100);
  const [finishing, setFinishing] = useState<string>(activeService.options.finishingOptions[0] || 'None');
  const [requiredDate, setRequiredDate] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Design Choice
  const [designOption, setDesignOption] = useState<'have_design' | 'need_design'>('have_design');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileInfo[]>([]);
  const [designBrief, setDesignBrief] = useState({
    details: '',
    colorPreferences: '',
    textContent: '',
  });

  // Fulfillment Choice
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState<HomeDeliveryAddress>({
    customerName: user?.fullName || '',
    mobile: user?.mobile || '',
    houseNo: '',
    area: '',
    city: 'Akola',
    state: 'Maharashtra',
    pincode: '444001',
    deliveryInstructions: '',
  });

  // Customer Contact if not logged in
  const [customerName, setCustomerName] = useState(user?.fullName || '');
  const [customerMobile, setCustomerMobile] = useState(user?.mobile || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');

  // Sync when service changes
  useEffect(() => {
    if (activeService) {
      setSize(activeService.options.sizes[0] || 'Standard');
      setPaperType(activeService.options.paperTypes[0] || 'Standard');
      setGsm(activeService.options.gsmOptions[0] || '');
      setFinishing(activeService.options.finishingOptions[0] || 'None');
    }
  }, [selectedServiceId]);

  // Set default required date to 3 days in advance
  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    setRequiredDate(d.toISOString().split('T')[0]);
  }, []);

  // Update contact when user context loads
  useEffect(() => {
    if (user) {
      setCustomerName(user.fullName);
      setCustomerMobile(user.mobile);
      setCustomerEmail(user.email);
      setDeliveryAddress((prev) => ({
        ...prev,
        customerName: user.fullName,
        mobile: user.mobile,
      }));
    }
  }, [user]);

  // Handle mock file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newFile: UploadedFileInfo = {
        id: `f-${Date.now()}`,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        url: '#',
        uploadedAt: new Date().toLocaleTimeString(),
      };
      setUploadedFiles((prev) => [...prev, newFile]);
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Submit Booking
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const bookingId = DataStore.generateBookingId();
    const customerId = user?.id || `guest-${Date.now()}`;

    const newBooking: Booking = {
      id: bookingId,
      customerId,
      customerName: customerName.trim() || 'Valued Customer',
      customerEmail: customerEmail.trim() || 'customer@akola.in',
      customerMobile: customerMobile.trim() || '8668816001',
      serviceId: activeService.id,
      serviceName: language === 'mr' ? activeService.nameMr : activeService.nameEn,
      categoryName: activeService.categoryId,
      deliveryType,
      deliveryAddress: deliveryType === 'delivery' ? deliveryAddress : undefined,
      pickupLocation:
        'Kunal Complex, Opp. Boys Zone, Jawahar Nagar Road, Shastri Nagar, Akola – 444001',
      specs: {
        size,
        customDimensions: customDimensions.trim() || undefined,
        paperType,
        gsm: gsm || undefined,
        printColor,
        printSides,
        quantity: Number(quantity) || 1,
        finishing,
        requiredDate,
        specialInstructions: specialInstructions.trim() || undefined,
      },
      designOption,
      uploadedFiles,
      designBrief: designOption === 'need_design' ? designBrief : undefined,
      status: 'booking_received',
      statusHistory: [
        {
          status: 'booking_received',
          timestamp: new Date().toLocaleString(),
          note: 'Booking submitted online. No payment required upfront.',
        },
      ],
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };

    DataStore.createBooking(newBooking);
    setSubmittedBooking(newBooking);
  };

  // SUCCESS CONFIRMATION SCREEN
  if (submittedBooking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
            {language === 'mr' ? 'बुकिंग यशस्वीरीत्या प्राप्त झाली' : 'Booking Received Successfully'}
          </span>
          <h1 className="text-3xl font-black text-navy-900">
            {language === 'mr' ? 'आपल्या प्रिंटिंग ऑर्डरची नोंद झाली!' : 'Order Placed with Guru Shree Graphics!'}
          </h1>
          <p className="text-sm text-slate-600">
            {language === 'mr'
              ? 'आपला युनिक बुकिंग आयडी खालीलप्रमाणे आहे. आपण या आयडीद्वारे आपल्या ऑर्डरची प्रगती ट्रॅक करू शकता.'
              : 'Your booking has been received by our shop team. Quote your Booking ID for inquiries.'}
          </p>
        </div>

        {/* Booking ID Highlight */}
        <div className="bg-slate-50 border-2 border-brand-orange/40 rounded-2xl p-6 max-w-md mx-auto space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            {language === 'mr' ? 'बुकिंग संदर्भ क्रमांक:' : 'Unique Booking ID:'}
          </span>
          <div className="text-3xl font-black text-navy-900 tracking-wide font-mono">
            {submittedBooking.id}
          </div>
          <p className="text-xs text-slate-500">
            Service: <strong>{submittedBooking.serviceName}</strong> (Qty: {submittedBooking.specs.quantity})
          </p>
        </div>

        {/* Mandatory Policy Confirmation Banner */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 max-w-xl mx-auto text-left flex items-start gap-3.5">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 space-y-1">
            <h4 className="font-bold text-sm">
              {language === 'mr'
                ? 'पेमेंट माहिती: कोणतेही ऑनलाइन पेमेंट घेतलेले नाही.'
                : 'Payment Notice: No online payment processed.'}
            </h4>
            <p>
              {language === 'mr'
                ? 'पेमेंट थेट दुकानात किंवा मालकाशी चर्चा करून केले जाईल. काम सुरू करण्यापूर्वी अंतिम दर गुरु श्री ग्राफिक्सकडून निश्चित केला जाईल.'
                : 'Payment will be arranged directly with the shop. Final pricing will be confirmed by Guru Shree Graphics before starting the work.'}
            </p>
          </div>
        </div>

        {/* Shop Pickup / Delivery Summary */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 max-w-xl mx-auto text-left text-xs text-slate-700 space-y-2">
          <div className="font-bold text-navy-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-orange" />
            <span>
              {submittedBooking.deliveryType === 'pickup'
                ? 'Shop Pickup Address:'
                : 'Home Delivery Address:'}
            </span>
          </div>
          {submittedBooking.deliveryType === 'pickup' ? (
            <p className="pl-6 text-slate-600">
              Guru Shree Graphics, Kunal Complex, Opp. Boys Zone, Jawahar Nagar Road, Shastri Nagar, Akola – 444001, Maharashtra, India.
              <br />
              <span className="text-slate-500">Business Hours: Mon-Sat 9:30 AM – 9:00 PM</span>
            </p>
          ) : (
            <p className="pl-6 text-slate-600">
              {submittedBooking.deliveryAddress?.customerName}, {submittedBooking.deliveryAddress?.houseNo},{' '}
              {submittedBooking.deliveryAddress?.area}, {submittedBooking.deliveryAddress?.city} -{' '}
              {submittedBooking.deliveryAddress?.pincode}
            </p>
          )}
        </div>

        {/* Action CTAs */}
        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Link
            href={`/track?id=${submittedBooking.id}`}
            className="px-6 py-3 bg-navy-900 text-white text-xs font-bold rounded-xl shadow-md hover:bg-slate-800 transition"
          >
            {t('btnTrackBooking')}
          </Link>

          <Link
            href="/customer/dashboard"
            className="px-6 py-3 bg-slate-100 text-navy-900 text-xs font-bold rounded-xl hover:bg-slate-200 transition"
          >
            {language === 'mr' ? 'ग्राहक डॅशबोर्डवर जा' : 'Go to Customer Portal'}
          </Link>

          <Link
            href="/"
            className="px-6 py-3 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition"
          >
            {language === 'mr' ? 'मुख्यपृष्ठावर जा' : 'Return Home'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 bg-orange-100 text-brand-orange text-xs font-bold uppercase rounded-full">
          {language === 'mr' ? 'अद्ययावत बुकिंग प्रणाली' : 'Advanced Booking System'}
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-navy-900">
          {t('bookingFormTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          {language === 'mr'
            ? 'आपल्या गरजा निवडा. आम्ही तात्काळ कोटेशन तयार करू. काम सुरू होईपर्यंत कोणतेही पैसे भरावे लागत नाहीत.'
            : 'Configure your print specifications, upload artwork, and receive an itemized quotation.'}
        </p>

        {/* Clear No Payment Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold mt-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{t('noOnlinePaymentText')}</span>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="grid grid-cols-4 gap-2 bg-slate-100 p-1.5 rounded-2xl max-w-3xl mx-auto text-xs font-bold text-center">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className={`py-2.5 rounded-xl transition ${
            currentStep === 1
              ? 'bg-navy-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-navy-900'
          }`}
        >
          {t('step1Service')}
        </button>
        <button
          type="button"
          onClick={() => setCurrentStep(2)}
          className={`py-2.5 rounded-xl transition ${
            currentStep === 2
              ? 'bg-navy-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-navy-900'
          }`}
        >
          {t('step2Design')}
        </button>
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className={`py-2.5 rounded-xl transition ${
            currentStep === 3
              ? 'bg-navy-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-navy-900'
          }`}
        >
          {t('step3Fulfillment')}
        </button>
        <button
          type="button"
          onClick={() => setCurrentStep(4)}
          className={`py-2.5 rounded-xl transition ${
            currentStep === 4
              ? 'bg-navy-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-navy-900'
          }`}
        >
          {t('step4Review')}
        </button>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmitBooking} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
        {/* STEP 1: SERVICE & SPECS */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-navy-900 border-b pb-3 flex items-center gap-2">
              <Printer className="w-5 h-5 text-brand-orange" />
              <span>Step 1: Choose Service & Technical Specifications</span>
            </h2>

            {/* Service Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">
                {language === 'mr' ? 'प्रिंटिंग सेवा निवडा *' : 'Select Printing Service *'}
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
              >
                {initialServices.map((s) => (
                  <option key={s.id} value={s.id}>
                    {language === 'mr' ? s.nameMr : s.nameEn}{' '}
                    {s.startingPrice ? `(Starting ₹${s.startingPrice})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Dimensions & Custom Sizes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  {t('size')} *
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
                >
                  {activeService.options.sizes.map((sz, idx) => (
                    <option key={idx} value={sz}>{sz}</option>
                  ))}
                  <option value="Custom Dimensions">Custom Dimensions (Enter below)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  {t('customSize')}
                </label>
                <input
                  type="text"
                  value={customDimensions}
                  onChange={(e) => setCustomDimensions(e.target.value)}
                  placeholder="e.g. 10 ft width x 4 ft height or 210 x 297 mm"
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>
            </div>

            {/* Material & GSM */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  {t('paperType')} *
                </label>
                <select
                  value={paperType}
                  onChange={(e) => setPaperType(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
                >
                  {activeService.options.paperTypes.map((pt, idx) => (
                    <option key={idx} value={pt}>{pt}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  {t('gsm')}
                </label>
                <select
                  value={gsm}
                  onChange={(e) => setGsm(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
                >
                  {activeService.options.gsmOptions.length > 0 ? (
                    activeService.options.gsmOptions.map((g, idx) => (
                      <option key={idx} value={g}>{g}</option>
                    ))
                  ) : (
                    <option value="Standard Weight">Standard Industry Grade</option>
                  )}
                </select>
              </div>
            </div>

            {/* Print Color, Sides & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Color Mode *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPrintColor('color')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                      printColor === 'color'
                        ? 'bg-brand-orange text-white border-brand-orange'
                        : 'bg-slate-50 text-slate-700 border-slate-300'
                    }`}
                  >
                    Color (CMYK)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrintColor('bw')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                      printColor === 'bw'
                        ? 'bg-navy-900 text-white border-navy-900'
                        : 'bg-slate-50 text-slate-700 border-slate-300'
                    }`}
                  >
                    Black & White
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Printing Sides *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPrintSides('single')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                      printSides === 'single'
                        ? 'bg-navy-900 text-white border-navy-900'
                        : 'bg-slate-50 text-slate-700 border-slate-300'
                    }`}
                  >
                    Single Side
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrintSides('double')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                      printSides === 'double'
                        ? 'bg-navy-900 text-white border-navy-900'
                        : 'bg-slate-50 text-slate-700 border-slate-300'
                    }`}
                  >
                    Double Side
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  {t('quantity')} *
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>
            </div>

            {/* Finishing & Required Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  {t('finishing')}
                </label>
                <select
                  value={finishing}
                  onChange={(e) => setFinishing(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
                >
                  {activeService.options.finishingOptions.map((f, idx) => (
                    <option key={idx} value={f}>{f}</option>
                  ))}
                  <option value="None / Standard Cut">None / Standard Cut</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  {t('requiredDate')} *
                </label>
                <input
                  type="date"
                  value={requiredDate}
                  onChange={(e) => setRequiredDate(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">
                {t('specialInstructions')}
              </label>
              <textarea
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Mention any specific color requirements, perforation, folding, or urgency..."
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
              >
                <span>Continue to Artwork & Design</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: ARTWORK & DESIGN */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-navy-900 border-b pb-3 flex items-center gap-2">
              <Palette className="w-5 h-5 text-brand-orange" />
              <span>Step 2: Artwork & Design Preferences</span>
            </h2>

            {/* Design Option Radio Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setDesignOption('have_design')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition ${
                  designOption === 'have_design'
                    ? 'border-brand-orange bg-orange-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm text-navy-900 mb-1">
                  <input
                    type="radio"
                    name="designOption"
                    checked={designOption === 'have_design'}
                    onChange={() => setDesignOption('have_design')}
                    className="text-brand-orange"
                  />
                  <span>1. {t('designOptionOwn')}</span>
                </div>
                <p className="text-xs text-slate-500 pl-5">
                  I will upload my ready-to-print artwork file (PDF, CDR, PSD, AI, JPG, PNG).
                </p>
              </div>

              <div
                onClick={() => setDesignOption('need_design')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition ${
                  designOption === 'need_design'
                    ? 'border-brand-orange bg-orange-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm text-navy-900 mb-1">
                  <input
                    type="radio"
                    name="designOption"
                    checked={designOption === 'need_design'}
                    onChange={() => setDesignOption('need_design')}
                    className="text-brand-orange"
                  />
                  <span>2. {t('designOptionNeed')}</span>
                </div>
                <p className="text-xs text-slate-500 pl-5">
                  Guru Shree Graphics designers will create custom artwork and share digital proofs.
                </p>
              </div>
            </div>

            {/* If Customer has design -> File Upload */}
            {designOption === 'have_design' && (
              <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <label className="text-xs font-bold text-navy-900 block uppercase">
                  {t('uploadFileLabel')}
                </label>

                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-brand-orange transition bg-white">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-600 mb-1">
                    Drag and drop your print files here, or click below
                  </p>
                  <p className="text-[11px] text-slate-400 mb-3">
                    Supported: CDR, PDF, PSD, AI, EPS, JPG, PNG (Max 50MB)
                  </p>
                  <label className="inline-block px-4 py-2 bg-navy-900 text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-slate-800 transition">
                    Browse File
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.cdr,.psd,.ai,.jpg,.jpeg,.png,.eps"
                    />
                  </label>
                </div>

                {/* Uploaded File List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-slate-600">Attached Artwork:</span>
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-brand-orange" />
                          <span className="font-semibold text-navy-900">{file.name}</span>
                          <span className="text-slate-400">({file.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* If Customer needs design -> Brief Fields */}
            {designOption === 'need_design' && (
              <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-900 uppercase">
                    Text / Content to Print *
                  </label>
                  <textarea
                    rows={3}
                    value={designBrief.textContent}
                    onChange={(e) =>
                      setDesignBrief({ ...designBrief, textContent: e.target.value })
                    }
                    placeholder="Enter business name, address, contact numbers, slogans, or wedding couple names..."
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-900 uppercase">
                    Preferred Colors & Style
                  </label>
                  <input
                    type="text"
                    value={designBrief.colorPreferences}
                    onChange={(e) =>
                      setDesignBrief({ ...designBrief, colorPreferences: e.target.value })
                    }
                    placeholder="e.g. Royal Navy & Gold, Red & Yellow haldi theme, Minimalist white..."
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-900 uppercase">
                    Design Instructions / References
                  </label>
                  <textarea
                    rows={2}
                    value={designBrief.details}
                    onChange={(e) =>
                      setDesignBrief({ ...designBrief, details: e.target.value })
                    }
                    placeholder="Explain layout expectations, Marathi or English fonts, logo placement..."
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
              >
                <span>Continue to Pickup / Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PICKUP OR HOME DELIVERY */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-navy-900 border-b pb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-brand-orange" />
              <span>Step 3: Choose Shop Pickup or Home Delivery</span>
            </h2>

            {/* Fulfillment Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setDeliveryType('pickup')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition ${
                  deliveryType === 'pickup'
                    ? 'border-brand-orange bg-orange-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm text-navy-900 mb-1">
                  <input
                    type="radio"
                    name="deliveryType"
                    checked={deliveryType === 'pickup'}
                    onChange={() => setDeliveryType('pickup')}
                    className="text-brand-orange"
                  />
                  <span>{t('shopPickup')}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-black ml-auto">
                    FREE
                  </span>
                </div>
                <p className="text-xs text-slate-500 pl-5 leading-relaxed">
                  {t('shopPickupDesc')}
                </p>
              </div>

              <div
                onClick={() => setDeliveryType('delivery')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition ${
                  deliveryType === 'delivery'
                    ? 'border-brand-orange bg-orange-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm text-navy-900 mb-1">
                  <input
                    type="radio"
                    name="deliveryType"
                    checked={deliveryType === 'delivery'}
                    onChange={() => setDeliveryType('delivery')}
                    className="text-brand-orange"
                  />
                  <span>{t('homeDelivery')}</span>
                </div>
                <p className="text-xs text-slate-500 pl-5 leading-relaxed">
                  {t('homeDeliveryDesc')}
                </p>
              </div>
            </div>

            {/* Shop Pickup Details Card */}
            {deliveryType === 'pickup' && (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-navy-900 font-bold text-sm">
                  <MapPin className="w-4 h-4 text-brand-orange" />
                  <span>Physical Shop Address for Pickup:</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium pl-6">
                  Guru Shree Graphics
                  <br />
                  Kunal Complex, Opp. Boys Zone, Jawahar Nagar Road, Shastri Nagar, Akola – 444001, Maharashtra, India.
                </p>
                <div className="text-xs text-slate-500 pl-6 space-y-1">
                  <p>• <strong>Business Hours:</strong> Mon - Sat: 9:30 AM – 9:00 PM | Sun: 10:00 AM – 2:00 PM</p>
                  <p>• You will receive an SMS/WhatsApp notification the moment your print passes quality inspection.</p>
                </div>
              </div>
            )}

            {/* Home Delivery Form */}
            {deliveryType === 'delivery' && (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <span className="text-xs font-bold text-navy-900 uppercase block">
                  Delivery Address Details in Akola
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Contact Name *</label>
                    <input
                      type="text"
                      value={deliveryAddress.customerName}
                      onChange={(e) =>
                        setDeliveryAddress({ ...deliveryAddress, customerName: e.target.value })
                      }
                      placeholder="Receiver name"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-navy-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Mobile Number *</label>
                    <input
                      type="text"
                      value={deliveryAddress.mobile}
                      onChange={(e) =>
                        setDeliveryAddress({ ...deliveryAddress, mobile: e.target.value })
                      }
                      placeholder="10-digit mobile"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-navy-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">House / Shop / Flat No. *</label>
                    <input
                      type="text"
                      value={deliveryAddress.houseNo}
                      onChange={(e) =>
                        setDeliveryAddress({ ...deliveryAddress, houseNo: e.target.value })
                      }
                      placeholder="e.g. Shop No. 12, Guru Kripa Heights"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-navy-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Area / Landmark *</label>
                    <input
                      type="text"
                      value={deliveryAddress.area}
                      onChange={(e) =>
                        setDeliveryAddress({ ...deliveryAddress, area: e.target.value })
                      }
                      placeholder="e.g. Jawahar Nagar / Tilak Road / Civil Lines"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-navy-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">City</label>
                    <input
                      type="text"
                      readOnly
                      value={deliveryAddress.city}
                      className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">State</label>
                    <input
                      type="text"
                      readOnly
                      value={deliveryAddress.state}
                      className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">PIN Code</label>
                    <input
                      type="text"
                      value={deliveryAddress.pincode}
                      onChange={(e) =>
                        setDeliveryAddress({ ...deliveryAddress, pincode: e.target.value })
                      }
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-navy-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Delivery Instructions</label>
                  <input
                    type="text"
                    value={deliveryAddress.deliveryInstructions}
                    onChange={(e) =>
                      setDeliveryAddress({ ...deliveryAddress, deliveryInstructions: e.target.value })
                    }
                    placeholder="e.g. Call before delivery, deliver after 2 PM..."
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-navy-900"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
              >
                <span>Review & Submit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & SUBMIT */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-navy-900 border-b pb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-brand-orange" />
              <span>Step 4: Review Booking Summary & Submit</span>
            </h2>

            {/* Customer Contact Identification */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <span className="text-xs font-bold text-navy-900 uppercase block">
                Customer Information
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Sanjay Wankhede"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-navy-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerMobile}
                    onChange={(e) => setCustomerMobile(e.target.value)}
                    placeholder="10-digit WhatsApp mobile"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-navy-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-navy-900"
                  />
                </div>
              </div>
            </div>

            {/* Configuration Summary Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-slate-50/50">
                    <td className="py-2.5 px-4 font-semibold text-slate-500 w-1/3">Service</td>
                    <td className="py-2.5 px-4 font-bold text-navy-900">
                      {language === 'mr' ? activeService.nameMr : activeService.nameEn}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-500">Dimensions / Size</td>
                    <td className="py-2.5 px-4 text-navy-900">
                      {size} {customDimensions ? `(${customDimensions})` : ''}
                    </td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-2.5 px-4 font-semibold text-slate-500">Material & GSM</td>
                    <td className="py-2.5 px-4 text-navy-900">
                      {paperType} {gsm ? `| ${gsm}` : ''}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-500">Color & Sides</td>
                    <td className="py-2.5 px-4 text-navy-900 capitalize">
                      {printColor === 'color' ? 'Full Color (CMYK)' : 'Black & White'} |{' '}
                      {printSides === 'double' ? 'Double Sided' : 'Single Sided'}
                    </td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-2.5 px-4 font-semibold text-slate-500">Quantity</td>
                    <td className="py-2.5 px-4 font-bold text-navy-900">{quantity} copies / units</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-500">Finishing</td>
                    <td className="py-2.5 px-4 text-navy-900">{finishing}</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-2.5 px-4 font-semibold text-slate-500">Artwork</td>
                    <td className="py-2.5 px-4 text-navy-900">
                      {designOption === 'have_design'
                        ? `Uploaded File: ${uploadedFiles.length > 0 ? uploadedFiles[0].name : 'Pending attachment'}`
                        : 'Custom Design by Guru Shree Graphics Team'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-500">Fulfillment</td>
                    <td className="py-2.5 px-4 text-navy-900 font-bold">
                      {deliveryType === 'pickup'
                        ? 'Shop Pickup (Kunal Complex, Akola)'
                        : `Home Delivery to ${deliveryAddress.area}, Akola`}
                    </td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-2.5 px-4 font-semibold text-slate-500">Required Date</td>
                    <td className="py-2.5 px-4 text-navy-900 font-bold">{requiredDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mandatory Disclaimers */}
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 space-y-1 text-xs text-amber-900">
              <p className="font-bold">
                * {t('noOnlinePaymentBadge')}: {t('noOnlinePaymentText')}
              </p>
              <p>
                * {t('quotationNotice')}
              </p>
            </div>

            {/* Submit & Back Controls */}
            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-orange to-brand-red text-white rounded-xl text-sm font-extrabold shadow-xl hover:brightness-110 active:scale-95 transition"
              >
                <CheckCircle className="w-5 h-5" />
                <span>
                  {language === 'mr' ? 'बुकिंग कन्फर्म करा (पैसे नंतर द्या)' : 'Submit Booking (Zero Payment Upfront)'}
                </span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default function BookingPage() {
  return (
    <React.Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }
    >
      <BookingContent />
    </React.Suspense>
  );
}
