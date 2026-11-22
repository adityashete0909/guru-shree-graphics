import { NextResponse } from 'next/server';
import { initialUsers } from '@/data/initialData';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, identifier, password, fullName, mobile, email, address } = body;

    if (action === 'login') {
      const clean = (identifier || '').trim().toLowerCase();
      const user = initialUsers.find(
        (u) => u.email.toLowerCase() === clean || u.mobile === identifier.trim()
      );

      if (!user) {
        return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
      }

      if (user.password && password && user.password !== password) {
        return NextResponse.json({ success: false, message: 'Invalid password.' }, { status: 401 });
      }

      return NextResponse.json({ success: true, user });
    }

    if (action === 'register') {
      const newUser = {
        id: `cust-${Date.now()}`,
        fullName,
        mobile,
        email,
        address,
        role: 'customer' as const,
        createdAt: new Date().toISOString().split('T')[0],
      };

      return NextResponse.json({ success: true, user: newUser });
    }

    return NextResponse.json({ success: false, message: 'Invalid action.' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
