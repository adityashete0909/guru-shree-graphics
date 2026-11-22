import { NextResponse } from 'next/server';
import { initialSettings } from '@/data/initialData';

export async function GET() {
  return NextResponse.json({ success: true, settings: initialSettings });
}

export async function PUT(req: Request) {
  try {
    const updated = await req.json();
    return NextResponse.json({
      success: true,
      message: 'Business settings updated.',
      settings: updated,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid payload.' }, { status: 400 });
  }
}
