'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { DataStore } from '@/lib/store';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  MessageCircle,
  CheckCircle,
  Send,
  ShieldCheck,
} from 'lucide-react';

export default function ContactPage() {
  const { language, t } = useLanguage();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('Flex Printing');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const googleMapsDirectionsUrl =
    'https://www.google.com/maps/search/?api=1&query=Kunal+Complex+Jawahar+Nagar+Road+Shastri+Nagar+Akola+444001';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create In-App Notification for Admin
    DataStore.createNotification({
      id: `enq-${Date.now()}`,
      userId: 'admin',
      titleEn: `New Enquiry from ${name}`,
      titleMr: `${name} यांच्याकडून नवीन चौकशी`,
      messageEn: `${name} (${mobile}) enquired about ${serviceType}: "${message}"`,
      messageMr: `${name} (${mobile}) यांनी ${serviceType} बद्दल चौकशी केली: "${message}"`,
      type: 'system',
      read: false,
      link: '/admin/dashboard',
      createdAt: new Date().toLocaleString(),
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1.5 rounded-full bg-orange-100 text-brand-orange text-xs font-bold uppercase tracking-wider">
          {language === 'mr' ? 'थेट संपर्क साधा' : 'Get in Touch'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-navy-900 tracking-tight">
          {language === 'mr' ? 'गुरु श्री ग्राफिक्स, अकोला' : 'Contact Guru Shree Graphics'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          {language === 'mr'
            ? 'कुणाल कॉम्प्लेक्स, जवाहर नगर रोड येथील आमच्या दुकानाला प्रत्यक्ष भेट द्या किंवा खालील फॉर्म भरा.'
            : 'Visit our printing studio at Kunal Complex, Jawahar Nagar Road, Akola or send us your inquiry.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Official Contact Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-xl font-black text-navy-900">
              Guru Shree Graphics
            </h2>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
              Printing, Graphic Designing & Digital Printing
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-brand-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <strong className="text-navy-900 block font-bold">Official Business Address:</strong>
                <p className="text-slate-600 leading-snug">
                  Kunal Complex, Opp. Boys Zone, Jawahar Nagar Road, Shastri Nagar, Akola – 444001, Maharashtra, India.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 text-brand-red flex items-center justify-center flex-shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <strong className="text-navy-900 block font-bold">Phone Number:</strong>
                <p className="text-slate-600">+91 86688 16001</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <strong className="text-navy-900 block font-bold">WhatsApp Direct:</strong>
                <p className="text-slate-600">+91 86688 16001</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Mail className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <strong className="text-navy-900 block font-bold">Official Email:</strong>
                <p className="text-slate-600">contact@gurushreegraphics.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <strong className="text-navy-900 block font-bold">{t('openingHoursTitle')}:</strong>
                <p className="text-slate-600">{t('openingHoursText')}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-3 border-t border-slate-100">
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-3 px-4 bg-navy-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md"
            >
              <Navigation className="w-4 h-4 text-brand-orange" />
              <span>{t('btnGetDirections')}</span>
            </a>

            <a
              href="https://wa.me/918668816001"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{t('btnWhatsappEnquiry')}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-navy-900">
                {language === 'mr' ? 'आपली चौकशी प्राप्त झाली!' : 'Enquiry Received!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                {language === 'mr'
                  ? 'गुरु श्री ग्राफिक्स टीम लवकरच आपल्याशी फोन किंवा व्हॉट्सॲपवर संपर्क करेल.'
                  : 'Thank you for reaching out. The Guru Shree Graphics team will contact you shortly.'}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-5 py-2.5 bg-navy-900 text-white text-xs font-bold rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-navy-900">
                  {language === 'mr' ? 'ऑनलाइन चौकशी फॉर्म' : 'Send Direct Message / Quotation Request'}
                </h3>
                <p className="text-xs text-slate-500">
                  Fill in your details and we will respond with exact printing specifications.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Service Required</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  >
                    <option value="Flex Printing">Digital Flex & Hoardings</option>
                    <option value="Visiting Cards">Visiting Cards</option>
                    <option value="Wedding Cards">Wedding & Event Cards</option>
                    <option value="Bill Books">Bill Books & Invoices</option>
                    <option value="Graphic Designing">Logo & Graphic Designing</option>
                    <option value="Pamphlets & Flyers">Pamphlets & Offset Printing</option>
                    <option value="Vinyl & Stickers">Vinyl & Stickers</option>
                    <option value="Other Project">Other Printing Project</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Message / Requirements *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mention desired size, quantity, required date, or specific instructions..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-[11px] text-amber-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Payment will be arranged directly with the shop. No online payment required.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold rounded-xl shadow-md hover:brightness-110 transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{language === 'mr' ? 'चौकशी पाठवा' : 'Send Enquiry'}</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Embedded Full Map Section */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md h-80 sm:h-96 w-full">
        <iframe
          title="Guru Shree Graphics Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14930.292376916843!2d77.0012!3d20.7002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd7299a9a01f563%3A0x6b77ad5a2c42c!2sJawahar%20Nagar%2C%20Akola%2C%20Maharashtra%20444001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
        />
      </div>
    </div>
  );
}
