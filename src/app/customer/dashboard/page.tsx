'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { useLanguage } from '@/components/LanguageContext';
import { DataStore } from '@/lib/store';
import { Booking, DesignRequest, NotificationItem, Quotation } from '@/types';
import { OrderStatusBadge } from '@/components/OrderStatusBadge';
import { StatusTrackerStepper } from '@/components/StatusTrackerStepper';
import { QuotationCard } from '@/components/QuotationCard';
import { PrintableJobCard } from '@/components/PrintableJobCard';
import {
  LayoutDashboard,
  Printer,
  CalendarCheck,
  Package,
  FileText,
  Palette,
  Upload,
  Search,
  History,
  Bell,
  User,
  Headphones,
  LogOut,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Check,
  MessageSquare,
} from 'lucide-react';

export default function CustomerDashboardPage() {
  const { user, logout, loading } = useAuth();
  const { language, t } = useLanguage();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBookingForPrint, setSelectedBookingForPrint] = useState<Booking | null>(null);
  const [revisionFeedback, setRevisionFeedback] = useState<{ [id: string]: string }>({});

  // Ensure logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Get user-isolated records
  const allBookings = DataStore.getBookings();
  const myBookings = allBookings.filter(
    (b) => b.customerId === user.id || b.customerMobile === user.mobile || b.customerEmail === user.email
  );

  const allDesigns = DataStore.getDesignRequests();
  const myDesigns = allDesigns.filter(
    (d) => d.customerId === user.id || d.customerMobile === user.mobile
  );

  const myNotifications = DataStore.getNotifications(user.id);
  const unreadNotifications = myNotifications.filter((n) => !n.read).length;

  const handleApproveQuotation = (quotationId: string) => {
    const booking = myBookings.find((b) => b.quotation?.id === quotationId);
    if (booking && booking.quotation) {
      booking.quotation.status = 'approved';
      booking.status = 'booking_confirmed';
      DataStore.updateBooking(booking);
      DataStore.updateBookingStatus(
        booking.id,
        'booking_confirmed',
        'Customer approved the quotation charges.'
      );
      alert('Quotation approved! Order confirmed.');
    }
  };

  const handleRejectQuotation = (quotationId: string) => {
    const booking = myBookings.find((b) => b.quotation?.id === quotationId);
    if (booking && booking.quotation) {
      booking.quotation.status = 'rejected';
      booking.status = 'cancelled';
      DataStore.updateBooking(booking);
      DataStore.updateBookingStatus(
        booking.id,
        'cancelled',
        'Customer rejected the quotation.'
      );
      alert('Quotation rejected.');
    }
  };

  const handleRequestQuotationChanges = (quotationId: string, remarks: string) => {
    const booking = myBookings.find((b) => b.quotation?.id === quotationId);
    if (booking && booking.quotation) {
      booking.quotation.status = 'changes_requested';
      booking.quotation.customerRemarks = remarks;
      DataStore.updateBooking(booking);
      alert('Revision request sent to Guru Shree Graphics!');
    }
  };

  const handleApproveDesign = (designId: string) => {
    DataStore.approveDesign(designId);
    alert('Design proof approved! Moving to printing.');
  };

  const handleRequestDesignRevision = (designId: string) => {
    const text = revisionFeedback[designId];
    if (!text || !text.trim()) {
      alert('Please enter revision notes before submitting.');
      return;
    }
    DataStore.addDesignRevision(designId, text.trim());
    setRevisionFeedback((prev) => ({ ...prev, [designId]: '' }));
    alert('Revision round requested!');
  };

  const navMenuItems = [
    { id: 'overview', label: t('custOverview'), icon: LayoutDashboard },
    { id: 'bookings', label: t('custMyBookings'), icon: Package, badge: myBookings.length },
    { id: 'quotations', label: t('custQuotations'), icon: FileText },
    { id: 'designs', label: t('custDesigns'), icon: Palette, badge: myDesigns.length },
    { id: 'files', label: t('custFiles'), icon: Upload },
    { id: 'track', label: t('custTrack'), icon: Search },
    { id: 'notifications', label: t('custNotifications'), icon: Bell, badge: unreadNotifications },
    { id: 'profile', label: t('custProfile'), icon: User },
    { id: 'support', label: t('custSupport'), icon: Headphones },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Welcome Strip */}
      <div className="bg-navy-900 text-white rounded-3xl p-6 sm:p-8 mb-8 flex flex-wrap justify-between items-center gap-4 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
            {language === 'mr' ? 'ग्राहक पोर्टल' : 'Customer Account'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'mr' ? `स्वागत आहे, ${user.fullName}!` : `Welcome back, ${user.fullName}!`}
          </h1>
          <p className="text-xs text-slate-300">
            {user.email} • {user.mobile} • {user.address}
          </p>
        </div>

        <div className="flex gap-2.5">
          <Link
            href="/book"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold rounded-xl shadow-md hover:brightness-110 transition"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>{t('custBook')}</span>
          </Link>
          <button
            onClick={logout}
            className="p-2.5 bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-red-400 rounded-xl transition"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-1">
          <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-sm space-y-1">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-orange' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-brand-orange text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Transparent Payment Policy card in sidebar */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 space-y-1 mt-4">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero Online Payment</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Pay at the shop or upon delivery outside the website. No banking details collected.
            </p>
          </div>
        </aside>

        {/* Content Tabs */}
        <main className="lg:col-span-9 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-xs font-semibold text-slate-500">My Total Orders</span>
                  <p className="text-2xl font-black text-navy-900">{myBookings.length}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-xs font-semibold text-slate-500">Active Design Proofs</span>
                  <p className="text-2xl font-black text-brand-orange">{myDesigns.length}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-xs font-semibold text-slate-500">Unread Updates</span>
                  <p className="text-2xl font-black text-brand-red">{unreadNotifications}</p>
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="font-bold text-sm text-navy-900 uppercase tracking-wider">
                    Recent Bookings
                  </h3>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs font-bold text-brand-orange hover:underline"
                  >
                    View All ({myBookings.length})
                  </button>
                </div>

                {myBookings.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">
                    You have not placed any bookings yet.{' '}
                    <Link href="/book" className="text-brand-orange font-bold">Book now</Link>
                  </p>
                ) : (
                  <div className="space-y-3">
                    {myBookings.slice(0, 3).map((b) => (
                      <div
                        key={b.id}
                        className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap justify-between items-center gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-navy-900 text-sm">{b.id}</span>
                            <OrderStatusBadge status={b.status} size="sm" />
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">
                            {b.serviceName} • Qty: {b.specs.quantity} • {b.deliveryType === 'pickup' ? 'Shop Pickup' : 'Home Delivery'}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedBookingForPrint(b)}
                            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100"
                          >
                            Receipt
                          </button>
                          <Link
                            href={`/track?id=${b.id}`}
                            className="px-3 py-1.5 bg-navy-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800"
                          >
                            Track
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: MY BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-navy-900">
                  {language === 'mr' ? 'माझी सर्व बुकिंग्स' : 'All My Bookings'}
                </h2>
                <Link
                  href="/book"
                  className="px-4 py-2 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  + New Booking
                </Link>
              </div>

              {myBookings.map((b) => (
                <div key={b.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-wrap justify-between items-start gap-3 border-b pb-3">
                    <div>
                      <span className="text-xs text-slate-400 block">Booking Reference</span>
                      <h3 className="text-lg font-black text-navy-900 font-mono">{b.id}</h3>
                      <p className="text-xs text-slate-500">{b.createdAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <OrderStatusBadge status={b.status} />
                      <button
                        onClick={() => setSelectedBookingForPrint(b)}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200"
                      >
                        Print Job Card
                      </button>
                    </div>
                  </div>

                  <StatusTrackerStepper currentStatus={b.status} deliveryType={b.deliveryType} />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl text-xs">
                    <div>
                      <strong className="text-slate-500 block">Service:</strong>
                      <span className="font-bold text-navy-900">{b.serviceName}</span>
                    </div>
                    <div>
                      <strong className="text-slate-500 block">Specs:</strong>
                      <span>{b.specs.size} | {b.specs.paperType} ({b.specs.quantity} units)</span>
                    </div>
                    <div>
                      <strong className="text-slate-500 block">Fulfillment:</strong>
                      <span>{b.deliveryType === 'pickup' ? 'Shop Pickup' : 'Home Delivery'}</span>
                    </div>
                  </div>

                  {b.quotation && (
                    <div className="pt-2">
                      <QuotationCard
                        quotation={b.quotation}
                        onApprove={handleApproveQuotation}
                        onReject={handleRejectQuotation}
                        onRequestChanges={handleRequestQuotationChanges}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: MY QUOTATIONS */}
          {activeTab === 'quotations' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-navy-900">
                {language === 'mr' ? 'माझी कोटेशन्स' : 'Quotations For Your Review'}
              </h2>
              {myBookings.filter((b) => b.quotation).length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
                  No pending quotations. When you submit a booking, Guru Shree Graphics prepares and displays the itemized charges here.
                </div>
              ) : (
                myBookings
                  .filter((b) => b.quotation)
                  .map((b) => (
                    <QuotationCard
                      key={b.quotation!.id}
                      quotation={b.quotation!}
                      onApprove={handleApproveQuotation}
                      onReject={handleRejectQuotation}
                      onRequestChanges={handleRequestQuotationChanges}
                    />
                  ))
              )}
            </div>
          )}

          {/* TAB 4: MY DESIGN REQUESTS */}
          {activeTab === 'designs' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-navy-900">
                  {language === 'mr' ? 'डिझाइन विनंत्या व प्रूव्ह्स' : 'Design Requests & Proofing'}
                </h2>
                <Link
                  href="/custom-design"
                  className="px-4 py-2 bg-brand-orange text-white text-xs font-bold rounded-xl"
                >
                  + Request New Design
                </Link>
              </div>

              {myDesigns.map((d) => (
                <div key={d.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-start border-b pb-3">
                    <div>
                      <span className="text-xs text-slate-400 font-mono">#{d.id}</span>
                      <h3 className="text-base font-bold text-navy-900">{d.designType}</h3>
                      <p className="text-xs text-slate-500">{d.createdAt}</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold uppercase">
                      {d.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl space-y-1">
                    <p><strong>Content:</strong> {d.textContent}</p>
                    {d.preferredColors && <p><strong>Colors:</strong> {d.preferredColors}</p>}
                    {d.brief && <p><strong>Brief:</strong> {d.brief}</p>}
                  </div>

                  {/* Previews / Proofs */}
                  {d.previews && d.previews.length > 0 ? (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold text-navy-900 uppercase">
                        Uploaded Proofs for Your Review:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {d.previews.map((prv) => (
                          <div key={prv.id} className="border border-slate-200 rounded-2xl p-3 bg-white space-y-2">
                            <div className="h-44 w-full bg-slate-100 rounded-xl overflow-hidden">
                              <img src={prv.url} alt={prv.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="text-xs">
                              <p className="font-bold text-navy-900">{prv.title}</p>
                              <p className="text-[11px] text-slate-400">{prv.uploadedAt}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {d.status !== 'approved' && (
                        <div className="pt-3 flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={() => handleApproveDesign(d.id)}
                            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
                          >
                            <Check className="w-4 h-4" />
                            <span>Approve Design Proof</span>
                          </button>

                          <div className="flex-1 flex gap-2">
                            <input
                              type="text"
                              value={revisionFeedback[d.id] || ''}
                              onChange={(e) =>
                                setRevisionFeedback({ ...revisionFeedback, [d.id]: e.target.value })
                              }
                              placeholder="Mention revisions required..."
                              className="flex-1 p-2 border border-slate-300 rounded-xl text-xs"
                            />
                            <button
                              onClick={() => handleRequestDesignRevision(d.id)}
                              className="px-4 py-2 border border-purple-300 text-purple-700 rounded-xl text-xs font-bold hover:bg-purple-50"
                            >
                              Revise
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-500 italic">
                      Design team is working on your concepts. Proof will be uploaded here shortly.
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: UPLOADED FILES */}
          {activeTab === 'files' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-navy-900">Your Uploaded Artwork Files</h2>
              <div className="divide-y divide-slate-100 text-xs">
                {myBookings.flatMap((b) => b.uploadedFiles).length === 0 ? (
                  <p className="text-slate-500 py-4 text-center">No design files attached to bookings yet.</p>
                ) : (
                  myBookings.flatMap((b) => b.uploadedFiles).map((f) => (
                    <div key={f.id} className="py-3 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-brand-orange" />
                        <div>
                          <p className="font-bold text-navy-900">{f.name}</p>
                          <span className="text-slate-400">{f.size} • {f.uploadedAt}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-semibold text-slate-600">
                        Available on Shop Server
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 6: TRACK ORDER QUICK LOOKUP */}
          {activeTab === 'track' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-navy-900">Quick Track by ID</h2>
              <p className="text-xs text-slate-500">
                You can track any past or active order directly using its Booking ID.
              </p>
              <div className="space-y-2">
                {myBookings.map((b) => (
                  <div key={b.id} className="p-3 bg-slate-50 rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <strong className="text-navy-900">{b.id}</strong> - {b.serviceName}
                    </div>
                    <Link
                      href={`/track?id=${b.id}`}
                      className="text-brand-orange font-bold hover:underline"
                    >
                      Open Live Tracker →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-navy-900">In-App Notifications</h2>
              <div className="space-y-2">
                {myNotifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => DataStore.markNotificationRead(n.id)}
                    className={`p-4 rounded-2xl border transition cursor-pointer text-xs ${
                      !n.read ? 'bg-orange-50/50 border-orange-200' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <strong className="text-navy-900">{language === 'mr' ? n.titleMr : n.titleEn}</strong>
                      <span className="text-[11px] text-slate-400">{n.createdAt}</span>
                    </div>
                    <p className="text-slate-600 mt-1">{language === 'mr' ? n.messageMr : n.messageEn}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 text-xs">
              <h2 className="text-lg font-bold text-navy-900">My Profile Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block">Full Name:</span>
                  <strong className="text-navy-900 text-sm">{user.fullName}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block">Mobile Number:</span>
                  <strong className="text-navy-900 text-sm">{user.mobile}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block">Email Address:</span>
                  <strong className="text-navy-900 text-sm">{user.email}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block">Primary Akola Address:</span>
                  <strong className="text-navy-900 text-sm">{user.address}</strong>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SUPPORT */}
          {activeTab === 'support' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-navy-900">Guru Shree Graphics Support</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Need urgent modifications to your print job or want to discuss paper quality? Contact our Akola shop directly.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <a
                  href="tel:+918668816001"
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 block text-xs hover:bg-slate-100 transition"
                >
                  <strong className="text-navy-900 block text-sm">Call Shop Direct</strong>
                  <span className="text-slate-500">+91 86688 16001</span>
                </a>
                <a
                  href="https://wa.me/918668816001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 block text-xs hover:bg-emerald-100 transition"
                >
                  <strong className="text-emerald-900 block text-sm">WhatsApp Manager</strong>
                  <span className="text-emerald-700">Chat directly with Guru Shree Graphics</span>
                </a>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Printable Job Card Popup */}
      {selectedBookingForPrint && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <PrintableJobCard
            booking={selectedBookingForPrint}
            onClose={() => setSelectedBookingForPrint(null)}
          />
        </div>
      )}
    </div>
  );
}
