'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { useLanguage } from '@/components/LanguageContext';
import { Logo } from '@/components/Logo';
import { Lock, User, AlertCircle, ArrowRight } from 'lucide-react';

export default function CustomerLoginPage() {
  const { login } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();

  const [identifier, setIdentifier] = useState('sanjay.akola@gmail.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = login(identifier.trim(), password);
    if (res.success) {
      router.push('/customer/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <Logo size="md" />
          <h1 className="text-xl font-black text-navy-900 pt-2">
            {language === 'mr' ? 'ग्राहक लॉगिन' : 'Customer Portal Login'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'mr'
              ? 'आपल्या ऑर्डर्स, कोटेशन्स आणि डिझाइन प्रूव्ह तपासण्यासाठी लॉगिन करा.'
              : 'Sign in to track orders, review quotations, and approve design proofs.'}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">
              {language === 'mr' ? 'मोबाईल नंबर किंवा ईमेल' : 'Mobile Number or Email'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. 9822334455 or email@domain.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">
              {language === 'mr' ? 'पासवर्ड' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>
          </div>

          {/* Demo helper */}
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500">
            <strong>Sample Customer:</strong> sanjay.akola@gmail.com / password123
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold rounded-xl shadow-md hover:brightness-110 transition flex items-center justify-center gap-1.5"
          >
            <span>{language === 'mr' ? 'लॉगिन करा' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500 space-y-2 border-t border-slate-100">
          <p>
            {language === 'mr' ? 'नवीन ग्राहक आहात का?' : "Don't have an account yet?"}{' '}
            <Link href="/register" className="font-bold text-brand-orange hover:underline">
              {language === 'mr' ? 'येथे नोंदणी करा' : 'Register Now'}
            </Link>
          </p>

          <p className="text-[11px] text-slate-400">
            Owner/Admin?{' '}
            <Link href="/admin/login" className="text-navy-900 font-bold hover:underline">
              Owner Login Portal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
