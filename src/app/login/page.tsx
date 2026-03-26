"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Loader2, ArrowRight, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password. Please try again.");
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.main}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.card}
            >
                <div className={styles.header}>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Enter your credentials to access your library.</p>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', opacity: 0.4 }} />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                                style={{ paddingLeft: '45px', width: '100%' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', opacity: 0.4 }} />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                required
                                style={{ paddingLeft: '45px', width: '100%' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button className={styles.submitBtn} disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 size={20} className={styles.spinner} />
                                Signing In...
                            </>
                        ) : (
                            <>
                                Sign In <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                <div className={styles.footer}>
                    Don't have an account? <a href="/register" className={styles.link}>Register Here</a>
                </div>
            </motion.div>
        </main>
    );
}
