"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { BookOpen, ArrowLeft, ArrowRight, Home, Settings, Bookmark } from "lucide-react";
import Link from "next/link";

export default function OnlineReaderPage({ params }: { params: { bookId: string } }) {
    const { user } = useAuth();
    const [pageNumber, setPageNumber] = useState(1);
    const [book, setBook] = useState<any>(null);

    useEffect(() => {
        // Mocking book fetch
        setBook({
            id: params.bookId,
            title: "The Alchemist",
            author: "Paulo Coelho",
            content: [
                "The boy's name was Santiago. He was a shepherd by trade.",
                "It was another day in his repetitive but fulfilling life under the Andalusian sun.",
                "He had been following his sheep across these pastures for many seasons, but something was different today.",
                "His dreams were becoming more vivid, and a recurring image of a treasure in the Egyptian pyramids began to haunt him.",
                "He wondered if life was truly about the destination or if the journey through the desert was the real prize."
            ]
        });
    }, [params.bookId]);

    if (!book) return <div>Loading current saga...</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link href="/dashboard" className={styles.backBtn}><ArrowLeft size={18} /> Library</Link>
                    <div className={styles.info}>
                        <h1>{book.title}</h1>
                        <span>{book.author} • {pageNumber}/{book.content.length}</span>
                    </div>
                </div>
                <div className={styles.headerRight}>
                    <button className={styles.iconBtn}><Bookmark size={18} /></button>
                    <button className={styles.iconBtn}><Settings size={18} /></button>
                </div>
            </header>

            <main className={styles.readerArea}>
                <div className={styles.contentCard}>
                    <p className={styles.content}>
                        {book.content[pageNumber - 1]}
                    </p>
                </div>

                <div className={styles.controls}>
                    <button 
                        disabled={pageNumber === 1} 
                        onClick={() => setPageNumber(n => n - 1)}
                        className={styles.controlBtn}
                    >
                        <ArrowLeft /> Previous
                    </button>
                    <div className={styles.pagination}>
                        Page {pageNumber}
                    </div>
                    <button 
                        disabled={pageNumber === book.content.length} 
                        onClick={() => setPageNumber(n => n + 1)}
                        className={styles.controlBtn}
                    >
                        Next <ArrowRight />
                    </button>
                </div>
            </main>
        </div>
    );
}
