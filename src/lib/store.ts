'use client';

import {
  Booking,
  BookingStatus,
  BusinessSettings,
  Category,
  DesignPreview,
  DesignRequest,
  DesignRevision,
  GalleryItem,
  NotificationItem,
  Quotation,
  ReviewItem,
  ServiceItem,
  User,
} from '@/types';
import {
  initialBookings,
  initialCategories,
  initialDesignRequests,
  initialGallery,
  initialNotifications,
  initialReviews,
  initialServices,
  initialSettings,
  initialUsers,
} from '@/data/initialData';

const STORAGE_KEYS = {
  SETTINGS: 'gsg_settings_v2',
  CATEGORIES: 'gsg_categories_v2',
  SERVICES: 'gsg_services_v2',
  BOOKINGS: 'gsg_bookings_v2',
  DESIGNS: 'gsg_designs_v2',
  NOTIFICATIONS: 'gsg_notifications_v2',
  GALLERY: 'gsg_gallery_v2',
  REVIEWS: 'gsg_reviews_v2',
  USERS: 'gsg_users_v2',
  CURRENT_USER: 'gsg_current_user_v2',
  LANGUAGE: 'gsg_language_v2',
};

// Safe LocalStorage helpers
function getItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    // Purge deprecated v1 keys
    localStorage.removeItem('gsg_settings_v1');
    localStorage.removeItem('gsg_users_v1');
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

export const DataStore = {
  // Settings
  getSettings(): BusinessSettings {
    const s = getItem(STORAGE_KEYS.SETTINGS, initialSettings);
    s.phone = '+91 86688 16001';
    s.whatsapp = '+91 86688 16001';
    return s;
  },
  updateSettings(settings: Partial<BusinessSettings>): BusinessSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    setItem(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  // Categories
  getCategories(): Category[] {
    return getItem(STORAGE_KEYS.CATEGORIES, initialCategories);
  },
  saveCategory(category: Category): void {
    const list = this.getCategories();
    const index = list.findIndex((c) => c.id === category.id);
    if (index >= 0) {
      list[index] = category;
    } else {
      list.push(category);
    }
    setItem(STORAGE_KEYS.CATEGORIES, list);
  },
  deleteCategory(id: string): void {
    const list = this.getCategories().filter((c) => c.id !== id);
    setItem(STORAGE_KEYS.CATEGORIES, list);
  },

  // Services
  getServices(): ServiceItem[] {
    return getItem(STORAGE_KEYS.SERVICES, initialServices);
  },
  getServiceBySlug(slug: string): ServiceItem | undefined {
    return this.getServices().find((s) => s.slug === slug || s.id === slug);
  },
  saveService(service: ServiceItem): void {
    const list = this.getServices();
    const index = list.findIndex((s) => s.id === service.id);
    if (index >= 0) {
      list[index] = service;
    } else {
      list.unshift(service);
    }
    setItem(STORAGE_KEYS.SERVICES, list);
  },
  deleteService(id: string): void {
    const list = this.getServices().filter((s) => s.id !== id);
    setItem(STORAGE_KEYS.SERVICES, list);
  },

  // Bookings
  getBookings(): Booking[] {
    return getItem(STORAGE_KEYS.BOOKINGS, initialBookings);
  },
  getBookingById(id: string): Booking | undefined {
    const norm = id.trim().toUpperCase();
    return this.getBookings().find(
      (b) => b.id.toUpperCase() === norm || b.customerMobile === id.trim()
    );
  },
  createBooking(booking: Booking): Booking {
    const list = this.getBookings();
    list.unshift(booking);
    setItem(STORAGE_KEYS.BOOKINGS, list);

    // Create In-App notification for admin
    this.createNotification({
      id: `notif-${Date.now()}`,
      userId: 'admin',
      titleEn: 'New Booking Received',
      titleMr: 'नवीन बुकिंग प्राप्त झाली',
      messageEn: `${booking.customerName} booked ${booking.serviceName} (${booking.id}).`,
      messageMr: `${booking.customerName} यांनी ${booking.serviceName} बुक केले (${booking.id}).`,
      type: 'booking',
      read: false,
      link: '/admin/dashboard',
      createdAt: new Date().toLocaleString(),
    });

    return booking;
  },
  updateBookingStatus(id: string, status: BookingStatus, note?: string): Booking | null {
    const list = this.getBookings();
    const b = list.find((item) => item.id === id);
    if (!b) return null;

    b.status = status;
    b.updatedAt = new Date().toLocaleString();
    if (!b.statusHistory) b.statusHistory = [];
    b.statusHistory.push({
      status,
      timestamp: new Date().toLocaleString(),
      note: note || `Status changed to ${status.replace(/_/g, ' ')}`,
    });

    // Notify customer
    this.createNotification({
      id: `notif-${Date.now()}`,
      userId: b.customerId,
      titleEn: `Order Status: ${status.replace(/_/g, ' ').toUpperCase()}`,
      titleMr: `ऑर्डर स्थिती अपडेट (${b.id})`,
      messageEn: `Your booking ${b.id} status is now updated. ${note || ''}`,
      messageMr: `आपल्या बुकिंगची (${b.id}) सद्यस्थिती अपडेट झाली आहे. ${note || ''}`,
      type: 'status',
      read: false,
      link: '/customer/dashboard',
      createdAt: new Date().toLocaleString(),
    });

    setItem(STORAGE_KEYS.BOOKINGS, list);
    return b;
  },
  updateBooking(updated: Booking): void {
    const list = this.getBookings();
    const idx = list.findIndex((b) => b.id === updated.id);
    if (idx >= 0) {
      list[idx] = updated;
      setItem(STORAGE_KEYS.BOOKINGS, list);
    }
  },

  // Quotations
  saveQuotation(quotation: Quotation): void {
    const bookings = this.getBookings();
    const b = bookings.find((item) => item.id === quotation.bookingId);
    if (b) {
      b.quotation = quotation;
      if (b.status === 'booking_received' || b.status === 'under_review') {
        b.status = 'quotation_sent';
        b.statusHistory.push({
          status: 'quotation_sent',
          timestamp: new Date().toLocaleString(),
          note: `Quotation #${quotation.id} prepared for ₹${quotation.total}.`,
        });
      }
      setItem(STORAGE_KEYS.BOOKINGS, bookings);

      // Notify customer
      this.createNotification({
        id: `notif-${Date.now()}`,
        userId: b.customerId,
        titleEn: 'Quotation Prepared',
        titleMr: 'कोटेशन तयार झाले आहे',
        messageEn: `Quotation #${quotation.id} for booking ${b.id} is ready for review (Total: ₹${quotation.total}).`,
        messageMr: `बुकिंग ${b.id} साठी कोटेशन #${quotation.id} तयार आहे (एकूण: ₹${quotation.total}).`,
        type: 'quotation',
        read: false,
        link: '/customer/dashboard',
        createdAt: new Date().toLocaleString(),
      });
    }
  },

  // Design Requests
  getDesignRequests(): DesignRequest[] {
    return getItem(STORAGE_KEYS.DESIGNS, initialDesignRequests);
  },
  createDesignRequest(req: DesignRequest): DesignRequest {
    const list = this.getDesignRequests();
    list.unshift(req);
    setItem(STORAGE_KEYS.DESIGNS, list);

    // Notify Admin
    this.createNotification({
      id: `notif-${Date.now()}`,
      userId: 'admin',
      titleEn: 'New Design Request',
      titleMr: 'नवीन डिझाइन विनंती प्राप्त',
      messageEn: `${req.customerName} submitted a design request for ${req.designType}.`,
      messageMr: `${req.customerName} यांनी ${req.designType} साठी डिझाइन विनंती पाठवली आहे.`,
      type: 'design',
      read: false,
      link: '/admin/dashboard',
      createdAt: new Date().toLocaleString(),
    });
    return req;
  },
  addDesignPreview(requestId: string, preview: DesignPreview): void {
    const list = this.getDesignRequests();
    const req = list.find((d) => d.id === requestId);
    if (req) {
      if (!req.previews) req.previews = [];
      req.previews.push(preview);
      req.status = 'preview_sent';
      req.updatedAt = new Date().toLocaleString();
      setItem(STORAGE_KEYS.DESIGNS, list);

      // If linked with booking, update booking status too!
      if (req.bookingId) {
        this.updateBookingStatus(
          req.bookingId,
          'design_preview_sent',
          `Design preview "${preview.title}" uploaded.`
        );
      }

      this.createNotification({
        id: `notif-${Date.now()}`,
        userId: req.customerId,
        titleEn: 'Design Proof Ready for Review',
        titleMr: 'डिझाइन प्रूव्ह तपासणीसाठी उपलब्ध',
        messageEn: `Guru Shree Graphics uploaded proof for ${req.designType}. Please review in your dashboard.`,
        messageMr: `आपल्या ${req.designType} चे डिझाइन प्रूव्ह तयार आहे. कृपया डॅशबोर्डवर तपासा.`,
        type: 'design',
        read: false,
        link: '/customer/dashboard',
        createdAt: new Date().toLocaleString(),
      });
    }
  },
  addDesignRevision(requestId: string, feedback: string): void {
    const list = this.getDesignRequests();
    const req = list.find((d) => d.id === requestId);
    if (req) {
      if (!req.revisions) req.revisions = [];
      req.revisions.push({
        round: req.revisions.length + 1,
        feedback,
        requestedAt: new Date().toLocaleString(),
        status: 'pending',
      });
      req.status = 'revision_requested';
      req.updatedAt = new Date().toLocaleString();
      setItem(STORAGE_KEYS.DESIGNS, list);

      // Notify admin
      this.createNotification({
        id: `notif-${Date.now()}`,
        userId: 'admin',
        titleEn: 'Design Revision Requested',
        titleMr: 'डिझाइन बदलांची विनंती',
        messageEn: `${req.customerName} requested revisions for design #${req.id}.`,
        messageMr: `${req.customerName} यांनी डिझाइन #${req.id} मध्ये बदल मागितले आहेत.`,
        type: 'design',
        read: false,
        link: '/admin/dashboard',
        createdAt: new Date().toLocaleString(),
      });
    }
  },
  approveDesign(requestId: string): void {
    const list = this.getDesignRequests();
    const req = list.find((d) => d.id === requestId);
    if (req) {
      req.status = 'approved';
      req.updatedAt = new Date().toLocaleString();
      setItem(STORAGE_KEYS.DESIGNS, list);

      if (req.bookingId) {
        this.updateBookingStatus(
          req.bookingId,
          'design_approved',
          'Customer approved design proof.'
        );
      }

      this.createNotification({
        id: `notif-${Date.now()}`,
        userId: 'admin',
        titleEn: 'Design Approved by Customer! 🎉',
        titleMr: 'ग्राहकाने डिझाइन मंजूर केले! 🎉',
        messageEn: `${req.customerName} approved the design proof for ${req.designType}.`,
        messageMr: `${req.customerName} यांनी ${req.designType} चे डिझाइन मंजूर केले आहे.`,
        type: 'design',
        read: false,
        link: '/admin/dashboard',
        createdAt: new Date().toLocaleString(),
      });
    }
  },

  // Gallery
  getGallery(): GalleryItem[] {
    return getItem(STORAGE_KEYS.GALLERY, initialGallery);
  },
  saveGalleryItem(item: GalleryItem): void {
    const list = this.getGallery();
    list.unshift(item);
    setItem(STORAGE_KEYS.GALLERY, list);
  },
  deleteGalleryItem(id: string): void {
    const list = this.getGallery().filter((g) => g.id !== id);
    setItem(STORAGE_KEYS.GALLERY, list);
  },

  // Reviews
  getReviews(): ReviewItem[] {
    return getItem(STORAGE_KEYS.REVIEWS, initialReviews);
  },
  addReview(review: ReviewItem): void {
    const list = this.getReviews();
    list.unshift(review);
    setItem(STORAGE_KEYS.REVIEWS, list);
  },

  // Notifications
  getNotifications(userId?: string): NotificationItem[] {
    const all = getItem<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, initialNotifications);
    if (!userId) return all;
    return all.filter((n) => n.userId === userId || n.userId === 'all');
  },
  createNotification(notif: NotificationItem): void {
    const all = getItem<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, initialNotifications);
    all.unshift(notif);
    setItem(STORAGE_KEYS.NOTIFICATIONS, all);
  },
  markNotificationRead(id: string): void {
    const all = getItem<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, initialNotifications);
    const item = all.find((n) => n.id === id);
    if (item) {
      item.read = true;
      setItem(STORAGE_KEYS.NOTIFICATIONS, all);
    }
  },

  // Users & Auth
  getUsers(): User[] {
    return getItem(STORAGE_KEYS.USERS, initialUsers);
  },
  registerUser(user: User): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    if (users.some((u) => u.email.toLowerCase() === user.email.toLowerCase())) {
      return { success: false, message: 'Email is already registered.' };
    }
    if (users.some((u) => u.mobile === user.mobile)) {
      return { success: false, message: 'Mobile number is already registered.' };
    }
    users.push(user);
    setItem(STORAGE_KEYS.USERS, users);
    return { success: true, message: 'Registration successful!', user };
  },
  findUser(identifier: string): User | undefined {
    const users = this.getUsers();
    const clean = identifier.trim().toLowerCase();
    return users.find(
      (u) => u.email.toLowerCase() === clean || u.mobile === identifier.trim()
    );
  },
  getCurrentUser(): User | null {
    return getItem<User | null>(STORAGE_KEYS.CURRENT_USER, null);
  },
  setCurrentUser(user: User | null): void {
    setItem(STORAGE_KEYS.CURRENT_USER, user);
  },

  // Helper ID generator
  generateBookingId(): string {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `GSG-2026-${random}`;
  },
  generateQuotationId(): string {
    const random = Math.floor(100 + Math.random() * 900);
    return `QTN-2026-${random}`;
  },
  generateDesignId(): string {
    const random = Math.floor(100 + Math.random() * 900);
    return `DSG-2026-${random}`;
  },
};
