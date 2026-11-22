import { BookingStatus, Language } from '@/types';

export const statusTranslations: Record<BookingStatus, { en: string; mr: string; color: string; step: number }> = {
  booking_received: {
    en: 'Booking Received',
    mr: 'बुकिंग प्राप्त झाली',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    step: 1,
  },
  under_review: {
    en: 'Booking Under Review',
    mr: 'बुकिंग पुनरावलोकनात आहे',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    step: 2,
  },
  quotation_sent: {
    en: 'Quotation Sent',
    mr: 'कोटेशन पाठवले',
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    step: 3,
  },
  waiting_approval: {
    en: 'Waiting for Customer Approval',
    mr: 'ग्राहकाच्या मंजुरीची प्रतीक्षा',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    step: 4,
  },
  booking_confirmed: {
    en: 'Booking Confirmed',
    mr: 'बुकिंग निश्चित झाली',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    step: 5,
  },
  design_in_progress: {
    en: 'Design in Progress',
    mr: 'डिझाइनचे काम सुरू आहे',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    step: 6,
  },
  design_preview_sent: {
    en: 'Design Preview Sent',
    mr: 'डिझाइन प्रिव्ह्यू पाठवला',
    color: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300',
    step: 7,
  },
  design_approved: {
    en: 'Design Approved',
    mr: 'डिझाइन मंजूर झाले',
    color: 'bg-teal-100 text-teal-800 border-teal-300',
    step: 8,
  },
  printing_in_progress: {
    en: 'Printing in Progress',
    mr: 'प्रिंटिंग सुरू आहे',
    color: 'bg-orange-100 text-orange-800 border-orange-300',
    step: 9,
  },
  quality_checking: {
    en: 'Quality Checking',
    mr: 'गुणवत्ता तपासणी सुरू आहे',
    color: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    step: 10,
  },
  ready_for_pickup: {
    en: 'Ready for Pickup',
    mr: 'दुकानातून नेण्यासाठी तयार',
    color: 'bg-green-100 text-green-800 border-green-300',
    step: 11,
  },
  out_for_delivery: {
    en: 'Out for Delivery',
    mr: 'डिलिव्हरीसाठी रवाना',
    color: 'bg-sky-100 text-sky-800 border-sky-300',
    step: 12,
  },
  completed: {
    en: 'Completed',
    mr: 'काम पूर्ण झाले',
    color: 'bg-emerald-600 text-white border-emerald-700',
    step: 13,
  },
  cancelled: {
    en: 'Cancelled',
    mr: 'रद्द केले',
    color: 'bg-red-100 text-red-800 border-red-300',
    step: 0,
  },
};

export const uiText: Record<string, { en: string; mr: string }> = {
  // Brand & Nav
  brandName: { en: 'Guru Shree Graphics', mr: 'गुरु श्री ग्राफिक्स' },
  tagline: {
    en: 'Printing, Graphic Designing and Digital Printing Hub in Akola',
    mr: 'अकोल्यातील प्रिंटिंग, ग्राफिक डिझाइनिंग आणि डिजिटल प्रिंटिंग केंद्र',
  },
  navHome: { en: 'Home', mr: 'मुख्यपृष्ठ' },
  navServices: { en: 'Our Services', mr: 'आमच्या सेवा' },
  navGallery: { en: 'Gallery', mr: 'गॅलरी' },
  navAbout: { en: 'About Us', mr: 'आमच्याबद्दल' },
  navContact: { en: 'Contact', mr: 'संपर्क' },
  navTrack: { en: 'Track Order', mr: 'ऑर्डर ट्रॅक करा' },
  navLogin: { en: 'Login', mr: 'लॉगिन' },
  navRegister: { en: 'Register', mr: 'नोंदणी करा' },
  navDashboard: { en: 'Customer Portal', mr: 'ग्राहक पोर्टल' },
  navAdminPortal: { en: 'Owner Portal', mr: 'मालक पोर्टल' },
  navLogout: { en: 'Logout', mr: 'बाहेर पडा' },

  // Hero
  heroHeading: {
    en: 'Your One-Stop Destination for All Printing Solutions.',
    mr: 'सर्व प्रकारच्या प्रिंटिंग सोल्यूशन्सचे आपले विश्वासू केंद्र.',
  },
  heroSubtitle: {
    en: 'From creative designs to premium-quality printing, we bring your ideas to life.',
    mr: 'क्रिएटिव्ह डिझाइनपासून ते उत्कृष्ट दर्जाच्या प्रिंटिंगपर्यंत, आम्ही तुमच्या कल्पना प्रत्यक्षात आणतो.',
  },
  btnBookService: { en: 'Book Your Service', mr: 'आत्ताच सेवा बुक करा' },
  btnExploreServices: { en: 'Explore Services', mr: 'सर्व सेवा पहा' },
  btnWhatsappEnquiry: { en: 'WhatsApp Enquiry', mr: 'व्हॉट्सॲप चौकशी' },
  btnGetDirections: { en: 'Get Directions', mr: 'दिशानिर्देश मिळवा' },
  btnRequestQuote: { en: 'Request Quotation', mr: 'कोटेशनची विनंती करा' },
  btnBookNow: { en: 'Book Now', mr: 'आत्ताच बुक करा' },
  btnTrackBooking: { en: 'Track My Booking', mr: 'माझी बुकिंग ट्रॅक करा' },
  btnCustomDesign: { en: 'Request Custom Design', mr: 'कस्टम डिझाइनची विनंती करा' },

  // Sections
  popularServicesHeading: { en: 'Popular Services', mr: 'लोकप्रिय सेवा' },
  popularServicesSub: {
    en: 'Our most demanded graphic design, digital flex, offset, and event printing solutions in Akola.',
    mr: 'अकोल्यात सर्वाधिक मागणी असलेल्या आमच्या ग्राफिक डिझाइन, डिजिटल फ्लेक्स, ऑफसेट आणि इव्हेंट प्रिंटिंग सेवा.',
  },
  allServicesHeading: { en: 'All Printing & Graphic Designing Services', mr: 'सर्व प्रिंटिंग आणि ग्राफिक डिझाइनिंग सेवा' },
  allServicesSub: {
    en: 'Choose from 40+ specialized printing services tailored for businesses, events, and individuals.',
    mr: 'व्यवसाय, कार्यक्रम आणि वैयक्तिक गरजांसाठी ४० हून अधिक विशेष प्रिंटिंग सेवांमधून निवडा.',
  },
  whyChooseHeading: { en: 'Why Choose Guru Shree Graphics?', mr: 'गुरु श्री ग्राफिक्स का निवडावे?' },
  whyChooseSub: {
    en: 'Delivering unmatched quality, sharp resolution, modern design aesthetics and prompt delivery in Akola.',
    mr: 'अकोल्यात अतुलनीय गुणवत्ता, अचूक रिझोल्यूशन, आधुनिक डिझाइन आणि वेळेवर पूर्तता.',
  },
  howBookingWorksHeading: { en: 'How Booking Works', mr: 'बुकिंग प्रक्रिया कशी चालते?' },
  howBookingWorksSub: {
    en: 'Simple, transparent, step-by-step process with zero online payment required upfront.',
    mr: 'कोणतेही ऑनलाइन पेमेंट न करता सोपी, पारदर्शक आणि टप्प्याटप्प्याने होणारी प्रक्रिया.',
  },
  galleryHeading: { en: 'Previous Work Gallery', mr: 'आमच्या कामाची गॅलरी' },
  gallerySub: {
    en: 'Browse our portfolio of completed printing jobs, banners, wedding cards, and branding projects.',
    mr: 'पूर्ण झालेले प्रिंटिंग जॉब्स, फ्लेक्स बॅनर, लग्नपत्रिका आणि ब्रँडिंग प्रकल्पांचे काम पहा.',
  },
  reviewsHeading: { en: 'What Our Customers Say', mr: 'आमचे ग्राहक काय म्हणतात?' },
  reviewsSub: {
    en: 'Trusted by hundreds of local shop owners, businesses, event planners, and families across Akola.',
    mr: 'अकोल्यातील शेकडो दुकानदार, व्यावसायिक, इव्हेंट आयोजक आणि कुटुंबांचा विश्वास.',
  },
  specialOffersHeading: { en: 'Special Offers & Bulk Printing Packages', mr: 'विशेष ऑफर्स आणि बल्क प्रिंटिंग पॅकेजेस' },
  faqHeading: { en: 'Frequently Asked Questions', mr: 'नेहमी विचारले जाणारे प्रश्न' },
  contactHeading: { en: 'Visit Us or Get in Touch', mr: 'आमच्या दुकानाला भेट द्या किंवा संपर्क करा' },

  // Disclaimers & Payment rules
  noOnlinePaymentBadge: { en: 'NO ONLINE PAYMENT REQUIRED', mr: 'कोणतेही ऑनलाइन पेमेंट आवश्यक नाही' },
  noOnlinePaymentText: {
    en: 'Payment will be arranged directly with the shop. Cash, in-shop counter UPI, or direct offline arrangement upon pickup or delivery.',
    mr: 'पेमेंट थेट दुकानात किंवा मालकाशी चर्चा करून केले जाईल. पिकअप किंवा डिलिव्हरीच्या वेळी रोख किंवा दुकानाच्या काउंटरवर व्यवस्था.',
  },
  quotationNotice: {
    en: 'Final pricing will be confirmed by Guru Shree Graphics before starting the work.',
    mr: 'काम सुरू करण्यापूर्वी अंतिम दर गुरु श्री ग्राफिक्सकडून निश्चित केला जाईल.',
  },

  // Address
  officialAddress: {
    en: 'Kunal Complex, Opp. Boys Zone, Jawahar Nagar Road, Shastri Nagar, Akola – 444001, Maharashtra, India.',
    mr: 'कुणाल कॉम्प्लेक्स, बॉईज झोन समोर, जवाहर नगर रोड, शास्त्री नगर, अकोला – ४४४००१, महाराष्ट्र, भारत.',
  },
  openingHoursTitle: { en: 'Business Hours', mr: 'कामाची वेळ' },
  openingHoursText: {
    en: 'Monday to Saturday: 9:30 AM – 9:00 PM | Sunday: 10:00 AM – 2:00 PM',
    mr: 'सोमवार ते शनिवार: सकाळी ९:३० ते रात्री ९:०० | रविवार: सकाळी १०:०० ते दुपारी २:००',
  },

  // Pickup vs Delivery
  deliveryChoiceTitle: { en: 'Fulfillment Method', mr: 'ऑर्डर मिळवण्याची पद्धत' },
  shopPickup: { en: 'Shop Pickup', mr: 'दुकानातून घेऊन जाणे (Shop Pickup)' },
  shopPickupDesc: {
    en: 'Collect directly from Guru Shree Graphics, Kunal Complex, Akola. Zero delivery charges.',
    mr: 'गुरु श्री ग्राफिक्स, कुणाल कॉम्प्लेक्स, अकोला येथून थेट घेऊन जा. डिलिव्हरी शुल्क मोफत.',
  },
  homeDelivery: { en: 'Home / Business Delivery', mr: 'घरपोच / कार्यालयीन डिलिव्हरी (Home Delivery)' },
  homeDeliveryDesc: {
    en: 'Delivered directly to your door in Akola district. Delivery charges confirmed on quotation.',
    mr: 'अकोला शहरात थेट तुमच्या पत्त्यावर पोहोचवले जाईल. डिलिव्हरी शुल्क कोटेशनमध्ये कळवले जाईल.',
  },

  // Booking Form
  bookingFormTitle: { en: 'Configure Your Printing Specifications', mr: 'तुमच्या प्रिंटिंग आवश्यकता निवडा' },
  step1Service: { en: '1. Service & Specs', mr: '१. सेवा व साईज' },
  step2Design: { en: '2. Artwork / Design', mr: '२. डिझाइन / आर्टवर्क' },
  step3Fulfillment: { en: '3. Pickup or Delivery', mr: '३. पिकअप किंवा डिलिव्हरी' },
  step4Review: { en: '4. Summary & Submit', mr: '४. पुनरावलोकन व सबमिट' },

  designOptionOwn: { en: 'I Have My Own Design File', mr: 'माझ्याकडे तयार डिझाइन फाईल आहे' },
  designOptionNeed: { en: 'I Need You to Create a Design', mr: 'मला नवीन डिझाइन बनवून हवे आहे' },
  uploadFileLabel: { en: 'Upload Artwork / Design (PDF, CDR, PSD, AI, JPG, PNG)', mr: 'डिझाइन फाईल अपलोड करा (PDF, CDR, PSD, AI, JPG, PNG)' },
  colorPrint: { en: 'Full Color Printing (CMYK)', mr: 'फुल कलर प्रिंटिंग (CMYK)' },
  bwPrint: { en: 'Black & White Printing (Mono)', mr: 'ब्लॅक अँड व्हाईट प्रिंटिंग (Mono)' },
  singleSide: { en: 'Single Sided', mr: 'एका बाजूने (Single Sided)' },
  doubleSide: { en: 'Double Sided (Both Sides)', mr: 'दोन्ही बाजूंनी (Double Sided)' },
  quantity: { en: 'Quantity (Copies / Pieces)', mr: 'संख्या (प्रती / नग)' },
  size: { en: 'Standard Size', mr: 'मानक आकार (Size)' },
  customSize: { en: 'Custom Dimensions (Width x Height)', mr: 'कस्टम आकार (लांबी x रुंदी)' },
  paperType: { en: 'Paper / Material Quality', mr: 'कागद / मटेरियल प्रकार' },
  gsm: { en: 'GSM / Thickness', mr: 'जीएसएम / जाडी (GSM)' },
  finishing: { en: 'Finishing & Coating', mr: 'फिनिशिंग व लॅमिनेशन' },
  requiredDate: { en: 'Required By Date', mr: 'अपेक्षित तारीख' },
  specialInstructions: { en: 'Special Instructions / Notes', mr: 'विशेष सूचना / नोंदी' },

  // Quotation System
  quotationTitle: { en: 'Quotation Breakdown', mr: 'कोटेशनचा सविस्तर तपशील' },
  designCharges: { en: 'Design & Pre-press Charges', mr: 'डिझाइन शुल्क' },
  materialCharges: { en: 'Paper / Material Charges', mr: 'मटेरियल शुल्क' },
  printingCharges: { en: 'Printing Charges', mr: 'प्रिंटिंग शुल्क' },
  deliveryCharges: { en: 'Delivery Charges', mr: 'डिलिव्हरी शुल्क' },
  discount: { en: 'Discount Applied', mr: 'सूट (Discount)' },
  totalEstimated: { en: 'Total Estimated Amount', mr: 'एकूण अंदाजे रक्कम' },
  btnApproveQuote: { en: 'Approve Quotation', mr: 'कोटेशन मंजूर करा' },
  btnRejectQuote: { en: 'Reject Quotation', mr: 'कोटेशन नाकारा' },
  btnRequestChanges: { en: 'Request Price / Spec Revision', mr: 'बदलांची विनंती करा' },

  // Tracker
  trackBookingTitle: { en: 'Track Your Printing Job', mr: 'तुमच्या कामाची सद्यस्थिती ट्रॅक करा' },
  trackBookingPlaceholder: { en: 'Enter Booking ID (e.g. GSG-2026-1001) or Mobile Number', mr: 'बुकिंग आयडी (उदा. GSG-2026-1001) किंवा मोबाईल नंबर टाका' },
  currentStatus: { en: 'Current Status', mr: 'सद्यस्थिती' },
  bookingDate: { en: 'Booking Date', mr: 'बुकिंग तारीख' },
  estCompletion: { en: 'Estimated Completion Date', mr: 'अपेक्षित पूर्ण होण्याची तारीख' },

  // Customer Dashboard
  custOverview: { en: 'Dashboard Overview', mr: 'डॅशबोर्ड आढावा' },
  custBrowse: { en: 'Browse All Services', mr: 'सर्व सेवा पहा' },
  custBook: { en: 'Book a Service', mr: 'नवीन सेवा बुक करा' },
  custMyBookings: { en: 'My Bookings', mr: 'माझी बुकिंग्स' },
  custQuotations: { en: 'My Quotations', mr: 'माझी कोटेशन्स' },
  custDesigns: { en: 'My Design Requests', mr: 'माझे डिझाइन रिक्वेस्ट्स' },
  custFiles: { en: 'Uploaded Files', mr: 'अपलोड केलेल्या फाईल्स' },
  custTrack: { en: 'Track My Order', mr: 'ऑर्डर ट्रॅक करा' },
  custHistory: { en: 'Booking History', mr: 'बुकिंग इतिहास' },
  custNotifications: { en: 'Notifications', mr: 'सूचना' },
  custProfile: { en: 'My Profile', mr: 'माझे प्रोफाइल' },
  custSupport: { en: 'Contact Support', mr: 'मदत व संपर्क' },

  // Admin Dashboard
  adminOverview: { en: 'Admin Overview', mr: 'मालक डॅशबोर्ड आढावा' },
  adminBookings: { en: 'All Bookings', mr: 'सर्व बुकिंग्स व्यवस्थापन' },
  adminQuotations: { en: 'Quotation Manager', mr: 'कोटेशन व्यवस्थापन' },
  adminServices: { en: 'Services & Products', mr: 'सेवा व उत्पादने' },
  adminDesigns: { en: 'Design Requests & Proofs', mr: 'डिझाइन आणि प्रूव्ह व्यवस्थापन' },
  adminCustomers: { en: 'Customer Directory', mr: 'ग्राहक यादी' },
  adminGallery: { en: 'Gallery Management', mr: 'गॅलरी व्यवस्थापन' },
  adminSettings: { en: 'Website & Shop Settings', mr: 'वेबसाईट व दुकान सेटिंग्ज' },
  adminReports: { en: 'Reports & Export', mr: 'अहवाल व एक्सपोर्ट' },
};
