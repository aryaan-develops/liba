"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { Book, Heart, Clock, Settings, Bell } from "lucide-react";

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!mounted || !user) return null;

    const initials = user.name ? user.name.split(' ').map(n => n[0]).join('') : "??";

    return (
        <main className={styles.main}>
            <Navbar />

            <div className={styles.container}>
                <aside className={styles.sidebar}>
                    <div className={styles.profile}>
                        <div className={styles.avatar}>{initials}</div>
                        <h3>{user.name}</h3>
                        <p>{user.role.charAt(0).toUpperCase() + user.role.slice(1)} • Level 4</p>
                        <button onClick={logout} className={styles.logoutBtn}>Sign Out</button>
                    </div>

                    <nav className={styles.nav}>
                        <a href="#" className={styles.active}><Book size={20} /> My Collection</a>
                        <a href="#"><Heart size={20} /> Wishlist</a>
                        <a href="#"><Clock size={20} /> Local Lends</a>
                        <a href="#"><Bell size={20} /> Activity</a>
                        <a href="#"><Settings size={20} /> Account</a>
                    </nav>
                </aside>

                <section className={styles.content}>
                    <header className={styles.header}>
                        <h1 className={styles.title}>My Journey</h1>
                        <div className={styles.stats}>
                            <div className={styles.statBox}>
                                <strong>12</strong>
                                <span>Books Lent</span>
                            </div>
                            <div className={styles.statBox}>
                                <strong>4</strong>
                                <span>Borrowed</span>
                            </div>
                            <div className={styles.statBox}>
                                <strong>850</strong>
                                <span>Karma Points</span>
                            </div>
                        </div>
                    </header>
                    {/* ... rest of content ... */}


                    <div className={styles.booksGrid}>
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}><Book size={48} /></div>
                            <h3>Your shelf is quiet...</h3>
                            <p>Start listing books to connect with your community libraries and neighbors.</p>
                            <button className={styles.addBtn}>List a New Book</button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
