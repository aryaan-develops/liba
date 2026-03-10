"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./page.module.css";
import { User, Library, ShoppingCart, ShieldCheck } from "lucide-react";
import Link from "next/link";

type Role = "reader" | "seller" | "library" | "admin";

export default function LoginPage() {
    const [role, setRole] = useState<Role>("reader");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const success = await login(username, password, role);
        if (success) {
            if (role === 'admin') router.push("/admin");
            else router.push("/dashboard");
        } else {
            setError("Invalid credentials. Try again.");
        }
    };

    return (
        <main className={styles.main}>
            {/* Background Texture Overlay */}
            <div className={styles.texture} />

            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.glassContent}
                >
                    <Link href="/" className={styles.logo}>Liba</Link>
                    <h1 className={styles.title}>Welcome to the Story</h1>

                    <div className={styles.roleTabs}>
                        <button
                            className={role === 'reader' ? styles.activeTab : ""}
                            onClick={() => setRole('reader')}
                        >
                            <User size={18} /> Reader
                        </button>
                        <button
                            className={role === 'seller' ? styles.activeTab : ""}
                            onClick={() => setRole('seller')}
                        >
                            <ShoppingCart size={18} /> Seller
                        </button>
                        <button
                            className={role === 'library' ? styles.activeTab : ""}
                            onClick={() => setRole('library')}
                        >
                            <Library size={18} /> Library
                        </button>
                        <button
                            className={role === 'admin' ? styles.activeTab : ""}
                            onClick={() => setRole('admin')}
                        >
                            <ShieldCheck size={18} /> Admin
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.formStack}>
                        <div className={styles.inputGroup}>
                            <label>Username</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <p className={styles.error}>{error}</p>}

                        <button type="submit" className={styles.primaryBtn}>
                            Entry into Liba
                        </button>

                        <p className={styles.footerText}>
                            New to the story? <a href="#">Create a profile</a>
                        </p>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
