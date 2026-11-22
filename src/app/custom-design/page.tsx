'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { useAuth } from '@/components/AuthContext';
import { DataStore } from '@/lib/store';
import { DesignRequest, UploadedFileInfo } from '@/types';
import { Palette, Upload, CheckCircle, Sparkles, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CustomDesignPage() {
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.fullName || '');
  const [customerMobile, setCustomerMobile] = useState(user?.mobile || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [designType, setDesignType] = useState('Logo & Brand Identity');
  const [preferredColors, setPreferredColors] = useState('');
  const [textContent, setTextContent] = useState('');
  const [brief, setBrief] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileInfo[]>([]);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newFile: UploadedFileInfo = {
        id: `ref-${Date.now()}`,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        url: '#',
        uploadedAt: new Date().toLocaleTimeString(),
      };
      setUploadedFiles((prev) => [...prev, newFile]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = DataStore.generateDesignId();
    const newReq: DesignRequest = {
      id,
      customerId: user?.id || `guest-${Date.now()}`,
      customerName: customerName.trim() || 'Valued Customer',
      customerMobile: customerMobile.trim() || '8668816001',
      customerEmail: customerEmail.trim() || 'contact@client.com',
      designType,
      brief,
      preferredColors,
      textContent,
      referenceFiles: uploadedFiles,
      status: 'pending',
      previews: [],
      revisions: [],
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };

    DataStore.createDesignRequest(newReq);
    setSubmittedId(id);
  };

  if (submittedId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-navy-900">
          {language === 'mr' ? 'डिझाइन विनंती नोंदवली गेली!' : 'Design Request Submitted!'}
        </h1>
        <p className="text-sm text-slate-600">
          {language === 'mr'
            ? 'आमचे डिझायनर्स तुमच्या गरजेनुसार काम सुरू करतील आणि लवकरच तुमच्या डॅशबोर्डवर प्रिव्ह्यू अपलोड करतील.'
            : 'Our design team will review your instructions and upload initial draft concepts to your customer portal.'}
        </p>

        <div className="bg-slate-50 border-2 border-brand-orange/40 rounded-2xl p-6 max-w-sm mx-auto space-y-1">
          <span className="text-xs text-slate-500 uppercase font-bold">Design Request ID:</span>
          <p className="text-2xl font-black text-navy-900 font-mono">{submittedId}</p>
        </div>

        <div className="pt-4 flex justify-center gap-3">
          <Link
            href="/customer/dashboard"
            className="px-6 py-3 bg-navy-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
          >
            {language === 'mr' ? 'ग्राहक डॅशबोर्ड पहा' : 'View in Customer Dashboard'}
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50"
          >
            Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 bg-red-100 text-brand-red text-xs font-bold uppercase rounded-full">
          Creative Studio
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-900">
          {language === 'mr' ? 'कस्टम डिझाइनची विनंती करा' : 'Request Custom Graphic Design'}
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          {language === 'mr'
            ? 'आपली कल्पना आम्हाला सांगा. आम्ही ३ वेगवेगळ्या संकल्पना डिझाइन करून आपल्या मंजुरीसाठी पाठवू.'
            : 'Share your vision, text, and references. We provide digital proofs and revisions before printing.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-navy-900 block mb-1">Your Full Name *</label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-navy-900"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-navy-900 block mb-1">Mobile Number *</label>
            <input
              type="tel"
              required
              value={customerMobile}
              onChange={(e) => setCustomerMobile(e.target.value)}
              placeholder="10-digit mobile"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-navy-900"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-navy-900 block mb-1">Design Category *</label>
            <select
              value={designType}
              onChange={(e) => setDesignType(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-navy-900"
            >
              <option value="Logo & Brand Identity">Logo & Brand Identity</option>
              <option value="Visiting Card Design">Visiting Card Design</option>
              <option value="Wedding Invitation Card">Wedding Invitation Card</option>
              <option value="Flex Banner / Hoarding">Flex Banner / Hoarding</option>
              <option value="Social Media Poster">Social Media Poster</option>
              <option value="Brochure / Catalogue">Brochure / Catalogue</option>
              <option value="Product Label / Sticker">Product Label / Sticker</option>
              <option value="Letterhead & Stationery">Letterhead & Stationery</option>
              <option value="Custom Project">Other Custom Project</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-navy-900 block">
            Text & Information to Include in Design *
          </label>
          <textarea
            rows={4}
            required
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Write titles, company name, address, contact details, wedding couple names, dates, or slogan..."
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-navy-900 block">
              Preferred Colors & Style
            </label>
            <input
              type="text"
              value={preferredColors}
              onChange={(e) => setPreferredColors(e.target.value)}
              placeholder="e.g. Navy Blue and Orange, Traditional Red & Gold, Minimalist..."
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-navy-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-navy-900 block">
              Upload Reference Photos or Old Samples
            </label>
            <input
              type="file"
              onChange={handleFileUpload}
              className="w-full text-xs text-slate-500 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-navy-900 file:text-white hover:file:bg-slate-800"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-navy-900 block">
            Detailed Brief & Specific Instructions
          </label>
          <textarea
            rows={3}
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Explain where this design will be displayed, any Marathi calligraphy preferences, etc..."
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
          />
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>
            {language === 'mr'
              ? 'डिझाइन प्रूव्ह मंजूर झाल्यानंतरच छपाई सुरू केली जाईल. कोणतेही ऑनलाइन पेमेंट आवश्यक नाही.'
              : 'Zero online payment required. You will review digital proofs and approve before production.'}
          </span>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3.5 bg-gradient-to-r from-brand-orange to-brand-red text-white text-sm font-bold rounded-xl shadow-lg hover:brightness-110 transition"
          >
            {language === 'mr' ? 'डिझाइन विनंती सबमिट करा' : 'Submit Design Request'}
          </button>
        </div>
      </form>
    </div>
  );
}
