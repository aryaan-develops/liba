"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Search, User, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMenu = () => setMobileMenuOpen(false);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""} ${mobileMenuOpen ? styles.mobileOpen : ""}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo} onClick={closeMenu}>
                    <BookOpen className={styles.logoIcon} />
                    <span>Liba</span>
                    {user?.role === 'admin' && <span className={styles.adminBadge}>Admin</span>}
                </Link>

                <div className={`${styles.navContent} ${mobileMenuOpen ? styles.showMobile : ""}`}>
                    <div className={styles.links}>
                        <Link href="/books" onClick={closeMenu}>Browse</Link>
                        <Link href="/libraries" onClick={closeMenu}>Libraries</Link>
                        <Link href="/sell" onClick={closeMenu}>Lend/Sell</Link>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.iconBtn}>
                            <Search size={22} />
                        </button>

                        {user ? (
                            <div className={styles.userProfile}>
                                <Link
                                    href={user.role === 'admin' ? "/admin" : "/dashboard"}
                                    className={styles.userIcon}
                                    onClick={closeMenu}
                                >
                                    <User size={22} />
                                    <span className={styles.userName}>{user.name}</span>
                                </Link>
                                <button onClick={() => { logout(); closeMenu(); }} className={styles.logoutBtn}>Logout</button>
                            </div>
                        ) : (
                            <Link href="/login" className={styles.primaryBtn} onClick={closeMenu}>
                                Join Community
                            </Link>
                        )}
                    </div>
                </div>

                <button className={styles.menuToggle} onClick={toggleMobileMenu}>
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
        </nav>
    );
}



