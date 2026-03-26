import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sellerId = searchParams.get('sellerId');

    if (!sellerId) {
      return NextResponse.json({ error: 'Seller ID required' }, { status: 400 });
    }

    await connectDB();

    const seller = await User.findById(sellerId);
    if (!seller || seller.role !== 'seller') {
      return NextResponse.json({ error: 'Seller not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ 
      balance: seller.balance,
      name: seller.name,
      email: seller.email
    });
  } catch (error: any) {
    console.error('Profit fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
