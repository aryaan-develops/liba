"use client";

import { motion } from "framer-motion";
import styles from "./BookCard.module.css";
import { ArrowRight, BookOpen, ShoppingBag } from "lucide-react";

interface BookCardProps {
    title: string;
    author: string;
    type: 'lend' | 'buy';
    image: string;
    price?: string;
    onAction?: () => void;
}

export default function BookCard({ title, author, type, image, price, onAction }: BookCardProps) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className={styles.card}
            onClick={onAction}
        >
            <div className={styles.imageWrapper}>
                <img src={image} alt={title} className={styles.image} />
                <div className={styles.badge}>
                    {type === 'lend' ? <BookOpen size={14} /> : <ShoppingBag size={14} />}
                    <span>{type === 'lend' ? 'For Lending' : 'For Sale'}</span>
                </div>
            </div>

            <div className={styles.info}>
                <span className={styles.author}>{author}</span>
                <h3 className={styles.title}>{title}</h3>

                <div className={styles.footer}>
                    <span className={styles.price}>{price || 'Free to Borrow'}</span>
                    <button className={styles.actionBtn} onClick={(e) => {
                        e.stopPropagation();
                        onAction?.();
                    }}>
                        {type === 'buy' ? 'Buy Now' : 'Details'} <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

