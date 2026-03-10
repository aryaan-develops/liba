"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import Image from "next/image";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay} />

            <div className={styles.content}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.textStack}
                >
                    <span className={styles.subtitle}>Every Book Has a Journey</span>
                    <h1 className={styles.title}>
                        Lend a Story, <br />
                        <span>Borrow a Dream</span>
                    </h1>
                    <p className={styles.description}>
                        Connect with local libraries and your community. Liba is where the world's
                        tales find their next chapter.
                    </p>

                    <div className={styles.ctaGroup}>
                        <button className={styles.primaryBtn}>Explore Catalog</button>
                        <button className={styles.secondaryBtn}>How it Works</button>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className={styles.imageContainer}
            >
                <Image
                    src="/images/hero.png"
                    alt="Atmospheric Library Background"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </motion.div>
        </section>
    );
}

