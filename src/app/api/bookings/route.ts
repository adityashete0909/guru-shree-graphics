import { NextResponse } from 'next/server';
import { initialBookings } from '@/data/initialData';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const mobile = searchParams.get('mobile');

  if (id) {
    const booking = initialBookings.find((b) => b.id.toLowerCase() === id.toLowerCase());
    return NextResponse.json({ success: !!booking, booking });
  }

  if (mobile) {
    const userBookings = initialBookings.filter((b) => b.customerMobile === mobile);
    return NextResponse.json({ success: true, bookings: userBookings });
  }

  return NextResponse.json({ success: true, bookings: initialBookings });
}

export async function POST(req: Request) {
  try {
    const bookingData = await req.json();
    return NextResponse.json({
      success: true,
      message: 'Booking created successfully.',
      booking: bookingData,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid payload.' }, { status: 400 });
  }
}
