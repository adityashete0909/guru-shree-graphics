'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { useLanguage } from '@/components/LanguageContext';
import { Logo } from '@/components/Logo';
import { Shield, Lock, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const { adminLogin } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();

  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = adminLogin(password);
    if (res.success) {
      router.push('/admin/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="max-w-md w-full bg-white border-2 border-navy-900 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-navy-900 text-brand-orange rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-black text-navy-900 uppercase tracking-tight">
            Guru Shree Graphics
          </h1>
          <p className="text-xs font-bold text-brand-orange uppercase tracking-wider">
            Owner & Administration Portal
          </p>
          <p className="text-xs text-slate-500">
            Authorized management access for shop production & billing.
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
            <label className="text-xs font-bold text-slate-700 block">Owner Access Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter owner password"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-navy-900 focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500">
            <strong>Default Access Key:</strong> <code className="bg-white px-1.5 py-0.5 rounded border">admin</code>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-navy-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-brand-orange" />
            <span>Unlock Owner Dashboard</span>
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-400 border-t border-slate-100">
          Customer looking to login?{' '}
          <Link href="/login" className="font-bold text-brand-orange hover:underline">
            Customer Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
