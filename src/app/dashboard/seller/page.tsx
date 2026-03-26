"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { DollarSign, BookPlus, Package, TrendingUp, MoreVertical, ShieldCheck, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import AddBookModal from "@/components/AddBookModal";

export default function SellerDashboard() {
    const { user } = useAuth();
    const [balance, setBalance] = useState(0);
    const [books, setBooks] = useState<any[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isWithdrawing, setIsWithdrawing] = useState(false);

    useEffect(() => {
        const fetchSellerData = async () => {
            if (!user?.id) return;
            
            // Fetch Profit
            const profitRes = await fetch(`/api/seller/profit?sellerId=${user.id}`);
            if (profitRes.ok) {
                const data = await profitRes.json();
                setBalance(data.balance || 0);
            }

            // Fetch Books
            const booksRes = await fetch(`/api/books?sellerId=${user.id}`);
            if (booksRes.ok) {
                const data = await booksRes.json();
                setBooks(data.map((b: any) => ({
                    id: b._id,
                    title: b.title,
                    price: b.price,
                    sales: b.sales || 0, // Assuming sales field exists or default to 0
                    revenue: (b.sales || 0) * b.price,
                    type: b.type
                })));
            }
        };
        fetchSellerData();
    }, [user]);

    const handleGenerateBill = (book: any) => {
        alert(`Generating bill for ${book.title}...\nTotal Revenue: $${book.revenue.toFixed(2)}`);
        // In a real app, this could trigger a PDF generation or open a bill view
    };

    const handleWithdraw = () => {
        if (balance <= 0) return alert("No profits to withdraw yet.");
        setIsWithdrawing(true);
        setTimeout(() => {
            alert(`$${balance.toFixed(2)} withdrawn to your account!`);
            setBalance(0);
            setIsWithdrawing(false);
        }, 1500);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerInfo}>
                    <div className={styles.sellerBadge}><ShieldCheck size={16} /> Verified Seller Portal</div>
                    <h1>Seller Profit Hub</h1>
                    <p>Track your business growth and manage book listings.</p>
                </div>
            </header>

            <div className={styles.statsRow}>
                <div className={styles.statBox}>
                    <div className={styles.statLabel}>Available Balance</div>
                    <div className={styles.statValue}>${balance.toFixed(2)}</div>
                    <button 
                        className={styles.withdrawBtn} 
                        onClick={handleWithdraw}
                        disabled={isWithdrawing || balance <= 0}
                    >
                        {isWithdrawing ? "Processing..." : "Withdraw Funds"}
                        {!isWithdrawing && <ArrowUpRight size={16} />}
                    </button>
                </div>
                <div className={styles.statBox}>
                    <div className={styles.statLabel}>Total Books Sold</div>
                    <div className={styles.statValue}>20</div>
                    <div className={styles.statTrend}><TrendingUp size={14} /> +12% this month</div>
                </div>
                <div className={styles.statBox}>
                    <div className={styles.statLabel}>Total Revenue</div>
                    <div className={styles.statValue}>$659.92</div>
                    <div className={styles.statTrend}><TrendingUp size={14} /> +15% this month</div>
                </div>
            </div>

            <div className={styles.inventorySection}>
                <div className={styles.inventoryHeader}>
                    <h2>Your Inventory</h2>
                    <button className={styles.addBookBtn} onClick={() => setIsAddModalOpen(true)}>
                        <BookPlus size={18} /> Add New Book
                    </button>
                </div>

                <div className={styles.inventoryGrid}>
                    {books.map(b => (
                        <div key={b.id} className={styles.bookCard}>
                            <div className={styles.bookTop}>
                                <div className={styles.bookInfo}>
                                    <h3>{b.title}</h3>
                                    <p>${b.price.toFixed(2)}</p>
                                </div>
                                <button className={styles.optionsBtn}><MoreVertical size={16} /></button>
                            </div>
                            
                            <div className={styles.bookStats}>
                                <div className={styles.miniStat}>
                                    <span>Sales</span>
                                    <strong>{b.sales}</strong>
                                </div>
                                <div className={styles.miniStat}>
                                    <span>Revenue</span>
                                    <strong>${b.revenue.toFixed(2)}</strong>
                                </div>
                                <div className={styles.miniStat}>
                                    <button className={styles.billBtn} onClick={() => handleGenerateBill(b)}>
                                        Bill
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.profitSection}>
                <h2>Profit Forecast</h2>
                <div className={styles.chartPlaceholder}>
                    <TrendingUp size={48} color="#d4a373" />
                    <p>Sales trend analysis will appear here as you sell more books.</p>
                </div>
            </div>

            <AddBookModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onSuccess={() => alert('Book listed for sale!')}
            />
        </div>
    );
}
