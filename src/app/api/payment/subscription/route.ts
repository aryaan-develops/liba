import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { userId, amount, planType } = await req.json();

    if (!userId || !amount) {
      return NextResponse.json({ error: 'User and amount are required' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Dummy payment logic: Always succeeds
    // In a real app, you'd call Stripe/PayPal here
    
    // Update user subscription
    const expiryDate = new Date();
    if (planType === 'monthly') {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else if (planType === 'yearly') {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else {
      expiryDate.setMonth(expiryDate.getMonth() + 1); // Default to 1 month
    }

    user.subscriptionStatus = 'active';
    user.subscriptionExpiry = expiryDate;
    await user.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Payment processed successfully',
      subscriptionStatus: 'active',
      expiryDate: expiryDate
    });
  } catch (error: any) {
    console.error('Payment error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
