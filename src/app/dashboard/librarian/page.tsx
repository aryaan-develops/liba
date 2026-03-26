"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { Users, BookOpen, Clock, CheckCircle, Search, Plus, Calendar, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AddBookModal from "@/components/AddBookModal";

export default function LibrarianDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({ activeUsers: 240, activeBorrows: 45, pendingSubs: 12 });
    const [users, setUsers] = useState<any[]>([]);
    const [books, setBooks] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    useEffect(() => {
        const fetchLibrarianData = async () => {
            // Fetch Users
            const userRes = await fetch('/api/users');
            if (userRes.ok) {
                const data = await userRes.json();
                setUsers(data.map((u: any) => ({
                    id: u._id,
                    name: u.name,
                    email: u.email,
                    subscription: u.subscriptionStatus === 'active' ? 'Premium' : 'Inactive',
                    booksRead: 0, // In a full app, this would be a real count
                    joinDate: new Date(u.createdAt).toLocaleDateString()
                })));
            }

            // Fetch Books (all books for the library)
            const bookRes = await fetch('/api/books');
            if (bookRes.ok) {
                const data = await bookRes.json();
                setBooks(data.map((b: any) => ({
                    id: b._id,
                    title: b.title,
                    author: b.author,
                    status: b.borrowerId ? "In Use" : "Available",
                    category: b.category,
                    subscriberOnly: b.subscriberOnly
                })));
            }
        };
        fetchLibrarianData();
    }, []);

    const handleGenerateSubscriptionBill = (user: any) => {
        alert(`Generating Subscription Bill for ${user.name}...\nPlan: ${user.subscription}\nStatus: ${user.subscription === 'Premium' ? 'PAID' : 'PENDING'}`);
    };

    const handleGrantSubscription = async (userId: string, type: 'Premium' | 'Basic') => {
        console.log(`Granting ${type} to ${userId}`);
        // API call simulation
        const res = await fetch('/api/payment/subscription', {
            method: 'POST',
            body: JSON.stringify({ userId, amount: 9.99, planType: type.toLowerCase() })
        });
        if (res.ok) {
            setUsers(users.map(u => u.id === userId ? { ...u, subscription: type } : u));
            alert(`${type} subscription granted to user.`);
        }
    };

    const handleLendBookOnline = async (bookId: string, userId: string, hours: number) => {
       const res = await fetch('/api/librarian/lend', {
            method: 'POST',
            body: JSON.stringify({ librarianId: user?.id, bookId, userId, days: 1 }) // Using 1 day for simplicity
        });
        if (res.ok) {
            setBooks(books.map(b => b.id === bookId ? { ...b, status: "In Use" } : b));
            alert(`Book unlocked for online reading for ${hours} hours!`);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerInfo}>
                    <div className={styles.badge}><ShieldCheck size={16} /> Verified Librarian</div>
                    <h1 className={styles.title}>Library Command Center</h1>
                    <p>Orchestrating digital reading experiences and user access.</p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.addBtn} onClick={() => setIsAddModalOpen(true)}>
                        <Plus size={20} /> Register New Book Asset
                    </button>
                </div>
            </header>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#e0f2fe' }}><Users color="#0369a1" /></div>
                    <div className={styles.statText}>
                        <span className={styles.statVal}>{stats.activeUsers}</span>
                        <span className={styles.statLab}>Active Readers</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#fef3c7' }}><BookOpen color="#b45309" /></div>
                    <div className={styles.statText}>
                        <span className={styles.statVal}>{stats.activeBorrows}</span>
                        <span className={styles.statLab}>Books in Circulation</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: '#dcfce7' }}><Zap color="#15803d" /></div>
                    <div className={styles.statText}>
                        <span className={styles.statVal}>$420.50</span>
                        <span className={styles.statLab}>Subscription Revenue</span>
                    </div>
                </div>
            </div>

            <div className={styles.mainGrid}>
                <section className={styles.userSection}>
                    <div className={styles.sectionHeading}>
                        <h2>Review Reader Access</h2>
                        <div className={styles.search}>
                            <Search size={18} />
                            <input placeholder="Search name or email..." value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div>

                    <div className={styles.userTable}>
                        {users.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map(u => (
                            <div key={u.id} className={styles.userRow}>
                                <div className={styles.userInfo}>
                                    <div className={styles.userAvatar}>{u.name[0]}</div>
                                    <div>
                                        <h4>{u.name}</h4>
                                        <span>Joined {u.joinDate}</span>
                                    </div>
                                </div>
                                <div className={styles.userMeta}>
                                    <div className={styles.metaItem}>
                                        <BookOpen size={14} /> {u.booksRead} Read
                                    </div>
                                    <div className={`${styles.roleBadge} ${u.subscription === 'Inactive' ? styles.inactive : styles.active}`}>
                                        {u.subscription}
                                    </div>
                                </div>
                                <div className={styles.userActions}>
                                    {u.subscription === 'Inactive' && (
                                        <button onClick={() => handleGrantSubscription(u.id, 'Premium')} className={styles.grantBtn}>
                                            Grant Premium
                                        </button>
                                    )}
                                    <button onClick={() => handleGenerateSubscriptionBill(u)} className={styles.billBtnSmall}>Bill</button>
                                    <button onClick={() => setSelectedUser(u)} className={styles.manageBtn}>Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.bookSection}>
                    <div className={styles.sectionHeading}>
                        <h2>Online Library</h2>
                    </div>
                    <div className={styles.bookStack}>
                        {books.map(b => (
                            <div key={b.id} className={styles.bookEntry}>
                                <div className={styles.bookCore}>
                                    <h4>{b.title}</h4>
                                    <span>{b.author} • {b.category}</span>
                                </div>
                                <div className={`${styles.bookStatusBadge} ${b.status === 'Available' ? styles.available : styles.inUse}`}>
                                    {b.status}
                                </div>
                                {b.status === 'Available' && (
                                    <button onClick={() => handleLendBookOnline(b.id, users[0].id, 24)} className={styles.lendOnlineBtn}>
                                        <Calendar size={14} /> Assign Time
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <AddBookModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSuccess={() => alert('Book added!')} />
        </div>
    );
}
