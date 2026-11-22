'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { useLanguage } from './LanguageContext';
import { useAuth } from './AuthContext';
import {
  Menu,
  X,
  Languages,
  Phone,
  MapPin,
  Search,
  User as UserIcon,
  Shield,
  LogOut,
  CalendarCheck,
  ChevronDown,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'mr' : 'en');
  };

  const navLinks = [
    { href: '/', label: t('navHome') },
    { href: '/services', label: t('navServices') },
    { href: '/gallery', label: t('navGallery') },
    { href: '/about', label: t('navAbout') },
    { href: '/contact', label: t('navContact') },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-sm">
      {/* Top Notification / Info Strip */}
      <div className="bg-navy-900 text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-brand-orange" />
              <span>
                {language === 'mr'
                  ? 'कुणाल कॉम्प्लेक्स, बॉईज झोन समोर, जवाहर नगर रोड, शास्त्री नगर, अकोला – ४४४००१'
                  : 'Kunal Complex, Opp. Boys Zone, Jawahar Nagar Road, Shastri Nagar, Akola – 444001'}
              </span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-brand-orange" />
              <span>+91 86688 16001</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-amber-400 font-medium">
              {language === 'mr' ? '• ऑनलाइन पेमेंटची गरज नाही •' : '• No Online Payment Required •'}
            </span>
            <Link
              href="/admin/login"
              className="text-slate-400 hover:text-white transition flex items-center gap-1 text-[11px]"
            >
              <Shield className="w-3 h-3 text-brand-orange" />
              <span>{language === 'mr' ? 'मालक लॉगिन' : 'Owner Portal'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? 'text-brand-orange bg-orange-50/80 font-bold'
                    : 'text-slate-700 hover:text-navy-900 hover:bg-slate-100/60'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/track"
              className={`px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition ${
                isActive('/track')
                  ? 'text-brand-orange bg-orange-50/80'
                  : 'text-slate-700 hover:text-navy-900 hover:bg-slate-100/60'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-brand-red" />
              <span>{t('navTrack')}</span>
            </Link>
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Selector Toggle */}
            <button
              onClick={toggleLanguage}
              aria-label="Toggle Language"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 text-xs font-bold text-navy-900 hover:bg-slate-100 transition shadow-sm"
            >
              <Languages className="w-4 h-4 text-brand-orange" />
              <span>{language === 'en' ? 'मराठी' : 'English'}</span>
            </button>

            {/* User Account / Portal */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href={isAdmin ? '/admin/dashboard' : '/customer/dashboard'}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-900 text-xs font-bold transition"
                >
                  <UserIcon className="w-3.5 h-3.5 text-brand-orange" />
                  <span className="max-w-[120px] truncate">{user.fullName}</span>
                </Link>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-slate-500 hover:text-red-600 rounded-xl hover:bg-red-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-2 text-xs font-bold text-navy-900 hover:text-brand-orange transition"
                >
                  {t('navLogin')}
                </Link>
                <Link
                  href="/register"
                  className="px-3.5 py-2 rounded-xl border border-navy-900 text-xs font-bold text-navy-900 hover:bg-navy-900 hover:text-white transition"
                >
                  {t('navRegister')}
                </Link>
              </div>
            )}

            {/* Book Now Primary Button */}
            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-95"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t('btnBookNow')}</span>
            </Link>
          </div>

          {/* Mobile Menu Button & Language Switcher */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="p-1.5 rounded-lg border border-slate-300 text-xs font-bold text-navy-900 flex items-center gap-1"
            >
              <Languages className="w-3.5 h-3.5 text-brand-orange" />
              <span>{language === 'en' ? 'मराठी' : 'EN'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-navy-900 hover:bg-slate-100 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive(link.href)
                    ? 'text-brand-orange bg-orange-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-brand-red" />
              <span>{t('navTrack')}</span>
            </Link>

            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full text-center py-3 bg-gradient-to-r from-brand-orange to-brand-red text-white text-sm font-bold rounded-xl shadow-md"
            >
              {t('btnBookNow')}
            </Link>
          </div>

          <div className="border-t border-slate-200 pt-3">
            {user ? (
              <div className="space-y-2">
                <Link
                  href={isAdmin ? '/admin/dashboard' : '/customer/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2.5 px-3 bg-slate-100 rounded-xl text-sm font-bold text-navy-900 text-center"
                >
                  {isAdmin ? t('navAdminPortal') : t('navDashboard')} ({user.fullName})
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-center text-xs font-semibold text-red-600"
                >
                  {t('navLogout')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center text-sm font-bold rounded-xl border border-slate-300 text-navy-900"
                >
                  {t('navLogin')}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center text-sm font-bold rounded-xl bg-navy-900 text-white"
                >
                  {t('navRegister')}
                </Link>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 space-y-1">
            <p className="font-semibold text-navy-900">Guru Shree Graphics</p>
            <p>Kunal Complex, Opp. Boys Zone, Jawahar Nagar Road, Shastri Nagar, Akola</p>
            <p className="text-brand-orange font-bold">No Online Payment Required</p>
          </div>
        </div>
      )}
    </header>
  );
};
