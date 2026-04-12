"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BookCard from "@/components/BookCard";
import PaymentModal from "@/components/PaymentModal";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { Library, MapPin, Users, BookOpen, Loader2 } from "lucide-react";
import { Book } from "@/lib/data";

export default function Home() {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await fetch('/api/books');
        const data = await response.json();
        if (Array.isArray(data)) {
          setFeaturedBooks(data.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch featured books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

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
            <a href="/books" className={styles.textLink}>View All Books &rarr;</a>
          </div>

          <div className={styles.bookGrid}>
            {loading ? (
              <div className={styles.loadingFull}>
                <Loader2 className={styles.spinner} />
                <p>Curating your library...</p>
              </div>
            ) : featuredBooks.length > 0 ? (
              featuredBooks.map((book: any, i: number) => (
                <motion.div
                  key={book._id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <BookCard 
                    {...book} 
                    id={book._id || book.id} 
                    onAction={() => handleBuy(book)} 
                  />
                </motion.div>
              ))
            ) : (
              <div className={styles.emptyFeatured}>
                <p>No featured books available at the moment.</p>
              </div>
            )}
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
                We&apos;ve partnered with over 50 local libraries to bring their inventory online.
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
                <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                    <Image 
                        src="/images/library.png" 
                        alt="Library" 
                        fill 
                        style={{ objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                    />
                </div>
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
                <a href="/how-it-works">How it Works</a>
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



