import connectDB from './mongodb';
import Book from '@/models/Book';
import { BOOKS } from './data';

export async function seedDatabase() {
  try {
    await connectDB();
    
    // Check if data already exists to avoid duplication
    const count = await Book.countDocuments();
    if (count > 0) {
      console.log('Database already seeded');
      return;
    }

    console.log('Seeding database...');
    
    // Map mock data and remove IDs so MongoDB generates new ones
    const booksToSeed = BOOKS.map(({ id, ...rest }) => rest);
    
    await Book.insertMany(booksToSeed);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
