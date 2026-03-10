"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BookCard from "@/components/BookCard";
import PaymentModal from "@/components/PaymentModal";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { Library, MapPin, Users, BookOpen } from "lucide-react";
import { BOOKS } from "@/lib/data";

const FEATURED_BOOKS = BOOKS.slice(0, 4);

export default function Home() {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const handleBuy = (book: any) => {
    setSelectedBook(book);
    setIsPaymentOpen(true);
  };

  return (
    <main className={styles.main}>
      <Navbar />
      <Hero />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        item={selectedBook}
      />

      {/* ... rest of the content ... */}

      {/* Narrative Intro */}
      <section className={styles.introSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.introContent}
          >
            <h2 className={styles.sectionTitle}>A New Chapter for Your Books</h2>
            <p className={styles.sectionDesc}>
              Every book on your shelf is a story waiting to be shared. Liba connects
              readers, local libraries, and collectors to create a sustainable cycle
              of literature.
            </p>
          </motion.div>

          <div className={styles.grid3}>
            <div className={styles.featureItem}>
              <div className={styles.iconBox}><BookOpen /></div>
              <h3>Lend with Love</h3>
              <p>Share your favorite reads with your local community. Track their journey as they pass from hand to hand.</p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.iconBox}><Library /></div>
              <h3>Library Network</h3>
              <p>Connect with local community libraries. Browse their physical shelves from the comfort of your home.</p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.iconBox}><Users /></div>
              <h3>Meet Your Neighbors</h3>
              <p>Book exchange is the best way to meet like-minded people in your neighborhood. Discover local book clubs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className={styles.featured}>
        <div className={styles.container}>
          <div className={styles.headerRow}>
            <h2 className={styles.sectionTitle}>Discover Your Next Story</h2>
            <button className={styles.textLink}>View All Books &rarr;</button>
          </div>

          <div className={styles.bookGrid}>
            {FEATURED_BOOKS.map((book: any, i: number) => (
              <motion.div
                key={book.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <BookCard {...book} onAction={() => handleBuy(book)} />
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* Library Connect Section */}
      <section className={styles.libraryConnect}>
        <div className={styles.container}>
          <div className={styles.splitLayout}>
            <div className={styles.libText}>
              <span className={styles.label}>Local Integration</span>
              <h2 className={styles.sectionTitle}>Support Your Local Library</h2>
              <p>
                We've partnered with over 50 local libraries to bring their inventory online.
                Reserve books, renew loans, and discover library events directly through Liba.
              </p>
              <div className={styles.statRow}>
                <div className={styles.stat}>
                  <strong>50+</strong>
                  <span>Partner Libraries</span>
                </div>
                <div className={styles.stat}>
                  <strong>12k+</strong>
                  <span>Books Available</span>
                </div>
              </div>
              <button className={styles.accentBtn}>Find Nearby Libraries</button>
            </div>
            <div className={styles.libImage}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={styles.imageCard}
              >
                <img src="/images/library.png" alt="Library" />
                <div className={styles.floatingTag}>
                  <MapPin size={16} /> 2.4 miles away
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <h2 className={styles.brandName}>Liba</h2>
              <p>Where books find new stories.</p>
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.linkGroup}>
                <h4>Platform</h4>
                <a href="#">Borrow</a>
                <a href="#">Lend</a>
                <a href="#">Buy</a>
              </div>
              <div className={styles.linkGroup}>
                <h4>Community</h4>
                <a href="#">Libraries</a>
                <a href="#">Book Clubs</a>
                <a href="#">Events</a>
              </div>
              <div className={styles.linkGroup}>
                <h4>About</h4>
                <a href="#">Our Story</a>
                <a href="#">Mission</a>
                <a href="#">Contact</a>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2026 Liba Platform. All rights reserved.</p>
            <div className={styles.socials}>
              {/* Social icons would go here */}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

