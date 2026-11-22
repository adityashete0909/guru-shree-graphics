import { NextResponse } from 'next/server';
import { initialServices, initialCategories } from '@/data/initialData';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get('categoryId');

  if (categoryId) {
    const filtered = initialServices.filter((s) => s.categoryId === categoryId);
    return NextResponse.json({ success: true, services: filtered });
  }

  return NextResponse.json({
    success: true,
    services: initialServices,
    categories: initialCategories,
  });
}

export async function POST(req: Request) {
  try {
    const serviceData = await req.json();
    return NextResponse.json({
      success: true,
      message: 'Service created successfully.',
      service: serviceData,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid payload.' }, { status: 400 });
  }
}
