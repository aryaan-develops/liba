"use client";

import { useState } from "react";
import { X, Upload, Check, Loader2 } from "lucide-react";
import styles from "./AddBookModal.module.css";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

interface AddBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddBookModal({ isOpen, onClose, onSuccess }: AddBookModalProps) {
    const { user } = useAuth();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState<"buy" | "lend">("buy");
    const [category, setCategory] = useState("Fiction");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [subscriberOnly, setSubscriberOnly] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    author,
                    price: Number(price) || 0,
                    type,
                    category,
                    description,
                    sellerId: user?.id,
                    subscriberOnly,
                    image: image || "https://images.unsplash.com/photo-1543004218-ee141104975e?auto=format&fit=crop&q=80&w=800",
                }),
            });

            if (res.ok) {
                onSuccess();
                onClose();
            }
        } catch (error) {
            console.error("Error adding book:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Dummy upload simulation
            setLoading(true);
            setTimeout(() => {
                setImage("https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800");
                setIsUploaded(true);
                setLoading(false);
            }, 1500);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className={styles.overlay}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={styles.modal}
                >
                    <button className={styles.closeBtn} onClick={onClose}><X /></button>
                    <h2>Add New Book</h2>
                    <p>Share a story with the community.</p>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.uploadBox} onClick={() => document.getElementById('book-upload')?.click()}>
                            {isUploaded ? (
                                <div className={styles.uploaded}>
                                    <Check size={48} color="#10b981" />
                                    <span>Cover Image Uploaded!</span>
                                </div>
                            ) : (
                                <>
                                    <Upload size={48} />
                                    <span>Upload Cover Image</span>
                                </>
                            )}
                            <input 
                                id="book-upload" 
                                type="file" 
                                hidden 
                                accept="image/*" 
                                onChange={handleFileUpload}
                            />
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.inputGroup}>
                                <label>Book Title</label>
                                <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. The Alchemist" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Author</label>
                                <input required value={author} onChange={e => setAuthor(e.target.value)} placeholder="e.g. Paulo Coelho" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Price ($)</label>
                                <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Transaction Type</label>
                                <select value={type} onChange={e => setType(e.target.value as any)}>
                                    <option value="buy">Sell Book</option>
                                    <option value="lend">Lend Book</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" checked={subscriberOnly} onChange={e => setSubscriberOnly(e.target.checked)} />
                                Subscriber Only (Exclusive to Premium Readers)
                            </label>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Description</label>
                            <textarea required value={description} onChange={e => setDescription(e.target.value)} placeholder="What's this book about?" rows={3} />
                        </div>

                        <button className={styles.submitBtn} disabled={loading}>
                            {loading ? <Loader2 className={styles.spinner} /> : "Publish Book"}
                        </button>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
