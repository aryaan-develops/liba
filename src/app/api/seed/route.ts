import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';

export async function GET() {
  try {
    await seedDatabase();
    return NextResponse.json({ message: 'Seeding process completed' });
  } catch (error) {
    return NextResponse.json({ error: 'Seeding failed' }, { status: 500 });
  }
}
