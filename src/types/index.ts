export type Language = 'en' | 'mr';

export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  password?: string;
  address: string;
  role: UserRole;
  createdAt: string;
}

export interface Category {
  id: string;
  slug: string;
  nameEn: string;
  nameMr: string;
  descriptionEn: string;
  descriptionMr: string;
  icon: string;
}

export interface ServiceOptionSet {
  sizes: string[];
  paperTypes: string[];
  gsmOptions: string[];
  finishingOptions: string[];
  allowCustomDimensions: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  categoryId: string;
  nameEn: string;
  nameMr: string;
  descriptionEn: string;
  descriptionMr: string;
  image: string;
  startingPrice: number | null; // null means "Quotation on Request"
  priceUnitEn: string;
  priceUnitMr: string;
  popular?: boolean;
  options: ServiceOptionSet;
  active: boolean;
}

export type BookingStatus =
  | 'booking_received'
  | 'under_review'
  | 'quotation_sent'
  | 'waiting_approval'
  | 'booking_confirmed'
  | 'design_in_progress'
  | 'design_preview_sent'
  | 'design_approved'
  | 'printing_in_progress'
  | 'quality_checking'
  | 'ready_for_pickup'
  | 'out_for_delivery'
  | 'completed'
  | 'cancelled';

export interface StatusHistoryEntry {
  status: BookingStatus;
  timestamp: string;
  note?: string;
}

export interface UploadedFileInfo {
  id: string;
  name: string;
  size: string;
  url: string;
  uploadedAt: string;
}

export interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Quotation {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  customerMobile: string;
  status: 'draft' | 'sent' | 'approved' | 'rejected' | 'changes_requested';
  items: QuotationItem[];
  designCharges: number;
  materialCharges: number;
  printingCharges: number;
  deliveryCharges: number;
  discount: number;
  subtotal: number;
  total: number;
  notes?: string;
  customerRemarks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingSpecs {
  size: string;
  customDimensions?: string;
  paperType: string;
  gsm?: string;
  printColor: 'color' | 'bw';
  printSides: 'single' | 'double';
  quantity: number;
  finishing: string;
  requiredDate: string;
  specialInstructions?: string;
}

export interface HomeDeliveryAddress {
  customerName: string;
  mobile: string;
  houseNo: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  deliveryInstructions?: string;
}

export interface Booking {
  id: string; // e.g. "GSG-2026-1001"
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  serviceId: string;
  serviceName: string;
  categoryName: string;
  deliveryType: 'pickup' | 'delivery';
  deliveryAddress?: HomeDeliveryAddress;
  pickupLocation: string;
  specs: BookingSpecs;
  designOption: 'have_design' | 'need_design';
  uploadedFiles: UploadedFileInfo[];
  designBrief?: {
    details: string;
    colorPreferences: string;
    referenceImages?: string[];
    textContent: string;
  };
  status: BookingStatus;
  statusHistory: StatusHistoryEntry[];
  estimatedCompletionDate?: string;
  quotation?: Quotation;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DesignPreview {
  id: string;
  url: string;
  title: string;
  uploadedAt: string;
  version: number;
}

export interface DesignRevision {
  round: number;
  feedback: string;
  requestedAt: string;
  status: 'pending' | 'addressed';
}

export interface DesignRequest {
  id: string;
  bookingId?: string;
  customerId: string;
  customerName: string;
  customerMobile: string;
  customerEmail: string;
  designType: string;
  brief: string;
  preferredColors: string;
  textContent: string;
  referenceFiles: UploadedFileInfo[];
  status: 'pending' | 'in_progress' | 'preview_sent' | 'approved' | 'revision_requested';
  previews: DesignPreview[];
  revisions: DesignRevision[];
  createdAt: string;
  updatedAt: string;
}

export interface BusinessSettings {
  businessName: string;
  category: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  fullAddress: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHoursEn: string;
  openingHoursMr: string;
  googleMapsUrl: string;
  deliveryAvailable: boolean;
  standardDeliveryCharge: number;
  bannerNoticeEn: string;
  bannerNoticeMr: string;
}

export interface GalleryItem {
  id: string;
  titleEn: string;
  titleMr: string;
  category: string;
  image: string;
  descriptionEn: string;
  descriptionMr: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  city: string;
  rating: number;
  commentEn: string;
  commentMr: string;
  serviceEn: string;
  serviceMr: string;
  date: string;
}

export interface NotificationItem {
  id: string;
  userId: string; // "admin" or customerId
  titleEn: string;
  titleMr: string;
  messageEn: string;
  messageMr: string;
  type: 'booking' | 'quotation' | 'design' | 'status' | 'system';
  read: boolean;
  link?: string;
  createdAt: string;
}
