import { NextResponse } from 'next/server';
import { initialDesignRequests } from '@/data/initialData';

export async function GET() {
  return NextResponse.json({ success: true, designs: initialDesignRequests });
}

export async function POST(req: Request) {
  try {
    const designData = await req.json();
    return NextResponse.json({
      success: true,
      message: 'Design request submitted.',
      design: designData,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid payload.' }, { status: 400 });
  }
}
