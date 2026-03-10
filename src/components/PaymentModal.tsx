"use client";

import { motion, AnimatePresence } from "framer-motion";
import styles from "./PaymentModal.module.css";
import { X, CreditCard, Lock, CheckCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: {
        title: string;
        price: string;
        author: string;
    } | null;
}

export default function PaymentModal({ isOpen, onClose, item }: PaymentModalProps) {
    const [step, setStep] = useState<"form" | "processing" | "success">("form");

    if (!item) return null;

    const handlePay = () => {
        setStep("processing");
        setTimeout(() => setStep("success"), 3000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.overlay}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={styles.modal}
                    >
                        <button className={styles.closeBtn} onClick={onClose}><X /></button>

                        {step === "form" && (
                            <div className={styles.content}>
                                <div className={styles.header}>
                                    <h2 className={styles.title}>Secure Checkout</h2>
                                    <p className={styles.subtitle}>Complete your purchase for {item.title}</p>
                                </div>

                                <div className={styles.orderSummary}>
                                    <div className={styles.summaryRow}>
                                        <span>Book Price</span>
                                        <strong>{item.price}</strong>
                                    </div>
                                    <div className={styles.summaryRow}>
                                        <span>Community Tax</span>
                                        <strong>$0.50</strong>
                                    </div>
                                    <div className={styles.totalRow}>
                                        <span>Total</span>
                                        <strong>${(parseFloat(item.price.replace('$', '')) + 0.50).toFixed(2)}</strong>
                                    </div>
                                </div>

                                <div className={styles.form}>
                                    <div className={styles.inputGroup}>
                                        <label>Cardholder Name</label>
                                        <input type="text" placeholder="John Doe" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Card Number</label>
                                        <div className={styles.cardInput}>
                                            <CreditCard size={18} />
                                            <input type="text" placeholder="4242 4242 4242 4242" />
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.inputGroup}>
                                            <label>Expiry</label>
                                            <input type="text" placeholder="MM/YY" />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label>CVV</label>
                                            <input type="text" placeholder="123" />
                                        </div>
                                    </div>
                                </div>

                                <button className={styles.payBtn} onClick={handlePay}>
                                    <Lock size={16} /> Pay Securely
                                </button>
                                <p className={styles.securePrompt}>Encrypted & Secured by LibaPay Gateway</p>
                            </div>
                        )}

                        {step === "processing" && (
                            <div className={styles.processing}>
                                <motion.div
                                    className={styles.spinner}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                <h3>Authorizing your story...</h3>
                                <p>We're connecting with our secure global banking network.</p>
                            </div>
                        )}

                        {step === "success" && (
                            <div className={styles.success}>
                                <div className={styles.successIcon}><CheckCircle size={80} /></div>
                                <h2>Transaction Successful!</h2>
                                <p>Your book is now part of your digital collection. A confirmation email has been sent.</p>
                                <div className={styles.nextSteps}>
                                    <button className={styles.primaryAction} onClick={onClose}>
                                        Go to My Library <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
