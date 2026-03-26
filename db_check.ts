import mongoose from 'mongoose';
import connectDB from './src/lib/mongodb';
import Book from './src/models/Book';
import User from './src/models/User';

async function check() {
    await connectDB();
    const books = await Book.countDocuments();
    const users = await User.countDocuments();
    const librarians = await User.countDocuments({ role: 'librarian' });
    const sellers = await User.countDocuments({ role: 'seller' });
    
    console.log(`Books: ${books}`);
    console.log(`Users: ${users}`);
    console.log(`Librarians: ${librarians}`);
    console.log(`Sellers: ${sellers}`);
    
    process.exit(0);
}

check();
