"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "./page.module.css";
import { Loader2, ArrowRight, User, Mail, Lock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const body = { name, email, password, role };
            console.log("Client-side Registering with body:", body);

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                // Call sign in directly after registration
                setTimeout(async () => {
                    await signIn('credentials', { 
                        email, 
                        password, 
                        callbackUrl: '/dashboard',
                        redirect: true 
                    });
                }, 2000);
            } else {
                setError(data.error || "Failed to register. Please try again.");
            }
        } catch (err) {
            setError("Something went wrong. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.main}>
            <AnimatePresence mode="wait">
                {success ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={styles.card}
                    >
                        <div className={styles.header}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                <CheckCircle2 size={64} color="#10b981" />
                            </div>
                            <h2 className={styles.title}>Welcome to Liba!</h2>
                            <p className={styles.subtitle}>Your account has been created successfully. Redirecting to login...</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className={styles.card}
                    >
                        <div className={styles.header}>
                            <h1 className={styles.title}>Join Our Story</h1>
                            <p className={styles.subtitle}>Create your account and join the community.</p>
                        </div>

                        {error && <div className={styles.error}>{error}</div>}

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <label>Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', opacity: 0.4 }} />
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        required
                                        style={{ paddingLeft: '45px', width: '100%' }}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

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
                                        placeholder="Create a password"
                                        required
                                        style={{ paddingLeft: '45px', width: '100%' }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={styles.roleGroup}>
                                <label>I am a...</label>
                                <div className={styles.roleGrid}>
                                    {[
                                        { id: 'user', label: 'Reader', icon: '📖' },
                                        { id: 'librarian', label: 'Librarian', icon: '🏛️' },
                                        { id: 'seller', label: 'Seller', icon: '💰' },
                                    ].map((r) => (
                                        <div 
                                            key={r.id}
                                            className={`${styles.roleCard} ${role === r.id ? styles.activeRole : ''}`}
                                            onClick={() => {
                                                console.log("Selected role:", r.id);
                                                setRole(r.id);
                                            }}
                                            role="button"
                                            tabIndex={0}
                                        >
                                            <span className={styles.roleIcon}>{r.icon}</span>
                                            <span className={styles.roleLabel}>{r.label}</span>
                                            {role === r.id && <div className={styles.selectionDot} />}
                                        </div>
                                    ))}
                                </div>
                                <input type="hidden" value={role} name="role" />
                            </div>

                            <button className={styles.submitBtn} disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 size={20} className={styles.spinner} />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Create Account <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className={styles.footer}>
                            Already have an account? <a href="/login" className={styles.link}>Sign In</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
