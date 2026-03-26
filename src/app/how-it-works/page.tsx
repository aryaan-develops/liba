"use client";

import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { BookOpen, Users, MapPin, Repeat, Heart, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
    const steps = [
        {
            icon: <Search className={styles.icon} />,
            title: "Discover Stories",
            description: "Browse our expansive catalog of books available for loan, purchase, or exchange in your local neighborhood."
        },
        {
            icon: <MapPin className={styles.icon} />,
            title: "Find a Library",
            description: "Connect with community-driven 'Little Free Libraries' and local public branches nearby."
        },
        {
            icon: <Repeat className={styles.icon} />,
            title: "Exchange & Read",
            description: "Request a book, meet the owner or visit the library, and dive into your next adventure."
        }
    ];

    const values = [
        {
            icon: <Heart />,
            title: "Community Driven",
            description: "Built by readers, for readers. We believe sharing is the ultimate form of love for literature."
        },
        {
            icon: <ShieldCheck />,
            title: "Safe & Secure",
            description: "Our platform ensures verified users and safe meeting points for all book exchanges."
        },
        {
            icon: <BookOpen />,
            title: "Sustainability",
            description: "Reducing paper waste and promoting a circular economy for physical books."
        }
    ];

    return (
        <main className={styles.main}>
            <Navbar />
            
            <header className={styles.header}>
                <div className={styles.container}>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className={styles.title}>How Liba Works</h1>
                        <p className={styles.subtitle}>Connecting stories with people, one shelf at a time.</p>
                    </motion.div>
                </div>
            </header>

            <section className={styles.stepsSection}>
                <div className={styles.container}>
                    <div className={styles.stepsGrid}>
                        {steps.map((step, index) => (
                            <motion.div 
                                key={index}
                                className={styles.stepCard}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <div className={styles.iconWrapper}>{step.icon}</div>
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.missionSection}>
                <div className={styles.container}>
                    <div className={styles.missionContent}>
                        <div className={styles.missionText}>
                            <h2>Our Core Philosophy</h2>
                            <p>
                                In an increasingly digital world, we believe in the magic of physical books 
                                and the communities that grow around them. Liba isn't just a platform; 
                                it's a movement to revitalize local reading cultures.
                            </p>
                            <div className={styles.valueGrid}>
                                {values.map((v, i) => (
                                    <div key={i} className={styles.valueItem}>
                                        <div className={styles.smallIcon}>{v.icon}</div>
                                        <div>
                                            <h4>{v.title}</h4>
                                            <p>{v.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.missionImage}>
                            <img src="/images/hero.png" alt="Library" />
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <div className={styles.ctaBox}>
                        <h2>Ready to start your journey?</h2>
                        <p>Join thousands of readers in your area and share the joy of reading.</p>
                        <div className={styles.ctaButtons}>
                            <Link href="/books">
                                <button className={styles.primaryBtn}>Explore Catalog</button>
                            </Link>
                            <Link href="/register">
                                <button className={styles.secondaryBtn}>Join Liba</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className={styles.footer}>
                <div className={styles.container}>
                    <p>&copy; 2026 Liba Platform. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}

// I need to make sure Search is imported from lucide-react too
import { Search } from "lucide-react";
