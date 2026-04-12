"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import BookCard from "@/components/BookCard";
import PaymentModal from "@/components/PaymentModal";
import { BookType } from "@/lib/data";
import styles from "./page.module.css";
import { Search, Filter, Loader2 } from "lucide-react";

export default function BooksPage() {
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<BookType | 'all'>('all');
    const [search, setSearch] = useState("");
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<any>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('/api/books');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setBooks(data);
                }
            } catch (error) {
                console.error("Failed to fetch books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleAction = (book: any) => {
        setSelectedBook({
            id: book._id || book.id,
            title: book.title,
            price: book.price || '0',
            author: book.author
        });
        setIsPaymentOpen(true);
    };


    const filteredBooks = books.filter(book => {
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
                    {loading ? (
                        <div className={styles.loading}>
                            <Loader2 className={styles.spinner} />
                            <p>Loading catalog...</p>
                        </div>
                    ) : filteredBooks.length > 0 ? (
                        <div className={styles.grid}>
                            {filteredBooks.map((book: any) => (
                                <BookCard key={book._id || book.id} {...book} id={book._id || book.id} onAction={() => handleAction(book)} />
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

