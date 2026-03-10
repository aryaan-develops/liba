"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Shield, Book, Users, Store, DollarSign, LogOut } from "lucide-react";

export default function AdminPage() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!user || user.role !== "admin") {
            router.push("/login");
        }
    }, [user, router]);

    if (!mounted || !user || user.role !== "admin") return null;

    return (
        <main className={styles.main}>
            <aside className={styles.sidebar}>
                <div className={styles.brand}>
                    <Shield className={styles.adminIcon} />
                    <span>Liba Admin</span>
                </div>

                <nav className={styles.nav}>
                    <a href="#" className={styles.active}><Store /> Overview</a>
                    <a href="#"><Users /> User Records</a>
                    <a href="#"><Book /> Global Library</a>
                    <a href="#"><DollarSign /> Transactions</a>
                </nav>

                <button onClick={logout} className={styles.logoutBtn}>
                    <LogOut /> Exit Panel
                </button>
            </aside>

            <section className={styles.content}>
                <header className={styles.header}>
                    <h1 className={styles.title}>System Intelligence</h1>
                    <div className={styles.userStatus}>
                        <div className={styles.statusDot}></div>
                        <span>Server Active</span>
                    </div>
                </header>

                <div className={styles.statsGrid}>
                    <div className={styles.statLine}>
                        <h3>Total Circulation</h3>
                        <strong>142,082</strong>
                        <span className={styles.trend}>+12.4% this month</span>
                    </div>
                    <div className={styles.statLine}>
                        <h3>Active Readers</h3>
                        <strong>8,421</strong>
                        <span className={styles.trend}>+502 new today</span>
                    </div>
                    <div className={styles.statLine}>
                        <h3>Partner Libraries</h3>
                        <strong>54</strong>
                        <span className={styles.trend}>2 pending approval</span>
                    </div>
                    <div className={styles.statLine}>
                        <h3>Monthly Revenue</h3>
                        <strong>$12,400</strong>
                        <span className={styles.trend}>+8.1% vs last month</span>
                    </div>
                </div>

                <div className={styles.tableSection}>
                    <h2>Recent Global Activity</h2>
                    <table className={styles.adminTable}>
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>User</th>
                                <th>Item</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#LIB-9842</td>
                                <td>Alice Cooper</td>
                                <td>Circe</td>
                                <td><span className={styles.buyBadge}>Purchase</span></td>
                                <td>$14.99</td>
                                <td>Settled</td>
                            </tr>
                            <tr>
                                <td>#LIB-8721</td>
                                <td>David Bowie</td>
                                <td>The Alchemist</td>
                                <td><span className={styles.lendBadge}>Lend</span></td>
                                <td>$0.00</td>
                                <td>Active</td>
                            </tr>
                            <tr>
                                <td>#LIB-1284</td>
                                <td>Kate Bush</td>
                                <td>Dune</td>
                                <td><span className={styles.buyBadge}>Purchase</span></td>
                                <td>$22.00</td>
                                <td>Processing</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
