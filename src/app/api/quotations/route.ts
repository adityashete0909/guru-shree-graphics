import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const quote = await req.json();
    return NextResponse.json({
      success: true,
      message: 'Quotation processed successfully.',
      quotation: quote,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid payload.' }, { status: 400 });
  }
}
