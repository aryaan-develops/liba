"use client";

import { motion, AnimatePresence } from "framer-motion";
import styles from "./PaymentModal.module.css";
import { X, CreditCard, Lock, CheckCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: {
        id: string;
        title: string;
        price: string;
        author: string;
    } | null;
}


export default function PaymentModal({ isOpen, onClose, item }: PaymentModalProps) {
    const { user } = useAuth();
    const [step, setStep] = useState<"form" | "processing" | "success">("form");
    const [showReceipt, setShowReceipt] = useState(false);


    if (!item) return null;

    const handlePay = async () => {
        setStep("processing");
        
        try {
            const apiEndpoint = item.author === "Library Subscription" 
                ? '/api/payment/subscription' 
                : '/api/payment/purchase';
            
            const body = item.author === "Library Subscription"
                ? { userId: (user as any)?.id, amount: item.price, planType: item.title.toLowerCase() }
                : { userId: (user as any)?.id, bookId: item.id, sellerId: 'GLOBAL_LIB', amount: item.price }; 


            /* 
            const res = await fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                setTimeout(() => setStep("success"), 2000);
            } else {
                alert("Payment processing failed. Please try again.");
                setStep("form");
            }
            */

            // Dummy success simulation
            setTimeout(() => {
                // Save to local storage for dummy history
                const history = JSON.parse(localStorage.getItem('liba_transactions') || '[]');
                history.unshift({
                    id: `TXN_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                    item: item.title,
                    amount: item.price,
                    date: new Date().toLocaleDateString(),
                    type: item.author === "Library Subscription" ? 'Subscription' : 'Purchase'
                });
                localStorage.setItem('liba_transactions', JSON.stringify(history));
                
                setStep("success");
            }, 2500);

        } catch (err) {
            console.error("Payment error:", err);
            setStep("form");
        }
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
                                    {item.price !== 'Free to Borrow' && (
                                        <>
                                            <div className={styles.summaryRow}>
                                                <span>Community Tax</span>
                                                <strong>$0.50</strong>
                                            </div>
                                            <div className={styles.totalRow}>
                                                <span>Total</span>
                                                <strong>
                                                    ${(() => {
                                                        const p = typeof item.price === 'string' 
                                                            ? parseFloat(item.price.replace('$', '')) 
                                                            : (typeof item.price === 'number' ? item.price : 0);
                                                        return (p + 0.50).toFixed(2);
                                                    })()}
                                                </strong>
                                            </div>

                                        </>
                                    )}
                                    {item.price === 'Free to Borrow' && (
                                        <div className={styles.totalRow}>
                                            <span>Total</span>
                                            <strong>$0.00</strong>
                                        </div>
                                    )}
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
                                    <button className={styles.secondaryAction} onClick={() => setShowReceipt(true)}>
                                        View Receipt
                                    </button>
                                    <button className={styles.primaryAction} onClick={onClose}>
                                        Go to My Library <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {showReceipt && (
                            <div className={styles.receiptOverlay}>
                                <div className={styles.receipt}>
                                    <div className={styles.receiptHeader}>
                                        <h3 className={styles.brandName}>Liba</h3>
                                        <span>Invoice #INV-{Math.floor(Math.random()*100000)}</span>
                                    </div>
                                    <div className={styles.receiptBody}>
                                        <div className={styles.receiptRow}>
                                            <span>Date:</span>
                                            <span>{new Date().toLocaleDateString()}</span>
                                        </div>
                                        <div className={styles.receiptRow}>
                                            <span>Item:</span>
                                            <span>{item.title}</span>
                                        </div>
                                        <div className={styles.receiptRow}>
                                            <span>Category:</span>
                                            <span>{item.author === 'Library Subscription' ? 'Subscription' : 'Book Purchase'}</span>
                                        </div>
                                        <hr className={styles.divider} />
                                        <div className={styles.receiptRow}>
                                            <span>Price:</span>
                                            <span>{item.price}</span>
                                        </div>
                                        <div className={styles.receiptRow}>
                                            <span>Tax:</span>
                                            <span>$0.50</span>
                                        </div>
                                        <div className={`${styles.receiptRow} ${styles.totalHighlight}`}>
                                            <strong>Total Paid:</strong>
                                            <strong>
                                                ${(() => {
                                                    const p = typeof item.price === 'string' 
                                                        ? parseFloat(item.price.replace('$', '')) 
                                                        : (typeof item.price === 'number' ? item.price : 0);
                                                    return (p + 0.50).toFixed(2);
                                                })()}
                                            </strong>
                                        </div>
                                    </div>
                                    <div className={styles.receiptFooter}>
                                        <p>Thank you for supporting community libraries.</p>
                                        <button className={styles.closeReceipt} onClick={() => setShowReceipt(false)}>Close</button>
                                        <button className={styles.printBtn} onClick={() => window.print()}>Print</button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
