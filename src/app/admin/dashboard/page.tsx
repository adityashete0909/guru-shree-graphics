'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { useLanguage } from '@/components/LanguageContext';
import { DataStore } from '@/lib/store';
import {
  Booking,
  BookingStatus,
  BusinessSettings,
  Category,
  DesignRequest,
  GalleryItem,
  NotificationItem,
  Quotation,
  ServiceItem,
  User,
} from '@/types';
import { statusTranslations } from '@/data/translations';
import { OrderStatusBadge } from '@/components/OrderStatusBadge';
import { QuotationCard } from '@/components/QuotationCard';
import { PrintableJobCard } from '@/components/PrintableJobCard';
import {
  LayoutDashboard,
  Package,
  FileText,
  Palette,
  Users,
  Image as ImageIcon,
  Settings,
  BarChart3,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  Clock,
  Printer,
  Truck,
  IndianRupee,
  Search,
  Filter,
  Download,
  AlertCircle,
  Eye,
  Check,
  X,
  Upload,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, logout, isAdmin, loading } = useAuth();
  const { language, t } = useLanguage();
  const router = useRouter();

  // Active module
  const [activeModule, setActiveModule] = useState<
    'overview' | 'bookings' | 'quotations' | 'services' | 'designs' | 'customers' | 'gallery' | 'settings' | 'reports'
  >('overview');

  // Local state refreshed from DataStore
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [designs, setDesigns] = useState<DesignRequest[]>([]);
  const [customers, setCustomers] = useState<User[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [settings, setSettings] = useState<BusinessSettings>(DataStore.getSettings());

  // Filters & Selected Modals
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchBooking, setSearchBooking] = useState('');
  const [selectedBookingForStatus, setSelectedBookingForStatus] = useState<Booking | null>(null);
  const [newStatus, setNewStatus] = useState<BookingStatus>('printing_in_progress');
  const [statusNote, setStatusNote] = useState('');
  const [completionDateInput, setCompletionDateInput] = useState('');

  // Quotation Creator Modal
  const [quoteBooking, setQuoteBooking] = useState<Booking | null>(null);
  const [quoteItems, setQuoteItems] = useState([
    { description: 'Printing & Finishing', quantity: 1, rate: 500, amount: 500 },
  ]);
  const [quoteDesignFee, setQuoteDesignFee] = useState(150);
  const [quoteMaterialFee, setQuoteMaterialFee] = useState(400);
  const [quotePrintFee, setQuotePrintFee] = useState(250);
  const [quoteDeliveryFee, setQuoteDeliveryFee] = useState(50);
  const [quoteDiscount, setQuoteDiscount] = useState(50);
  const [quoteNotes, setQuoteNotes] = useState('');

  // Service Edit / Add Modal
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);

  // Design Proof Upload Modal
  const [uploadProofModal, setUploadProofModal] = useState<DesignRequest | null>(null);
  const [proofTitle, setProofTitle] = useState('Concept Proof 1');
  const [proofUrl, setProofUrl] = useState(
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80'
  );

  // Job card preview modal
  const [selectedBookingForPrint, setSelectedBookingForPrint] = useState<Booking | null>(null);

  // Refresh data from DataStore
  const refreshData = () => {
    setBookings(DataStore.getBookings());
    setServices(DataStore.getServices());
    setCategories(DataStore.getCategories());
    setDesigns(DataStore.getDesignRequests());
    setCustomers(DataStore.getUsers().filter((u) => u.role === 'customer'));
    setGallery(DataStore.getGallery());
    setSettings(DataStore.getSettings());
  };

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/admin/login');
    } else {
      refreshData();
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Calculated Metrics
  const totalBookingsCount = bookings.length;
  const pendingQuotationsCount = bookings.filter(
    (b) => b.status === 'booking_received' || b.status === 'under_review' || b.status === 'quotation_sent'
  ).length;
  const confirmedCount = bookings.filter((b) => b.status === 'booking_confirmed').length;
  const inProgressCount = bookings.filter(
    (b) =>
      b.status === 'design_in_progress' ||
      b.status === 'printing_in_progress' ||
      b.status === 'quality_checking'
  ).length;
  const readyPickupCount = bookings.filter((b) => b.status === 'ready_for_pickup').length;
  const outDeliveryCount = bookings.filter((b) => b.status === 'out_for_delivery').length;
  const completedCount = bookings.filter((b) => b.status === 'completed').length;
  const cancelledCount = bookings.filter((b) => b.status === 'cancelled').length;

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const query = searchBooking.toLowerCase().trim();
    const matchesSearch =
      !query ||
      b.id.toLowerCase().includes(query) ||
      b.customerName.toLowerCase().includes(query) ||
      b.customerMobile.includes(query) ||
      b.serviceName.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  // Handle Update Status
  const handleSaveStatus = () => {
    if (selectedBookingForStatus) {
      DataStore.updateBookingStatus(selectedBookingForStatus.id, newStatus, statusNote);
      if (completionDateInput) {
        selectedBookingForStatus.estimatedCompletionDate = completionDateInput;
        DataStore.updateBooking(selectedBookingForStatus);
      }
      setSelectedBookingForStatus(null);
      setStatusNote('');
      refreshData();
      alert(`Booking ${selectedBookingForStatus.id} status updated to ${newStatus}!`);
    }
  };

  // Handle Send Quotation
  const handleSendQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteBooking) return;

    const subtotal =
      quoteItems.reduce((sum, item) => sum + item.amount, 0) +
      quoteMaterialFee +
      quotePrintFee +
      quoteDesignFee +
      (quoteBooking.deliveryType === 'delivery' ? quoteDeliveryFee : 0);
    const total = Math.max(0, subtotal - quoteDiscount);

    const quotation: Quotation = {
      id: DataStore.generateQuotationId(),
      bookingId: quoteBooking.id,
      customerId: quoteBooking.customerId,
      customerName: quoteBooking.customerName,
      customerMobile: quoteBooking.customerMobile,
      status: 'sent',
      items: quoteItems.map((item, idx) => ({ ...item, id: `item-${idx + 1}` })),
      designCharges: quoteDesignFee,
      materialCharges: quoteMaterialFee,
      printingCharges: quotePrintFee,
      deliveryCharges: quoteBooking.deliveryType === 'delivery' ? quoteDeliveryFee : 0,
      discount: quoteDiscount,
      subtotal,
      total,
      notes: quoteNotes,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };

    DataStore.saveQuotation(quotation);
    setQuoteBooking(null);
    refreshData();
    alert(`Quotation ${quotation.id} prepared and sent to customer portal!`);
  };

  // Handle Save Service
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const serviceToSave: ServiceItem = {
      id: editingService.id || `srv-${Date.now()}`,
      slug:
        editingService.slug ||
        (editingService.nameEn || 'service').toLowerCase().replace(/\s+/g, '-'),
      categoryId: editingService.categoryId || categories[0].id,
      nameEn: editingService.nameEn || 'New Service',
      nameMr: editingService.nameMr || 'नवीन सेवा',
      descriptionEn: editingService.descriptionEn || '',
      descriptionMr: editingService.descriptionMr || '',
      image:
        editingService.image ||
        'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
      startingPrice: editingService.startingPrice ? Number(editingService.startingPrice) : null,
      priceUnitEn: editingService.priceUnitEn || 'per unit',
      priceUnitMr: editingService.priceUnitMr || 'प्रति नग',
      popular: !!editingService.popular,
      active: editingService.active !== false,
      options: editingService.options || {
        sizes: ['Standard Size', 'Custom Dimensions'],
        paperTypes: ['Standard Material'],
        gsmOptions: ['Standard GSM'],
        finishingOptions: ['Standard Finish'],
        allowCustomDimensions: true,
      },
    };

    DataStore.saveService(serviceToSave);
    setShowServiceModal(false);
    setEditingService(null);
    refreshData();
    alert('Service saved successfully!');
  };

  // Handle Upload Design Proof
  const handleSaveDesignProof = () => {
    if (uploadProofModal) {
      DataStore.addDesignPreview(uploadProofModal.id, {
        id: `prv-${Date.now()}`,
        title: proofTitle,
        url: proofUrl,
        uploadedAt: new Date().toLocaleString(),
        version: (uploadProofModal.previews?.length || 0) + 1,
      });
      setUploadProofModal(null);
      refreshData();
      alert('Design proof uploaded! Customer notified.');
    }
  };

  // Export Bookings to CSV
  const handleExportCSV = () => {
    const headers = ['Booking ID', 'Customer', 'Mobile', 'Service', 'Quantity', 'Status', 'Delivery', 'Total (₹)'];
    const rows = bookings.map((b) => [
      b.id,
      b.customerName,
      b.customerMobile,
      b.serviceName,
      b.specs.quantity,
      b.status,
      b.deliveryType,
      b.quotation ? b.quotation.total : 'Quote Pending',
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Guru_Shree_Graphics_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 pb-16">
      {/* Top Admin Navbar */}
      <div className="bg-navy-900 text-white px-4 sm:px-8 py-4 flex flex-wrap justify-between items-center gap-4 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-orange text-white rounded-xl flex items-center justify-center font-bold">
            GS
          </div>
          <div>
            <h1 className="text-base font-black uppercase tracking-tight">
              Guru Shree Graphics • Owner Admin
            </h1>
            <p className="text-[11px] text-slate-400">
              Kunal Complex, Akola | Production & Billing Console
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs bg-navy-800 text-brand-orange px-3 py-1 rounded-full font-bold border border-navy-700">
            Owner: {user.fullName}
          </span>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Module Tab Navigation */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-200">
          {[
            { id: 'overview', label: t('adminOverview'), icon: LayoutDashboard },
            { id: 'bookings', label: t('adminBookings'), icon: Package, badge: totalBookingsCount },
            { id: 'quotations', label: t('adminQuotations'), icon: FileText, badge: pendingQuotationsCount },
            { id: 'services', label: t('adminServices'), icon: Printer, badge: services.length },
            { id: 'designs', label: t('adminDesigns'), icon: Palette, badge: designs.length },
            { id: 'customers', label: t('adminCustomers'), icon: Users, badge: customers.length },
            { id: 'gallery', label: t('adminGallery'), icon: ImageIcon },
            { id: 'settings', label: t('adminSettings'), icon: Settings },
            { id: 'reports', label: t('adminReports'), icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeModule === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveModule(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shadow-sm ${
                  isActive
                    ? 'bg-navy-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-orange' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 1. OVERVIEW MODULE */}
        {activeModule === 'overview' && (
          <div className="pt-8 space-y-8">
            {/* Stat Counters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Total Bookings</span>
                <p className="text-2xl font-black text-navy-900">{totalBookingsCount}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-sm space-y-1">
                <span className="text-[11px] font-semibold text-amber-700 uppercase">Pending Quotes</span>
                <p className="text-2xl font-black text-amber-600">{pendingQuotationsCount}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-sm space-y-1">
                <span className="text-[11px] font-semibold text-emerald-700 uppercase">Confirmed</span>
                <p className="text-2xl font-black text-emerald-600">{confirmedCount}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-blue-200 bg-blue-50/30 shadow-sm space-y-1">
                <span className="text-[11px] font-semibold text-blue-700 uppercase">In Production</span>
                <p className="text-2xl font-black text-blue-600">{inProgressCount}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Ready Pickup</span>
                <p className="text-2xl font-black text-brand-orange">{readyPickupCount}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Completed</span>
                <p className="text-2xl font-black text-navy-900">{completedCount}</p>
              </div>
            </div>

            {/* Quick Actions & Recent Jobs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="font-bold text-sm text-navy-900 uppercase">
                    Recent Bookings Requiring Action
                  </h3>
                  <button
                    onClick={() => setActiveModule('bookings')}
                    className="text-xs font-bold text-brand-orange hover:underline"
                  >
                    View All ({bookings.length})
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {bookings.slice(0, 5).map((b) => (
                    <div key={b.id} className="py-3 flex flex-wrap justify-between items-center gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-navy-900 font-mono text-sm">{b.id}</strong>
                          <OrderStatusBadge status={b.status} size="sm" />
                        </div>
                        <p className="text-slate-600 mt-0.5">
                          {b.customerName} ({b.customerMobile}) • {b.serviceName}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedBookingForStatus(b);
                            setNewStatus(b.status);
                          }}
                          className="px-3 py-1.5 bg-navy-900 hover:bg-slate-800 text-white rounded-xl font-bold"
                        >
                          Update Status
                        </button>
                        {!b.quotation && (
                          <button
                            onClick={() => {
                              setQuoteBooking(b);
                            }}
                            className="px-3 py-1.5 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-xl font-bold"
                          >
                            Create Quote
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Info & Address Card */}
              <div className="lg:col-span-4 bg-navy-900 text-white rounded-3xl p-6 shadow-md space-y-4">
                <span className="text-xs font-bold text-brand-orange uppercase">Shop Quick Info</span>
                <h4 className="text-lg font-black">{settings.businessName}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {settings.fullAddress}
                </p>
                <div className="text-xs space-y-1 text-slate-300 pt-2 border-t border-navy-700">
                  <p>• <strong>Phone:</strong> {settings.phone}</p>
                  <p>• <strong>WhatsApp:</strong> {settings.whatsapp}</p>
                  <p>• <strong>Hours:</strong> {settings.openingHoursEn}</p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleExportCSV}
                    className="w-full py-2.5 bg-white text-navy-900 rounded-xl text-xs font-bold hover:bg-slate-100 transition flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Export Job Summary (CSV)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. BOOKINGS MANAGEMENT */}
        {activeModule === 'bookings' && (
          <div className="pt-8 space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h2 className="text-xl font-black text-navy-900">All Customer Bookings</h2>
                <p className="text-xs text-slate-500">
                  Manage workflow across all 14 production statuses, update delivery and completion dates.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  value={searchBooking}
                  onChange={(e) => setSearchBooking(e.target.value)}
                  placeholder="Search ID, name, mobile..."
                  className="p-2 border border-slate-300 rounded-xl text-xs w-48 bg-white"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="p-2 border border-slate-300 rounded-xl text-xs bg-white font-semibold"
                >
                  <option value="all">All Statuses ({bookings.length})</option>
                  {Object.keys(statusTranslations).map((st) => (
                    <option key={st} value={st}>
                      {st.replace(/_/g, ' ').toUpperCase()}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleExportCSV}
                  className="px-3 py-2 bg-navy-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Booking ID</th>
                      <th className="py-3.5 px-4">Customer Details</th>
                      <th className="py-3.5 px-4">Service & Specs</th>
                      <th className="py-3.5 px-4">Fulfillment</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Amount</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/60">
                        <td className="py-3 px-4 font-mono font-bold text-navy-900">{b.id}</td>
                        <td className="py-3 px-4">
                          <strong className="text-navy-900 block">{b.customerName}</strong>
                          <span className="text-slate-500">{b.customerMobile}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-navy-900 block">{b.serviceName}</span>
                          <span className="text-slate-500">Qty: {b.specs.quantity} • {b.specs.size}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="capitalize font-semibold text-navy-900 block">
                            {b.deliveryType === 'pickup' ? 'Shop Pickup' : 'Home Delivery'}
                          </span>
                          <span className="text-slate-400">
                            {b.deliveryType === 'delivery' ? b.deliveryAddress?.area : 'Kunal Complex'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <OrderStatusBadge status={b.status} size="sm" />
                        </td>
                        <td className="py-3 px-4 font-bold text-navy-900">
                          {b.quotation ? `₹${b.quotation.total}` : <span className="text-amber-600">Pending</span>}
                        </td>
                        <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedBookingForStatus(b);
                              setNewStatus(b.status);
                            }}
                            className="px-2.5 py-1 bg-navy-900 text-white rounded-lg font-bold hover:bg-slate-800"
                          >
                            Status
                          </button>
                          {!b.quotation && (
                            <button
                              onClick={() => setQuoteBooking(b)}
                              className="px-2.5 py-1 bg-brand-orange text-white rounded-lg font-bold hover:bg-brand-orange-dark"
                            >
                              Quote
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedBookingForPrint(b)}
                            className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-bold hover:bg-slate-200"
                          >
                            Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. QUOTATIONS MANAGEMENT */}
        {activeModule === 'quotations' && (
          <div className="pt-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-navy-900">Quotation Management</h2>
                <p className="text-xs text-slate-500">
                  Prepare quotes with itemized design, paper, print, and delivery fees without online payment.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((b) => (
                <div key={b.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-start border-b pb-3">
                    <div>
                      <span className="text-xs text-slate-400 font-mono font-bold">Booking #{b.id}</span>
                      <h3 className="text-base font-bold text-navy-900">{b.customerName}</h3>
                      <p className="text-xs text-slate-500">{b.serviceName} (Qty: {b.specs.quantity})</p>
                    </div>
                    {b.quotation ? (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase">
                        Quote: ₹{b.quotation.total} ({b.quotation.status})
                      </span>
                    ) : (
                      <button
                        onClick={() => setQuoteBooking(b)}
                        className="px-3 py-1.5 bg-brand-orange text-white text-xs font-bold rounded-xl"
                      >
                        Create Quote
                      </button>
                    )}
                  </div>

                  {b.quotation ? (
                    <QuotationCard quotation={b.quotation} readOnly={true} />
                  ) : (
                    <p className="text-xs text-slate-400 italic">
                      No quotation drafted yet for this booking. Click "Create Quote" above.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. SERVICES MANAGEMENT */}
        {activeModule === 'services' && (
          <div className="pt-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-navy-900">Printing & Designing Services</h2>
                <p className="text-xs text-slate-500">
                  Add unlimited new services, configure pricing, paper specs, and enable/disable offerings.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingService({
                    nameEn: '',
                    nameMr: '',
                    categoryId: categories[0]?.id || '',
                    descriptionEn: '',
                    descriptionMr: '',
                    startingPrice: 100,
                    priceUnitEn: 'per piece',
                    priceUnitMr: 'प्रति नग',
                    active: true,
                  });
                  setShowServiceModal(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((s) => (
                <div key={s.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="h-36 w-full rounded-2xl overflow-hidden bg-slate-100 mb-3">
                      <img src={s.image} alt={s.nameEn} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-navy-900 text-sm">{s.nameEn}</h3>
                      <span className="text-xs font-bold text-brand-orange">
                        {s.startingPrice ? `₹${s.startingPrice}` : 'Quotation'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{s.descriptionEn}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${s.active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {s.active ? 'Active' : 'Disabled'}
                    </span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => {
                          setEditingService(s);
                          setShowServiceModal(true);
                        }}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-navy-900 rounded-lg text-xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete service ${s.nameEn}?`)) {
                            DataStore.deleteService(s.id);
                            refreshData();
                          }
                        }}
                        className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. DESIGN PROOFING MANAGEMENT */}
        {activeModule === 'designs' && (
          <div className="pt-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-navy-900">Custom Design Requests & Proofing</h2>
                <p className="text-xs text-slate-500">
                  Review customer briefs, upload draft concepts, manage revisions, and request approvals.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {designs.map((d) => (
                <div key={d.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-start border-b pb-3">
                    <div>
                      <span className="text-xs text-slate-400 font-mono">#{d.id}</span>
                      <h3 className="text-base font-bold text-navy-900">{d.designType}</h3>
                      <p className="text-xs text-slate-500">
                        Client: <strong>{d.customerName}</strong> ({d.customerMobile})
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold uppercase">
                      {d.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl space-y-1">
                    <p><strong>Text to Print:</strong> {d.textContent}</p>
                    {d.preferredColors && <p><strong>Preferred Colors:</strong> {d.preferredColors}</p>}
                    {d.brief && <p><strong>Brief:</strong> {d.brief}</p>}
                  </div>

                  {/* Previews uploaded */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-navy-900 block">Uploaded Draft Proofs:</span>
                    {d.previews && d.previews.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {d.previews.map((p) => (
                          <div key={p.id} className="border rounded-xl p-2 text-xs">
                            <img src={p.url} alt={p.title} className="h-24 w-full object-cover rounded-lg mb-1" />
                            <p className="font-bold truncate">{p.title}</p>
                            <span className="text-[10px] text-slate-400">{p.uploadedAt}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">No proof uploaded yet.</p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setUploadProofModal(d);
                      setProofTitle(`Proof v${(d.previews?.length || 0) + 1}`);
                    }}
                    className="w-full py-2.5 bg-navy-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-4 h-4 text-brand-orange" />
                    <span>Upload New Design Proof</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. CUSTOMER DIRECTORY */}
        {activeModule === 'customers' && (
          <div className="pt-8 space-y-6">
            <h2 className="text-xl font-black text-navy-900">Registered Customer Directory</h2>
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Mobile</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Address</th>
                    <th className="py-3 px-4">Total Bookings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {customers.map((c) => {
                    const count = bookings.filter((b) => b.customerId === c.id || b.customerMobile === c.mobile).length;
                    return (
                      <tr key={c.id}>
                        <td className="py-3 px-4 font-bold text-navy-900">{c.fullName}</td>
                        <td className="py-3 px-4 font-mono">{c.mobile}</td>
                        <td className="py-3 px-4">{c.email}</td>
                        <td className="py-3 px-4 text-slate-600">{c.address}</td>
                        <td className="py-3 px-4 font-bold text-brand-orange">{count} Orders</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 7. GALLERY MANAGEMENT */}
        {activeModule === 'gallery' && (
          <div className="pt-8 space-y-6">
            <h2 className="text-xl font-black text-navy-900">Portfolio Gallery Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gallery.map((g) => (
                <div key={g.id} className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3">
                  <div className="h-40 rounded-2xl overflow-hidden bg-slate-100">
                    <img src={g.image} alt={g.titleEn} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm">{g.titleEn}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{g.descriptionEn}</p>
                  <button
                    onClick={() => {
                      if (confirm(`Remove gallery item ${g.titleEn}?`)) {
                        DataStore.deleteGalleryItem(g.id);
                        refreshData();
                      }
                    }}
                    className="w-full py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100"
                  >
                    Delete from Portfolio
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. WEBSITE & SHOP SETTINGS */}
        {activeModule === 'settings' && (
          <div className="pt-8 space-y-6">
            <h2 className="text-xl font-black text-navy-900">Website & Shop Settings</h2>
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 max-w-2xl text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Business Name</label>
                <input
                  type="text"
                  value={settings.businessName}
                  onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Official Address (Akola)</label>
                <textarea
                  rows={2}
                  value={settings.fullAddress}
                  onChange={(e) => setSettings({ ...settings, fullAddress: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Phone Number</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">WhatsApp Number</label>
                  <input
                    type="text"
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Official Email</label>
                <input
                  type="text"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Opening Hours (English)</label>
                <input
                  type="text"
                  value={settings.openingHoursEn}
                  onChange={(e) => setSettings({ ...settings, openingHoursEn: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Opening Hours (Marathi)</label>
                <input
                  type="text"
                  value={settings.openingHoursMr}
                  onChange={(e) => setSettings({ ...settings, openingHoursMr: e.target.value })}
                  className="w-full p-2.5 border rounded-xl"
                />
              </div>

              <button
                onClick={() => {
                  DataStore.updateSettings(settings);
                  alert('Settings updated successfully!');
                }}
                className="w-full py-3 bg-navy-900 text-white rounded-xl font-bold hover:bg-slate-800"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}

        {/* 9. REPORTS & EXPORT */}
        {activeModule === 'reports' && (
          <div className="pt-8 space-y-6">
            <h2 className="text-xl font-black text-navy-900">Printing Production Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-bold text-navy-900 text-sm">Download Complete CSV Report</h3>
                <p className="text-xs text-slate-500">
                  Export all customer bookings, sizes, finishing options, and quotation amounts.
                </p>
                <button
                  onClick={handleExportCSV}
                  className="w-full py-2.5 bg-navy-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export to Excel / CSV</span>
                </button>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-bold text-navy-900 text-sm">Print Daily Production Sheet</h3>
                <p className="text-xs text-slate-500">
                  Generate print-ready format for machine operators and cutting supervisors.
                </p>
                <button
                  onClick={() => window.print()}
                  className="w-full py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Shift Sheet</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: UPDATE STATUS (14 WORKFLOW STAGES) */}
      {selectedBookingForStatus && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-navy-900">
              Update Status: {selectedBookingForStatus.id}
            </h3>
            <p className="text-xs text-slate-500">
              Select one of the 14 workflow statuses to notify customer and update production tracker.
            </p>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Workflow Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as BookingStatus)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-navy-900"
              >
                {Object.keys(statusTranslations).map((st) => (
                  <option key={st} value={st}>
                    {statusTranslations[st as BookingStatus].step}. {statusTranslations[st as BookingStatus].en} ({statusTranslations[st as BookingStatus].mr})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Status Change Note / Message</label>
              <input
                type="text"
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="e.g. Flex printed, brass eyelets being fitted..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Target Completion Date & Time</label>
              <input
                type="text"
                value={completionDateInput}
                onChange={(e) => setCompletionDateInput(e.target.value)}
                placeholder="e.g. 2026-11-23 04:00 PM"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedBookingForStatus(null)}
                className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStatus}
                className="px-5 py-2 bg-navy-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CREATE QUOTATION */}
      {quoteBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={handleSendQuotation} className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-4 my-8">
            <h3 className="text-lg font-black text-navy-900">
              Prepare Official Quotation for {quoteBooking.id}
            </h3>
            <p className="text-xs text-slate-500">
              Customer: <strong>{quoteBooking.customerName}</strong> ({quoteBooking.customerMobile}) • {quoteBooking.serviceName}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Design Fee (₹)</label>
                <input
                  type="number"
                  value={quoteDesignFee}
                  onChange={(e) => setQuoteDesignFee(Number(e.target.value))}
                  className="w-full p-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Material Fee (₹)</label>
                <input
                  type="number"
                  value={quoteMaterialFee}
                  onChange={(e) => setQuoteMaterialFee(Number(e.target.value))}
                  className="w-full p-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Printing Fee (₹)</label>
                <input
                  type="number"
                  value={quotePrintFee}
                  onChange={(e) => setQuotePrintFee(Number(e.target.value))}
                  className="w-full p-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Delivery Fee (₹)</label>
                <input
                  type="number"
                  value={quoteDeliveryFee}
                  onChange={(e) => setQuoteDeliveryFee(Number(e.target.value))}
                  className="w-full p-2 border rounded-xl"
                />
              </div>
              <div className="col-span-2">
                <label className="font-bold text-emerald-700 block mb-1">Discount Applied (₹)</label>
                <input
                  type="number"
                  value={quoteDiscount}
                  onChange={(e) => setQuoteDiscount(Number(e.target.value))}
                  className="w-full p-2 border rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Owner Notes</label>
              <textarea
                rows={2}
                value={quoteNotes}
                onChange={(e) => setQuoteNotes(e.target.value)}
                placeholder="Payment will be arranged directly with the shop..."
                className="w-full p-2 border rounded-xl text-xs"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center text-sm font-bold">
              <span>Total Quotation Amount:</span>
              <span className="text-xl text-brand-orange">
                ₹{Math.max(0, quoteDesignFee + quoteMaterialFee + quotePrintFee + quoteDeliveryFee - quoteDiscount)}
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setQuoteBooking(null)}
                className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-brand-orange text-white rounded-xl text-xs font-bold hover:bg-brand-orange-dark"
              >
                Send Quotation to Customer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 3: ADD/EDIT SERVICE */}
      {showServiceModal && editingService && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={handleSaveService} className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-4 my-8 text-xs">
            <h3 className="text-lg font-black text-navy-900">
              {editingService.id ? 'Edit Printing Service' : 'Add New Printing Service'}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold block mb-1">Service Name (English) *</label>
                <input
                  type="text"
                  required
                  value={editingService.nameEn || ''}
                  onChange={(e) => setEditingService({ ...editingService, nameEn: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Service Name (Marathi) *</label>
                <input
                  type="text"
                  required
                  value={editingService.nameMr || ''}
                  onChange={(e) => setEditingService({ ...editingService, nameMr: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold block mb-1">Category</label>
                <select
                  value={editingService.categoryId || categories[0]?.id}
                  onChange={(e) => setEditingService({ ...editingService, categoryId: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.nameEn}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-bold block mb-1">Starting Price (₹)</label>
                <input
                  type="number"
                  value={editingService.startingPrice || ''}
                  onChange={(e) => setEditingService({ ...editingService, startingPrice: Number(e.target.value) })}
                  placeholder="Leave empty for quote basis"
                  className="w-full p-2 border rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="font-bold block mb-1">Image URL</label>
              <input
                type="text"
                value={editingService.image || ''}
                onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                placeholder="https://..."
                className="w-full p-2 border rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Description (English)</label>
              <textarea
                rows={2}
                value={editingService.descriptionEn || ''}
                onChange={(e) => setEditingService({ ...editingService, descriptionEn: e.target.value })}
                className="w-full p-2 border rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Description (Marathi)</label>
              <textarea
                rows={2}
                value={editingService.descriptionMr || ''}
                onChange={(e) => setEditingService({ ...editingService, descriptionMr: e.target.value })}
                className="w-full p-2 border rounded-xl"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowServiceModal(false)}
                className="px-4 py-2 border rounded-xl font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-navy-900 text-white rounded-xl font-bold hover:bg-slate-800"
              >
                Save Service
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 4: UPLOAD DESIGN PROOF */}
      {uploadProofModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="text-base font-black text-navy-900">
              Upload Proof for #{uploadProofModal.id}
            </h3>
            <p className="text-slate-500">
              Client: {uploadProofModal.customerName} ({uploadProofModal.designType})
            </p>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Proof Title / Concept Name</label>
              <input
                type="text"
                value={proofTitle}
                onChange={(e) => setProofTitle(e.target.value)}
                placeholder="e.g. Concept 1 - Clean Minimal"
                className="w-full p-2 border rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Image Preview URL</label>
              <input
                type="text"
                value={proofUrl}
                onChange={(e) => setProofUrl(e.target.value)}
                className="w-full p-2 border rounded-xl"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setUploadProofModal(null)}
                className="px-4 py-2 border rounded-xl font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveDesignProof}
                className="px-5 py-2 bg-navy-900 text-white rounded-xl font-bold"
              >
                Upload Proof
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: PRINTABLE JOB CARD */}
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
