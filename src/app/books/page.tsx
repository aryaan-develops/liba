"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import BookCard from "@/components/BookCard";
import PaymentModal from "@/components/PaymentModal";
import { BOOKS, BookType } from "@/lib/data";
import styles from "./page.module.css";
import { Search, Filter } from "lucide-react";

export default function BooksPage() {
    const [filter, setFilter] = useState<BookType | 'all'>('all');
    const [search, setSearch] = useState("");
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<any>(null);

    const handleAction = (book: any) => {
        setSelectedBook(book);
        setIsPaymentOpen(true);
    };

    const filteredBooks = BOOKS.filter(book => {
        const matchesFilter = filter === 'all' || book.type === filter;
        const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <main className={styles.main}>
            <Navbar />

            <PaymentModal
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                item={selectedBook}
            />
            {/* ... rest of the content ... */}

            <header className={styles.header}>
                <div className={styles.container}>
                    <h1 className={styles.title}>The Catalog</h1>
                    <p className={styles.subtitle}>Explore thousands of stories from your community.</p>

                    <div className={styles.controls}>
                        <div className={styles.searchBar}>
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder="Search by title or author..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className={styles.filterGroup}>
                            <button
                                className={filter === 'all' ? styles.activeFilter : ""}
                                onClick={() => setFilter('all')}
                            >
                                All
                            </button>
                            <button
                                className={filter === 'lend' ? styles.activeFilter : ""}
                                onClick={() => setFilter('lend')}
                            >
                                Lend
                            </button>
                            <button
                                className={filter === 'buy' ? styles.activeFilter : ""}
                                onClick={() => setFilter('buy')}
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <section className={styles.results}>
                <div className={styles.container}>
                    {filteredBooks.length > 0 ? (
                        <div className={styles.grid}>
                            {filteredBooks.map((book: any) => (
                                <BookCard key={book.id} {...book} onAction={() => handleAction(book)} />
                            ))}

                        </div>
                    ) : (
                        <div className={styles.empty}>
                            <h3>No books found.</h3>
                            <p>Try adjusting your filters or search keywords.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
