"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { Settings, Shield, UserCheck, AlertTriangle, Menu, Search, RefreshCw, BarChart3, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({ totalUsers: 3450, totalRevenue: 12540.20, activeSubs: 820, systemStatus: "Online" });
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <Shield size={24} color="#d4a373" />
                    <span>Liba Admin</span>
                </div>
                <nav className={styles.nav}>
                    {[
                        { id: "overview", label: "Overview", icon: BarChart3 },
                        { id: "users", label: "User Management", icon: UserCheck },
                        { id: "content", label: "Content Control", icon: Database },
                        { id: "settings", label: "System Settings", icon: Settings },
                    ].map(item => (
                        <button 
                            key={item.id} 
                            onClick={() => setActiveTab(item.id)}
                            className={`${styles.navItem} ${activeTab === item.id ? styles.activeNavItem : ''}`}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <h1>System Executive Panel</h1>
                        <p>Welcome back, Administrator {user?.name}</p>
                    </div>
                    <div className={styles.headerRight}>
                        <div className={styles.statusIndicator}>
                            <div className={styles.pulse} />
                            System: {stats.systemStatus}
                        </div>
                        <button className={styles.refreshBtn}><RefreshCw size={18} /></button>
                    </div>
                </header>

                <div className={styles.adminStats}>
                    <div className={styles.adminStatCard}>
                        <div className={styles.adminStatLabel}>Cumulative Revenue</div>
                        <div className={styles.adminStatValue}>${stats.totalRevenue.toLocaleString()}</div>
                    </div>
                    <div className={styles.adminStatCard}>
                        <div className={styles.adminStatLabel}>Total Registered Users</div>
                        <div className={styles.adminStatValue}>{stats.totalUsers.toLocaleString()}</div>
                    </div>
                    <div className={styles.adminStatCard}>
                        <div className={styles.adminStatLabel}>Active Subscriptions</div>
                        <div className={styles.adminStatValue}>{stats.activeSubs.toLocaleString()}</div>
                    </div>
                </div>

                <div className={styles.content}>
                    {activeTab === "overview" && (
                        <section className={styles.adminSection}>
                            <div className={styles.sectionTitle}>
                                <h2>Recent System Activity</h2>
                                <button className={styles.viewAll}>View Logs</button>
                            </div>
                            <div className={styles.activityList}>
                                {[
                                    { time: "2m ago", action: "User #450 upgraded to Premium", type: "success" },
                                    { time: "15m ago", action: "New Seller registered: Digital Books Inc.", type: "info" },
                                    { time: "1h ago", action: "Database maintenance completed", type: "warning" },
                                ].map((activity, i) => (
                                    <div key={i} className={styles.activityItem}>
                                        <span className={styles.time}>{activity.time}</span>
                                        <span className={styles.action}>{activity.action}</span>
                                        <span className={`${styles.badge} ${styles[activity.type]}`}>{activity.type}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {activeTab !== "overview" && (
                        <div className={styles.placeholder}>
                            <h3>Section: {activeTab.toUpperCase()}</h3>
                            <p>Loading administrative modules...</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
