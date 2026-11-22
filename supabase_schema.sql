-- ==============================================================================
-- GURU SHREE GRAPHICS, AKOLA - POSTGRESQL / SUPABASE PRODUCTION SCHEMA
-- Official Printing & Graphic Designing Platform Schema with Row Level Security
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES & USERS
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    mobile TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    address TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'operator')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. ADMIN ROLES TABLE
CREATE TABLE IF NOT EXISTS public.admin_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    permissions JSONB DEFAULT '["all"]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name_en TEXT NOT NULL,
    name_mr TEXT NOT NULL,
    description_en TEXT,
    description_mr TEXT,
    icon TEXT DEFAULT 'Printer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. PRODUCTS & SERVICES
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    name_en TEXT NOT NULL,
    name_mr TEXT NOT NULL,
    description_en TEXT,
    description_mr TEXT,
    image TEXT,
    starting_price NUMERIC(10, 2),
    price_unit_en TEXT DEFAULT 'per piece',
    price_unit_mr TEXT DEFAULT 'प्रति नग',
    popular BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. PRODUCT OPTIONS & SPECS
CREATE TABLE IF NOT EXISTS public.product_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    sizes JSONB DEFAULT '[]'::jsonb,
    paper_types JSONB DEFAULT '[]'::jsonb,
    gsm_options JSONB DEFAULT '[]'::jsonb,
    finishing_options JSONB DEFAULT '[]'::jsonb,
    allow_custom_dimensions BOOLEAN DEFAULT true
);

-- 6. DELIVERY ADDRESSES
CREATE TABLE IF NOT EXISTS public.delivery_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    house_no TEXT NOT NULL,
    area TEXT NOT NULL,
    city TEXT DEFAULT 'Akola',
    state TEXT DEFAULT 'Maharashtra',
    pincode TEXT DEFAULT '444001',
    delivery_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. BOOKINGS
CREATE TABLE IF NOT EXISTS public.bookings (
    id TEXT PRIMARY KEY, -- e.g. 'GSG-2026-1001'
    customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_mobile TEXT NOT NULL,
    customer_email TEXT,
    service_id TEXT NOT NULL REFERENCES public.products(id),
    service_name TEXT NOT NULL,
    category_name TEXT,
    delivery_type TEXT NOT NULL CHECK (delivery_type IN ('pickup', 'delivery')),
    delivery_address_id UUID REFERENCES public.delivery_addresses(id),
    pickup_location TEXT DEFAULT 'Kunal Complex, Opp. Boys Zone, Jawahar Nagar Road, Shastri Nagar, Akola – 444001',
    specs JSONB NOT NULL,
    design_option TEXT NOT NULL CHECK (design_option IN ('have_design', 'need_design')),
    design_brief JSONB,
    status TEXT NOT NULL DEFAULT 'booking_received' CHECK (
        status IN (
            'booking_received',
            'under_review',
            'quotation_sent',
            'waiting_approval',
            'booking_confirmed',
            'design_in_progress',
            'design_preview_sent',
            'design_approved',
            'printing_in_progress',
            'quality_checking',
            'ready_for_pickup',
            'out_for_delivery',
            'completed',
            'cancelled'
        )
    ),
    status_history JSONB DEFAULT '[]'::jsonb,
    estimated_completion_date TIMESTAMP WITH TIME ZONE,
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 8. BOOKING ITEMS (Specification breakdowns)
CREATE TABLE IF NOT EXISTS public.booking_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id TEXT NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    item_title TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_spec TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 9. QUOTATIONS (Zero online payment architecture)
CREATE TABLE IF NOT EXISTS public.quotations (
    id TEXT PRIMARY KEY, -- e.g. 'QTN-2026-101'
    booking_id TEXT UNIQUE NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_mobile TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('draft', 'sent', 'approved', 'rejected', 'changes_requested')),
    items JSONB DEFAULT '[]'::jsonb,
    design_charges NUMERIC(10, 2) DEFAULT 0.00,
    material_charges NUMERIC(10, 2) DEFAULT 0.00,
    printing_charges NUMERIC(10, 2) DEFAULT 0.00,
    delivery_charges NUMERIC(10, 2) DEFAULT 0.00,
    discount NUMERIC(10, 2) DEFAULT 0.00,
    subtotal NUMERIC(10, 2) NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    notes TEXT,
    customer_remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 10. DESIGN REQUESTS & PROOFS
CREATE TABLE IF NOT EXISTS public.design_requests (
    id TEXT PRIMARY KEY, -- e.g. 'DSG-2026-501'
    booking_id TEXT REFERENCES public.bookings(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_mobile TEXT NOT NULL,
    customer_email TEXT,
    design_type TEXT NOT NULL,
    brief TEXT,
    preferred_colors TEXT,
    text_content TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'preview_sent', 'approved', 'revision_requested')),
    previews JSONB DEFAULT '[]'::jsonb,
    revisions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 11. UPLOADED FILES
CREATE TABLE IF NOT EXISTS public.uploaded_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id TEXT REFERENCES public.bookings(id) ON DELETE CASCADE,
    design_request_id TEXT REFERENCES public.design_requests(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_size TEXT,
    storage_path TEXT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 12. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL, -- 'admin' or customer UUID
    title_en TEXT NOT NULL,
    title_mr TEXT NOT NULL,
    message_en TEXT NOT NULL,
    message_mr TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'booking',
    read BOOLEAN DEFAULT false,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 13. REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    city TEXT DEFAULT 'Akola',
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment_en TEXT,
    comment_mr TEXT,
    service_en TEXT,
    service_mr TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 14. GALLERY
CREATE TABLE IF NOT EXISTS public.gallery (
    id TEXT PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_mr TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    description_en TEXT,
    description_mr TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 15. BUSINESS SETTINGS
CREATE TABLE IF NOT EXISTS public.business_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    business_name TEXT NOT NULL DEFAULT 'Guru Shree Graphics',
    category TEXT DEFAULT 'Printing, Graphic Designing and Digital Printing',
    address TEXT NOT NULL,
    landmark TEXT,
    city TEXT DEFAULT 'Akola',
    state TEXT DEFAULT 'Maharashtra',
    pincode TEXT DEFAULT '444001',
    full_address TEXT NOT NULL,
    phone TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    email TEXT NOT NULL,
    opening_hours_en TEXT,
    opening_hours_mr TEXT,
    delivery_available BOOLEAN DEFAULT true,
    standard_delivery_charge NUMERIC(10, 2) DEFAULT 50.00,
    banner_notice_en TEXT,
    banner_notice_mr TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Customers view/edit their own; Admins view all
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Bookings: Customers can read/create their own; Admins can do anything
CREATE POLICY "Customers can view their own bookings"
ON public.bookings FOR SELECT
USING (customer_id = auth.uid() OR public.is_admin());

CREATE POLICY "Customers can insert their own bookings"
ON public.bookings FOR INSERT
WITH CHECK (customer_id = auth.uid() OR auth.uid() IS NULL);

CREATE POLICY "Admins have full access to bookings"
ON public.bookings FOR ALL
USING (public.is_admin());

-- Quotations: Customers can view their own; Admins manage
CREATE POLICY "Customers can view their own quotations"
ON public.quotations FOR SELECT
USING (customer_id = auth.uid() OR public.is_admin());

CREATE POLICY "Customers can update quotation acceptance status"
ON public.quotations FOR UPDATE
USING (customer_id = auth.uid());

CREATE POLICY "Admins have full access to quotations"
ON public.quotations FOR ALL
USING (public.is_admin());

-- Design Requests: Customers view their own; Admins manage
CREATE POLICY "Customers can view their own designs"
ON public.design_requests FOR SELECT
USING (customer_id = auth.uid() OR public.is_admin());

CREATE POLICY "Admins have full access to designs"
ON public.design_requests FOR ALL
USING (public.is_admin());
