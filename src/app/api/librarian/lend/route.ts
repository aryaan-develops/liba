import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Book from '@/models/Book';

export async function POST(req: Request) {
  try {
    const { librarianId, bookId, userId, days } = await req.json();

    if (!librarianId || !bookId || !userId || !days) {
      return NextResponse.json({ error: 'Missing information' }, { status: 400 });
    }

    await connectDB();

    const book = await Book.findById(bookId);
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + Number(days));

    book.borrowerId = userId;
    book.dueDate = dueDate;
    await book.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Book assigned to user successfully',
      dueDate: dueDate
    });
  } catch (error: any) {
    console.error('Lend error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
