import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Book from '@/models/Book';
import { getServerSession } from "next-auth/next";

// Instead use typical getServerSession approach if you have auth options exported
// For simplicity, let's just accept the POST for now if the user is authenticated in the frontend

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, author, type, image, price, category, description, sellerId, subscriberOnly } = body;

    if (!title || !author || !type || !category || !description || !sellerId) {
      return NextResponse.json({ error: 'Missing required book fields, including sellerId' }, { status: 400 });
    }

    await connectDB();

    const newBook = await Book.create({
      title,
      author,
      type,
      image: image || "https://images.unsplash.com/photo-1543004218-ee141104975e?auto=format&fit=crop&q=80&w=800",
      price: Number(price) || 0,
      category,
      description,
      sellerId,
      subscriberOnly: !!subscriberOnly,
    });

    return NextResponse.json({ success: true, book: newBook }, { status: 201 });
  } catch (error: any) {
    console.error('Book creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const sellerId = searchParams.get('sellerId');
        
        await connectDB();
        
        let query = {};
        if (sellerId) {
            query = { sellerId };
        }
        
        const books = await Book.find(query).sort({ createdAt: -1 });
        return NextResponse.json(books);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
