import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Book from '@/models/Book';

export async function POST(req: Request) {
  try {
    const { userId, bookId, sellerId, amount } = await req.json();

    if (!userId || !bookId || !sellerId || !amount) {
      return NextResponse.json({ error: 'Missing information' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(userId);
    const seller = await User.findById(sellerId);
    if (!user || !seller) {
      return NextResponse.json({ error: 'User or seller not found' }, { status: 404 });
    }

    // Update seller balance
    seller.balance += Number(amount);
    await seller.save();

    // Here we would create an 'Order' or link the book to the user.
    // For now, let's just return success.
    
    return NextResponse.json({ 
      success: true, 
      message: 'Book purchased successfully',
      sellerBalance: seller.balance
    });
  } catch (error: any) {
    console.error('Purchase error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
