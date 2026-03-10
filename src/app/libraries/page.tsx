"use client";

import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { Search, MapPin, Phone, Clock, ExternalLink } from "lucide-react";

const LIBRARIES = [
    {
        name: "Oakwood Community Library",
        address: "123 Maple St, North Hills",
        distance: "0.8 miles",
        phone: "(555) 123-4567",
        hours: "9 AM - 8 PM",
        image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Central Valley Archive",
        address: "888 Main Blvd, Downtown",
        distance: "2.4 miles",
        phone: "(555) 987-6543",
        hours: "10 AM - 6 PM",
        image: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Bookhaven Public Library",
        address: "45 Library Way, Eastside",
        distance: "3.1 miles",
        phone: "(555) 444-5555",
        hours: "9 AM - 9 PM",
        image: "https://images.unsplash.com/photo-1549675584-91f19337af3d?auto=format&fit=crop&q=80&w=800"
    }
];

export default function LibrariesPage() {
    return (
        <main className={styles.main}>
            <Navbar />

            <header className={styles.header}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Library Network</h1>
                    <p className={styles.subtitle}>Find and connect with your local community book havens.</p>
                </div>
            </header>

            <section className={styles.network}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {LIBRARIES.map((lib, i) => (
                            <div key={i} className={styles.libCard}>
                                <div className={styles.imageWrapper}>
                                    <img src={lib.image} alt={lib.name} />
                                    <div className={styles.distanceBadge}>{lib.distance}</div>
                                </div>
                                <div className={styles.info}>
                                    <h3 className={styles.name}>{lib.name}</h3>
                                    <div className={styles.details}>
                                        <p><MapPin size={16} /> {lib.address}</p>
                                        <p><Phone size={16} /> {lib.phone}</p>
                                        <p><Clock size={16} /> {lib.hours}</p>
                                    </div>
                                    <button className={styles.visitBtn}>
                                        View Inventory <ExternalLink size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
